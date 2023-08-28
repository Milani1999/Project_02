import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";

function AddGallery({ refreshGallery }) {
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
  });

  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "edutrack");
      data.append("cloud_name", "dprnxaqxi");
      fetch("https://api.cloudinary.com/v1_1/dprnxaqxi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: data.url.toString(),
          }));
          console.log("Cloudinary URL:", data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Please Select an Image");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post("/api/gallery/create", formData, config);

      alert("Image added successfully!");
      setFormData({
        image: "",
      });
      setIsPopupOpen(false);
      refreshGallery();
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setError("");
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setIsPopupOpen(true)}
        style={{ textAlign: "center" }}
      >
        Add Image
      </Button>

      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="popup-background-gallery">
          <div className="popup-container-gallery">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-5 mx-3">
                Add
              </Button>
              <Button
                variant="danger"
                className="mt-5 mx-3"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default AddGallery;

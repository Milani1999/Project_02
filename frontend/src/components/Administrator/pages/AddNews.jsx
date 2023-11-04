import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";

function AddNews({ fetchNewsData }) {
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      setError("Please Select an Image");
      return;
    }
    const cloudinary_url = process.env.REACT_APP_CLOUDINARY_URL;
    const cloud_name = process.env.REACT_APP_CLOUD_NAME;

    setError("");
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "edutrack");
      data.append("cloud_name", cloud_name);
      fetch(cloudinary_url, {
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

      await axios.post("/api/news/create", formData, config);

      alert("News added successfully!");
      setFormData({
        title: "",
        content: "",
        image: "",
      });
      setIsPopupOpen(false);
      fetchNewsData();
      setError();
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
        Add News
      </Button>

      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="popup-background-news">
          <div className="popup-container-news">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Enter Title"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  name="content"
                  value={formData.content}
                  placeholder="Enter Content"
                  onChange={handleChange}
                />
              </Form.Group>

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

export default AddNews;

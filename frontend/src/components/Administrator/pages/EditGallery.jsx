import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";
import "./EditGallery.css";


const Image = () => {
  const [ImageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const fetchImageData = async () => {
    try {
      const response = await axios.get("/api/Image");
      setImageList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);



  const handleCloseEditPopup = () => {
    setSelectedImage({});
    setShowEditPopup(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, image, ...ImageData } = selectedImage;

      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "edutrack");
        data.append("cloud_name", "dprnxaqxi");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dprnxaqxi/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const cloudinaryData = await response.json();
        ImageData.image = cloudinaryData.url.toString();
      } else {
        ImageData.image = selectedImage.image;
      }

    
    } catch (error) {

    }
  };

  const handleDelete = (Image) => {
    setSelectedImage(Image);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedImage({});
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedImage;
      await axios.delete(`/api/Images/${_id}`);
      setShowDeletePopup(false);
      fetchImageData();
      alert("Image deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete Image.");
    }
  };

  return (
    <div>
      <Table striped hover className="mt-4">
        <thead>
          <tr>
            <th colSpan={3}></th>
            <th style={{ textAlign: "center", width: "100px" }}>
          {/*add*/}
            </th>
          </tr>

          <tr className="colname-Image">
            <th style={{ textAlign: "center" }}>Image</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ImageList.map((Image) => (
            <tr key={Image._id}>
              <td style={{ verticalAlign: "middle" }}>
                <img src={Image.image} alt="Profile" width="100" height="100" />
              </td>
             
              <td style={{ verticalAlign: "middle" }}>
                <br />
              
                <br />
                <Button
                  variant="danger"
                  onClick={() => handleDelete(Image)}
                  className="m-1"
                  style={{ width: "100px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Popup open={showEditPopup} onClose={handleCloseEditPopup}>
        <div className="popup-background-Image">
          {selectedImage && (
            <div className="popup-container-Image">
              <form onSubmit={handleEditSubmit}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {selectedImage.image && (
                      <img
                        src={selectedImage.image}
                        alt="Profile"
                        width="100px"
                        height="100px"
                      />
                    )}
                  </div>{" "}
                  <Form.Control
                    type="file"
                    accept="image/jpeg, image/png"
                    id="image"
                    name="image"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>
               
               

              
                <Button
                  variant="secondary"
                  onClick={handleCloseEditPopup}
                  className="mx-3 mt-5"
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}
        </div>
      </Popup>

      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-background">
          {selectedImage && (
            <div className="popup-container-delete">
              <h5>Are you sure you want to delete this Image ?</h5>
            
              <br />
              <Button
                variant="danger"
                onClick={confirmDelete}
                className="mx-3 mt-3"
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                onClick={handleCloseDeletePopup}
                className="ml-3 mt-3"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default Image;

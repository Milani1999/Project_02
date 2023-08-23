import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";
import AddImage from "./AddImage"; 
import "./EditGallery.css";

const EditGallery = () => {
  const [imageList, setImageList] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const fetchImageData = async () => {
    try {
      const response = await axios.get("/api/gallery"); 
      setImageList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  const handleDelete = (image) => {
    setSelectedImage(image);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedImage({});
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedImage;
      await axios.delete(`/api/gallery/${_id}`); 
      setShowDeletePopup(false);
      fetchImageData();
      alert("Image deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete image.");
    }
  };

  return (
    <div>
      <Table striped hover className="mt-4">
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th style={{ textAlign: "center", width: "100px" }}>
              <AddImage /> 
            </th>
          </tr>
          <tr className="colname-gallery">
            <th style={{ textAlign: "center" }}>Image</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {imageList.map((image) => (
            <tr key={image._id}>
              <td style={{ verticalAlign: "middle" }}>
                <img
                  src={image.url} 
                  alt="Gallery"
                  width="100"
                  height="100"
                />
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(image)}
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

      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-background">
          {selectedImage && (
            <div className="popup-container-delete">
              <h5>Are you sure you want to delete this image?</h5>
              <img
                src={selectedImage.url} 
                alt="Selected"
                width="100"
                height="100"
              />
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

export default EditGallery;

import React, { useEffect, useState } from "react";
import { Form, Button, Table, Col, Row } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("/api/news");
      setNewsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const handleEdit = (news) => {
    setSelectedNews(news);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setSelectedNews({});
    setShowEditPopup(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, image, ...newsData } = selectedNews;

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
        newsData.image = cloudinaryData.url.toString();
      } else {
        newsData.image = selectedNews.image;
      }

      await axios.put(`/api/news/${_id}`, newsData);
      setShowEditPopup(false);
      fetchNewsData();
      alert("News member updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Please fill all the fields");
    }
  };

  const handleDelete = (news) => {
    setSelectedNews(news);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedNews({});
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedNews;
      await axios.delete(`/api/news/${_id}`);
      setShowDeletePopup(false);
      fetchNewsData();
      alert("News member deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete news member.");
    }
  };

  return (
    <div>
      <Table striped hover className="mt-5">
        <thead>
          <tr>
            <th colSpan={7}></th>
            <th style={{ textAlign: "center", width: "100px" }}>
              {/* <AddNews /> */}
            </th>
          </tr>

          <tr className="colname">
            <th style={{ textAlign: "center" }}>Image</th>
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>Content</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news._id}>
              <td style={{ verticalAlign: "middle" }}>
                <img src={news.image} alt="Profile" width="100" height="100" />
              </td>
              <td style={{ verticalAlign: "middle" }}>{news.title}</td>
              <td style={{ verticalAlign: "middle" }}>{news.content}</td>
              <td style={{ verticalAlign: "middle" }}>
                <br />
                <Button
                  variant="success"
                  onClick={() => handleEdit(news)}
                  className="m-1"
                  style={{ width: "100px" }}
                >
                  Edit
                </Button>
                <br />
                <Button
                  variant="danger"
                  onClick={() => handleDelete(news)}
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
        <div className="popup-background">
          {selectedNews && (
            <div className="popup-container">
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
                    {selectedNews.image && (
                      <img
                        src={selectedNews.image}
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
                <div>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    value={selectedNews.title}
                    onChange={(e) =>
                      setSelectedNews({
                        ...selectedNews,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    id="content"
                    name="content"
                    value={selectedNews.content}
                    onChange={(e) =>
                      setSelectedNews({
                        ...selectedNews,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                <Button variant="primary" type="submit" className="mt-5">
                  Update
                </Button>
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
          {selectedNews && (
            <div className="popup-container-delete">
              <h5>Are you sure you want to delete this news member?</h5>
              Employee ID : {selectedNews.employee_id}
              <br />
              Full Name : {selectedNews.fullname}
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

export default News;

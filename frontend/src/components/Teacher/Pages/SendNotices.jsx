import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import ViewNotices from "./ViewNotices";
import { fetchStaffData } from "../../Count/Data";

function Notices() {
  const [staff, setStaff] = useState("-");

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const staffId = user?.id;

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const data = await fetchStaffData(staffId);
        setStaff(data.fullname);
      } catch (error) {
        alert("Error fetching staff details:", error);
      }
    };

    fetchStaffDetails();
  }, [staffId, setStaff]);

  const [formData, setFormData] = useState({
    grade: "",
    title: "",
    message: "",
    file: "",
    staff: staffId,
    staff_name: staff,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const cloudinary_url = process.env.REACT_APP_CLOUDINARY_URL;
  const cloud_name = process.env.REACT_APP_CLOUD_NAME;

  const postDetails = async (pics) => {
    try {
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}_${pics.name}`;
        data.append("file", pics, fileName);
        data.append("upload_preset", "edutrack");
        data.append("cloud_name", cloud_name);

        const cacheBuster = `?cb=${timestamp}`;
        const urlWithCacheBuster = `${cloudinary_url}${cacheBuster}`;

        const response = await fetch(urlWithCacheBuster, {
          method: "post",
          body: data,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const cloudinaryData = await response.json();

        setFormData((prevFormData) => ({
          ...prevFormData,
          file: cloudinaryData.url.toString(),
        }));

        console.log("Cloudinary URL:", cloudinaryData.url.toString());
      } else {
        alert("Please Select an Image");
      }
    } catch (error) {
      alert(error);
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

      await axios.post("/api/staffNotices/create", formData, config);

      alert("Notice sent successfully!");

      document.getElementById("file").value = "";

      setFormData({
        grade: "",
        title: "",
        message: "",
        file: "",
        staff: staffId,
        staff_name: staff,
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const firstCol = [
    {
      label: "Title",
      type: "text",
      name: "title",
      value: formData.title,
      placeholder: "Enter title",
    },
    {
      label: "Message",
      type: "text",
      name: "message",
      value: formData.message,
      placeholder: "Enter message",
    },
  ];
  return (
    <div className="notice-page">
      <ViewNotices />
      <Form onSubmit={submitHandler}>
        <h2 className="notice-sending" style={{ textAlign: "center" }}>
          Send Notices
        </h2>
        <Form.Group controlId="grade">
          <Form.Label className="grade">Grade</Form.Label>
          <Form.Control
            as="select"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            {Array.from({ length: 11 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Grade {index + 1}
              </option>
            ))}
          </Form.Control>
        </Form.Group>{" "}
        {firstCol.map((std) => (
          <Form.Group controlId={std.name}>
            <Form.Label className="label-add-students">{std.label}</Form.Label>
            <Form.Control
              type={std.type}
              name={std.name}
              value={std.value}
              placeholder={std.placeholder}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
        <Form.Group controlId="file">
          <Form.Label className="label-add-students">File</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-5"
          style={{ width: "100px" }}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}

export default Notices;

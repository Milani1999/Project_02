import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import "./SNotices.css";
import { FcAbout, FcComments, FcAdvertising } from "react-icons/fc";
import { fetchStudentData } from "../../Count/Data";


const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [grade, setGrade] = useState(0);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.id;

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await fetchStudentData(studentId);
        setGrade((prevGrade) => data.grade || prevGrade);
      } catch (error) {
        alert("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get("/api/notices/studentNotice"),
          axios.get(`/api/staffNotices/grade/${grade}`),
        ]);

        const data1 = response1.data;
        const data2 = response2.data;

        const response = [...data1, ...data2];

        const sortedNotices = response.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setNotices(sortedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchData();
  }, [grade]);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleCloseModal = () => {
    setSelectedNotice(null);
  };

  const handleScroll = () => {
    const scrollPercentage =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    const newNotices = document.querySelectorAll(".notice-card.new-notice");
    newNotices.forEach((notice) => {
      const opacity = Math.max(0.2, 0.5 - scrollPercentage / 200);
      notice.style.backgroundColor = `rgba(214, 144, 144, ${opacity})`;
    });
  };

  return (
    <div>
      <FcAdvertising className="file-adv" />
      <div className="Student-notices-container">
        <h1 className="notice-title">Student Notices</h1>
        {notices.map((notice) => (
          <div
            key={notice._id}
            className={`notice-card ${notice.isNew ? "new-notice" : ""} ${
              selectedNotice === notice ? "selected" : ""
            }`}
            onClick={() => handleNoticeClick(notice)}
          >
            <div className="notice-card-header">
              {selectedNotice === notice ? (
                <FcComments className="close-icon" onClick={handleCloseModal} />
              ) : (
                <FcAbout className="file-icon" />
              )}
              <h2>{notice.title}</h2>
            </div>
            <p>{notice.message}</p>
            <p className="sent-date">
              Sent on: {new Date(notice.createdAt).toLocaleDateString()}
            </p>
            <p className="sent-date">From : {notice.staff_name}</p>
          </div>
        ))}
        {selectedNotice && (
          <Modal
            visible={true}
            onCancel={handleCloseModal}
            centered
            title={selectedNotice.title}
            footer={null}
          
          >
            <p>{selectedNotice.message}</p>
            {selectedNotice.file && (
              <a
                href={selectedNotice.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Attachment
              </a>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default StudentNotices;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import "./TNotices.css";

const TeacherNotices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchTeacherNotices();
  }, []);

  const fetchTeacherNotices = async () => {
    try {
      const response = await axios.get("/api/notices/get"); 
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching teacher notices:", error);
    }
  };

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleCloseModal = () => {
    setSelectedNotice(null);
  };

  return (
    <div className="teacher-notices-container">
      <h1>Teacher Notices</h1>
      {notices.map((notice) => (
        <div key={notice._id} className="notice-card" onClick={() => handleNoticeClick(notice)}>
          <h2>{notice.title}</h2>
          <p>{notice.message}</p>
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
          {selectedNotice.attachment && (
            <a href={selectedNotice.attachment} target="_blank" rel="noopener noreferrer">
              Download Attachment
            </a>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TeacherNotices;

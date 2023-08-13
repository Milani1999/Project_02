import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import "./TNotices.css";
import { FcAbout,FcComments,FcAdvertising} from "react-icons/fc";
const TeacherNotices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchTeacherNotices();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  const fetchTeacherNotices = async () => {
    try {
      const response = await axios.get("/api/notices/get");
      console.log(response.data);
      const sortedNotices = response.data.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1; // Sort new notices to the top
        if (!a.isNew && b.isNew) return 1; // Sort old notices to the bottom
        return 0;
      });
      
      setNotices(sortedNotices);
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

  const handleScroll = () => {
   
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    const newNotices = document.querySelectorAll(".notice-card.new-notice");
    newNotices.forEach((notice) => {
      const opacity = Math.max(0.2, 0.5 - (scrollPercentage / 200));
      notice.style.backgroundColor = `rgba(214, 144, 144, ${opacity})`;
    });
  };
  return (
    <div><FcAdvertising className="file-adv" />
    <div className="teacher-notices-container">
     
    <h1 className="notice-title">Staff Notices</h1>
      {notices.map((notice) => (
       <div
       key={notice._id}
       className={`notice-card ${notice.isNew ? "new-notice" : ""} ${selectedNotice === notice ? "selected" : ""}`}
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
          <p className="sent-date">Sent on: {new Date(notice.createdAt).toLocaleDateString()}</p>
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
    </div></div>
  );
};

export default TeacherNotices;

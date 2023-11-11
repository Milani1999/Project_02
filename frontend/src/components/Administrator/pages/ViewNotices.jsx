import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Tabs, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./ViewNotices.css";
const { TabPane } = Tabs;

const ViewNotices = () => {
  const [isSentNoticesVisible, setIsSentNoticesVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("teacher");
  const [teacherNotices, setTeacherNotices] = useState([]);
  const [studentNotices, setStudentNotices] = useState([]);

  const fetchTeacherNotices = async () => {
    try {
      const response = await axios.get("/api/notices/get?recipientType=Teacher");
      setTeacherNotices(response.data);
    } catch (error) {
      console.error("Error fetching teacher notices:", error);
    }
  };


  const fetchStudentNotices = async () => {
    try {
      const response = await axios.get("/api/notices/studentNotice?recipientType=Student");
      setStudentNotices(response.data);
    } catch (error) {
      console.error("Error fetching Student notices:", error);
    }
  };
  const handleDeleteSentNotice = async (noticeId, noticeType) => {
    try {
      const deleteUrl = `/api/deleteSentNotice/${noticeId}`;
      await axios.delete(deleteUrl);
      message.success("Notice deleted successfully");
 
    } catch (error) {
      console.error(error);
      message.error("Failed to delete notice");
    }
  };
  
  
  useEffect(() => {
    if (isSentNoticesVisible) {
      fetchTeacherNotices();
      fetchStudentNotices();
    }
  }, [isSentNoticesVisible]);

  // Sort 
  const sortedTeacherNotices = [...teacherNotices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const sortedStudentNotices = [...studentNotices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <Button type="" className="viewbtn" onClick={() => setIsSentNoticesVisible(true)}>
        View Sent Notices
      </Button>
      <Modal
        title="Sent Notices"
        visible={isSentNoticesVisible}
        onCancel={() => setIsSentNoticesVisible(false)}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        <Tabs defaultActiveKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
          <TabPane tab="Teacher" key="teacher">
            {sortedTeacherNotices.map((notice) => (
              <div key={notice._id} className="sent-notice">
                <p>{notice.title}</p>
                <p>{notice.message}</p>
                {notice.file && (
                  <a href={notice.file} target="_blank" rel="noopener noreferrer">
                    View Attachment
                  </a>
                )}
                <p className="sent-date">Sent on: {new Date(notice.createdAt).toLocaleDateString()}</p>
                <Popconfirm
                  title="Are you sure you want to delete this notice?"
                  onConfirm={() => handleDeleteSentNotice(notice._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined className="delete-icon" />
                </Popconfirm>
              </div>
            ))}
          </TabPane>
          <TabPane tab="Student" key="student">
            {sortedStudentNotices.map((notice) => (
              <div key={notice._id} className="sent-notice">
                <p>{notice.title}</p>
                <p>{notice.message}</p>
                {notice.file && (
                  <a href={notice.file} target="_blank" rel="noopener noreferrer">
                    View Attachment
                  </a>
                )}
                <p className="sent-date">Sent on: {new Date(notice.createdAt).toLocaleDateString()}</p>
                <Popconfirm
                  title="Are you sure you want to delete this notice?"
                  onConfirm={() => handleDeleteSentNotice(notice._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined className="delete-icon" />
                </Popconfirm>
              </div>
            ))}
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default ViewNotices;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Tabs, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const ViewNotices = () => {
  const [isSentNoticesVisible, setIsSentNoticesVisible] = useState(false);
  const [teacherNotices, setTeacherNotices] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const staffId = user?.id;

  const fetchTeacherNotices = async () => {
    try {
      const response = await axios.get(`/api/staffNotices/staff/${staffId}`);
      setTeacherNotices(response.data);
    } catch (error) {
      console.error("Error fetching teacher notices:", error);
    }
  };

  const handleDeleteSentNotice = async (noticeId) => {
    try {
      const deleteUrl = `/api/staffNotices/${noticeId}`;
      await axios.delete(deleteUrl);
      message.success("Notice deleted successfully");
      fetchTeacherNotices();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete notice");
    }
  };

  useEffect(() => {
    if (isSentNoticesVisible) {
      fetchTeacherNotices();
    }
  }, [isSentNoticesVisible]);

  return (
    <div>
      <Button
        type=""
        className="viewbtn"
        onClick={() => setIsSentNoticesVisible(true)}
      >
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
        <Tabs>
          <TabPane tab="Notices Sent by the Staff to Students">
            {teacherNotices.map((notice) => (
              <div key={notice._id} className="sent-notice">
                <p>{notice.title}</p>
                <p>{notice.message}</p>
                {notice.file && (
                  <a
                    href={notice.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Attachment
                  </a>
                )}
                <p className="sent-date">
                  Sent on: {new Date(notice.createdAt).toLocaleDateString()}
                </p>
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

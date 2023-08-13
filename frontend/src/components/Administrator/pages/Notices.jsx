import React, { useState,useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, message, Select, Modal, Upload,Popconfirm } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./Notices.css";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Dragger } = Upload;

const Notices = () => {
  const [form] = Form.useForm();
  const [recipientType, setRecipientType] = useState("Teacher");
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isNoticeSent, setIsNoticeSent] = useState(false);
  const [isSentNoticesVisible, setIsSentNoticesVisible] = useState(false);
  const [sentNotices, setSentNotices] = useState([]);
  //sent notices
  const handleViewSentNotices = async () => {
    try {
      const response = await axios.get("/api/notices/sent");
      setSentNotices(response.data);
      setIsSentNoticesVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch sent notices");
    }
  };
 // Load sent notices on component mount
 useEffect(() => {
  fetchSentNotices();
}, []);
const fetchSentNotices = async () => {
  try {
    const response = await axios.get("/api/notices/sent");
    setSentNotices(response.data);
  } catch (error) {
    console.error(error);
    message.error("Failed to fetch sent notices");
  }
};
const handleDeleteSentNotice = async (noticeId) => {
  try {
    await axios.delete(`/api/notices/${noticeId}`);
    // Refresh the list of sent notices
    await fetchSentNotices();
  } catch (error) {
    console.error(error);
    message.error("Failed to delete the notice");
  }
};
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("recipientType", recipientType);
      formData.append("title", values.title);
      formData.append("message", values.message);
      formData.append("file", values.fileList?.[0]?.originFileObj);

      
      const response = await axios.post("/api/notices/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      setIsNoticeSent(true);
      showConfirmationModal();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to send notice");
    }
  };

  const handleRecipientTypeChange = (value) => {
    setRecipientType(value);
  };

  const showConfirmationModal = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false);
    setIsNoticeSent(false);
  };

  return (
    <div className="notice-page">
      <div> <h1 className="notice-sending">Send Notices</h1>
        {/* Button to navigate to Sent Notices pane */}
        <Button className="viewbtn" type="primary" onClick={handleViewSentNotices}>
        View Sent Notices
      </Button></div>
     
      {isSentNoticesVisible && (
      <div className="sent-notices">
        <h2>Sent Notices</h2>
        <Modal
          title="Sent Notices"
          visible={isSentNoticesVisible}
          onCancel={() => setIsSentNoticesVisible(false)}
          footer={null}
          width={800} // Adjust the width as needed
          bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }} // Limit the height and add scroll if needed
        >
          {sentNotices.map((notice) => (
            <div key={notice._id} className="sent-notice">
              <p>{notice.title}</p>
              <p>{notice.message}</p>
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
     
      </Modal>
       
  </div>
)}

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Recipient Type"
          name="recipientType"
          initialValue={recipientType}
          rules={[{ required: true, message: "Please select the recipient type" }]}
        >
          <Select onChange={handleRecipientTypeChange}>
            <Option value="Teacher">Teacher</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter the message" }]}
        >
          <Input.TextArea placeholder="Enter the message" rows={4} />
        </Form.Item>
        <Form.Item
          label="Attachment"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Dragger name="file" multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
      <Modal
   visible={isConfirmationModalVisible}
  onCancel={handleConfirmationModalClose}
  onOk={handleConfirmationModalClose}
  centered
  title={isNoticeSent ? "Notice Sent" : "Notice Sending Failed"}
  afterClose={handleConfirmationModalClose}
>
  {isNoticeSent ? (
    <p className="confirmation-modal notice-sent">
      The notice has been successfully sent.
    </p>
  ) : (
    <p className="confirmation-modal notice-failed">
      Failed to send the notice. Please try again.
    </p>
  )}
</Modal>
<Modal
  title="Sent Notices"
  visible={isSentNoticesVisible}
  onCancel={() => setIsSentNoticesVisible(false)}
  footer={null}
  width={800} 
  bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }} 
>
  {sentNotices.map((notice) => (
    <div key={notice._id} className="sent-notice">
      <p>{notice.title}</p>
      <p>{notice.message}</p>
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
</Modal>

      
    </div>
  );
};


export default Notices;

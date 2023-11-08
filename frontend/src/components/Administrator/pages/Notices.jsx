import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  Modal,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./Notices.css";
import ViewNotices from "./ViewNotices";

const { Option } = Select;
const { Dragger } = Upload;

const Notices = () => {
  const [form] = Form.useForm();
  const [recipientType, setRecipientType] = useState("Teacher");
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isNoticeSent, setIsNoticeSent] = useState(false);
  const [sentNotices, setSentNotices] = useState([]);
  const [isSentNoticesPageVisible, setIsSentNoticesPageVisible] = useState(false);

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
      await fetchSentNotices();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete the notice");
    }
  };

  const postDetails = async (formData) => {
    try {
      await axios.post("/api/notices/create", formData);
    } catch (error) {
      console.error(error);
      message.error("Failed to save notice details");
    }
  }

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("recipientType", recipientType);
      formData.append("title", values.title);
      formData.append("message", values.message);

      if (values.fileList?.[0]?.originFileObj) {
        const imageFormData = new FormData();
        imageFormData.append("file", values.fileList[0].originFileObj);
        imageFormData.append("upload_preset", "edutrack");
        imageFormData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

        const imageResponse = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          imageFormData
        );

        formData.append("file", imageResponse.data.url);
      }

      await postDetails(formData);

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

  const handleChange = async (info) => {
    if (info.file.status === "done") {
      const imageUrl = info.file.response.secure_url;
      form.setFieldsValue({ fileList: [{ ...info.file, thumbUrl: imageUrl }] });
    }
  };



  const hideSentNoticesPage = () => {
    setIsSentNoticesPageVisible(false);
  };

  return (
    <div className="notice-page">
        < ViewNotices
        visible={isSentNoticesPageVisible}
        sentNotices={sentNotices}
        onClose={hideSentNoticesPage}
        onDeleteNotice={handleDeleteSentNotice}
      />
      <div>
        <h1 className="notice-sending">Send Notices</h1>
      </div>
  

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Recipient Type"
          name="recipientType"
          initialValue={recipientType}
          rules={[
            { required: true, message: "Please select the recipient type" },
          ]}
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
          name="fileList"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Dragger
            name="file"
            multiple={false}
            action={process.env.REACT_APP_CLOUDINARY_URL}
            data={{
              upload_preset: "edutrack",
              cloud_name: process.env.REACT_APP_CLOUD_NAME,
            }}
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
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

     
    </div>
  );
};

export default Notices;

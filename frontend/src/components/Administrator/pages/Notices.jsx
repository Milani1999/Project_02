import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, message, Select, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./Notices.css";

const { Option } = Select;
const { Dragger } = Upload;

const Notices = () => {
  const [form] = Form.useForm();
  const [recipientType, setRecipientType] = useState("Teacher");
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isNoticeSent, setIsNoticeSent] = useState(false);

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
      <h1 >Send Notice</h1>
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

      
    </div>
  );
};


export default Notices;

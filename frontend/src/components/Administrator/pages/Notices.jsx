import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, message, Select, Modal } from "antd";

import "./Notices.css";

const { Option } = Select;

const Notices = () => {
  const [form] = Form.useForm();
  const [recipientType, setRecipientType] = useState("teacher");
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isNoticeSent, setIsNoticeSent] = useState(false);

  const handleSubmit = async (values) => {
    try {
      await axios.post("/api/notices", { ...values, recipientType });
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
      <h1>Send Notice</h1>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Recipient Type"
          name="recipientType"
          initialValue={recipientType}
          rules={[{ required: true, message: "Please select the recipient type" }]}
        >
          <Select onChange={handleRecipientTypeChange}>
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
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
      >
        {isNoticeSent ? (
          <p>The notice has been successfully sent.</p>
        ) : (
          <p>Failed to send the notice. Please try again.</p>
        )}
      </Modal>
    </div>
  );
};

export default Notices;

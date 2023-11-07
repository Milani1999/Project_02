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
  Popconfirm,
} from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import "./SendNotices.css";

const { Option } = Select;
const { Dragger } = Upload;

const Notices = () => {
  const [form] = Form.useForm();
  const [selectedGrade, setSelectedGrade] = useState("1"); 
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isNoticeSent, setIsNoticeSent] = useState(false);
  const [isSentNoticesVisible, setIsSentNoticesVisible] = useState(false);
  const [sentNotices, setSentNotices] = useState([]);

  const handleViewSentNotices = async () => {
    try {
      const response = await axios.get("/api/sendnotices/sent");
      setSentNotices(response.data);
      setIsSentNoticesVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch sent notices");
    }
  };

  useEffect(() => {
    fetchSentNotices();
  }, []);

  const fetchSentNotices = async () => {
    try {
      const response = await axios.get("/api/sendnotices/sent");
      setSentNotices(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch sent notices");
    }
  };

  const handleDeleteSentNotice = async (noticeId) => {
    try {
      await axios.delete(`/api/sendnotices/${noticeId}`);
      await fetchSentNotices();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete the notice");
    }
  };

  const postDetails = async (formData) => {
    try {
      await axios.post("/api/sendnotices/create", formData);
    } catch (error) {
      console.error(error);
      message.error("Failed to save notice details");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("grade", selectedGrade); // Add the selected grade to the formData
      formData.append("title", values.title);
      formData.append("message", values.message);

      if (values.fileList?.[0]?.originFileObj) {
        const imageFormData = new FormData();
        imageFormData.append("file", values.fileList[0].originFileObj);
        imageFormData.append("upload_preset", "edutrack");
        imageFormData.append("cloud_name", "dprnxaqxi");

        const imageResponse = await axios.post(
          "https://api.cloudinary.com/v1/dprnxaqxi/image/upload",
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

  const handleGradeChange = (value) => {
    setSelectedGrade(value);
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

  return (
    <div className="notice-page">
      <div>
        <h1 className="notice-sending">Send Notices</h1>
        {/* <Button
          className="viewbtn"
          type="primary"
          onClick={handleViewSentNotices}
        >
          View Sent Notices
        </Button> */}
      </div>

      {isSentNoticesVisible ? (
        <div className="sent-notices">
          <h2>Sent Notices</h2>
          <Modal
            title="Sent Notices"
            visible={isSentNoticesVisible}
            onCancel={() => setIsSentNoticesVisible(false)}
            footer={null}
            width={800}
            bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
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
      ) : (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
  <Form.Item
  label="Select Grade"
  name="grade"
  rules={[
    { required: true, message: "Please select the grade" },
  ]}
>
  <Select
    placeholder="Select Grade" // Add the placeholder text
    onChange={handleGradeChange}
  >
    {Array.from({ length: 12 }, (_, i) => (
      <Option key={(i + 1).toString()} value={(i + 1)}>
        Grade {i + 1}
      </Option>
    ))}
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
              action="https://api.cloudinary.com/v1/dprnxaqxi/image/upload"
              data={{ upload_preset: "edutrack" }}
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
      )}

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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select } from "antd";

import "./Timetable.css";

const { Option } = Select;

const Timetable = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchTeachers();
    fetchTimetables();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/api/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("/api/timetables");
      setTimetables(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
    setSelectedTimeRange("");
    setSelectedTeacher("");
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    const timetableData = {
      class: selectedClass,
      subject: values.subject,
      day: values.day,
      time: values.time,
      teacher: values.teacher,
    };

    try {
      await axios.post("/api/timetables", timetableData);
      fetchTimetables();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      filters: classes.map((cls) => ({ text: cls.name, value: cls.id })),
      onFilter: (value, record) => record.class === value,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      filters: subjects.map((subject) => ({ text: subject.name, value: subject.id })),
      onFilter: (value, record) => record.subject === value,
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      filters: [
        { text: "Morning", value: "morning" },
        { text: "Afternoon", value: "afternoon" },
        { text: "Evening", value: "evening" },
      ],
      onFilter: (value, record) => record.time.toLowerCase().includes(value),
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      filters: teachers.map((teacher) => ({ text: teacher.name, value: teacher.id })),
      onFilter: (value, record) => record.teacher === value,
    },
  ];

  const filteredTimetables = timetables.filter(
    (timetable) =>
      (!selectedClass || timetable.class === selectedClass) &&
      (!selectedTimeRange ||
        timetable.time.toLowerCase().includes(selectedTimeRange)) &&
      (!selectedTeacher || timetable.teacher === selectedTeacher)
  );

  return (
    <div>
      <h3 className="mb-4 title">Timetable</h3>
      <div className="filter-container">
        <div className="filter-select">
          <span>Class:</span>
          <select onChange={(e) => handleClassChange(e.target.value)}>
            <option value="">01</option>
            <option value="">02</option>
            {classes.map((cls) => (
              <option value={cls.id} key={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-select">
          <span>Time Range:</span>
          <select onChange={(e) => setSelectedTimeRange(e.target.value)}>
            <option value="">All</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
        <div className="filter-select">
          <span>Teacher:</span>
          <select onChange={(e) => setSelectedTeacher(e.target.value)}>
            <option value="">All</option>
            {teachers.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="primary" onClick={handleModalOpen}>
          Add Timetable
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredTimetables} pagination={false} />

      <Modal
        title="Add Timetable"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please enter the subject" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Day"
            name="day"
            rules={[{ required: true, message: "Please enter the day" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please enter the time" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teacher"
            name="teacher"
            rules={[{ required: true, message: "Please enter the teacher" }]}
          >
            <Select>
              {teachers.map((teacher) => (
                <Option value={teacher.id} key={teacher.id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Timetable;

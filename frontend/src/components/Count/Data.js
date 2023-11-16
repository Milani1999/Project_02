import axios from "axios";

export const fetchStudentData = async (studentId) => {
  try {
    const response = await axios.get(`/api/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching student details");
  }
};

export const fetchStaffData = async (staffId) => {
  try {
    const response = await axios.get(`/api/staff/${staffId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching staff details");
  }
};

export const fetchMarksData = async (studentId) => {
  try {
    const response = await axios.get(`/api/marks/${studentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching student marks");
  }
};

export const StudentData = async () => {
  try {
    const response = await axios.get("/api/students");
    const studentData = response.data;
    return studentData;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

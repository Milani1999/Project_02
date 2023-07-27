import axios from "axios";

const processData = (studentData) => {
  const gradeCount = {};

  studentData.forEach((student) => {
    const { grade, gender } = student;
    const gradeKey = `Class ${grade.toString().padStart(2, "0")}`;
    const genderKey = gender === "Female" ? "Girls" : "Boys";

    if (!gradeCount[gradeKey]) {
      gradeCount[gradeKey] = {
        name: gradeKey,
      };
    }

    if (!gradeCount[gradeKey][genderKey]) {
      gradeCount[gradeKey][genderKey] = 1;
    } else {
      gradeCount[gradeKey][genderKey]++;
    }

    if (!gradeCount[gradeKey].students) {
      gradeCount[gradeKey].students = 1;
    } else {
      gradeCount[gradeKey].students++;
    }
  });


  const classWiseData = Object.values(gradeCount);

  return classWiseData;
};


export const fetchStaffCount = async () => {
  try {
    const response = await axios.get("/api/staff");
    const staffData = response.data;
    return staffData.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};


export const fetchStudentCount = async () => {
  try {
    const response = await axios.get("/api/students");
    const studentData = response.data;
    return studentData.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export { processData };

import axios from "axios";

export const processData = (studentData) => {
  const gradeCount = {};

  studentData.forEach((student) => {
    const { grade, gender } = student;
    const gradeKey = `${grade.toString().padStart(2, "0")}`;
    const genderKey = gender === "Female" ? "Girls" : "Boys";

    if (!gradeCount[gradeKey]) {
      gradeCount[gradeKey] = {
        Girls: 0,
        Boys: 0,
      };
    }

    gradeCount[gradeKey][genderKey]++;
  });

  const classWiseData = [];

  Object.keys(gradeCount).forEach((gradeKey) => {
    const { Girls, Boys } = gradeCount[gradeKey];

    classWiseData.push({
      name: "Girls",
      grade: gradeKey,
      students: Girls,
    });

    classWiseData.push({
      name: "Boys",
      grade: gradeKey,
      students: Boys,
    });
  });

  classWiseData.sort((a, b) => a.grade.localeCompare(b.grade));

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

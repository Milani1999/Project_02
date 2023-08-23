const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");

const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

const createStudents = asyncHandler(async (req, res) => {
  const {
    admission_no,
    fullname,
    first_name,
    last_name,
    address,
    dateOfBirth,
    phone,
    gender,
    picture,
    username,
    password,
    role,
    parent_Name,
    parent_occupation,
    admission_year,
    grade,
    extra_activities,
  } = req.body;

  if (
    !admission_no ||
    !fullname ||
    !first_name ||
    !last_name ||
    !address ||
    !dateOfBirth ||
    !phone ||
    !gender ||
    !picture ||
    !username ||
    !password ||
    !role ||
    !parent_Name ||
    !parent_occupation ||
    !admission_year ||
    !grade ||
    !extra_activities
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userAdmissionExists = await Student.findOne({
    admission_no: { $regex: new RegExp(`^${admission_no}$`, "i") },
  });
  if (userAdmissionExists) {
    res.status(400);
    throw new Error("Admission number already exists");
  }

  const usernameExists = await Student.findOne({
    username: { $regex: new RegExp(`^${username}$`, "i") },
  });

  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const student = new Student({
    fullname,
    first_name,
    last_name,
    address,
    dateOfBirth,
    phone,
    gender,
    picture,
    username,
    password,
    role,
    admission_no,
    parent_Name,
    parent_occupation,
    admission_year,
    grade,
    extra_activities,
  });

  const createdStudent = await student.save();

  res.status(201).json(createdStudent);
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student Not Found" });
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  const {
    admission_no,
    fullname,
    first_name,
    last_name,
    address,
    dateOfBirth,
    phone,
    gender,
    picture,
    username,
    password,
    role,
    parent_Name,
    parent_occupation,
    admission_year,
    grade,
    extra_activities,
  } = req.body;

  const student = await Student.findById(req.params.id);

  if (student) {
    student.admission_no = admission_no;
    student.fullname = fullname;
    student.first_name = first_name;
    student.last_name = last_name;
    student.address = address;
    student.dateOfBirth = dateOfBirth;
    student.phone = phone;
    student.gender = gender;
    student.picture = picture;
    student.username = username;
    student.password = password;
    student.role = role;
    student.parent_Name = parent_Name;
    student.parent_occupation = parent_occupation;
    student.admission_year = admission_year;
    student.grade = grade;
    student.extra_activities = extra_activities;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.deleteOne();
    res.json({ message: "Student Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

const getStudentsByGrade = asyncHandler(async (req, res) => {
  const students = await Student.find({ grade: req.params.grade });

  if (students.length > 0) {
    res.json(students);
  } else {
    res.status(404).json({ message: "No Students Found for this grade" });
  }
});

module.exports = {
  getStudents,
  createStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByGrade,
};

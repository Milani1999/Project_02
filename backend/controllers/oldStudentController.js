const Student = require("../models/studentModel");
const OldStudent = require("../models/oldStudentModel");
const asyncHandler = require("express-async-handler");

const getOldStudents = asyncHandler(async (req, res) => {
  const oldStudents = await OldStudent.find();
  res.json(oldStudents);
});

const getOldStudentByID = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student Not Found" });
  }
});

const addToOldStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const oldStudent = new OldStudent({
      fullname: student.fullname,
      first_name: student.fullname,
      last_name: student.last_name,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
      phone: student.phone,
      gender: student.gender,
      picture: student.picture,
      admission_no: student.admission_no,
      parent_Name: student.parent_Name,
      parent_occupation: student.parent_occupation,
      admission_year: student.admission_year,
      c_grade: student.grade,
      extra_activities: student.extra_activities,
      leaving: student.leaving,
      conduct: student.conduct,
      special_aptitudes: student.special_aptitudes,
      remark: student.remark,
      subjects_followed: student.subjects_followed,
      leaving_reason: student.leaving_reason,
      leaving_date: student.leaving_date,
    });

    await oldStudent.save();
    await Student.findByIdAndDelete(studentId);

    res.json({ message: "Student moved to old student table" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

const updateOldStudent = asyncHandler(async (req, res) => {
  const {
    admission_no,
    admission_year,
    fullname,
    dateOfBirth,
    parent_Name,
    address,
    medium,
    c_grade,
    conduct,
    extra_activities,
    special_aptitudes,
    remark,
    subjects_followed,
    leaving_reason,
    leaving_date,
  } = req.body;

  const old_student = await OldStudent.findById(req.params.id);

  if (old_student) {
    old_student.admission_no = admission_no;
    old_student.admission_year = admission_year;
    old_student.fullname = fullname;
    old_student.dateOfBirth = dateOfBirth;
    old_student.parent_Name = parent_Name;
    old_student.address = address;
    old_student.medium = medium;
    old_student.c_grade = c_grade;
    old_student.conduct = conduct;
    old_student.extra_activities = extra_activities;
    old_student.special_aptitudes = special_aptitudes;
    old_student.remark = remark;
    old_student.subjects_followed = subjects_followed;
    old_student.leaving_reason = leaving_reason;
    old_student.leaving_date = leaving_date;

    const updatedOldStudent = await old_student.save();

    res.json(updatedOldStudent);
  } else {
    res.status(404);
    throw new Error("Old student not found");
  }
});

module.exports = {
  getOldStudents,
  getOldStudentByID,
  addToOldStudent,
  updateOldStudent,
};

const Student = require("../models/studentModel");

const asyncHandler = require("express-async-handler");

const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.json(students);
})

const createStudents = asyncHandler(async (req, res) => {
    const {
        student_name, address, dob, gender, admission_year,
        phone, parent, occupation, grade, username, password, profile_img
    } = req.body;

    const student = new Student({
        student_name, address, dob, gender, admission_year,
        phone, parent, occupation, grade, username, password, profile_img
    });

    const createdStudent = await student.save();
    res.status().json(createdStudent);
});


module.exports = { getStudents, createStudents };
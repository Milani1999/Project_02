const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    admission_no: {
        type: String,
        require: true,
    },

    student_name: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    dob: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        require: true
    },

    admission_year: {
        type: Date,
        require: true
    },

    phone: {
        type: Number,
        require: true
    },

    parent: {
        type: String,
        require: true
    },

    occupation: {
        type: String,
        require: true
    },

    grade: {
        type: Number,
        require: true
    },

    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    profile_img: {
        type: Buffer
    }
})
const Student = new mongoose.model("Student", studentSchema)

module.exports=Student;


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    picture: {
      type: String,
      required: true,
      default:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },

    admission_no: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      enum: ["father", "mother", "guardian"],
      required: true,
    },

    parent_Name: {
      type: String,
    },
    parent_occupation: {
      type: String,
    },
    admission_year: {
      type: Date,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    admitted_grade: {
      type: Number,
      required: true,
    },
    extra_activities: {
      type: String,
      default: "-",
    },
    conduct: {
      type: String,
      default: "-",
    },
    special_aptitudes: {
      type: String,
      default: "-",
    },
    remark: {
      type: String,
      default: "-",
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

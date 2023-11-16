const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const OldStaffSchema = new mongoose.Schema(
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
    employee_id: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    epf_No: {
      type: String,
      required: true,
    },

    subjects_taught: {
      type: String,
      required: true,
    },
    service_letter: {
      type: String,
      default: "-",
    },
  },
  {
    timestamps: true,
  }
);

const oldStaff = new mongoose.model("oldStaff", OldStaffSchema);

module.exports = oldStaff;

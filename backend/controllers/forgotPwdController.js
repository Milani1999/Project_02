const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const StaffModel = require("../models/staffModel");
const StudentModel = require("../models/studentModel");
const AdminModel = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  try {
    const student = await StudentModel.findOne({ email });
    const staff = await StaffModel.findOne({ email });
    const admin = await AdminModel.findOne({ email });

    const user = student || staff || admin;

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    } else {
      const token = generateToken(user._id);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Reset Password Link",
        text: `https://edutrack-uef1.onrender.com/reset-password/${user._id}/${token}`,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        status: "success",
        message: "Reset password link sent successfully",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.json({ message: "Passwords do not match" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(password, 10);

    let user = await AdminModel.findByIdAndUpdate(id, { password: hash });
    if (user) {
      return res.send({ message: "Password Changed Successfully" });
    }

    let user_student = await StudentModel.findByIdAndUpdate(id, {
      password: hash,
    });
    if (user_student) {
      return res.send({ message: "Password Changed Successfully" });
    }

    user = await StaffModel.findByIdAndUpdate(id, { password: hash });
    if (user) {
      return res.send({ message: "Password Changed Successfully" });
    }

    return res.json({ message: "User not found" });
  } catch (err) {
    return res.json({ message: "Error with Reset Link" });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const { confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.json({ Status: "Passwords do not match" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    let user = await AdminModel.findByIdAndUpdate(id, { password: hash });
    if (!user) {
      user = await StudentModel.findByIdAndUpdate(id, { password: hash });
    }
    if (!user) {
      user = await StaffModel.findByIdAndUpdate(id, { password: hash });
    }

    if (!user) {
      return res.json({ Status: "User not found" });
    }

    return res.send({ Status: "Password Changed Successfully" });
  } catch (err) {
    console.error(err);
    return res.json({ Status: "Error" });
  }
};

module.exports = { forgotPassword, resetPassword, changePassword };

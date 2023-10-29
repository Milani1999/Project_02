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

  try {
    const user = await Promise.any([
      StaffModel.findOne({ email }),
      StudentModel.findOne({ email }),
      AdminModel.findOne({ email }),
    ]);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

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
      text: `http://localhost:3000/reset-password/${user._id}/${token}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      status: "success",
      message: "Reset password link sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

    return res.send({ Status: "Success" });
  } catch (err) {
    console.error(err);
    return res.json({ Status: "Error with token" });
  }
};


module.exports = { forgotPassword, resetPassword };

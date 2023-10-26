const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const UserModel = require("../models/staffModel");
const generateToken = require("../utils/generateToken");

const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

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
      text: `http://localhost:5173/reset_password/${user._id}/${token}`,
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

module.exports = { forgotPasswordController };

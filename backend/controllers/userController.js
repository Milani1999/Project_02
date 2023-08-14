const asyncHandler = require('express-async-handler');
const Student = require("../models/studentModel");
const Staff = require("../models/staffModel");
const Admin = require("../models/adminModel");
const generateToken = require('../utils/generateToken');

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const existingAdmin = await Admin.findOne({ username });

    if (!existingAdmin) {
      const defaultAdmin = new Admin({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        picture:"https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg",
        role: process.env.ADMIN_ROLE,
      });

      await defaultAdmin.save();
    }

    res.json({
      role: process.env.ADMIN_ROLE,
      picture:"https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg",
      token: generateToken("admin"),
    });
    return;
  }

  const student = await Student.findOne({ username });
  const staff = await Staff.findOne({ username });

  if (student && (await student.matchPassword(password))) {
    res.json({
      id:student._id,
      name: student.fullname,
      picture:student.picture,
      role: student.role,
      admissionNo: student.admission_no,
      token: generateToken(student._id),
    });
  } else if (staff && (await staff.matchPassword(password))) {
    res.json({
      id:staff._id,
      name: staff.fullname,
      picture:staff.picture,
      role: staff.role,
      token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

module.exports = { authUser };
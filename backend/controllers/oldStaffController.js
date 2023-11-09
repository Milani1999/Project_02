const Staff = require("../models/staffModel");
const OldStaff = require("../models/oldStaffModel");
const asyncHandler = require("express-async-handler");

const getOldStaffs = asyncHandler(async (req, res) => {
  const oldStaffs = await OldStaff.find();
  res.json(oldStaffs);
});

const getOldStaffByID = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);

  if (staff) {
    res.json(staff);
  } else {
    res.status(404).json({ message: "Staff Not Found" });
  }
});

const addToOldStaff = asyncHandler(async (req, res) => {
  const staffId = req.params.id;

  try {
    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    const oldStaff = new OldStaff({
      fullname: staff.fullname,
      first_name: staff.fullname,
      last_name: staff.last_name,
      address: staff.address,
      dateOfBirth: staff.dateOfBirth,
      phone: staff.phone,
      gender: staff.gender,
      picture: staff.picture,
      employee_id: staff.employee_id,
      email: staff.email,
      epf_no: staff.epf_no,
      subjects_taught: staff.subjects_taught,
    });

    await oldStaff.save();
    await Staff.findByIdAndDelete(staffId);

    res.json({ message: "Staff moved to old staff table" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ error: "Error deleting staff" });
  }
});

module.exports = {
  getOldStaffs,
  getOldStaffByID,
  addToOldStaff,
};

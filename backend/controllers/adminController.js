const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.find();
  res.json(admin);
});

const createAdmin = asyncHandler(async (req, res) => {
  const { fullname, phone, email, nic, picture, username, password } = req.body;

  if (!fullname || !phone || !email || !nic || !picture) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const adm = new Admin({
    fullname,
    phone,
    email,
    nic,
    picture,
    username,
    password,
  });

  const createdAdmin = await adm.save();

  res.status(201).json(createdAdmin);
});

const getAdminById = asyncHandler(async (req, res) => {
  const adm = await Admin.findById(req.params.id);

  if (adm) {
    res.json(adm);
  } else {
    res.status(404).json({ message: "Admin details not found" });
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { fullname, phone, email, nic, picture } = req.body;

  const adm = await Admin.findById(req.params.id);

  if (adm) {
    adm.fullname = fullname;
    adm.phone = phone;
    adm.email = email;
    adm.nic = nic;
    adm.picture = picture;

    const updatedAdmin = await adm.save();
    res.json(updatedAdmin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

module.exports = {
  getAdmin,
  createAdmin,
  getAdminById,
  updateAdmin,
};

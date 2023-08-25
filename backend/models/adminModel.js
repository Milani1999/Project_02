const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: "-",
    },
    phone: {
      type: Number,
      default: 9471234567,
    },
    email: {
      type: String,
      default: "-",
    },
    nic: {
      type: String,
      default: "-",
    },
    picture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    },
    username: {
      type: String,
      default: process.env.ADMIN_USERNAME,
    },
    password: {
      type: String,
      default: process.env.ADMIN_PASSWORD,
    },
    role: {
      type: String,
      default: process.env.ADMIN_ROLE,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;

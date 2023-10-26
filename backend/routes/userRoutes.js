const express = require("express");
const router = express.Router();
const { authUser } = require("../controllers/userController");
const {
  forgotPasswordController,
} = require("../controllers/forgotPwdController");

router.route("/login").post(authUser);
router.route("/forgot-password").post(forgotPasswordController);

module.exports = router;

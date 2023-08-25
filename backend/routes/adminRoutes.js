const express = require("express");
const {
  getAdmin,
  createAdmin,
  getAdminById,
  updateAdmin,
} = require("../controllers/adminController");
const router = express.Router();

router.route("/").get(getAdmin);
router.route("/create").post(createAdmin);
router.route("/:id").get(getAdminById).put(updateAdmin);

module.exports = router;

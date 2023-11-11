const express = require("express");
const {
  getOldStaffs,
  getOldStaffByID,
  addToOldStaff,
  updateOldStaff,
} = require("../controllers/oldStaffController");

const router = express.Router();

router.route("/").get(getOldStaffs);
router
  .route("/:id")
  .get(getOldStaffByID)
  .delete(addToOldStaff)
  .put(updateOldStaff);

module.exports = router;

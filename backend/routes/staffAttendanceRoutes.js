const express = require("express");
const router = express.Router();
const {
  takeStaffAttendance,
  getStaffAttendanceByDate,
  deleteStaffAttendance,
} = require("../controllers/staffAttendanceController");

router.route("/take").post(takeStaffAttendance);
router.route("/getByDate").get(getStaffAttendanceByDate);
router.route("/:id").delete(deleteStaffAttendance);

module.exports = router;

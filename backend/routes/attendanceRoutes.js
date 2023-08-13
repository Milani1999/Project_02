const express = require("express");
const {
    takeAttendance,
  getAttendanceByDate,
  deleteAttendance,
} = require("../controllers/attendanceController");
const router = express.Router();

router.route("/take").post(takeAttendance );
router.route("/getByDate").get(getAttendanceByDate);
router.route("/:id").delete(deleteAttendance);


module.exports = router;


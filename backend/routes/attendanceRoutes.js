const express = require('express');
const {markAttendance} = require("../controllers/attendanceController")
const router = express.Router();

router.route('/add').post(markAttendance);

module.exports = router;

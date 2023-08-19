const express = require("express");
const {
  getTimeTable,
  getByGrade,
  createTimeTable,
} = require("../controllers/timeTableController");
const router = express.Router();

router.route("/grade/:grade").get(getByGrade);
router.route("/").get(getTimeTable);
router.route("/create/:weekday/:period/:grade").post(createTimeTable);


module.exports = router;

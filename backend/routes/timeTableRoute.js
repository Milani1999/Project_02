const express = require("express");
const {
  getTimeTable,
  createTimeTable,
} = require("../controllers/timeTableController");
const router = express.Router();

router.route("/").get(getTimeTable);
router.route("/create/:weekday/:period/:grade").post(createTimeTable);

module.exports = router;

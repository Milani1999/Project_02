const express = require("express");
const {
  getTimeTable,
  getByGrade,
  createTimeTable,
  getTimeTableById,
  deleteTimeTable,
} = require("../controllers/timeTableController");
const router = express.Router();

router.route("/grade/:grade").get(getByGrade);
router.route("/").get(getTimeTable);
router.route("/create/:weekday/:period/:grade").post(createTimeTable);
router.route('/:id').get(getTimeTableById).delete(deleteTimeTable);


module.exports = router;

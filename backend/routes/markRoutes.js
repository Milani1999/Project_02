const express = require("express");
const router = express.Router();
const {
  saveMarks,
  getStudentMarksByID,
  getMarks,
  getStudentMarksByParams,
  editMarks,
} = require("../controllers/markContoller");

router.route("/").get(getMarks);
router.route("/:year/:term/:subject/:grade/create").post(saveMarks);
router.route("/:id").get(getStudentMarksByID);
router.route("/viewmarks/:year/:term/:subject/:grade").get(getStudentMarksByParams).put(editMarks);

module.exports = router;

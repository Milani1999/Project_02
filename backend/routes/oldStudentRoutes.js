const express = require("express");
const {
  getOldStudents,
  getOldStudentByID,
  addToOldStudent,
  updateOldStudent,
} = require("../controllers/oldStudentController");

const router = express.Router();

router.route("/").get(getOldStudents);
router.route("/:id").get(getOldStudentByID).delete(addToOldStudent);
router.route("/:id").put(updateOldStudent);

module.exports = router;

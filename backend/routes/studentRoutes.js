const express = require('express');
const { getStudents, createStudents, getStudentById, updateStudent, deleteStudent } = require("../controllers/studentController");
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();

router.route('/').get(getStudents);
router.route('/create').post(createStudents);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

module.exports = router;
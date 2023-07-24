const express = require('express');
const router = express.Router();
const {saveMarks,getStudentMarksByID,getMarks }=require('../controllers/markContoller')

router.route('/').get(getMarks);
router.route('/create').post(saveMarks);
router.route('/:id').get(getStudentMarksByID);

module.exports = router;

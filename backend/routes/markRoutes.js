const express = require('express');
const router = express.Router();
const {saveMarks}=require('../controllers/markContoller')

router.route('/create').post(saveMarks);

module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const sendnoticesController = require('./sendnoticesController'); 

router.post('/create', sendnoticesController.createNotice);


router.get("/studentNotice", noticesController.getStudentNotices);


router.delete('/:id', sendnoticesController.deleteNotice);

module.exports = router;

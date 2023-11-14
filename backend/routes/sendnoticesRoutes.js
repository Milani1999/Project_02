const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const sendnoticesController = require("../controllers/sendnoticesController");

router.post("/create", sendnoticesController.createNotice);

router.get("/", sendnoticesController.getSentNotices);

router.get("/grade/:grade", sendnoticesController.getNoticesByGrade);

router.delete("/:id", sendnoticesController.deleteNotice);

router.get("/staff/:staff", sendnoticesController.getSentNoticesByStaff);

module.exports = router;

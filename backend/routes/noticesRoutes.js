const express = require("express");
const router = express.Router();
const noticesController = require("../controllers/noticesController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.post("/create", upload.single("file"), noticesController.createNotice);


// Route to get teacher notices
router.get("/get", noticesController.getTeacherNotices);
module.exports = router;

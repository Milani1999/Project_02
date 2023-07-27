const express = require("express");
const router = express.Router();
const noticesController = require("../controllers/noticesController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/api/notices", upload.single("file"), noticesController.createNotice);

module.exports = router;

const express = require("express");
const recordController = require("./../controllers/recordController");
const authController = require("./../controllers/authController");
const multer = require('multer');
const upload = multer({ dest: '/tmp/' });

const router = express.Router();

router.get("/", authController.protect, recordController.getRecordData);

router.post("/", authController.protect, recordController.updateRecordData);

router.delete("/", authController.protect, recordController.deleteRecordData);

router.post("/import",authController.protect,upload.single('record'),recordController.importRecordData)

module.exports = router;

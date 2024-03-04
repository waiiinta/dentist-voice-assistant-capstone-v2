import express from "express"
import recordController from "../controllers/recordController.js"
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", auth, recordController.getRecordData);

router.post("/", auth, recordController.updateRecordData);

router.delete("/", auth, recordController.deleteRecordData);

export default router
router.post("/import",authController.protect,upload.single('record'),recordController.importRecordData)

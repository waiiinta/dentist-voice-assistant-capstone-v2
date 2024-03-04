import express from "express"
import recordController from "../controllers/recordController.js"
import { auth } from "../middleware/auth.middleware.js";
import multer from "multer";

const router = express.Router();

router.get("/", auth, recordController.getRecordData);

router.post("/", auth, recordController.updateRecordData);

router.delete("/", auth, recordController.deleteRecordData);

const upload = multer({ dest: '/tmp/' })
router.post("/import",auth,upload.single('record'),recordController.importRecordData)


export default router

import express from "express";
import userController from "./../controllers/userController.js";
import authController from "./../controllers/authController.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/checkToken", auth, (req, res) => {
  res.status(200).json({
    status: "success",
    user_id: req.user._id
  });
});

router.patch(
  "/updateProfile",
  auth,
  userController.updateProfile
);

router.patch(
  "/updatePassword",
  auth,
  authController.updatePassword
);

router.get("/userInfo", auth, authController.getUserInfo);

router.post("/sendFile", auth, authController.sendFile);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.post("/sendEmailConfirm", authController.sendEmailConfirm);
router.patch("/activateAccount/:token", authController.activateAccount);

router.post("/sendReportExcel", authController.sendReportExcel);

export default router

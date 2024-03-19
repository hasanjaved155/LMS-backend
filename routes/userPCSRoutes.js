import express from "express";
import {
  getPCSAllUsers,
  getPCSForgetPassword,
  getPCSResetPassword,
  getPCSUser,
  loginPCSController,
  registerPCSController,
} from "../controllers/authPCSController.js";

const router = express.Router();

router.post("/register-pcs", registerPCSController);

router.post("/login-pcs", loginPCSController);

router.get("/users-pcs", getPCSAllUsers);

router.get("/users-pcs/:id", getPCSUser);

router.post("/forgot-password", getPCSForgetPassword);
router.post("/reset-password/:id/:token", getPCSResetPassword);

export default router;

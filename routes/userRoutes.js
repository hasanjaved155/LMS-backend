import express from "express";
import {
  getAllUsers,
  getForgetPassword,
  getResetPassword,
  loginController,
  registerController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/users", getAllUsers);

router.post("/forgot-password", getForgetPassword);
router.post("/reset-password/:id/:token", getResetPassword);

export default router;

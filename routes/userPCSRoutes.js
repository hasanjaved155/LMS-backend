import express from "express";
import {
  getPCSAllUsers,
  getPCSForgetPassword,
  getPCSResetPassword,
  getPCSUser,
  loginPCSController,
  registerPCSController,
  updateUser,
} from "../controllers/authPCSController.js";

const router = express.Router();

router.post("/register-pcs", registerPCSController);

router.post("/login-pcs", loginPCSController);

router.get("/users-pcs", getPCSAllUsers);

router.get("/users-pcs/:_id", getPCSUser);

//update user
router.put('/users-pcs/:id', updateUser);

router.post("/forgot-password", getPCSForgetPassword);
router.post("/reset-password/:id/:token", getPCSResetPassword);

export default router;

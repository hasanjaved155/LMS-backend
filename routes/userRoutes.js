import express from "express";
import { getAllUsers, loginController, registerController } from "../controllers/authController.js";


const router = express.Router();

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/users', getAllUsers);




export default router;


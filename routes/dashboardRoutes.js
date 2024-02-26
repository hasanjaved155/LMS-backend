import express from "express";
import { createdashboardController, getDashboardController } from "../controllers/dashboardController.js";
const router = express.Router();


router.post('/create-dashboard', createdashboardController);
router.get('/get-dashboard', getDashboardController);



export default router;
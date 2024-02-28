import express from "express";
import { createdashboardController, getDashboardController } from "../controllers/dashboardController.js";

import cloudinary from "cloudinary"
import ExpressFormidable from "express-formidable"
const router = express.Router();

cloudinary.config({
    cloud_name: 'dalfbjhy3',
    api_key: '533168436212999',
    api_secret: '5F5darjLiIxnuxadrupUkQW7XIc'
});

router.post('/create-dashboard', createdashboardController);
router.get('/get-dashboard', getDashboardController);
//router.get("/search/:keyword", getSearchDashboard);

router.post("/upload", ExpressFormidable({ maxFieldsSize: 5 * 2024 * 2024 }), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })

    } catch (error) {
        console.error(error.message);
    }
})



export default router;
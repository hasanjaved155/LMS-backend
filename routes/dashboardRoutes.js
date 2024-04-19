import express from "express";
import { createdashboardController, getDashboardController } from "../controllers/dashboardController.js";

import cloudinary from "cloudinary"
import ExpressFormidable from "express-formidable"
import dashboardModel from "../models/dashboardModel.js";
import userModel from "../models/userPCSModel.js";
const router = express.Router();

cloudinary.config({
    cloud_name: 'dalfbjhy3',
    api_key: '533168436212999',
    api_secret: '5F5darjLiIxnuxadrupUkQW7XIc'
});

router.post('/create-dashboard', createdashboardController);
router.get('/get-dashboard', getDashboardController);
//router.get("/search/:keyword", getSearchDashboard);

router.post("/assignments", async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if course exists
        const course = await dashboardModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (!user.assignedCourses) {
            user.assignedCourses = [];
        }
        // Check if the course is already assigned to the user
        if (user.assignedCourses.includes(courseId)) {
            return res
                .status(400)
                .json({ message: "Course is already assigned to the user" });
        }
        user.assignedCourses.push(courseId);
        await user.save();

        const courses = user.assignedCourses;

        //await user.populate("assignedCourses").execPopulate();
        res.status(201).send({
            success: true,
            message: "courses Assigned successfully",
            courses,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// Route to get assigned courses for a user
router.get("/:id/assigned-courses", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId).populate("assignedCourses");
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const course = user.assignedCourses;

        res.status(200).send({
            success: true,
            message: "Fetched course successfully",
            course,
        });
    } catch (error) {
        console.error("Error fetching assigned courses:", error);
        res.status(500).json({ message: "Error fetching assigned courses" });
    }
});


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
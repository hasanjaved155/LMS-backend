// festival-offers-backend/routes/festivals.js

import express from "express";
const router = express.Router();
import Festival from "../models/Festival.js";
// GET all festivals
router.get('/', async (req, res) => {
    try {
        const festivals = await Festival.find();
        res.json(festivals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET today's festival
router.get('/today', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const festival = await Festival.findOne({ date: today });

        if (festival) {
            res.status(201).send({
                success: true,
                message: "today's festival set successfully",
                festival
            });
        } else {
            res.json({ message: 'No festival today' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new festival
router.post('/create-festival', async (req, res) => {
    const { name, date, couponCode } = req.body;

    try {
        const newFestival = new Festival({ name, date, couponCode });
        await newFestival.save();
        res.status(201).send({
            success: true,
            message: "festival created successfully",
            newFestival
        }); // Return the newly created festival
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating festival",
            error,
        });
    }
});

export default router;

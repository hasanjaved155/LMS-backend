import express from "express";

import TeachPCS360 from "../models/TeachPCS360.js";
import InstructorFormModel from "../models/InstructorFormModel.js";

const router = express.Router();

router.post('/teachpcs360', async (req, res) => {
    try {
        const { email, phone, domain, country, message } = req.body;
        // console.log(domain);
        // Find the registration document by ID
        const user = await TeachPCS360.findOne({ email });
        if (user) {
            return res.status(201).send({ success: false, message: "email already exist" });
        }
        const pcs360 = new TeachPCS360({
            email, phone, domain, country, message
        });
        // console.log(pcs360)

        await pcs360.save();

        res.status(201).send({
            success: true,
            message: "send details successfully",
            pcs360,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Details",
            error,
        });
    }

});

router.get('/checkInstructor/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await TeachPCS360.findOne({ email: email });
        if (user) {
            res.status(201).send({
                success: true,
                isInstructor: true
            });

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/instructorform', async (req, res) => {
    const { email, learn, requirements, courseTarget } = req.body;

    try {
        const newForm = new InstructorFormModel({
            email,
            learn,
            requirements,
            courseTarget
        });

        const form = await newForm.save();
        res.status(201).send({
            success: true,
            message: "Details sends successfully",
            form
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
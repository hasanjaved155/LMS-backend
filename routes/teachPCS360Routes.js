import express from "express";

import TeachPCS360 from "../models/TeachPCS360.js";

const router = express.Router();

router.post('/teachpcs360', async (req, res) => {
    try {
        const { email, phone, domain } = req.body;
        // console.log(domain);
        // Find the registration document by ID
        const user = await TeachPCS360.findOne({ email });
        if (user) {
            return res.status(201).send({ success: false, message: "email already exist" });
        }
        const pcs360 = new TeachPCS360({
            email, phone, domain
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

export default router;
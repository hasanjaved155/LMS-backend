import express from "express";
import userPCSModel from "../models/userPCSModel.js";
import EmployeePCSInformation from "../models/EmployeePCSInformation.js";

const router = express.Router();

router.post('/designation/:userId', async (req, res) => {
    try {

        const { userId } = req.params;
        const { designation, domain } = req.body;
        // Find the registration document by ID
        const user = await userPCSModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }



        const EmployeeInformation = new EmployeePCSInformation({
            designation, domain
        });
        await EmployeeInformation.save();

        // Push the designation into the registration's designations array
        user.employeeDetails.push(EmployeeInformation._id);

        // Save the updated registration document
        await user.save();
        res.status(201).send({
            success: true,
            message: "Employee Details Updated",
            EmployeeInformation,
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


router.get("/:_id/employee_Details", async (req, res) => {
    const { _id } = req.params;

    try {
        const user = await userPCSModel.findById(_id).populate("employeeDetails");
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const details = user.employeeDetails;
        // console.log(details);

        res.status(200).send({
            success: true,
            message: "Fetched Details successfully",
            details,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Error fetching Details" });
    }
});


export default router;
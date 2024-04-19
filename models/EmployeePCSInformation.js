import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        designation: {
            type: String,
            required: true,
            trim: true,
        },
        domain: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("employeeinformation", userSchema);

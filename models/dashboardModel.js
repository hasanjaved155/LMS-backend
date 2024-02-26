import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })



export default mongoose.model('dashboards', userSchema);

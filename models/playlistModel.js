import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    listId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    lecId: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })



export default mongoose.model('playlist', userSchema);

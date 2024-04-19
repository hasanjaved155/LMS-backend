// src/models/Festival.js
import mongoose from 'mongoose';

const festivalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    couponCode: {
        type: String,
        required: true
    }
});

export default mongoose.model('Festival', festivalSchema);


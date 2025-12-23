const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    file: {
        filename: String,
        mimetype: String,
        size: Number,
        path: String,     // or url
        uploadedAt: { type: Date, default: Date.now }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
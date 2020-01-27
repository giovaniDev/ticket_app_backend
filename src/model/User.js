const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    document_id: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const DigitalCardEntry = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    typePlan: {
        type: String,
        required: true
    },
    expireIn: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Card', DigitalCardEntry);


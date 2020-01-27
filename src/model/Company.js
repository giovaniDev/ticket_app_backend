const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
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
    },
    adress: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);


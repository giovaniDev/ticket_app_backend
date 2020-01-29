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
    },
    thumbnail: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

CompanySchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.0.12:3000/files/${this.thumbnail}`
})

module.exports = mongoose.model('Company', CompanySchema);


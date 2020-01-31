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
    },
    thumbnail: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

UserSchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.0.12:3000/files/${this.thumbnail}`
})

module.exports = mongoose.model('User', UserSchema);


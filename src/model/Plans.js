const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    typePlan: {
        type: String,
        required: true
    },
    timePlan: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', PlanSchema);


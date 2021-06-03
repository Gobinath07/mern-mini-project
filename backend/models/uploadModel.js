const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    Foodname: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Zip: {
        type: Number,
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    files: [Object]
}, { timestamps: true });

const UploadModel = mongoose.model('post', uploadSchema);

module.exports = UploadModel;
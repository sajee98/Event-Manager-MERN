const mongoose = require('mongoose');


const VendorSchema = new mongoose.Schema({
    image: {type: String, required: true},
    status: {type: String, required: true},
    date: {type: Date, default: Date.now},
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('vendor', VendorSchema);
// -----------------------------
// models/Vendor.js
// -----------------------------

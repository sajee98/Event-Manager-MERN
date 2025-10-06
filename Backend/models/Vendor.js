
const mongoose = require('mongoose');


const VendorSchema = new mongoose.Schema({
    image: {type: String, required: true},
    images: [String],
    category: {type: String, required: true},
    vendorName: {type: String, required: true},
    vendorAddress: {type: String, required: true},
    title: {type: String, required: true},
    aboutUs: {type: String, required: true},
    phoneNo: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Vendor', VendorSchema);
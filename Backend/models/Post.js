
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    category: { type: String, required: true },
    shortDes: { type: String },
    location: { type: String },
    phoneNo: { type: String },
    email: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    facebook: { type: String },
    logo: { type: String }, // filename
    photos: [{ type: String }], // filenames
    videos: [{ type: String }], // filenames
    images: [{ type: String }], // alias for photos (backwards compatibility)
    aboutUs: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Vendor || mongoose.model('post', PostSchema);
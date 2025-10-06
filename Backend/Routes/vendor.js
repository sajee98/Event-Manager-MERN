const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//GET all vendors
router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET vendors by category
router.get('/category/:category', async (req, res) => {
    try {
        const vendors = await Vendor.find({ category: req.params.category });
        if (!vendors.length) {
            return res.status(404).json({ message: 'No vendors found for this category' });
        }
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//GET vendor by ID
router.get('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // auto create if missing
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


//CREATE a new vendor
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.filename);

    const vendor = new Vendor({
      image: req.body.image,
      category: req.body.category,
      vendorName: req.body.vendorName,
      vendorAddress: req.body.vendorAddress,
      title: req.body.title,
      aboutUs: req.body.aboutUs,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      images: imagePaths,
    });

    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.use("/uploads", express.static("uploads"));

//UPDATE a vendor
router.put('/:id', async (req, res) => {    
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        } 
        vendor.image = req.body.image || vendor.image;
        vendor.category = req.body.category || vendor.category;
        vendor.vendorName = req.body.vendorName || vendor.vendorName;
        vendor.vendorAddress = req.body.vendorAddress || vendor.vendorAddress;
        vendor.title = req.body.title || vendor.title;
        vendor.aboutUs = req.body.AboutUs || vendor.aboutUs;
        vendor.phoneNo = req.body.phoneNo || vendor.phoneNo;
        vendor.email = req.body.email || vendor.email;
        vendor.updatedAt = new Date();
        const updatedVendor = await vendor.save();
        res.status(200).json(updatedVendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//DELETE a vendor
router.delete('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
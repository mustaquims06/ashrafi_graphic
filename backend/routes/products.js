const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// ✅ Create product
router.post("/", verifyToken, verifyAdmin, upload.array("images", 4), async (req, res) => {
  try {
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }).end(file.buffer);
            })
        )
      );
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      sku: req.body.sku,
      brand: req.body.brand,
      sizes: req.body.sizes ? req.body.sizes.split(",") : [],
      offer: req.body.offer,
      images: uploadedImages.map((u) => ({ url: u.secure_url, public_id: u.public_id })),
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid product ID" });
  }
});

// ✅ Update product
router.put("/:id", verifyToken, verifyAdmin, upload.array("images", 4), async (req, res) => {
  try {
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }).end(file.buffer);
            })
        )
      );
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sku: req.body.sku,
        brand: req.body.brand,
        sizes: req.body.sizes ? req.body.sizes.split(",") : [],
        offer: req.body.offer,
        images: uploadedImages.length
          ? uploadedImages.map((u) => ({ url: u.secure_url, public_id: u.public_id }))
          : undefined, // keep existing if none uploaded
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete product (and images from Cloudinary)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // delete images from cloudinary
    if (product.images && product.images.length > 0) {
      await Promise.all(product.images.map((img) => cloudinary.uploader.destroy(img.public_id)));
    }

    await product.deleteOne();
    res.json({ message: "✅ Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

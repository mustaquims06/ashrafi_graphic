// controllers/productController.js
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // admin sees all products
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, createdBy: req.user._id });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to save product" });
  }
};

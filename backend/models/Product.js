// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    sku: { type: String },
    brand: { type: String },
    sizes: [{ type: String }], // array of sizes

    // ✅ Store image objects instead of plain strings
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    offer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

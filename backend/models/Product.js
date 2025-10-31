// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, index: true },
  image: { type: String },
  stock: { type: Number, default: 100 },
  sku: { type: String, unique: true, sparse: true },
  sourceId: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);

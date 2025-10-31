// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  shippingAddress: { type: String },
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending","processing","shipped","delivered","cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["unpaid","paid","refunded"], default: "unpaid" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

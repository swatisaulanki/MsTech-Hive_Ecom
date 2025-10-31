// controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrderFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty" });

    let total = 0;
    const items = [];
    for (const it of cart.items) {
      if (it.product.stock < it.qty) return res.status(400).json({ message: `Insufficient stock: ${it.product.title}` });
      items.push({ product: it.product._id, qty: it.qty, price: it.product.price });
      total += it.product.price * it.qty;
      it.product.stock -= it.qty;
      await it.product.save();
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress: req.body.shippingAddress || req.user.address || "",
      total,
      paymentStatus: req.body.paymentStatus || "unpaid"
    });
    await order.save();
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product", "title price image");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminGetOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product", "title price");
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const statusCounts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});
    res.json({ totalOrders: orders.length, totalRevenue, statusCounts, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminUpdateOrder = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Not found" });
    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

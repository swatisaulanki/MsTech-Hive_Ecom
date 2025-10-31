import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Create order from user's cart
export const createOrderFromCart = async (req, res) => {
  try {
    // Fetch user's cart with populated product info
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Your cart is empty." });

    let total = 0;
    const orderItems = [];

    for (const it of cart.items) {
      // Check stock availability
      if (it.product.stock < it.qty) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${it.product.title}` });
      }

      // Push order item
      orderItems.push({
        product: it.product._id,
        title: it.product.title,
        quantity: it.qty,
        price: it.product.price,
        image: it.product.image,
      });

      // Calculate total and update product stock
      total += it.product.price * it.qty;
      it.product.stock -= it.qty;
      await it.product.save();
    }

    // Create new order
    const order = new Order({
      user: req.user._id,
      orderItems, 
      shippingAddress: req.body.shippingAddress || req.user.address || {},
      totalPrice: total, 
      paymentMethod: req.body.paymentMethod || "COD",
      isPaid: req.body.isPaid || false,
      status: "Pending",
    });

    // Save order and clear cart
    await order.save();
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

// Get all orders for the logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "title price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

//  Admin: Get all orders with stats
export const adminGetOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "title price image");

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const statusCounts = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalOrders: orders.length,
      totalRevenue,
      statusCounts,
      orders,
    });
  } catch (err) {
    console.error("Error fetching admin orders:", err);
    res.status(500).json({ message: "Server error while fetching admin orders" });
  }
};

// Admin: Update order status or payment
export const adminUpdateOrder = async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status) order.status = status;
    if (typeof isPaid === "boolean") {
      order.isPaid = isPaid;
      if (isPaid) order.paidAt = Date.now();
    }

    await order.save();
    res.json({ success: true, message: "Order updated", order });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error while updating order" });
  }
};

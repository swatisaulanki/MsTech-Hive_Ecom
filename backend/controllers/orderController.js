import Order from "../models/orderModel.js";

export const addOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // Validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddress || !totalPrice) {
      return res.status(400).json({ message: "Missing shipping details or total price" });
    }

    // Create the order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

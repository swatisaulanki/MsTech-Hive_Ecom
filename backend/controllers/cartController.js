// controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) cart = { user: req.user._id, items: [] };
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: "Product required" });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < qty) return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [{ product: product._id, qty }] });
    } else {
      const idx = cart.items.findIndex(it => it.product.equals(product._id));
      if (idx > -1) cart.items[idx].qty += Number(qty);
      else cart.items.push({ product: product._id, qty });
    }
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId) return res.status(400).json({ message: "Product required" });
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const idx = cart.items.findIndex(it => it.product.equals(productId));
    if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

    if (qty <= 0) cart.items.splice(idx, 1);
    else cart.items[idx].qty = qty;

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

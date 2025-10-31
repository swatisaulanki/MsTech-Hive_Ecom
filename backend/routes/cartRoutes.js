// routes/cartRoutes.js
import express from "express";
import { getCart, addToCart, updateCartItem, clearCart } from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartItem);
router.delete("/", protect, clearCart);

export default router;

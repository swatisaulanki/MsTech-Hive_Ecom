import express from "express";
import { protect } from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

// Protected routes — only accessible if logged in
router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:id", protect, removeFromCart);

export default router;

import express from "express";
import { addOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create a new order
router.post("/add", protect, addOrder);

export default router;

// routes/orderRoutes.js
import express from "express";
import {
  createOrderFromCart, getMyOrders, adminGetOrders, adminUpdateOrder
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js"

const router = express.Router();

router.post("/", protect, createOrderFromCart);
router.get("/my", protect, getMyOrders);

router.get("/", protect, authorizeRoles("admin"), adminGetOrders);
router.put("/:id", protect, authorizeRoles("admin"), adminUpdateOrder);

export default router;

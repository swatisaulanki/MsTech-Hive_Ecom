// routes/productRoutes.js
import express from "express";
import {
  listProducts, getProduct, createProduct, updateProduct, deleteProduct, importFromAPI
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProduct);

router.post("/", protect, authorizeRoles("admin"), createProduct);
router.put("/:id", protect, authorizeRoles("admin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

router.post("/sync-from-api", protect, authorizeRoles("admin"), importFromAPI);

export default router;

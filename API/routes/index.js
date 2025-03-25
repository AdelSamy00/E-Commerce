import express from "express";
import authRoutes from "./AuthRoutes.js";
import productRoutes from "./ProductRoutes.js";
import categoryRoutes from "./CategoryRoutes.js";
import brandRoutes from "./BrandRoutes.js";
import cartRoutes from "./CartRoutes.js";
import orderRoutes from "./OrderRoutes.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/products", productRoutes);
router.use("/api/v1/categories", categoryRoutes);
router.use("/api/v1/brands", brandRoutes);
router.use("/api/v1/carts",authMiddleware, cartRoutes);
router.use("/api/v1/orders",authMiddleware, orderRoutes);


export default router;
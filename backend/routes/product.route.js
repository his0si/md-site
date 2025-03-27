import express from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts); // 전체 상품 목록 조회
router.get("/:id", getProductById); // 개별 상품 조회

export default router;

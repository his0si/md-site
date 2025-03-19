import express from "express";
import { addProductInCart, getUserCart } from "../controllers/shoppingcart.controller.js";

const router = express.Router();

router.post("/cart", addProductInCart);
router.get("/cart", getUserCart);

export default router;
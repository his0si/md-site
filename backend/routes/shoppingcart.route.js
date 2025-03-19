import express from "express";
import { addProductInCart, getUserCart, increaseProductQuantity } from "../controllers/shoppingcart.controller.js";

const router = express.Router();

router.post("/cart", addProductInCart);
router.get("/cart", getUserCart);
router.patch("/cart/increase", increaseProductQuantity);

export default router;
import express from "express";
import { addProductInCart } from "../controllers/shoppingcart.controller.js";

const router = express.Router();

router.post("/cart", addProductInCart);

export default router;
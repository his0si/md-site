import express from "express";
import { addProductInCart, decreaseProductQuantity, getUserCart, increaseProductQuantity } from "../controllers/shoppingcart.controller.js";
import { checkAuthentication } from "../middleware/checkAuthentication.js";

const router = express.Router();

router.post("/cart", checkAuthentication, addProductInCart);
router.get("/cart", checkAuthentication, getUserCart);
router.patch("/cart/increase", checkAuthentication, increaseProductQuantity);
router.patch("/cart/decrease", checkAuthentication, decreaseProductQuantity);

export default router;
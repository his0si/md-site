import express from "express";
import { getProductThumnail } from "../controllers/introduction.controller.js";

const router = express.Router();

router.get("/product-image", getProductThumnail);

export default router;
import express from "express";
import { getOrderCheck } from "../controllers/ordercheck.controller.js";
const router = express.Router();  // router 선언

router.get("/OrderCheck", getOrderCheck);

export default router;
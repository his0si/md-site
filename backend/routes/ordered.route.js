import express from "express";
import { createOrdered } from "../controllers/formpost.controller.js";
const router = express.Router();  // router 선언

router.post("/Ordered",createOrdered)

export default router;
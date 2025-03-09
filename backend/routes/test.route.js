import express from "express";
import { getTest } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/good-day", getTest);

export default router;
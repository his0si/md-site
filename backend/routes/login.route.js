import express from "express";
import { getAuthorizaionCode, kakaoLogin, signup} from "../controllers/login.controller.js";

const router = express.Router();

router.get("/authorize", getAuthorizaionCode);
router.get("/kakao-login", kakaoLogin);
router.post("/signup",signup);

export default router;
import express from "express";
import { getAuthorizaionCode, kakaoLogin, signup, logout, withdraw} from "../controllers/login.controller.js";

const router = express.Router();

router.get("/authorize", getAuthorizaionCode);
router.get("/kakao-login", kakaoLogin);
router.post("/signup",signup);

// login 안 한 사용자가 접근할 경우 401 error
router.post("/logout", checkAuthentication, logout);
router.delete("/withdraw", checkAuthentication, withdraw);

export default router;
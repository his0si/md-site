import dotenv from "dotenv";
import axios from "axios";
import User from './../models/user.model.js';

dotenv.config();

// 카카오 로그인 - 인가 코드 받기

/**
 * @swagger
 * /api/login/authorize:
 *   get:
 *     summary: "카카오 로그인 - 인가 코드 받기"
 *     description: "카카오 로그인에 필요한 인가 코드를 카카오 로그인 페이지로 리다이렉트합니다."
 *     tags:
 *       - "Login"
 *     responses:
 *       302:
 *         description: "카카오 로그인 페이지로 리다이렉트"
 */
export const getAuthorizaionCode = async (req, res) =>{
    const CLIENT_ID = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return res.status(200).json({kakaoAuthUrl}); // 해당 uri로 redirect하기기
};

// 카카오 로그인 - 엑세스 토큰 받기
const requestAccessToken = async (code)=>{

    const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    try{
        const tokenResponse = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
                params:{
                    "grant_type" : "authorization_code",
                    "client_id" : KAKAO_REST_API_KEY,
                    "redirect_uri" : REDIRECT_URI,
                    code,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                  },
            }
        );

        const accessToken = tokenResponse.data.access_token;
        return accessToken;
    }catch(error){
        console.error("❌ kakao 엑세스 토큰 받기 실패 : ", error);
        return res.status(500).json({"message" : "카카오에서 엑세스 토큰 받기가 실패했습니다!",
            
        });
    }
};

// 카카오에서 액세스 토큰을 통해 회원정보(이메일) 받기 
const getUserEmail = async (accessToken) => {
    try {
        console.log("Access Token : ", accessToken);

        const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              "Authorization": `Bearer ${accessToken}`
            },
          });
          console.log(userResponse);
          const email = userResponse.data.kakao_account.email;
          console.log("✨ 사용자의 이메일 : ", email);
          return email;
    } catch (error) {
        console.error("❌ 액세스 토큰으로 이메일 받기 실패:", error);
        return res.status(500).json({ message: "서버 오류 발생" });
    }
}

// 카카오 로그인


/**
 * @swagger
 * /api/login/kakao-login:
 *   get:
 *     summary: "카카오 로그인"
 *     description: "카카오 로그인 후, 인가 코드로 엑세스 토큰을 얻고 이메일로 회원 정보 확인"
 *     tags:
 *       - "Login"
 *     parameters:
 *       - name: code
 *         in: query
 *         description: "카카오 인가 코드"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: "로그인 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공 😁"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       200:
 *         description: "학번 입력 페이지로 이동"
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "학번 입력 페이지로 이동"
 *                 email:
 *                   type: string
 *                   example: "ewha@ewha.ac.kr"
 *       400:
 *         description: "인가 코드 없음"
 *       500:
 *         description: "서버 오류"
 */
export const kakaoLogin = async (req, res)=>{
    const code = req.query.code;
    
    if(!code){
        return res.status(400).json({"message": "Authorizaion code가 없습니다.😅"});
    }

    try {
        // 인가코드로 액세스 토큰 받아오기
        const accessToken = await requestAccessToken(code);

        // 액세스 토큰으로 이메일 받아오기
        const email = await getUserEmail(accessToken);

        // DB에 해당 user 있는지 확인
        const user = await User.findOne({email});

        // DB에 해당 User 있으면, 이미 회원가입 된 상태이므로 세션에 해당 회원 저장 (로그인)
        if(user){
            req.session.user = {
                "id": user._id,
                "email": user.email
            };

            return res.status(201).json({
                "message" : "로그인 성공 😁"
            });
        } else {
            req.session.user={email}; // session에 이메일 저장
            console.log("신규 회원 세션 저장됨:", req.session.user);
            return res.status(200).json({ // DB에 해당 User가 없으면, 이제 회원가입해야 하므로 온보딩 페이지(학번 입력 페이지)로 이동 해야됨..
                "message" : "학번 입력 페이지로 이동",
            });
        }
    } catch (error) {
        console.error("❌ 로그인 실패:", error);
        return res.status(500).json({ message: "서버 오류 발생" });
        
    }
}

// 회원가입 - 온보딩 페이지에서 회원가입 눌렀을 때

/**
 * @swagger
 * /api/login/signup:
 *   post:
 *     summary: "회원가입"
 *     description: "카카오 로그인 후, 온보딩 페이지에서 학번 입력으로 회원가입 처리"
 *     tags:
 *       - "Login"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: "사용자의 학번"
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: "회원가입 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공 😁"
 *       400:
 *         description: "이메일과 학번이 필요"
 *       500:
 *         description: "서버 오류"
 */
export const signup = async (req, res)=>{
    // 프론트엔드에서 준 email과 학번 저장 
    const { studentId} = req.body;
    
    // 학번 미입력 시 400 error
    if(!studentId){
        return res.status(400).json({
            "message" : "학번이 필요해요 😅"
        });
    }

    try {
        
        console.log(req.session.user);
        const userEmail = req.session.user?.email;
        console.log(userEmail);

        // 이미 존재하는 회원은 이전에 확인해서 굳이 필요 없을 듯!
        const existingUser = await User.findOne({email : userEmail});
        if(existingUser){
            return res.status(409).json({
                "message" : "이미 가입된 이메일입니다!"
            });
        }

        if(!userEmail){
            console.log(req.session);
            console.error("세션에 저장된 이메일이 없습니다.");
            return res.status(404).json({
                "message" : "세션에 저장된 이메일 없음"
            });
        }
        // 새 유저 모델 만들어줌
        const newUser = new User({
            "email" : userEmail,
            studentId
        });

        // 저장 ㄱㄱㄱ
        await newUser.save();

        // session에 회원가입한 유저 정보 저장함!
        req.session.user = {
            id: newUser._id,
            email: newUser.email
        };

        return res.status(201).json({
            "message" : "회원가입 성공 😁"
        });

    } catch (error) {
        console.error("회원가입 실패");
        return res.status(500).json({
            "message" : "회원가입 실패",
            "error": error.message 
        })
    }
}
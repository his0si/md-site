import mongoose from "mongoose";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

/**
 * @swagger
 * /api/ordered:
 *   post:
 *     summary: "주문 생성"
 *     description: "로그인된 사용자가 상품들을 주문합니다."
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: "전화번호"
 *                 example: "010-1234-5678"
 *               products:
 *                 type: array
 *                 description: "주문한 상품 목록"
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       format: objectId
 *                       description: "상품의 MongoDB ObjectId"
 *                       example: "6601038c0a4f51f729c56ef4"
 *                     productName:
 *                       type: string
 *                       example: "이화 텀블러"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 8000
 *                     thumbnailImage:
 *                       type: string
 *                       example: "https://cdn.example.com/image.jpg"
 *               totalPrice:
 *                 type: number
 *                 description: "전체 상품 가격 합계"
 *                 example: 16000
 *     responses:
 *       201:
 *         description: "주문 생성 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "주문이 들어갔으며, 결제확인중입니다."
 *                 orderId:
 *                   type: string
 *                   description: "생성된 주문의 ObjectId"
 *                   example: "647ac56e9f0e2a0012d34abc"
 *       401:
 *         description: "로그인이 필요합니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인이 필요합니다."
 *       404:
 *         description: "db에 유저 정보가 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  "유저 정보가 없습니다."
 *       500:
 *         description: "서버 에러 또는 주문 생성 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "주문 생성 실패"
 *                 error:
 *                   type: string
 *                   example: "에러 메시지 예시"
 */

export const createOrdered = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    //session에 저장된 userId 정보로 db에 있는 user정보(studentId) 가져오기
    const userId = req.session.user.id;
    const db_user = await User.findById(userId);
    //만약 db에 user 정보가 없다면
    if (!db_user) {
      return res.status(404).json({ message: "유저 정보가 없습니다." });
    }
    const db_studentId = db_user.studentId;

    //front에서 받아옴
    const { products, totalPrice, phone } = req.body;

    //mongoose object타입으로 바꿔줘야함
    const convertedProducts = products.map((product) => ({
      productId: new mongoose.Types.ObjectId(product.productId),
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      thumbnailImage: product.thumbnailImage,
    }));

    const newOrder = new Order({
      user: {
        userId: db_user._id,
        studentId: db_studentId,
        phone: phone,
      },
      products: convertedProducts, //  변환된 배열 사용
      totalPrice,
      status: "결제완료",
    });

    await newOrder.save();

    return res.status(201).json({
      message: "주문이 들어갔으며, 결제확인중입니다.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("주문 생성 실패:", error);
    return res.status(500).json({
      message: "주문 생성 실패",
      error: error.message,
    });
  }
};

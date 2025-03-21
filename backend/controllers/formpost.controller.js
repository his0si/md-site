import mongoose from "mongoose";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

/**

 * @swagger
 * /api/ordered:
 *   post:
 *     summary: "주문하기"
 *     description: "로그인된 사용자가 상품들을 주문함."
 *     tags:
 *       - "order"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 description: "주문한 상품들의 정보 배열"
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: "상품의 ObjectId"
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
 *                 description: "상품들의 총 가격"
 *                 example: 16000
 *               nickname:
 *                 type: string
 *                 description: "주문자 닉네임"
 *                 example: "김이화"
 *               studentId:
 *                 type: number
 *                 description: "주문자 학번"
 *                 example: 20231234
 *               phone:
 *                 type: string
 *                 description: "주문자 연락처"
 *                 example: "010-1234-5678"
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
 *                   example: "주문이 성공적으로 생성되었습니다."
 *                 orderId:
 *                   type: string
 *                   example: "647ac56e9f0e2a0012d34abc"
 *       401:
 *         description: "로그인이 필요합니다."
 *       500:
 *         description: "서버 오류"
 */
export const createOrdered = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const userId = new mongoose.Types.ObjectId(req.session.user.id);

    //프론트에서 정보를 받는걸로 했는데 이게 맞을까요....?
    const {
      products,      
      totalPrice,
      nickname,
      studentId,
      phone
    } = req.body;

    //mongoose object타입으로 바꿔줘야함
    const convertedProducts = products.map(product => ({
      productId: new mongoose.Types.ObjectId(product.productId),
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      thumbnailImage: product.thumbnailImage
    }));

    const newOrder = new Order({
      user: {
        userId,
        nickname,
        studentId,
        phone
      },
      products: convertedProducts, //  변환된 배열 사용
      totalPrice,
      status: "결제확인중"
    });

    await newOrder.save();

    return res.status(201).json({
      message: "주문이 들어갔으며, 결제확인중입니다.",
      orderId: newOrder._id
    });
  } catch (error) {
    console.error("주문 생성 실패:", error);
    return res.status(500).json({
      message: "주문 생성 실패",
      error: error.message
    });
  }
};
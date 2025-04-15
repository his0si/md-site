import mongoose from "mongoose";
import Order from "../models/order.model.js"; // Order 모델 임포트
/**
 * @swagger
 * /api/ordercheck:
 *   get:
 *     summary: 주문확인창
 *     description: "결제완료, 수령완료 된 상품들만 띄우기"
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: 성공적으로 메시지를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productName:
 *                     type: string
 *                     example: "이화상품"
 *                   price:
 *                     type: number
 *                     example: 5000
 *                   thumbnailImage:
 *                     type: string
 *                     example: "썸네일 URL"
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "주문 확인이 실패되었습니다."
 */
export const getOrderCheck = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const userId = new mongoose.Types.ObjectId(req.session.user.id);
    //console.log(userId);
    // 주문내역 조회: 해당 아이디를 가진 사람의 결제완료,수령완료 제품을 모음
    const orders = await Order.find({
      "user.userId": userId,
      status: { $in: ["결제확인중", "결제완료", "수령완료"] },
    }).select("products");

    // products 배열에서 productName, price, thumbnailImage만 추출
    const products = orders.flatMap((order) =>
      order.products.map((product) => ({
        productName: product.productName,
        price: product.price,
        thumbnailImage: product.thumbnailImage,
      }))
    );

    //주문한 상품이 없을 경우
    if (products.length === 0) {
      return res.status(404).json({ message: "주문이 없습니다" });
    }
    //주문한 상품을 json으로 띄움
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

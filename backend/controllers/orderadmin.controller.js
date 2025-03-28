import Order from '../models/orderModel.js'; // 모델 파일 경로에 맞게 수정

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: "모든 주문 목록 조회"
 *     description: "모든 주문 목록을 조회하여 간결하게 필요한 정보만 반환"
 *     tags:
 *       - "Orders"
 *     responses:
 *       200:
 *         description: "주문 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       nickname:
 *                         type: string
 *                         example: "홍길동"
 *                       studentId:
 *                         type: string
 *                         example: "12345678"
 *                       phone:
 *                         type: string
 *                         example: "010-1234-5678"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productName:
 *                           type: string
 *                           example: "상품 이름"
 *                         price:
 *                           type: number
 *                           example: 10000
 *                         thumbnailImage:
 *                           type: string
 *                           example: "http://example.com/thumbnail.jpg"
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                   totalPrice:
 *                     type: number
 *                     example: 20000
 *                   status:
 *                     type: string
 *                     example: "결제완료"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-24T12:34:56Z"
 *       500:
 *         description: "서버 오류"
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user.userId', 'nickname studentId phone') // userId 참조된 정보 가져오기
      .populate('products.productId', 'productName price thumbnailImage'); // productId 참조된 정보 가져오기

    // 응답 시 불필요한 필드를 제외하고, 간결하게 필요한 정보만 반환
    const simplifiedOrders = orders.map(order => ({
      user: {
        nickname: order.user.nickname,
        studentId: order.user.studentId,
        phone: order.user.phone,
      },
      products: order.products.map(product => ({
        productName: product.productId.productName,
        price: product.productId.price,
        thumbnailImage: product.productId.thumbnailImage,
        quantity: product.quantity,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));

    res.status(200).json(simplifiedOrders);
  } catch (error) {
    console.error('주문 목록 조회 실패:', error);
    res.status(500).json({ message: '서버 오류로 주문 목록을 가져올 수 없습니다.' });
  }
};

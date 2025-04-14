// orderadmin.controller.js
import Order from '../models/order.model.js';

/**
 * @swagger
 * /api/orderadmin:
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
 *                   orderId:
 *                     type: string
 *                     example: "603dcd8f1c4ae12345abcd67"
 *                   user:
 *                     type: object
 *                     properties:
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
 *                   received:
 *                     type: boolean
 *                     example: false
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
      .populate('user.userId', 'studentId phone')
      .populate('products.productId', 'productName price thumbnailImage');

    const simplifiedOrders = orders.map(order => ({
      orderId: order._id,
      user: {
        studentId: order.user.userId?.studentId || order.user.studentId || '',
        phone: order.user.userId?.phone || order.user.phone || '',
      },
      products: order.products.map(product => ({
        productName: product.productId?.productName || product.productName,
        price: product.productId?.price || product.price,
        thumbnailImage: product.productId?.thumbnailImage || product.thumbnailImage,
        quantity: product.quantity,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
      received: order.received,
      createdAt: order.createdAt,
    }));

    res.status(200).json(simplifiedOrders);
  } catch (error) {
    console.error('주문 목록 조회 실패:', error);
    res.status(500).json({ message: '서버 오류로 주문 목록을 가져올 수 없습니다.' });
  }
};

/**
 * @swagger
 * /api/orderadmin/{orderId}/payment:
 *   patch:
 *     summary: "결제 상태 수정"
 *     description: "주문 ID를 기반으로 주문의 결제 상태를 수정 (결제확인중, 결제완료)"
 *     tags:
 *       - "Orders"
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: "수정할 주문의 ID"
 *         schema:
 *           type: string
 *           example: "603dcd8f1c4ae12345abcd67"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['결제확인중', '결제완료']
 *                 example: "결제완료"
 *     responses:
 *       200:
 *         description: "결제 상태 업데이트 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "결제 상태 업데이트 성공"
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         studentId:
 *                           type: string
 *                         phone:
 *                           type: string
 *                     products:
 *                       type: array
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
 *                     received:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *       400:
 *         description: "유효하지 않은 상태값"
 *       404:
 *         description: "주문을 찾을 수 없음"
 *       500:
 *         description: "서버 오류"
 */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['결제확인중', '결제완료'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "유효하지 않은 결제 상태값입니다." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate('user.userId', 'studentId phone')
      .populate('products.productId', 'productName price thumbnailImage');

    if (!updatedOrder) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }

    const responseOrder = {
      _id: updatedOrder._id,
      user: {
        studentId: updatedOrder.user.userId?.studentId || updatedOrder.user.studentId || '',
        phone: updatedOrder.user.userId?.phone || updatedOrder.user.phone || '',
      },
      products: updatedOrder.products.map(product => ({
        productName: product.productId?.productName || product.productName,
        price: product.productId?.price ?? product.price,
        thumbnailImage: product.productId?.thumbnailImage || product.thumbnailImage,
        quantity: product.quantity,
      })),
      totalPrice: updatedOrder.totalPrice,
      status: updatedOrder.status,
      received: updatedOrder.received,
      createdAt: updatedOrder.createdAt,
    };

    res.status(200).json({
      message: "결제 상태 업데이트 성공",
      order: responseOrder,
    });
  } catch (error) {
    console.error("결제 상태 업데이트 실패:", error);
    res.status(500).json({
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/orderadmin/{orderId}/received:
 *   patch:
 *     summary: "수령 상태 수정"
 *     description: "주문 ID를 기반으로 주문의 수령 상태를 수정 (미수령/수령완료)"
 *     tags:
 *       - "Orders"
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: "수정할 주문의 ID"
 *         schema:
 *           type: string
 *           example: "603dcd8f1c4ae12345abcd67"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               received:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: "수령 상태 업데이트 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "수령 상태 업데이트 성공"
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                     products:
 *                       type: array
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
 *                     received:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *       400:
 *         description: "유효하지 않은 수령 상태값"
 *       404:
 *         description: "주문을 찾을 수 없음"
 *       500:
 *         description: "서버 오류"
 */
export const updateReceivedStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { received } = req.body;

    if (typeof received !== "boolean") {
      return res.status(400).json({ message: "유효하지 않은 수령 상태값입니다. Boolean 값을 입력해 주세요." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { received },
      { new: true }
    )
      .populate('user.userId', 'studentId phone')
      .populate('products.productId', 'productName price thumbnailImage');

    if (!updatedOrder) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }

    res.status(200).json({
      message: "수령 상태 업데이트 성공",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("수령 상태 업데이트 실패:", error);
    res.status(500).json({
      message: "서버 오류",
      error: error.message,
    });
  }
};

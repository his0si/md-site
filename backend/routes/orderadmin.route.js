import express from 'express';
import { 
  getAllOrders, 
  updatePaymentStatus, 
  updateReceivedStatus 
} from '../controllers/orderadmin.controller.js';

const router = express.Router();

// 주문 목록 조회
router.get('/', getAllOrders);

// 결제 상태 업데이트
router.patch('/:orderId/payment', updatePaymentStatus);

// 수령 상태 업데이트
router.patch('/:orderId/received', updateReceivedStatus);

export default router;

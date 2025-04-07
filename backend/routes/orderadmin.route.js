import express from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/orderadmin.controller.js';

const router = express.Router();

router.get('/', getAllOrders);
router.patch('/:orderId/status', updateOrderStatus);

export default router;

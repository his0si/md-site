import express from 'express';
import { getAllOrders } from '../controllers/orderadmin.controller.js';
const router = express.Router();

router.get('/', getAllOrders);

export default router;
import { Router } from 'express';
import { placeOrder, getUserOrders, getAllOrders } from '../controllers/order.controller';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

// User routes
router.post('/', authenticateToken, placeOrder);
router.get('/my-orders', authenticateToken, getUserOrders);

// Admin routes
router.get('/all', authenticateToken, isAdmin, getAllOrders);

export default router;

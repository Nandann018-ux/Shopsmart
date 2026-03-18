import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export const placeOrder = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Invalid product or quantity' });
        }

        const order = await OrderService.placeOrder(req.user.userId, productId, quantity);
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserOrders = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const orders = await OrderService.getUserOrders(req.user.userId);
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch all orders' });
    }
};

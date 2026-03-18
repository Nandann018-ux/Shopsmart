import { prisma } from '../index';
import { Prisma } from '@prisma/client';

export class OrderService {
    /**
     * Places an order atomically using a Prisma transaction.
     * This is critical for flash sales to prevent overselling when multiple users buy simultaneously.
     */
    static async placeOrder(userId: string, productId: string, quantity: number) {
        // We use a transaction to ensure we read the stock and update it atomically.
        // MongoDB Replica Sets are required for Prisma transactions.
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // 1. Fetch the product
            const product = await tx.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                throw new Error('Product not found');
            }

            if (!product.isActive) {
                throw new Error('Product flash sale is not active');
            }

            // 2. Check stock
            if (product.stock < quantity) {
                throw new Error(`Insufficient stock. Only ${product.stock} available.`);
            }

            // 3. Calculate total price
            const totalPrice = product.price * quantity;

            // 4. Update the stock
            await tx.product.update({
                where: { id: productId },
                data: {
                    stock: {
                        decrement: quantity,
                    },
                },
            });

            // 5. Create the order
            const order = await tx.order.create({
                data: {
                    userId,
                    productId,
                    quantity,
                    totalPrice,
                    status: 'COMPLETED', // For simplicity in flash drop, assume completed immediately or pending payment.
                },
            });

            return order;
        });
    }

    static async getUserOrders(userId: string) {
        return prisma.order.findMany({
            where: { userId },
            include: {
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    static async getAllOrders() {
        return prisma.order.findMany({
            include: {
                user: { select: { email: true, id: true } },
                product: { select: { title: true, price: true } },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}

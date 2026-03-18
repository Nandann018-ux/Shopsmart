import { prisma } from '../index';

export class ProductService {
    static async createProduct(data: { title: string; description: string; price: number; stock: number; imageUrl: string; isActive?: boolean }) {
        return prisma.product.create({ data });
    }

    static async getProducts(activeOnly: boolean = true) {
        if (activeOnly) {
            return prisma.product.findMany({ where: { isActive: true } });
        }
        return prisma.product.findMany();
    }

    static async getProductById(id: string) {
        return prisma.product.findUnique({ where: { id } });
    }

    static async updateProduct(id: string, data: Partial<{ title: string; description: string; price: number; stock: number; imageUrl: string; isActive: boolean }>) {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    static async deleteProduct(id: string) {
        return prisma.product.delete({ where: { id } });
    }
}

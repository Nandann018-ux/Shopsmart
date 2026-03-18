import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const activeOnly = req.query.all !== 'true'; // Default gets active only, ?all=true gets everything
        const products = await ProductService.getProducts(activeOnly);
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.getProductById(req.params.id as string);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.updateProduct(req.params.id as string, req.body);
        res.json(product);
    } catch (error: any) {
        res.status(400).json({ error: 'Failed to update product' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await ProductService.deleteProduct(req.params.id as string);
        res.json({ message: 'Product deleted' });
    } catch (error: any) {
        res.status(400).json({ error: 'Failed to delete product' });
    }
};

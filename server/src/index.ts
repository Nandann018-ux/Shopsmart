import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config();

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';

const app = express();
const port = process.env.PORT || 5001;
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Static file serving for production
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Urban Gear API is running' });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

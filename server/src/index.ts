import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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
const localDist = path.resolve(__dirname, '../../client/dist');
const dockerDist = path.resolve('/app/client/dist');

const clientDistPath = fs.existsSync(dockerDist) ? dockerDist : localDist;

console.log(`[Urban Gear] Static assets resolved to: ${clientDistPath}`);

// Static file serving
app.use(express.static(clientDistPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Urban Gear API is running',
        mode: fs.existsSync(dockerDist) ? 'production' : 'development'
    });
});

// --- Catch-all route for React Router (SPA) ---
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        const indexPath = path.join(clientDistPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send('Frontend build not found');
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

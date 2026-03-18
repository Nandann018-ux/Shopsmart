import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { SkeletonProductCard } from '../components/SkeletonLoader';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Set flash sale target date to 2 hours from now for demonstration
    const [flashSaleDate] = useState(() => {
        const d = new Date();
        d.setHours(d.getHours() + 2);
        return d.toISOString();
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(import.meta.env.VITE_API_URL + '/products' || 'http://localhost:3001/api/products');
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center pt-8"
            >
                <span className="bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4 inline-block border border-secondary/50">
                    LIVE NOW
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                    Current <span className="neon-text-primary text-primary">Drops</span>
                </h1>
                <p className="text-textMuted text-lg max-w-2xl mx-auto">
                    Exclusive, limited-time items. Once they are gone, they are gone forever.
                    Secure your drop before the timer runs out.
                </p>
            </motion.div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonProductCard key={i} />)}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center text-textMuted mt-20 p-12 glass-panel">
                    <h3 className="text-2xl font-bold mb-2 text-white">No active drops</h3>
                    <p>Check back later for upcoming exclusive items.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            flashSaleDate={flashSaleDate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;

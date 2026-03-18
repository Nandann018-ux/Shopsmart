import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const ProductCard = ({ product, flashSaleDate }) => {
    const isFlashSaleActive = +new Date(flashSaleDate) > +new Date() && product.isActive;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-panel overflow-hidden group flex flex-col"
        >
            <div className="relative h-64 overflow-hidden bg-white/5">
                {/* Placeholder image for testing if real one fails */}
                <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {isFlashSaleActive && (
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold neon-border">
                        FLASH DROP
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white">{product.title}</h3>
                <p className="text-textMuted text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>

                {isFlashSaleActive && (
                    <div className="mb-4">
                        <CountdownTimer targetDate={flashSaleDate} />
                    </div>
                )}

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary neon-text-primary">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-textMuted uppercase tracking-wider">{product.stock} Left in Stock</span>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        disabled={!isFlashSaleActive || product.stock === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isFlashSaleActive && product.stock > 0
                                ? 'bg-primary text-background hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,255,204,0.5)]'
                                : 'bg-surface border border-white/10 text-textMuted cursor-not-allowed'
                            }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Buy Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

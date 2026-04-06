import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';

const ProductCard = ({ product, onQuickAdd }) => {
  return (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        <Link to={`/product/${product.id}`} className="block h-full group/card">
            <Card
                title={product.name}
                subtitle={product.category}
                image={product.image}
                className="bg-brand-gray-dark/50 group-hover/card:border-brand-neon/50 transition-colors cursor-pointer"
            >
                <div className="flex justify-between items-center mt-6">
                    <span className="text-xl font-black text-brand-white">${product.price}.00</span>
                    <motion.button
                        type="button"
                        onClick={(e) => onQuickAdd(e, product)}
                        whileHover={{ scale: 1.1, rotate: 5, backgroundColor: '#a855f7', color: '#fff' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-2xl border border-brand-gray-light text-brand-white/60 transition-colors group/btn"
                    >
                        <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                </div>
            </Card>
        </Link>
    </motion.div>
  );
};

export default ProductCard;

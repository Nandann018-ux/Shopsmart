import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../ui/Loader';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, onQuickAdd }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={`skel-${i}`} className="space-y-6">
            <Loader className="h-72 w-full rounded-2xl" />
            <Loader className="h-6 w-3/4 rounded-lg" />
            <div className="flex justify-between items-center">
              <Loader className="h-6 w-1/4 rounded-lg" />
              <Loader className="h-10 w-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center border-2 border-dashed border-brand-gray-light rounded-[3rem]"
      >
          <span className="text-brand-neon text-4xl block mb-6 font-black tracking-tighter">0 UNITS FOUND</span>
          <p className="text-brand-white/40 uppercase text-xs font-bold tracking-widest">
              No equipment matches your current tactical filters.
          </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickAdd={onQuickAdd} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;

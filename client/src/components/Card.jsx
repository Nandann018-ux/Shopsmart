import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  image, 
  className = '', 
  hover = true, 
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -10, transition: { duration: 0.3 } } : {}}
      className={`group relative overflow-hidden bg-brand-gray-dark border border-brand-gray-light rounded-2xl ${className}`}
      {...props}
    >
      {/* Glow Effect on Hover */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {image && (
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </div>
      )}
      
      <div className="p-6">
        {subtitle && (
          <span className="text-xs font-bold tracking-widest text-brand-neon uppercase mb-2 block">
            {subtitle}
          </span>
        )}
        {title && (
          <h3 className="text-xl font-bold text-brand-white mb-2 group-hover:text-brand-neon transition-colors font-brand">
            {title}
          </h3>
        )}
        <div className="text-brand-white/70 text-sm leading-relaxed">
          {children}
        </div>
      </div>
      
      {/* Interactive Border Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

export default Card;

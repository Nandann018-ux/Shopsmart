import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-brand-white text-brand-black hover:bg-white shadow-xl",
    neon: "bg-brand-neon text-white shadow-[var(--shadow-neon)] hover:shadow-[var(--shadow-neon-strong)] hover:scale-105",
    outline: "border-2 border-brand-gray-light text-brand-white hover:border-brand-neon hover:text-brand-neon bg-transparent",
    ghost: "text-brand-gray hover:bg-brand-gray-light text-brand-white bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

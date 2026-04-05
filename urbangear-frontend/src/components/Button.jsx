import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  to,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl cursor-pointer";
  
  const variants = {
    primary: "bg-brand-white text-brand-black hover:bg-white shadow-xl",
    neon: "bg-brand-neon text-white shadow-[var(--shadow-neon)] hover:shadow-neon-strong hover:scale-105",
    outline: "border-2 border-brand-gray-light text-brand-white hover:border-brand-neon hover:text-brand-neon bg-transparent shadow-lg",
    ghost: "text-brand-gray hover:bg-brand-gray-light text-brand-white bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-sm"
  };

  const Component = to ? motion(Link) : motion.button;
  const extraProps = to ? { to } : {};

  return (
    <Component
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...extraProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({ 
    label, 
    type = 'text', 
    error, 
    placeholder, 
    value, 
    onChange, 
    className = '',
    ...props 
}) => {
    return (
        <div className={`w-full flex shadow-2xl flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/30 ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full bg-brand-gray-dark border-b-2 px-4 py-4 rounded-t-xl text-brand-white focus:outline-none transition-all duration-300 placeholder:text-brand-white/10 text-sm font-bold tracking-widest ${
                        error 
                        ? 'border-red-500/50 bg-red-500/5' 
                        : 'border-brand-gray-light focus:border-brand-neon hover:border-brand-white/20'
                    }`}
                    {...props}
                />
                
                {/* Glow Effect on Focus */}
                <div className={`absolute bottom-0 left-0 h-[2px] bg-brand-neon shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-500 ${
                    error ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] w-full' : 'group-focus-within:w-full w-0'
                }`} />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[9px] font-black uppercase tracking-widest text-red-500 ml-1 mt-1"
                    >
                        [Error]: {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;

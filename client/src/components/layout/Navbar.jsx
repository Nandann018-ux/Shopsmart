import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
            ? 'bg-brand-black/80 backdrop-blur-xl border-b border-brand-gray-light py-2' 
            : 'bg-transparent py-6'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="bg-brand-neon p-2 rounded-xl text-white shadow-[var(--shadow-neon)]"
                        >
                            <ShoppingBag size={18} strokeWidth={2.5} />
                        </motion.div>
                        <span className="text-xl font-black tracking-tighter text-brand-white uppercase">
                            Urban<span className="text-brand-neon">Gear</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-12 text-xs font-black uppercase tracking-[0.3em] text-brand-white/70">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`hover:text-brand-neon transition-colors relative group ${location.pathname === link.path ? 'text-brand-neon' : ''}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-neon transition-all group-hover:w-full ${location.pathname === link.path ? 'w-full' : 'w-0'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button type="button" className="p-2 hover:bg-brand-gray-light rounded-xl text-brand-white transition-all group">
                            <Search size={20} className="group-hover:text-brand-neon transition-colors" />
                        </button>
                        
                        {/* Cart Action with Badge */}
                        <Link to="/cart" className="relative p-2 hover:bg-brand-gray-light rounded-xl text-brand-white transition-all group">
                            <ShoppingBag size={20} className="group-hover:text-brand-neon transition-colors" />
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute top-0 right-0 w-4 h-4 bg-brand-neon text-brand-black text-[10px] font-black flex items-center justify-center rounded-full shadow-neon"
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Login/Profile Action */}
                        <Link to="/login" className="p-2 hover:bg-brand-gray-light rounded-xl text-brand-white transition-all group">
                            <User size={20} className="group-hover:text-brand-neon transition-colors" />
                        </Link>
                        
                        <button 
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-brand-gray-light rounded-xl text-brand-white transition-all"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-gray-dark border-b border-brand-gray-light overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-4 text-center">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-3 text-lg font-bold text-brand-white hover:text-brand-neon transition-colors tracking-widest uppercase"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link 
                                to="/cart" 
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-3 text-lg font-bold text-brand-neon transition-colors tracking-widest uppercase"
                            >
                                Loadout ({totalItems})
                            </Link>
                            <Link 
                                to="/login" 
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-3 text-lg font-bold text-brand-white hover:text-brand-neon transition-colors tracking-widest uppercase"
                            >
                                Secure Access
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 rounded-none px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Zap className="text-primary w-8 h-8" />
                    </motion.div>
                    <span className="text-2xl font-bold tracking-tighter uppercase neon-text-primary">Flash<span className="text-white">Drop</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/orders" className="text-textMuted hover:text-white transition-colors">
                        Orders
                    </Link>
                    <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute top-0 right-0 bg-secondary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full leading-none">
                                0
                            </span>
                        </motion.button>

                        <div className="relative group/account">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-surface rounded-full border border-white/5 hover:border-primary/50 transition-colors"
                                title="Account"
                            >
                                <UserIcon className="w-5 h-5 text-primary" />
                            </motion.button>
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover/account:opacity-100 group-hover/account:visible transition-all duration-300">
                                {user ? (
                                    <>
                                        <div className="px-4 py-2 border-b border-white/10 mb-2">
                                            <p className="text-sm font-bold text-white truncate">{user.email}</p>
                                            <p className="text-xs text-textMuted">{user.role}</p>
                                        </div>
                                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="block px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
                                        Login / Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

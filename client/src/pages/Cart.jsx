import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Layout from '../layouts/Layout';
import Container from '../components/Container';
import Button from '../components/Button';
import QuantitySelector from '../components/QuantitySelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, ChevronLeft } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
    const shipping = subtotal > 500 ? 0 : 25;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <Layout>
                <Container className="pt-32 pb-40 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 bg-brand-gray-dark border border-brand-gray-light rounded-3xl flex items-center justify-center text-brand-white/20 mb-8"
                    >
                        <ShoppingBag size={48} />
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-white mb-6">
                        Loadout <span className="text-brand-neon">Empty</span>
                    </h1>
                    <p className="text-brand-white/40 uppercase tracking-widest text-xs font-bold mb-12 max-w-sm">
                        Your tactical inventory is currently zeroed. Deploy to the shop to acquire new equipment.
                    </p>
                    <Button to="/shop" variant="neon" size="lg" className="px-12 uppercase tracking-[0.3em] font-black">
                        Deploy to Shop
                    </Button>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container className="pt-24 pb-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Cart Inventory List */}
                    <div className="flex-1 space-y-10">
                        <div>
                            <Link to="/shop" className="inline-flex items-center gap-2 text-brand-white/30 hover:text-brand-neon transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-8 group">
                                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Return to Arsenal
                            </Link>
                            <h1 className="text-5xl font-black uppercase tracking-tighter text-brand-white">
                                Active <span className="text-brand-neon italic whitespace-nowrap">Loadout</span>
                            </h1>
                            <p className="text-[10px] font-black text-brand-white/30 uppercase tracking-[0.4em] mt-2">
                                {totalItems} Units Prepared for Deployment
                            </p>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-brand-gray-dark border border-brand-gray-light rounded-[2.5rem] group hover:border-brand-neon/40 transition-colors"
                                    >
                                        {/* Product Thumbnail */}
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden border border-brand-gray-light flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <span className="text-brand-neon text-[9px] font-black uppercase tracking-[0.4em] mb-2 block">{item.category}</span>
                                            <h3 className="text-xl font-black text-brand-white uppercase tracking-tight mb-2">{item.name}</h3>
                                            <span className="text-lg font-black text-brand-white/60">${item.price}.00</span>
                                        </div>

                                        {/* Quantity & Actions */}
                                        <div className="flex flex-col sm:flex-row items-center gap-8">
                                            <QuantitySelector 
                                                value={item.quantity} 
                                                onChange={(val) => updateQuantity(item.id, val)}
                                            />
                                            <div className="flex flex-col items-end gap-2 pr-4 min-w-[100px]">
                                                <span className="text-xl font-black text-brand-white">${item.price * item.quantity}.00</span>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-brand-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all group/trash"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Order Summary Summary */}
                    <div className="lg:w-96 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-10 bg-brand-gray-dark border border-brand-gray-light rounded-[3rem] sticky top-28 shadow-2xl backdrop-blur-xl"
                        >
                            <h2 className="text-2xl font-black uppercase tracking-tight text-brand-white mb-10 border-b border-brand-gray-light pb-6">
                                Order <span className="text-brand-neon">Intelligence</span>
                            </h2>
                            
                            <div className="space-y-6 text-xs font-black uppercase tracking-[0.2em]">
                                <div className="flex justify-between text-brand-white/40">
                                    <span>Base Value</span>
                                    <span>${subtotal.toLocaleString()}.00</span>
                                </div>
                                <div className="flex justify-between text-brand-white/40">
                                    <span>Tactical Logistics</span>
                                    <span className={shipping === 0 ? "text-brand-neon" : ""}>
                                        {shipping === 0 ? "FREE" : `$${shipping}.00`}
                                    </span>
                                </div>
                                <div className="pt-6 border-t border-brand-gray-light flex justify-between text-lg text-brand-white">
                                    <span>Total Mass</span>
                                    <span className="text-brand-neon">${total.toLocaleString()}.00</span>
                                </div>
                            </div>

                            <Button variant="neon" size="lg" className="w-full mt-10 py-5 uppercase tracking-[0.3em] text-xs font-black shadow-neon-strong">
                                Initiate Checkout
                                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="mt-8 space-y-4 pt-8 border-t border-brand-gray-light">
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-brand-white/20">
                                    <ShieldCheck size={14} className="text-brand-neon" />
                                    Encrypted Transaction
                                </div>
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-brand-white/20">
                                    <Truck size={14} className="text-brand-neon" />
                                    Secure Deployment
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default Cart;

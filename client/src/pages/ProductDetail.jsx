import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import QuantitySelector from '../components/ui/QuantitySelector';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, ChevronLeft, Star } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await productService.getProductById(id);
            setProduct(data);
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            // Optional: redirect to cart or show success toast
            navigate('/cart');
        }
    };

    if (!product) return null;

    return (
        <Layout>
            <Container className="pt-24 pb-20">
                {/* Breadcrumbs / Back */}
                <Link to="/shop" className="inline-flex items-center gap-2 text-brand-white/40 hover:text-brand-neon transition-colors text-xs font-black uppercase tracking-widest mb-12 group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Arsenal
                </Link>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Image Gallery Showcase */}
                    <div className="flex-1 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden border border-brand-gray-light bg-brand-gray-dark cursor-zoom-in"
                        >
                            <motion.img 
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute top-6 right-6 bg-brand-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-brand-gray-light text-brand-neon text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl">
                                <Star size={12} fill="currentColor" />
                                Premium Unit
                            </div>
                        </motion.div>
                        
                        {/* Thumbnails (Placeholder for design feel) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl border border-brand-gray-light overflow-hidden bg-brand-black/40 hover:border-brand-neon transition-colors cursor-pointer group">
                                    <img src={product.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Logistics */}
                    <div className="flex-1 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-brand-neon text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Unit ID: {product.id}00X</span>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-white leading-none mb-6">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <span className="text-3xl md:text-4xl font-black text-brand-white">${product.price}.00</span>
                                <div className="h-4 w-[1px] bg-brand-gray-light" />
                                <span className="px-3 py-1 bg-brand-gray-light/30 border border-brand-gray-light rounded text-[10px] uppercase font-black tracking-widest text-brand-white/50">In Stock</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xs font-black uppercase tracking-widest text-brand-neon">Intelligence</h3>
                            <p className="text-brand-white/50 text-sm md:text-base leading-relaxed uppercase tracking-wider font-medium lg:max-w-md">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Tactical Options */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-10"
                        >
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-white/40">Deployment Quantity</h3>
                                <QuantitySelector value={quantity} onChange={setQuantity} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    onClick={handleAddToCart}
                                    variant="neon" 
                                    size="lg" 
                                    className="flex-1 uppercase tracking-[0.3em] font-black py-5 text-sm"
                                >
                                    <ShoppingCart size={18} className="mr-3" />
                                    Add to Cart
                                </Button>
                                <Button variant="outline" size="lg" className="px-8 font-black uppercase tracking-[0.3em]">
                                    Buy Now
                                </Button>
                            </div>
                        </motion.div>

                        {/* Tech Specs / Badges */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="pt-12 border-t border-brand-gray-light grid grid-cols-1 sm:grid-cols-3 gap-8"
                        >
                            <div className="flex items-center gap-3 text-brand-white/30 hover:text-brand-white transition-colors cursor-default group">
                                <Truck size={18} className="group-hover:text-brand-neon transition-colors" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Global Drop</span>
                            </div>
                            <div className="flex items-center gap-3 text-brand-white/30 hover:text-brand-white transition-colors cursor-default group">
                                <RotateCcw size={18} className="group-hover:text-brand-neon transition-colors" />
                                <span className="text-[9px] font-black uppercase tracking-widest">30-Day Reset</span>
                            </div>
                            <div className="flex items-center gap-3 text-brand-white/30 hover:text-brand-white transition-colors cursor-default group">
                                <ShieldCheck size={18} className="group-hover:text-brand-neon transition-colors" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Secure Link</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default ProductDetail;

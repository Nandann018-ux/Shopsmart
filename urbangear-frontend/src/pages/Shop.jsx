import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import Container from '../components/Container';
import ShopSidebar from '../components/ShopSidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, LayoutGrid, LayoutList } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const dummyProducts = [
    { id: 1, name: 'Tech-Shell CoreV2', price: 289, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aec16adcd?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'Neon Matrix Joggers', price: 149, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Tactical Utility Chest', price: 89, category: 'Accessories', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'Stealth Knit Hoodie', price: 120, category: 'Tops', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600' },
    { id: 5, name: 'Thermal Base Layer', price: 65, category: 'Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600' },
    { id: 6, name: 'Grid-Lock Sneakers', price: 195, category: 'Accessories', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600' },
    { id: 7, name: 'Urban Cargo V3', price: 160, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1624371414361-e6e8ea01c1e6?auto=format&fit=crop&q=80&w=600' },
    { id: 8, name: 'Elite Tactical Vest', price: 210, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' }
];

const Shop = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All Units');
    const [priceRange, setPriceRange] = useState(500);
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let result = dummyProducts;
        if (activeCategory !== 'All Units') {
            result = result.filter(p => p.category === activeCategory);
        }
        result = result.filter(p => p.price <= priceRange);
        setFilteredProducts(result);
    }, [activeCategory, priceRange]);

    const handleQuickAdd = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        navigate('/cart');
    };

    return (
        <Layout>
            <Container className="pt-24 pb-20">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
                    {/* Sidebar Filters */}
                    <ShopSidebar 
                        activeCategory={activeCategory} 
                        onCategoryChange={setActiveCategory}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 border-b border-brand-gray-light/40 pb-10">
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-brand-white">
                                    Operational <span className="text-brand-neon">Gear</span>
                                </h1>
                                <p className="text-xs font-bold text-brand-white/30 uppercase tracking-[0.2em] mt-2">
                                    Displaying {filteredProducts.length} high-fidelity units
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-brand-gray-dark border border-brand-gray-light p-1.5 rounded-2xl">
                                <button type="button" className="p-2.5 bg-brand-neon text-white rounded-xl shadow-[var(--shadow-neon)]">
                                    <LayoutGrid size={18} />
                                </button>
                                <button type="button" className="p-2.5 text-brand-white/40 hover:text-brand-white hover:bg-brand-gray-light rounded-xl transition-all">
                                    <LayoutList size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    Array(6).fill(0).map((_, i) => (
                                        <div key={`skel-${i}`} className="space-y-6">
                                            <Skeleton className="h-72 w-full" />
                                            <Skeleton className="h-6 w-3/4" />
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-6 w-1/4" />
                                                <Skeleton className="h-10 w-10" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
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
                                                            onClick={(e) => handleQuickAdd(e, product)}
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
                                    ))
                                )}
                            </AnimatePresence>
                        </div>

                        {!loading && filteredProducts.length === 0 && (
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
                        )}
                    </main>
                </div>
            </Container>
        </Layout>
    );
};

export default Shop;

import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import Container from '../components/ui/Container';
import ShopSidebar from '../components/product/ShopSidebar';
import ProductGrid from '../components/product/ProductGrid';
import productService from '../services/productService';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All Units');
    const [priceRange, setPriceRange] = useState(500);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;
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

                        {/* Product Grid Component */}
                        <ProductGrid 
                          products={filteredProducts} 
                          loading={loading} 
                          onQuickAdd={handleQuickAdd} 
                        />
                    </main>
                </div>
            </Container>
        </Layout>
    );
};

export default Shop;

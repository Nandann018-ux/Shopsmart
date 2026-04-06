import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import Container from '../components/ui/Container';
import ShopSidebar from '../components/product/ShopSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const dummyProducts = [
    { id: 1, name: 'Tech-Shell CoreV2', price: 289, category: 'Outerwear', image: '/assets/tech-jacket.png' },
    { id: 2, name: 'Neon Matrix Joggers', price: 149, category: 'Bottoms', image: '/assets/neon-joggers.png' },
    { id: 3, name: 'Tactical Utility Chest', price: 89, category: 'Accessories', image: '/assets/chest-bag.png' },
    { id: 4, name: 'Stealth Knit Hoodie', price: 120, category: 'Tops', image: '/assets/stealth-hoodie.png' },
    { id: 5, name: 'Thermal Base Layer', price: 65, category: 'Tops', image: '/assets/thermal-base.png' },
    { id: 6, name: 'Grid-Lock Sneakers', price: 195, category: 'Accessories', image: '/assets/cargo-pants.png' }, // Using cargo pants as a temporary high-quality asset
    { id: 7, name: 'Urban Cargo V3', price: 160, category: 'Bottoms', image: '/assets/cargo-pants.png' },
    { id: 8, name: 'Elite Tactical Vest', price: 210, category: 'Outerwear', image: '/assets/tactical-vest.png' }
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

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const products = [
    {
        id: 1,
        name: 'Tech-Shell CoreV2',
        price: 289,
        category: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aec16adcd?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 2,
        name: 'Neon Matrix Joggers',
        price: 149,
        category: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 3,
        name: 'Tactical Utility Chest',
        price: 89,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 4,
        name: 'Stealth Knit Hoodie',
        price: 120,
        category: 'Tops',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
    }
];

const TrendingProducts = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleQuickAdd = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        navigate('/cart');
    };

    return (
        <section className="py-32 bg-brand-black px-4">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <span className="text-brand-neon text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Hottest Gear</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-white">
                            Trending <span className="text-brand-neon">Deployments</span>
                        </h2>
                    </div>
                    <Button to="/shop" variant="outline" className="uppercase tracking-[0.2em] text-[10px] font-black py-4 px-8">
                        View All Units
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="block h-full group/card transition-transform">
                            <Card
                                title={product.name}
                                subtitle={product.category}
                                image={product.image}
                                className="bg-brand-gray-dark/50 group-hover/card:border-brand-neon/40 transition-all"
                            >
                                <div className="flex justify-between items-center mt-6">
                                    <span className="text-xl font-black text-brand-white">${product.price}.00</span>
                                    <motion.button
                                        type="button"
                                        onClick={(e) => handleQuickAdd(e, product)}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-brand-neon p-2.5 rounded-xl text-white shadow-[var(--shadow-neon)] hover:shadow-neon-strong transition-all"
                                    >
                                        <ShoppingCart size={18} />
                                    </motion.button>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TrendingProducts;

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 1,
        name: 'Hoodies',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
        gridClass: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]'
    },
    {
        id: 2,
        name: 'Sneakers',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
        gridClass: 'h-[300px] md:h-auto'
    },
    {
        id: 3,
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
        gridClass: 'h-[300px] md:h-auto'
    },
    {
        id: 4,
        name: 'Jackets',
        image: '/assets/tech-jacket.png',
        gridClass: 'md:col-span-2 h-[300px]'
    }
];

const Categories = () => {
    return (
        <section className="py-24 bg-brand-black border-t border-brand-gray-light">
            <Container>
                <div className="mb-16">
                    <span className="text-brand-neon text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Curated Selection</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-white">
                        Featured <span className="text-brand-neon italic">Disciplines</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
                    {categories.map((category) => (
                        <Link 
                            key={category.id} 
                            to="/shop"
                            className={`${category.gridClass} block`}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative h-full group overflow-hidden rounded-3xl border border-brand-gray-light cursor-pointer shadow-2xl"
                            >
                                {/* Background Image */}
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1000ms] ease-out"
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <motion.div 
                                        initial={{ opacity: 0.8, x: 0 }}
                                        whileHover={{ x: 10 }}
                                        className="flex justify-between items-end"
                                    >
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-black text-brand-white uppercase tracking-tighter mb-1">
                                                {category.name}
                                            </h3>
                                            <div className="w-8 h-1 bg-brand-neon rounded-full group-hover:w-16 transition-all duration-500" />
                                        </div>
                                        <span className="text-[10px] font-black text-brand-white/40 uppercase tracking-widest pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Explore Dept
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Categories;

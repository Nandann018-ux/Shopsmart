import React from 'react';
import Layout from '../layouts/Layout';
import Hero from '../components/Hero';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Droplets, Target } from 'lucide-react';

const Home = () => {
    const featuredProducts = [
        {
            id: 1,
            title: 'Tactical Shell Jacket',
            subtitle: 'New Drop 001',
            image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
            price: '$240',
            feature: <Zap size={14} className="mr-1" />
        },
        {
            id: 2,
            title: 'Neon Cargo Pants',
            subtitle: 'Limited Edition',
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
            price: '$180',
            feature: <Target size={14} className="mr-1" />
        },
        {
            id: 3,
            title: 'Waterproof Utility Vest',
            subtitle: 'Performance',
            image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800',
            price: '$150',
            feature: <Droplets size={14} className="mr-1" />
        }
    ];

    return (
        <Layout>
            <Hero />

            <section className="py-32 bg-brand-black">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                                Latest <span className="text-brand-neon">Deployments</span>
                            </h2>
                            <p className="text-brand-white/50 uppercase text-xs font-bold tracking-[0.2em]">
                                Freshly drops for the urban landscape. Built for those who move fast.
                            </p>
                        </div>
                        <Button variant="outline" className="uppercase tracking-widest text-xs hidden md:flex font-black">
                            View All Drops
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <Card
                                key={product.id}
                                title={product.title}
                                subtitle={product.subtitle}
                                image={product.image}
                            >
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-2xl font-black text-brand-white">{product.price}</span>
                                    <Button variant="ghost" size="sm" className="group/btn p-0 hover:bg-transparent">
                                        <span className="text-[10px] uppercase font-black tracking-widest mr-2 group-hover/btn:text-brand-neon transition-colors">Purchase</span>
                                        <ArrowUpRight size={16} className="group-hover/btn:text-brand-neon group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    
                    <div className="mt-16 md:hidden">
                         <Button variant="outline" className="w-full uppercase tracking-widest text-xs font-black">
                            View All Drops
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Newsletter Section with Neon Glow */}
            <section className="py-32 bg-brand-gray-dark border-t border-brand-gray-light overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-brand-neon/5 blur-[120px] rounded-full pointer-events-none" />
                <Container className="relative">
                    <div className="max-w-4xl mx-auto rounded-3xl p-12 md:p-20 text-center border border-brand-gray-light bg-brand-black/50 backdrop-blur-xl">
                        <span className="text-brand-neon text-[10px] font-black uppercase tracking-[0.3em] mb-6 block">Join the movement</span>
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                            Stay ahead of <br /> the <span className="text-brand-neon">Curve</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input 
                                type="email" 
                                placeholder="ENTER YOUR EMAIL" 
                                className="flex-1 bg-brand-gray-light border border-brand-gray-light px-6 py-4 rounded-xl text-brand-white focus:outline-none focus:border-brand-neon transition-colors uppercase text-sm tracking-widest font-bold placeholder:text-brand-white/20"
                            />
                            <Button variant="neon" size="lg" className="uppercase tracking-[0.2em] text-xs px-12">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default Home;

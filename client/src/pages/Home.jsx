import React from 'react';
import Layout from '../layouts/Layout';
import Hero from '../components/home/Hero';
import Categories from '../components/product/Categories';
import TrendingProducts from '../components/product/TrendingProducts';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <Layout>
            <Hero />
            
            <Categories />

            <TrendingProducts />


            <section className="py-40 bg-brand-black border-t border-brand-gray-light overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-brand-neon/5 blur-[140px] rounded-full pointer-events-none" />
                <Container className="relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto rounded-[3rem] p-16 md:p-24 text-center border border-brand-gray-light bg-brand-gray-dark/40 backdrop-blur-3xl shadow-2xl"
                    >
                        <span className="text-brand-neon text-[10px] font-black uppercase tracking-[0.4em] mb-8 block">Neural Subscription</span>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-[0.85]">
                            Access the <br /> <span className="text-brand-neon">Inner Circle</span>
                        </h2>
                        <p className="max-w-lg mx-auto text-brand-white/40 text-xs md:text-sm font-bold uppercase tracking-widest mb-12">
                            Join 50,000+ operatives receiving early access to restricted drops and exclusive tactical intel.
                        </p>
                        <form 
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                        >
                            <input 
                                type="email" 
                                placeholder="ENTER OPERATIVE EMAIL" 
                                className="flex-1 bg-brand-black/60 border border-brand-gray-light px-8 py-5 rounded-2xl text-brand-white focus:outline-none focus:border-brand-neon transition-all uppercase text-[10px] tracking-[0.3em] font-black placeholder:text-brand-white/10"
                                required
                            />
                            <Button type="submit" variant="neon" size="lg" className="uppercase tracking-[0.3em] text-[10px] px-14 py-5 font-black">
                                Join Now
                            </Button>
                        </form>
                    </motion.div>
                </Container>
            </section>
        </Layout>
    );
};

export default Home;

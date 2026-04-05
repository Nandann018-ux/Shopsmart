import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Button from './Button';
import Container from './Container';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-brand-black">
            {/* Background dynamic blur effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-brand-neon/10 to-transparent -z-10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />

            <Container className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gray-light/50 text-brand-neon text-[10px] font-black rounded-full border border-brand-gray-light shadow-[var(--shadow-neon)] mb-8 uppercase tracking-[0.2em]">
                        <Zap size={12} fill="currentColor" />
                        <span>Next Gen Tactical Gear</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-6xl md:text-9xl font-black tracking-tighter text-brand-white mb-8 leading-[0.9] uppercase"
                >
                    Urban<span className="text-brand-neon italic">Gear</span> <br />
                    <span className="text-outline text-transparent opacity-50">Evolution</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-xl mx-auto text-sm md:text-base text-brand-white/50 mb-12 leading-relaxed uppercase tracking-wider font-medium"
                >
                    Engineered for the asphalt jungle. Premium materials meets futuristic aesthetics in our latest streetwear drops.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Button variant="neon" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-sm">
                        Shop Drop 001
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-sm">
                        Lookbook
                    </Button>
                </motion.div>
                
                {/* Features bar */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-brand-white/30"
                >
                    <div className="flex items-center gap-2 group hover:text-brand-neon transition-colors cursor-pointer">
                        <Shield size={14} className="group-hover:scale-110 transition-transform" />
                        <span>Durability Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 group hover:text-brand-neon transition-colors cursor-pointer">
                        <Star size={14} className="group-hover:scale-110 transition-transform" />
                        <span>Limited Edition</span>
                    </div>
                </motion.div>
            </Container>

            {/* Futuristic Hero Image Showcase */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="mt-24 w-full max-w-6xl px-4 rounded-3xl overflow-hidden relative border border-brand-gray-light aspect-[21/9] shadow-[0_0_100px_rgba(168,85,247,0.1)] group"
            >
                <img
                    src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2000"
                    alt="Futuristic Urban Streetwear"
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent pointer-events-none opacity-80" />
            </motion.div>
        </section>
    );
};

export default Hero;

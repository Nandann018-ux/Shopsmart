import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import Button from './Button';
import Container from './Container';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden bg-brand-black">
            {/* Background dynamic blur effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-brand-neon/15 to-transparent -z-10 rounded-full blur-[140px] opacity-40 animate-pulse-slow" />

            <Container className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gray-light/50 text-brand-neon text-[10px] font-black rounded-full border border-brand-gray-light shadow-[var(--shadow-neon)] mb-10 uppercase tracking-[0.3em]">
                        <Zap size={12} fill="currentColor" />
                        <span>UrbanGear Drop 001 / NOW LIVE</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-black tracking-tighter text-brand-white mb-8 leading-[0.85] uppercase"
                >
                    Redefining <br />
                    <span className="text-brand-neon italic">Street</span> Elite
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="max-w-2xl mx-auto text-sm md:text-base text-brand-white/40 mb-14 leading-relaxed uppercase tracking-[0.15em] font-medium"
                >
                    Engineered for the asphalt jungle. Quality materials meets futuristic aesthetics in our latest tactical drops. Built for those who move fast.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                >
                    <Button to="/shop" variant="neon" size="lg" className="w-full sm:w-auto uppercase tracking-[0.2em] text-xs font-black py-5 px-14">
                        Shop Now
                        <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                    <Button to="/shop" variant="outline" size="lg" className="w-full sm:w-auto uppercase tracking-[0.2em] text-xs font-black py-5 px-14">
                        Explore Collection
                    </Button>
                </motion.div>
                
                {/* Visual anchor / features */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-24 flex flex-wrap justify-center gap-16 text-[9px] font-black uppercase tracking-[0.3em] text-brand-white/20"
                >
                    <div className="flex items-center gap-3 hover:text-brand-neon transition-colors cursor-default">
                        <Shield size={14} />
                        <span>Tactical Durability</span>
                    </div>
                    <div className="flex items-center gap-3 hover:text-brand-neon transition-colors cursor-default">
                        <Star size={14} />
                        <span>Limited Production</span>
                    </div>
                    <div className="flex items-center gap-3 hover:text-brand-neon transition-colors cursor-default">
                        <Zap size={14} />
                        <span>Next-Gen Comfort</span>
                    </div>
                </motion.div>
            </Container>

            {/* Immersive background image hint */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none -z-20 overflow-hidden"
            >
                <img
                    src="/assets/hero-bg.png"
                    alt="Street Background"
                    className="w-full h-full object-cover grayscale brightness-50"
                />
            </motion.div>
        </section>
    );
};

export default Hero;

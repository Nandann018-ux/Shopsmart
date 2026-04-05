import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-white">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-indigo-50/50 and to-transparent -z-10 rounded-full blur-3xl opacity-60" />

            <div className="max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 shadow-sm mb-6 uppercase tracking-wider">
                        <Star size={12} fill="currentColor" />
                        <span>Winter Collection 2026</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight"
                >
                    Redefining <span className="text-indigo-600 italic">Urban</span> Fashion <br className="hidden md:block" /> For The Bold.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
                >
                    Discover a curated selection of premium gear designed for performance and style. Elevate your everyday aesthetic with our legendary craftsmanship.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group">
                        Shop Collection
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white text-gray-900 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                        View Lookbook
                    </button>
                </motion.div>
            </div>

            {/* Decorative images/elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-20 w-full max-w-5xl px-4 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-gray-50"
            >
                <img
                    src="https://images.unsplash.com/photo-1523381235312-3a1647fa9917?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero urban fashion showcase"
                    className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
        </section>
    );
};

export default Hero;

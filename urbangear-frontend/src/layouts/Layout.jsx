import React from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-neon selection:text-white">
      <Navbar />
      
      {/* Page Content with smooth entry animation */}
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pt-16 pb-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Global Footer */}
      <footer className="bg-brand-gray-dark border-t border-brand-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <div className="text-2xl font-black tracking-tighter">URBAN<span className="text-brand-neon">GEAR</span></div>
            <p className="text-brand-white/50 text-sm max-w-xs">
              Quality streetwear and tactical essentials for the modern city explorer.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm font-medium">
            <div className="flex flex-col gap-3 text-brand-white/70">
              <span className="text-brand-white font-bold mb-1">Company</span>
              <a href="#" className="hover:text-brand-neon transition-colors">About</a>
              <a href="#" className="hover:text-black transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-3 text-brand-white/70">
              <span className="text-brand-white font-bold mb-1">Store</span>
              <a href="#" className="hover:text-brand-neon transition-colors">New Arrivals</a>
              <a href="#" className="hover:text-brand-neon transition-colors">Accessories</a>
            </div>
            <div className="flex flex-col gap-3 text-brand-white/70 col-span-2 md:col-span-1 border-t md:border-0 border-brand-gray-light pt-8 md:pt-0">
              <span className="text-brand-white font-bold mb-1">Legal</span>
              <a href="#" className="hover:text-brand-neon transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-neon transition-colors">Terms</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-brand-gray-light flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-white/40">
          <p>© 2026 UrbanGear Studio. All Rights Reserved.</p>
          <div className="flex gap-4 uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-brand-neon transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-neon transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-neon transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

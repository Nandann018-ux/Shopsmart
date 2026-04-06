import React from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const preventDefault = (e) => e.preventDefault();

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-neon selection:text-white">
      <Navbar />
      
      {/* Page Content with smooth entry animation */}
      <AnimatePresence mode="wait">
        <motion.main
          key={window.location.pathname}
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
      <footer className="bg-brand-gray-dark border-t border-brand-gray-light py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <Link to="/" className="text-2xl font-black tracking-tighter hover:text-brand-neon transition-colors">URBAN<span className="text-brand-neon">GEAR</span></Link>
            <p className="text-brand-white/50 text-sm max-w-xs uppercase tracking-widest font-medium">
              Quality streetwear and tactical essentials for the modern city explorer.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-xs font-black uppercase tracking-[0.2em]">
            <div className="flex flex-col gap-4 text-brand-white/70">
              <span className="text-brand-white mb-2">Company</span>
              <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">About</a>
              <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-4 text-brand-white/70">
              <span className="text-brand-white mb-2">Store</span>
              <Link to="/shop" className="hover:text-brand-neon transition-colors">All Units</Link>
              <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">New Drops</a>
            </div>
            <div className="flex flex-col gap-4 text-brand-white/70 col-span-2 md:col-span-1">
              <span className="text-brand-white mb-2">Legal</span>
              <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Privacy</a>
              <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Terms</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-brand-gray-light flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-brand-white/20 font-black uppercase tracking-widest">
          <p>© 2026 UrbanGear Studio. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Instagram</a>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Twitter</a>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

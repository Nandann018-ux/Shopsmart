import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-neon selection:text-white flex flex-col">
      <Navbar />
      
      {/* Page Content with smooth entry animation */}
      <AnimatePresence mode="wait">
        <motion.main
          key={window.location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pt-16 pb-20 flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;

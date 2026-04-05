import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        
        {/* Dynamic section spacer */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-16">
            <motion.div 
               whileInView={{ opacity: 1, y: 0 }}
               initial={{ opacity: 0, y: 20 }}
               viewport={{ once: true }}
               className="text-center group"
            >
              <div className="text-4xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">100%</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Organic Cotton</div>
            </motion.div>
            <motion.div 
               whileInView={{ opacity: 1, y: 0 }}
               initial={{ opacity: 0, y: 20 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-center group"
            >
              <div className="text-4xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">Free</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Worldwide Shipping</div>
            </motion.div>
            <motion.div 
               whileInView={{ opacity: 1, y: 0 }}
               initial={{ opacity: 0, y: 20 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-center group"
            >
              <div className="text-4xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">24/7</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Customer Support</div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Basic Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg font-bold tracking-tight">URBAN<span className="text-indigo-600">GEAR</span></div>
          <div className="text-sm text-gray-500">© 2026 UrbanGear Co. Built for the modern nomad.</div>
          <div className="flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

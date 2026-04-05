import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="bg-black p-1.5 rounded-lg text-white"
            >
              <ShoppingBag size={20} strokeWidth={2.5} />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-gray-900">URBAN<span className="text-indigo-600">GEAR</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-black transition-colors">Men</a>
            <a href="#" className="hover:text-black transition-colors">Women</a>
            <a href="#" className="hover:text-black transition-colors">Accessories</a>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={20} />
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const preventDefault = (e) => e.preventDefault();

  return (
    <footer className="bg-brand-gray-dark border-t border-brand-gray-light py-16 mt-auto text-brand-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <Link to="/" className="text-2xl font-black tracking-tighter hover:text-brand-neon transition-colors font-brand uppercase">
            SHOP<span className="text-brand-neon italic">SMART</span>
          </Link>
          <p className="text-brand-white/50 text-xs max-w-xs uppercase tracking-widest font-bold">
            Quality streetwear and tactical essentials for the modern city explorer.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex flex-col gap-4 text-brand-white/70">
            <span className="text-brand-white mb-2 underline decoration-brand-neon decoration-2 underline-offset-4">Company</span>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">About</a>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-4 text-brand-white/70">
            <span className="text-brand-white mb-2 underline decoration-brand-neon decoration-2 underline-offset-4">Store</span>
            <Link to="/shop" className="hover:text-brand-neon transition-colors">All Units</Link>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">New Drops</a>
          </div>
          <div className="flex flex-col gap-4 text-brand-white/70 col-span-2 md:col-span-1">
            <span className="text-brand-white mb-2 underline decoration-brand-neon decoration-2 underline-offset-4">Legal</span>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Privacy</a>
            <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Terms</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-brand-gray-light flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-brand-white/20 font-black uppercase tracking-widest text-center">
        <p>© 2026 ShopSmart Studio. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Instagram</a>
          <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Twitter</a>
          <a href="#" onClick={preventDefault} className="hover:text-brand-neon transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

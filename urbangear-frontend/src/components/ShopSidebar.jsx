import React from 'react';
import { Filter, ChevronRight } from 'lucide-react';

const ShopSidebar = ({ activeCategory, onCategoryChange, priceRange, onPriceChange }) => {
    const categories = ['All Units', 'Outerwear', 'Tops', 'Bottoms', 'Accessories'];

    return (
        <aside className="w-full md:w-64 flex-shrink-0 space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-gray-light pb-6">
                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Filter size={20} className="text-brand-neon" />
                    Filters
                </h2>
                <span className="text-[10px] uppercase font-black text-brand-white/30 tracking-widest px-2 py-1 bg-brand-gray-light rounded">Tactical Mode</span>
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/40 mb-6 flex items-center gap-2">
                    <span className="w-2 h-0.5 bg-brand-neon" />
                    Categorization
                </h3>
                <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`flex justify-between items-center px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all group ${
                                activeCategory === cat 
                                ? 'bg-brand-neon text-white shadow-[var(--shadow-neon)]' 
                                : 'text-brand-white/50 hover:bg-brand-gray-light hover:text-brand-white'
                            }`}
                        >
                            {cat}
                            <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${activeCategory === cat ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/40 mb-8 flex items-center gap-2">
                    <span className="w-2 h-0.5 bg-brand-neon" />
                    Price Matrix
                </h3>
                <div className="px-2">
                    <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        step="10"
                        value={priceRange}
                        onChange={(e) => onPriceChange(Number(e.target.value))}
                        className="w-full h-1 bg-brand-gray-light rounded-lg appearance-none cursor-pointer accent-brand-neon focus:outline-none"
                    />
                    <div className="flex justify-between mt-4">
                        <span className="text-xs font-black text-brand-white/30">$0</span>
                        <span className="text-lg font-black text-brand-neon">${priceRange}</span>
                        <span className="text-xs font-black text-brand-white/30">$500+</span>
                    </div>
                </div>
            </div>

            {/* Branding/Status */}
            <div className="p-6 bg-brand-gray-dark border border-brand-gray-light rounded-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Filter size={40} />
                 </div>
                 <div className="relative z-10">
                    <span className="text-[9px] font-black uppercase text-brand-neon tracking-widest block mb-1">System Status</span>
                    <p className="text-[10px] font-bold text-brand-white/40 uppercase leading-relaxed">
                        Filter algorithms optimized for fast urban deployment.
                    </p>
                 </div>
            </div>
        </aside>
    );
};

export default ShopSidebar;

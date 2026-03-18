import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonProductCard = () => (
    <div className="glass-panel p-4 flex flex-col gap-4 animate-pulse-fast">
        <div className="w-full h-48 bg-white/5 rounded-xl border border-white/5" />
        <div className="space-y-3 mt-2">
            <div className="h-4 bg-white/10 rounded-md w-3/4" />
            <div className="h-4 bg-white/10 rounded-md w-1/2" />
        </div>
        <div className="flex justify-between items-center mt-4">
            <div className="h-8 bg-white/10 rounded-md w-1/3" />
            <div className="h-10 bg-primary/20 rounded-lg w-1/3 border border-primary/30" />
        </div>
    </div>
);

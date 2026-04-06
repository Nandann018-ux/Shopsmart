import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseStyles = "bg-brand-gray-light/40 animate-pulse-slow overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-brand-neon/5 after:to-transparent after:animate-shimmer";
  
  const variants = {
    rect: "rounded-xl",
    circle: "rounded-full",
    text: "rounded h-4 w-full"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
};

export default Skeleton;

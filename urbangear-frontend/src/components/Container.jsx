import React from 'react';

const Container = ({ 
  children, 
  as: Component = 'div', 
  className = '', 
  size = 'xl',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  return (
    <Component 
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;

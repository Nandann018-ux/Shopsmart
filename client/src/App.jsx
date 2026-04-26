import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<Home />} />
            
            {/* Catalog */}
            <Route path="/shop" element={<Shop />} />
            
            {/* Product Page */}
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* Dedicated Checkout Flow */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;

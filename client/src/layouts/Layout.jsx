import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
    <Navbar />
    <main style={{ flex: 1, paddingTop: 'var(--nav-h)' }}>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;

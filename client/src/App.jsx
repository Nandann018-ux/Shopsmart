import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col bg-background text-white selection:bg-primary/30">
                    <Navbar />
                    <main className="flex-grow pt-24 px-6 max-w-7xl mx-auto w-full relative z-10">
                        {/* Background glowing orbs */}
                        <div className="fixed top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen" />
                        <div className="fixed bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen" />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/orders" element={<Orders />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

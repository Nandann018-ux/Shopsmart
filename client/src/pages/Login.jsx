import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
                await login(email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel p-8 w-full max-w-md relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                <h2 className="text-3xl font-bold mb-6 text-center tracking-tighter uppercase neon-text-primary">
                    {isLogin ? 'Welcome Back' : 'Join the Drop'}
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-textMuted mb-1 font-bold">Email Code</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-textMuted mb-1 font-bold">Passphrase</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/50"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-primary text-background font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-primary/90 mt-6 shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:shadow-[0_0_30px_rgba(0,255,204,0.5)] transition-all"
                    >
                        {isLogin ? 'Access Portal' : 'Register Identity'}
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-textMuted text-sm">
                    {isLogin ? "Don't have access? " : "Already registered? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary hover:underline font-bold"
                    >
                        {isLogin ? 'Sign up here' : 'Login here'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;

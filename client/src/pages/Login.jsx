import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import authService from '../services/authService';
import { motion } from 'framer-motion';
import { LogIn, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Basic Front-end Validation
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Operative ID Required';
        if (!formData.password) newErrors.password = 'Security Key Missing';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            // Attempt Neural Processing via authService
            await authService.login(formData);
            navigate('/');
        } catch (error) {
            console.error('Authentication failure:', error);
            setErrors({ 
                form: error.response?.data?.message || 'Access Denied: Invalid Credentials or API Offline' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container className="min-h-[80vh] flex items-center justify-center pt-20 pb-20 relative overflow-hidden">
                {/* Tactical Backdrop Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-neon/5 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md p-10 md:p-14 bg-brand-gray-dark/40 backdrop-blur-3xl border border-brand-gray-light rounded-[3rem] shadow-2xl relative z-10"
                >
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-brand-gray-dark border border-brand-gray-light rounded-2xl mb-8 text-brand-neon shadow-neon"
                        >
                            <LogIn size={32} />
                        </motion.div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-brand-white mb-2">
                            Secure <span className="text-brand-neon">Access</span>
                        </h1>
                        <p className="text-[10px] font-black text-brand-white/30 uppercase tracking-[0.4em]">
                            Enter Tactical Identification
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <Input
                            label="Operative Email"
                            type="email"
                            placeholder="OPERATIVE@SHOPSMART.HQ"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            error={errors.email}
                        />

                        <Input
                            label="Security Key"
                            type="password"
                            placeholder="••••••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            error={errors.password}
                        />

                        <div className="flex justify-end pt-2">
                            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-brand-white/20 hover:text-brand-neon transition-colors">
                                Forgotten Identification?
                            </a>
                        </div>

                        <Button 
                            type="submit" 
                            variant="neon" 
                            size="lg" 
                            className="w-full py-5 text-xs font-black tracking-[0.3em] uppercase mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-3">
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-brand-black/20 border-t-brand-black rounded-full"
                                    />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-3">
                                    Initialize
                                    <ArrowRight size={16} />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-12 text-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-gray-light opacity-20"></div></div>
                            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]">
                                <span className="px-4 bg-transparent text-brand-white/20">External Intel</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <button className="flex items-center justify-center gap-4 py-4 px-6 bg-brand-gray-dark border border-brand-gray-light rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-white/50 hover:text-brand-white hover:border-brand-white/20 transition-all group">
                                <Terminal size={18} className="group-hover:text-brand-neon transition-colors" />
                                Sync via Command
                            </button>
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/30">
                            New Operative? <Link to="/signup" className="text-brand-neon hover:underline underline-offset-4 ml-2">Request Identification</Link>
                        </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 pt-8 border-t border-brand-gray-light flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-tighter text-brand-white/10">
                        <ShieldCheck size={12} />
                        End-to-End Encrypted Tunnel
                    </div>
                </motion.div>
            </Container>
        </Layout>
    );
};

export default Login;

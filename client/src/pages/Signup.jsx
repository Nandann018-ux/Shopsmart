import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Mock Validation
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full Operative Name Required';
        if (!formData.email) newErrors.email = 'Valid Email ID Required';
        if (!formData.password) newErrors.password = 'Security Key Required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Keys Do Not Match';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        // Simulate Neural Database Sync
        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 1500);
    };

    return (
        <Layout>
            <Container className="min-h-[90vh] flex items-center justify-center pt-24 pb-24 relative overflow-hidden">
                {/* Tactical Backdrop Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-neon/5 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-lg p-10 md:p-14 bg-brand-gray-dark/40 backdrop-blur-3xl border border-brand-gray-light rounded-[3rem] shadow-2xl relative z-10"
                >
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 0 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-brand-gray-dark border border-brand-gray-light rounded-2xl mb-8 text-brand-neon shadow-neon"
                        >
                            <UserPlus size={32} />
                        </motion.div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-brand-white mb-2">
                            Request <span className="text-brand-neon italic">ID</span>
                        </h1>
                        <p className="text-[10px] font-black text-brand-white/30 uppercase tracking-[0.4em]">
                            Join the Tactical Collective
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Operative Name"
                                placeholder="FULL NAME"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})}
                                error={errors.name}
                                icon={<User size={14} />}
                            />
                            <Input
                                label="Email ID"
                                type="email"
                                placeholder="OPERATIVE@EMAIL.HQ"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                error={errors.email}
                            />
                        </div>

                        <Input
                            label="Security Key"
                            type="password"
                            placeholder="••••••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            error={errors.password}
                        />

                        <Input
                            label="Confirm Key"
                            type="password"
                            placeholder="••••••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            error={errors.confirmPassword}
                        />

                        <div className="pt-4">
                            <Button 
                                type="submit" 
                                variant="neon" 
                                size="lg" 
                                className="w-full py-5 text-xs font-black tracking-[0.3em] uppercase"
                                disabled={loading}
                            >
                                {loading ? "Syncing Identity..." : "Initialize Registration"}
                                {!loading && <ArrowRight size={16} className="ml-3" />}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/30">
                            Already Identified? <Link to="/login" className="text-brand-neon hover:underline underline-offset-4 ml-2">Secure Access</Link>
                        </p>
                    </div>

                    {/* Security Footer */}
                    <div className="mt-10 pt-6 border-t border-brand-gray-light flex items-center justify-center gap-6 opacity-20 group">
                         <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest group-hover:text-brand-neon transition-colors">
                            <ShieldCheck size={10} />
                            2FA Ready
                         </div>
                         <div className="w-[1px] h-3 bg-brand-gray-light" />
                         <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest group-hover:text-brand-neon transition-colors">
                            <Lock size={10} />
                            SSL Secured
                         </div>
                    </div>
                </motion.div>
            </Container>
        </Layout>
    );
};

export default Signup;

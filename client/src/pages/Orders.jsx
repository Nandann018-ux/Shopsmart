import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

const Orders = () => {
    const { api, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (token) {
                    const { data } = await api.get('/orders/my-orders');
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [token, api]);

    if (loading) {
        return <div className="text-center mt-20 text-textMuted animate-pulse-fast">Loading your drops...</div>;
    }

    return (
        <div className="pb-20">
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter neon-text-primary">
                Your Secured Drops
            </h2>

            {orders.length === 0 ? (
                <div className="glass-panel text-center p-12 text-textMuted flex flex-col items-center">
                    <Package className="w-16 h-16 mb-4 opacity-50" />
                    <h3 className="text-xl text-white font-bold mb-2">No drops secured yet.</h3>
                    <p>Wait for the next flash sale to grab exclusive items.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={order.id}
                            className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-6">
                                {order.product.imageUrl && (
                                    <img src={order.product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'} className="w-20 h-20 object-cover rounded-lg border border-white/10" alt="Product" />
                                )}
                                <div>
                                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{order.product.title}</h4>
                                    <p className="text-sm text-textMuted mt-1">Order ID: <span className="font-mono text-xs">{order.id}</span></p>
                                    <p className="text-sm text-textMuted">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-0 text-left md:text-right flex flex-col h-full justify-between">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${order.status === 'COMPLETED' ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-secondary/20 text-secondary border border-secondary/50'
                                    }`}>
                                    {order.status}
                                </span>
                                <div>
                                    <span className="text-textMuted text-sm mr-2">Qty: {order.quantity}</span>
                                    <span className="text-2xl font-bold font-mono">${order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import productService from '../../services/productService';

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getTrendingProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return (
        <div className="py-24 px-6 md:px-12 text-center opacity-30 font-black uppercase tracking-widest">
            Loading Gear...
        </div>
    );

    return (
        <section className="section-padding border-t-thin">
            <div className="site-container">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
                    <div>
                        <span className="text-meta mb-4 block">New Drops</span>
                        <h2 className="text-5xl font-black uppercase tracking-tightest">
                            Latest <br /> 
                            Deployments
                        </h2>
                    </div>
                    <Link to="/shop" className="text-meta hover:underline decoration-2 underline-offset-8 transition-all">
                        View All Units →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
                    {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                            <Card
                                title={product.title}
                                subtitle={product.category}
                                image={product.thumbnail}
                                price={product.price}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;

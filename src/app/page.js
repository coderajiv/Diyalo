"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/product';
import { useCart } from '@/app/context/CartContext';
import { FaShoppingCart, FaShieldAlt, FaShippingFast, FaHeadset } from 'react-icons/fa';

// Custom Hook for Scroll Animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
}

// Helper function to get random products
function getFeaturedProducts(allProducts, count) {
  const shuffled = Object.values(allProducts).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  const [heroRef, heroIsVisible] = useScrollAnimation();
  const [featuresRef, featuresIsVisible] = useScrollAnimation();
  const [productsRef, productsIsVisible] = useScrollAnimation();
  const [brandsRef, brandsIsVisible] = useScrollAnimation();

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts(products, 6));
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const featureItems = [
    { icon: <FaShieldAlt className="text-4xl text-blue-500" />, title: "Genuine Products", description: "100% authentic products from trusted brands." },
    { icon: <FaShippingFast className="text-4xl text-blue-500" />, title: "Fast Delivery", description: "Swift and reliable delivery right to your doorstep in Bharatpur." },
    { icon: <FaHeadset className="text-4xl text-blue-500" />, title: "24/7 Support", description: "Our team is always here to help with your queries." }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className={`w-full text-center py-24 px-4 transition-opacity duration-1000 ${heroIsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="bg-white/60 shadow-2xl rounded-3xl p-10 max-w-4xl w-full mx-auto backdrop-blur-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-4 drop-shadow-lg">
            The Diyalo Traders
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Your trusted source in Nepal for the latest smartphones and premium accessories.
          </p>
          <Link
            href="/products"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 text-lg"
          >
            Shop All Products
          </Link>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section ref={featuresRef} className={`max-w-6xl w-full px-6 py-16 transition-opacity duration-1000 ${featuresIsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureItems.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                </div>
            ))}
         </div>
      </section>

      {/* Featured Products Section */}
      <section ref={productsRef} className={`w-full bg-white py-20`}>
        <div className={`max-w-6xl mx-auto px-6 transition-opacity duration-1000 ${productsIsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
                <div key={product.id} style={{ transitionDelay: `${index * 100}ms` }} className={`transition-all duration-500 ${productsIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <Link
                    href={`/products/${product.id}`}
                    className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl p-6 transform hover:-translate-y-2 transition-all duration-300 group h-full"
                    >
                    <div className="relative w-full h-56">
                        <Image src={product.image} alt={product.name} fill sizes="50vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"/>
                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">New</span>
                    </div>
                    <div className="mt-4 flex flex-col flex-grow text-center">
                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{product.name}</h3>
                        <p className="text-pink-600 font-bold text-xl my-2">${product.price}</p>
                        <div className="mt-auto pt-4">
                        <button onClick={(e) => handleAddToCart(e, product)} className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-900 transition-colors">
                            <FaShoppingCart /> Add to Cart
                        </button>
                        </div>
                    </div>
                    </Link>
                </div>
            ))}
            </div>
        </div>
      </section>
      
      {/* Brands Section */}
      <section ref={brandsRef} className={`max-w-6xl w-full px-6 py-20 transition-opacity duration-1000 ${brandsIsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Trusted Brands</h2>
        <div className="flex justify-center items-center gap-12 flex-wrap">
            <span className="text-4xl font-bold text-gray-500 transition hover:text-black">Apple</span>
            <span className="text-4xl font-bold text-gray-500 transition hover:text-black">Samsung</span>
            <span className="text-4xl font-bold text-gray-500 transition hover:text-black">Google</span>
            <span className="text-4xl font-bold text-gray-500 transition hover:text-black">Xiaomi</span>
        </div>
      </section>

    </main>
  );
}
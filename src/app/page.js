'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import products from '../data/product'

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = React.useState(null)

  // Take first 6 products as "featured"
  const featuredProducts = Object.values(products).slice(0, 6)

  // Example related products (you can later fetch these dynamically)
  const relatedProducts = {
    1: [
      { id: 101, name: 'iPhone 15 Case', image: '/iphonecase.jpg' },
      { id: 102, name: 'Apple Watch Series 9', image: '/applewatch series9.jpg' },
    ],
    2: [
      { id: 103, name: 'Samsung Buds', image: '/galaxybuds2.jpg' },
      { id: 104, name: 'Galaxy Watch', image: '/galaxywatch.jpg' },
    ],
    3: [
      { id: 105, name: 'AirPods Case', image: '/airpodscase.jpg' },
      { id: 106, name: 'Wireless Charger', image: '/charger.jpg' },
    ],
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 transition-all duration-700">
      {/* Hero Section */}
      <section className="bg-white/80 shadow-2xl rounded-3xl p-10 max-w-3xl w-full text-center backdrop-blur-md animate-fade-in-down mt-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-4 drop-shadow-lg animate-fade-in">
          The Diyalo Traders
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate-fade-in delay-100">
          Discover the latest smartphones and premium accessories, curated for your needs.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 animate-bounce"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mt-16 max-w-6xl w-full px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="flex flex-col items-center cursor-pointer bg-white/90 rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${idx * 100 + 200}ms` }}
              onClick={() => setSelectedProduct(product.id)}
            >
              <div className="relative w-32 h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mb-2 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow animate-pulse">
                  New
                </span>
              </div>
              <span className="font-semibold text-lg text-gray-800 mt-2 group-hover:text-blue-700 transition-colors duration-300">
                {product.name}
              </span>
              <span className="text-pink-600 font-bold mt-1">${product.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Modal */}
      {selectedProduct && (
        <section className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scale-in">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(relatedProducts[selectedProduct] || []).map((rel, idx) => (
                <div
                  key={rel.id}
                  className="flex flex-col items-center animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover mb-2 rounded-lg shadow"
                  />
                  <span className="font-medium text-gray-700">{rel.name}</span>
                </div>
              ))}
            </div>
            <button
              className="mt-6 px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

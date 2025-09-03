"use client";

import { useState, useEffect, useMemo } from 'react'; // 1. Import useMemo
import Link from 'next/link';
import Image from 'next/image';
import products from '@/data/product';
import FilterBar from '@/app/components/FilterBar';

export default function ProductsPage() {
  // 2. Wrap Object.values(products) in useMemo to stabilize it
  const allProducts = useMemo(() => Object.values(products), []);

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    price: '',
  });

  const categories = useMemo(() => [...new Set(allProducts.map(p => p.category))], [allProducts]);
  const brands = useMemo(() => [...new Set(allProducts.map(p => p.brand))], [allProducts]);

  useEffect(() => {
    let tempProducts = [...allProducts];

    if (filters.category) {
      tempProducts = tempProducts.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      tempProducts = tempProducts.filter(p => p.brand === filters.brand);
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      tempProducts = tempProducts.filter(p => p.price >= min && p.price < (max || Infinity));
    }

    setFilteredProducts(tempProducts);
  }, [filters, allProducts]); // Now this useEffect is safe

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Products</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterBar
              categories={categories}
              brands={brands}
              activeFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                  >
                    <div className="relative w-full h-56 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="font-semibold text-lg text-gray-900 truncate" title={product.name}>
                        {product.name}
                      </h2>
                      <p className="text-pink-600 font-bold text-xl mt-1">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
"use client";

import React from 'react';

// A reusable button component for a consistent look
const FilterButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${isActive ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-100'}`}
  >
    {label}
  </button>
);

export default function FilterBar({ categories, brands, activeFilters, onFilterChange }) {
  // Define the price ranges, including one to clear the price filter
  const priceRanges = [
    { label: 'Any Price', value: '' },
    { label: 'Under $ 50', value: '0-50' },
    { label: 'Under $ 100', value: '50-100' },
    { label: 'Over $ 100', value: '100-500' },
    { label: 'Over $ 500', value: '500-1000' },
    { label: 'Over $ 1000', value: '1000-Infinity' },
  ];

  return (
    <aside className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Filters</h3>

      {/* Category Filter Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-700">Category</h4>
        <div className="space-y-1">
          <FilterButton 
            label="All Categories" 
            isActive={!activeFilters.category} 
            onClick={() => onFilterChange('category', '')} 
          />
          {categories.map(category => (
            <FilterButton 
              key={category} 
              label={category} 
              isActive={activeFilters.category === category} 
              onClick={() => onFilterChange('category', category)} 
            />
          ))}
        </div>
      </div>

      {/* Brand Filter Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-700">Brand</h4>
        <div className="space-y-1">
          <FilterButton 
            label="All Brands" 
            isActive={!activeFilters.brand} 
            onClick={() => onFilterChange('brand', '')} 
          />
          {brands.map(brand => (
            <FilterButton 
              key={brand} 
              label={brand} 
              isActive={activeFilters.brand === brand} 
              onClick={() => onFilterChange('brand', brand)} 
            />
          ))}
        </div>
      </div>

      {/* Price Filter Section */}
      <div>
        <h4 className="font-semibold mb-3 text-gray-700">Price</h4>
        <div className="space-y-1">
          {priceRanges.map(range => (
            <FilterButton 
              key={range.value} 
              label={range.label} 
              isActive={activeFilters.price === range.value} 
              onClick={() => onFilterChange('price', range.value)} 
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
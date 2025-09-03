"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import products from "../../data/product";

export default function SearchBar({ className }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const filtered = Object.values(products).filter((p) =>
      p.name.toLowerCase().includes(lower)
    );
    setResults(filtered);
  };

  const handleSelect = (productId) => {
    router.push(`/products/${productId}`);
    setQuery("");
    setResults([]);
    setIsFocused(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="border-2 border-transparent bg-white/20 focus:bg-white focus:border-blue-300 rounded-full px-4 py-1 w-full text-white focus:text-black placeholder-gray-300 focus:placeholder-gray-500 transition focus:outline-none"
      />
      {isFocused && query && (
        <div className="absolute bg-white border w-full mt-2 z-50 max-h-60 overflow-y-auto rounded-md shadow-lg">
          {results.length > 0 ? (
            results.map((p) => (
              <div
                key={p.id}
                className="p-2 text-black hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelect(p.id)}
              >
                {p.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function ProductDisplay({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Main Product Section: Image + Purchase Info */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md">
        {/* Image Column */}
        <div className="relative w-full h-96">
          <Image src={product.image} alt={product.name} fill className="object-contain" />
        </div>

        {/* Details & Actions Column */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-pink-600 text-2xl font-semibold mt-2">
            $ {product.price?.toLocaleString()}
          </p>
          <div className="mt-3 flex items-center gap-2 text-lg">
            {/* I also fixed the typo here for you */}
            <span className="text-yellow-400">Ratings: {product.rating} / 5</span>
            <span className="text-gray-500">({product.reviews.length} reviews)</span>
          </div>
          <p className="text-gray-700 mt-4">{product.desc}</p>
          <button onClick={handleAddToCart} className="mt-8 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Secondary Information Section: Features + Reviews */}
      <div className="mt-12 pt-8 border-t bg-white p-8 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Key Features Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            {product.details?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {product.details.map((detail, index) => <li key={index}>{detail}</li>)}
              </ul>
            ) : <p className="text-gray-500">No details available.</p>}
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {product.reviews?.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-l-4 border-pink-500 pl-4">
                    <p className="text-gray-700 italic">"{review.comment}"</p>
                    <p className="text-right text-gray-600 font-semibold mt-2">- {review.user}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500">No reviews yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
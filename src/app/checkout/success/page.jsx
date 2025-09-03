"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="p-8 text-center max-w-lg mx-auto bg-white my-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed! ✅</h1>
      <p className="text-gray-700 mb-8">Thank you for your purchase. We've received your order and will process it shortly.</p>
      <Link href="/products" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Continue Shopping
      </Link>
    </div>
  );
}
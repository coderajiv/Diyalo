'use client';

import React from "react";
import Link from "next/link";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white my-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeFromCart} />
            ))}
          </div>
          <div className="mt-8 pt-4 border-t text-right">
            <p className="font-semibold text-2xl">Total: $ {getTotal()}</p>
            <Link href="/checkout" className="inline-block mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
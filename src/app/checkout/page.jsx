"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { getCurrentUser } from "@/auth"; // Make sure getCurrentUser is imported
import PaymentForm from "../components/PaymentForm";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({ fullName: "", address: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✨ --- FIX: ADD THIS AUTHENTICATION CHECK --- ✨
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert("You must be logged in to place an order.");
      // Redirect to login, preserving the checkout page as the return destination
      router.push(`/login?redirectTo=/checkout`);
      return; // Stop the function from proceeding
    }
    // ✨ --- END OF FIX --- ✨

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("Please fill in all shipping details.");
      return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: `order_${Date.now()}`,
      userId: currentUser.email,
      date: new Date().toLocaleDateString(),
      shippingDetails: formData,
      paymentMethod: paymentMethod,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    clearCart();

    if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
        alert(`Order placed! Simulating redirection to ${paymentMethod}...`);
    } else {
        alert('Order placed successfully!');
    }

    router.push("/checkout/success");
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white my-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="w-full border p-2 rounded" required />
            <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Full Address (e.g., Main Road, Bharatpur-10)" className="w-full border p-2 rounded" required />
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-full border p-2 rounded" required />
          </div>
        </div>

        <PaymentForm 
            selectedMethod={paymentMethod} 
            onMethodChange={setPaymentMethod} 
        />

        <div className="border-t pt-6">
            <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total Amount:</span>
                <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold transition">
                Place Order
            </button>
        </div>
      </form>
    </div>
  );
}
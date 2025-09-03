import React from "react";
import Image from "next/image";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Image src={item.image || "/placeholder.png"} alt={item.name} width={80} height={80} className="object-cover rounded-lg" />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">Price: ${item.price}</p>
          <p className="text-gray-700 font-medium">Subtotal: ${subtotal}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 border rounded-lg p-1">
          <button onClick={() => onDecrease(item.id)} disabled={item.quantity <= 1} className="w-8 h-8 rounded disabled:opacity-50 hover:bg-gray-100">-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)} className="w-8 h-8 rounded hover:bg-gray-100">+</button>
        </div>
        <button onClick={() => onRemove(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
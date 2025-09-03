"use client";

// This component now includes the Credit/Debit Card option and its fields.
export default function PaymentForm({ selectedMethod, onMethodChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payment Method</h2>
      
      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={selectedMethod === "cod"}
          onChange={() => onMethodChange("cod")}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span>Cash on Delivery</span>
      </label>

      {/* NEW: Credit/Debit Card Option */}
      <div className="border rounded-lg hover:bg-gray-50 transition">
        <label className="flex items-center space-x-3 p-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selectedMethod === "card"}
            onChange={() => onMethodChange("card")}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span>Credit / Debit Card</span>
        </label>
        
        {/* Conditional Fields for Card Details */}
        {selectedMethod === 'card' && (
          <div className="p-4 border-t space-y-3 bg-gray-50">
            <input 
              type="text" 
              placeholder="Cardholder Name" 
              className="w-full border p-2 rounded" 
              required={selectedMethod === 'card'} // Required only if this method is selected
            />
            <input 
              type="text" 
              placeholder="Card Number" 
              className="w-full border p-2 rounded" 
              required={selectedMethod === 'card'}
            />
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="MM/YY" 
                className="w-1/2 border p-2 rounded" 
                required={selectedMethod === 'card'}
              />
              <input 
                type="text" 
                placeholder="CVV" 
                className="w-1/2 border p-2 rounded" 
                required={selectedMethod === 'card'}
              />
            </div>
          </div>
        )}
      </div>

      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="esewa"
          checked={selectedMethod === "esewa"}
          onChange={() => onMethodChange("esewa")}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span>eSewa</span>
      </label>

      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="khalti"
          checked={selectedMethod === "khalti"}
          onChange={() => onMethodChange("khalti")}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span>Khalti</span>
      </label>
      </div>
    );
  }
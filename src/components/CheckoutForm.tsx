import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const CheckoutForm: React.FC = () => {
  const { setCustomerDetails, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    zipCode: '',
    paymentMethod: 'COD' as 'COD' | 'POD'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerDetails(formData);
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="Enter your phone number"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
            <textarea
              required
              placeholder="Enter your complete delivery address"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base resize-none"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              required
              placeholder="Enter your ZIP code"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base bg-white"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'COD' | 'POD' })}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="POD">Pay on Delivery</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-base transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ImportReviews: React.FC = () => {
  const [source, setSource] = useState('');
  const [productId, setProductId] = useState('');
  const { products, importReviews } = useStore();

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await importReviews(productId, source);
      setSource('');
      setProductId('');
      alert('Reviews imported successfully!');
    } catch (error) {
      alert('Failed to import reviews. Please try again.');
    }
  };

  return (
    <form onSubmit={handleImport} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
        <select
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Review Source</label>
        <select
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">Select a source</option>
          <option value="google">Google Reviews</option>
          <option value="trustpilot">Trustpilot</option>
          <option value="amazon">Amazon Reviews</option>
        </select>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center w-full gap-2 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
      >
        <Download size={20} />
        Import Reviews
      </button>
    </form>
  );
};
import React from 'react';
import { useStore } from '../store/useStore';

export const CategoryFilter: React.FC = () => {
  const { products, setFilter, categoryFilter } = useStore();
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="sticky top-20 bg-white shadow-sm rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => setFilter('')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            categoryFilter === '' 
              ? 'bg-blue-50 text-blue-700 font-medium' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              categoryFilter === category 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
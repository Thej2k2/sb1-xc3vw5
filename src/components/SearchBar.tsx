import React from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SearchBar: React.FC = () => {
  const { setSearchQuery } = useStore();

  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};
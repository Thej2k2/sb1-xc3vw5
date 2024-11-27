import React from 'react';
import { ShoppingCart, Edit, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/currency';
import { ProductReviews } from './ProductReviews';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const { addToCart, isAdmin } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover"
        />
        {!isAdmin && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => addToCart(product)}
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        )}
        {isAdmin && (
          <button
            onClick={() => onEdit?.(product)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
          >
            <Edit size={16} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
          <span className="text-sm text-green-600 font-medium">Free Delivery</span>
        </div>
        <div className="mt-4">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
};
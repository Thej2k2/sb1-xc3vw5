import { create } from 'zustand';
import { Product, CartItem, CustomerDetails, Review } from '../types';

interface StoreState {
  products: Product[];
  cart: CartItem[];
  isAdmin: boolean;
  customerDetails: CustomerDetails | null;
  searchQuery: string;
  categoryFilter: string;
  reviews: { [productId: string]: Review[] };
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomerDetails: (details: CustomerDetails) => void;
  toggleAdmin: () => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  setFilter: (category: string) => void;
  importReviews: (productId: string, source: string) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: 299.99,
      description: 'Advanced smartwatch with health monitoring features',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      description: 'Comfortable and sustainable cotton t-shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      category: 'Clothing'
    }
  ],
  cart: [],
  isAdmin: false,
  customerDetails: null,
  searchQuery: '',
  categoryFilter: '',
  reviews: {},
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? product : p
      ),
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: quantity === 0
        ? state.cart.filter((item) => item.id !== productId)
        : state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
    })),
  setCustomerDetails: (details) => set({ customerDetails: details }),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  clearCart: () => set({ cart: [] }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (category) => set({ categoryFilter: category }),
  importReviews: async (productId: string, source: string) => {
    try {
      // This is where you would integrate with external review APIs
      const response = await fetch(`/api/import-reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, source })
      });
      
      if (!response.ok) throw new Error('Failed to import reviews');
      
      const reviews = await response.json();
      set((state) => ({
        reviews: {
          ...state.reviews,
          [productId]: reviews
        }
      }));
    } catch (error) {
      console.error('Error importing reviews:', error);
      throw error;
    }
  }
}));
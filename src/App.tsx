import React, { useState } from 'react';
import { ShoppingBag, Settings, Menu, X, Search, Sparkles } from 'lucide-react';
import { useStore } from './store/useStore';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { AdminPanel } from './components/AdminPanel';
import { CategoryFilter } from './components/CategoryFilter';

function App() {
  const { products, cart, isAdmin, toggleAdmin, searchQuery, categoryFilter } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const filteredProducts = products
    .filter((product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => 
      categoryFilter ? product.category === categoryFilter : true
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Glimmer Shops</h1>
            </div>
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  onChange={(e) => useStore.getState().setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isAdmin && (
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="relative"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <button
                onClick={toggleAdmin}
                className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Settings size={20} />
                {isAdmin ? 'Customer View' : 'Admin View'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <Search size={24} />
        </button>
        {showSearch && (
          <div className="fixed inset-x-0 bottom-0 z-30 bg-white p-4 shadow-lg">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => useStore.getState().setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {isAdmin ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AdminPanel />
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Current Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block">
              <CategoryFilter />
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            {showCart && (
              <div className="fixed inset-0 z-50 bg-black/50">
                <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white">
                  <Cart onClose={() => setShowCart(false)} />
                  {cart.length > 0 && <CheckoutForm />}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
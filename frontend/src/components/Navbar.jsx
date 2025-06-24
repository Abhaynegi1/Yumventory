import React, { useState } from 'react';
import { Search, Barcode, ChefHat, X, Menu, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  barcodeQuery,
  setBarcodeQuery,
  isOpen,
  onClose
}) => {
  const [activeField, setActiveField] = useState('name');

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t-4 border-orange-400 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-orange-500" />
              <label className="text-lg font-semibold text-gray-800">Product Name</label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products like 'chocolate', 'bread', 'milk'..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setBarcodeQuery('');
                }}
                onFocus={() => setActiveField('name')}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-lg placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Barcode className="w-5 h-5 text-orange-500" />
              <label className="text-lg font-semibold text-gray-800">Barcode</label>
              {activeField === 'barcode' && (
                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                  Active
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter product barcode (e.g., 3017620422003)"
                value={barcodeQuery}
                onChange={(e) => {
                  setBarcodeQuery(e.target.value);
                  setSearchQuery('');
                }}
                onFocus={() => setActiveField('barcode')}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-lg placeholder-gray-400"
              />
              <Barcode className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              {barcodeQuery && (
                <button
                  onClick={() => setBarcodeQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setBarcodeQuery('');
                }}
                className="px-6 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
              >
                Clear Search
              </button>
            </div>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({
  searchQuery = '',
  setSearchQuery = () => {},
  barcodeQuery = '',
  setBarcodeQuery = () => {},
  isLoading = false
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartTotal } = useCart();

  // Handle escape key to close search
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const hasActiveFilters = searchQuery || barcodeQuery;
  const cartItemCount = getCartTotal();

  return (
    <nav className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Yumventory</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                isSearchOpen || hasActiveFilters
                  ? 'bg-white/20 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/90 hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="text-sm font-semibold">Search</span>
              {hasActiveFilters && (
                <span className="bg-yellow-400 text-orange-800 text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                  {[searchQuery, barcodeQuery].filter(Boolean).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-3 px-6 py-3 bg-white/10 text-white/90 hover:bg-white/20 hover:scale-105 rounded-xl transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isLoading && (
              <div className="flex items-center space-x-3 text-white/90 text-sm bg-white/10 px-4 py-2 rounded-lg">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                isSearchOpen || hasActiveFilters
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="text-sm font-semibold">Search</span>
              {hasActiveFilters && (
                <span className="bg-yellow-400 text-orange-800 text-xs px-3 py-1 rounded-full font-bold">
                  {[searchQuery, barcodeQuery].filter(Boolean).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white/10 text-white/90 hover:bg-white/20 rounded-xl transition-all duration-300 mt-3"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isLoading && (
              <div className="mt-3 flex items-center justify-center space-x-3 text-white/90 text-sm bg-white/10 px-4 py-2 rounded-lg">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            )}
          </div>
        )}
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        barcodeQuery={barcodeQuery}
        setBarcodeQuery={setBarcodeQuery}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </nav>
  );
};

export default Navbar; 
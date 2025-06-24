import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartModal = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  const handleQuantityChange = (productCode, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productCode);
    } else {
      updateQuantity(productCode, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {getCartTotal()} items
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.code} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image_url || 'https://via.placeholder.com/80x80?text=No+Image'}
                        alt={item.product_name || 'Product'}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-base line-clamp-2 mb-1">
                        {item.product_name || 'Unknown Product'}
                      </h3>
                      {item.brands && (
                        <p className="text-sm text-gray-600 mb-2">{item.brands}</p>
                      )}
                      {item.nutrition_grades && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Grade:</span>
                          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {item.nutrition_grades.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                        <button
                          onClick={() => handleQuantityChange(item.code, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.code, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.code)}
                        className="p-2 hover:bg-red-100 rounded-full transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-800">
                  Total: {getCartTotal()} items
                </span>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal; 
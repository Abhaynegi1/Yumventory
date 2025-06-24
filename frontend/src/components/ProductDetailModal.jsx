import React from 'react';
import { X, Calendar, Tag, Zap, Award, Globe, Package, Info, Star, Scale, Plus } from 'lucide-react';
import { getGradeColor } from '../utils/getGradeColor';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  
  if (!product) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start space-x-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={product.image_url || 'https://via.placeholder.com/150x150?text=No+Image'}
                alt={product.product_name || 'Product'}
                className="w-32 h-32 object-cover rounded-xl border-2 border-white/30 bg-white/20"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                {product.product_name || 'Unknown Product'}
              </h2>
              
              <div className="flex items-center space-x-3 mb-4">
                {product.brands && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {product.brands}
                  </span>
                )}
                {product.nutrition_grades && (
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getGradeColor(product.nutrition_grades)}`}>
                    Grade {product.nutrition_grades.toUpperCase()}
                  </span>
                )}
              </div>
              
              {product.quantity && (
                <div className="flex items-center space-x-2 text-white/90">
                  <Package className="w-5 h-5" />
                  <span className="text-sm">{product.quantity}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {product.nutrition_score_fr && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-700">Nutrition Score</span>
                </div>
                <span className="text-xl font-bold text-orange-800">{product.nutrition_score_fr}/100</span>
              </div>
            )}
            
            {product.created_t && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">Added</span>
                </div>
                <span className="text-sm font-medium text-blue-800">{formatDate(product.created_t)}</span>
              </div>
            )}
            
            {product.categories && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Category</span>
                </div>
                <span className="text-sm font-medium text-green-800 line-clamp-2">
                  {product.categories.split(',')[0]}
                </span>
              </div>
            )}
            
            {product.countries && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">Origin</span>
                </div>
                <span className="text-sm font-medium text-purple-800 line-clamp-2">
                  {product.countries.split(',')[0]}
                </span>
              </div>
            )}
          </div>

          {/* Detailed Information */}
          <div className="space-y-8">
            {/* Ingredients Section */}
            {product.ingredients_text && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {truncateText(product.ingredients_text, 300)}
                </p>
                {product.ingredients_text.length > 300 && (
                  <button className="text-orange-600 text-sm font-medium mt-3 hover:underline">
                    Show more
                  </button>
                )}
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Code */}
              {product.code && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Product Code</span>
                  </div>
                  <span className="text-sm font-mono text-gray-800">{product.code}</span>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Scale className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-semibold text-red-700">Allergens</span>
                  </div>
                  <span className="text-sm text-red-800">{product.allergens}</span>
                </div>
              )}

              {/* Labels */}
              {product.labels && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700">Labels</span>
                  </div>
                  <span className="text-sm text-yellow-800">{product.labels}</span>
                </div>
              )}

              {/* Stores */}
              {product.stores && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">Available At</span>
                  </div>
                  <span className="text-sm text-blue-800">{product.stores}</span>
                </div>
              )}
            </div>

            {/* Nutrition Facts Preview */}
            {product.nutriments && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Scale className="w-6 h-6 text-gray-600" />
                  <span>Nutrition Facts (per 100g)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {product.nutriments.energy_100g && (
                    <div>
                      <span className="text-gray-600">Energy:</span>
                      <span className="font-medium text-gray-800 ml-1">
                        {product.nutriments.energy_100g} kcal
                      </span>
                    </div>
                  )}
                  {product.nutriments.fat_100g && (
                    <div>
                      <span className="text-gray-600">Fat:</span>
                      <span className="font-medium text-gray-800 ml-1">
                        {product.nutriments.fat_100g}g
                      </span>
                    </div>
                  )}
                  {product.nutriments.carbohydrates_100g && (
                    <div>
                      <span className="text-gray-600">Carbs:</span>
                      <span className="font-medium text-gray-800 ml-1">
                        {product.nutriments.carbohydrates_100g}g
                      </span>
                    </div>
                  )}
                  {product.nutriments.proteins_100g && (
                    <div>
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-medium text-gray-800 ml-1">
                        {product.nutriments.proteins_100g}g
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Add to Cart Button */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-8 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal; 
import React, { useState } from 'react';
import { ShoppingCart, Tag, Calendar, Award, Star, Zap, Eye, Plus } from 'lucide-react';
import { getGradeColor } from '../utils/getGradeColor';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getImageUrl = () => {
    if (imageError) {
      return 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image';
    }
    return product.image_url || 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getNutritionScoreColor = (score) => {
    if (!score) return 'text-gray-400';
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    if (score >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-orange-300 transform hover:-translate-y-1 hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="aspect-square relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-gray-400 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={getImageUrl()}
            alt={product.product_name || 'Product'}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Product badges */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
            {product.brands && (
              <div className="px-2 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-medium text-gray-800 shadow-md border border-white/50">
                {product.brands}
              </div>
            )}
            
            {product.nutrition_grades && (
              <div className={`px-2 py-1 rounded-full text-white text-xs font-bold shadow-md ${getGradeColor(product.nutrition_grades)}`}>
                {product.nutrition_grades.toUpperCase()}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-center space-x-2">
              <button 
                className="p-2 bg-white/95 backdrop-blur-md rounded-full hover:bg-white transition-all duration-200 transform hover:scale-110 shadow-md border border-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                <Eye className="w-3 h-3 text-gray-700" />
              </button>
              <button 
                className="p-2 bg-orange-500/95 backdrop-blur-md rounded-full hover:bg-orange-600 transition-all duration-200 transform hover:scale-110 shadow-md border border-orange-400 text-white"
                onClick={handleAddToCart}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 leading-tight">
            {product.product_name || 'Unknown Product'}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          {product.nutrition_score_fr && (
            <div className="flex items-center space-x-1.5">
              <div className="p-1 bg-orange-100 rounded-md">
                <Zap className="w-2.5 h-2.5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Score</p>
                <p className={`text-xs font-bold ${getNutritionScoreColor(product.nutrition_score_fr)}`}>
                  {product.nutrition_score_fr}/100
                </p>
              </div>
            </div>
          )}

          {product.created_t && (
            <div className="flex items-center space-x-1.5">
              <div className="p-1 bg-blue-100 rounded-md">
                <Calendar className="w-2.5 h-2.5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Added</p>
                <p className="text-xs font-semibold text-gray-700">
                  {formatDate(product.created_t)}
                </p>
              </div>
            </div>
          )}
        </div>

        {product.categories && (
          <div className="flex items-center space-x-1.5">
            <div className="p-1 bg-green-100 rounded-md">
              <Tag className="w-2.5 h-2.5 text-green-600" />
            </div>
            <span className="text-xs text-gray-600 line-clamp-1">
              {truncateText(product.categories, 30)}
            </span>
          </div>
        )}

        {product.ingredients_text && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              <span className="font-medium text-gray-700">Ingredients:</span> {truncateText(product.ingredients_text, 60)}
            </p>
          </div>
        )}

        <div className="pt-2 flex space-x-2">
          <button 
            className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white text-xs font-semibold rounded-lg hover:from-orange-600 hover:via-orange-700 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1.5 shadow-md hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Eye className="w-3 h-3" />
            <span>View Details</span>
          </button>
          <button 
            className="px-3 py-2 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
            onClick={handleAddToCart}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-400 transition-all duration-300 pointer-events-none"></div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/3 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard; 
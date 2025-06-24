import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, Grid3X3 } from 'lucide-react';

const ProductGrid = ({ products, onProductClick }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Products Found</h3>
          <p className="text-gray-600 text-sm">Try adjusting your search or filters to find products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Grid3X3 className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800">Products</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 lg:gap-4">
        {products.map((product, index) => (
          <div
            key={product.id || index}
            className="group animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ProductCard
              product={product}
              onClick={() => onProductClick(product)}
            />
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Showing {products.length} of {products.length} products
        </p>
      </div>
    </div>
  );
};

export default ProductGrid; 
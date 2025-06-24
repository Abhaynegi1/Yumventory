import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Filter } from 'lucide-react';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import { CartProvider } from './context/CartContext';

const FoodProductExplorer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Auto-open sidebar on desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsFilterSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const fetchProductsHandler = async (page = 1, append = false) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page=${page}&page_size=20`
      );
      const data = await response.json();
      if (data.products) {
        const newProducts = append ? [...products, ...data.products] : data.products;
        setProducts(newProducts);
        setFilteredProducts(newProducts);
        setSortedProducts(newProducts);
        setHasMore(data.products.length === 20);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const fetchCategoriesHandler = async () => {
    try {
      const response = await fetch('https://world.openfoodfacts.org/categories.json');
      const data = await response.json();
      if (data.tags) {
        setCategories(data.tags.slice(0, 50));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const searchProductsHandler = async (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20`
      );
      const data = await response.json();
      if (data.products) {
        setFilteredProducts(data.products);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setFilteredProducts([]);
    }
    setLoading(false);
  };

  const searchByBarcodeHandler = async (barcode) => {
    if (!barcode.trim()) {
      setFilteredProducts(products);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1 && data.product) {
        setFilteredProducts([data.product]);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error searching by barcode:', error);
      setFilteredProducts([]);
    }
    setLoading(false);
  };

  const filterByCategoryHandler = useCallback((category) => {
    if (!category) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter(product =>
      product.categories && product.categories.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const sortProductsHandler = useCallback((productsToSort, sortBy, order) => {
    return [...productsToSort].sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = (a.product_name || '').toLowerCase();
          bValue = (b.product_name || '').toLowerCase();
          break;
        case 'grade':
          aValue = a.nutrition_grades || 'z';
          bValue = b.nutrition_grades || 'z';
          break;
        case 'category':
          aValue = (a.categories || '').toLowerCase();
          bValue = (b.categories || '').toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.created_t || 0);
          bValue = new Date(b.created_t || 0);
          break;
        default:
          return 0;
      }
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, []);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProductsHandler(nextPage, true);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchProductsHandler();
    fetchCategoriesHandler();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    if (searchQuery) {
      searchProductsHandler(searchQuery);
    } else if (barcodeQuery) {
      searchByBarcodeHandler(barcodeQuery);
    } else if (selectedCategory) {
      filterByCategoryHandler(selectedCategory);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, barcodeQuery, selectedCategory, filterByCategoryHandler, products]);

  // Handle sorting
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const sorted = sortProductsHandler(filteredProducts, sortBy, sortOrder);
      setSortedProducts(sorted);
    } else {
      setSortedProducts([]);
    }
  }, [filteredProducts, sortBy, sortOrder, sortProductsHandler]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        barcodeQuery={barcodeQuery}
        setBarcodeQuery={setBarcodeQuery}
        isLoading={loading}
      />
      
      <div className="flex">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
        />

        <div className="flex-1 lg:ml-0">
          {/* Mobile filter toggle */}
          <div className="lg:hidden p-4">
            <button
              onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Filter className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Filters & Sort</span>
              {(selectedCategory || sortBy !== 'name' || sortOrder !== 'asc') && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {[selectedCategory, sortBy !== 'name' ? 1 : 0, sortOrder !== 'asc' ? 1 : 0].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          <main className="max-w-7xl mx-auto p-4 lg:px-8">
            {loading && sortedProducts.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                {(searchQuery || barcodeQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setBarcodeQuery('');
                      setSelectedCategory('');
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <ProductGrid
                  products={sortedProducts}
                  onProductClick={setSelectedProduct}
                />
                {hasMore && !searchQuery && !barcodeQuery && !selectedCategory && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <FoodProductExplorer />
    </CartProvider>
  );
};

export default App;
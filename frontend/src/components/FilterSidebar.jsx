import React, { useState, useEffect, useRef } from 'react';
import { Filter, ArrowUp, ArrowDown, X, ChevronDown, Star, Calendar, Tag, Zap, RefreshCw, Layers } from 'lucide-react';

const FilterSidebar = ({
  selectedCategory = '',
  setSelectedCategory = () => {},
  categories = [],
  sortBy = 'name',
  setSortBy = () => {},
  sortOrder = 'asc',
  setSortOrder = () => {},
  isOpen = false,
  onClose = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortOptions = [
    { value: 'name', label: 'Product Name', icon: Tag },
    { value: 'grade', label: 'Nutrition Grade', icon: Star },
    { value: 'category', label: 'Category', icon: Layers },
    { value: 'created', label: 'Date Added', icon: Calendar }
  ];

  const selectedSortOption = sortOptions.find(option => option.value === sortBy);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-20 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:sticky lg:top-0 lg:h-screen ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">

          <div className={`flex-1 overflow-y-auto p-6 space-y-8 transition-all duration-300 ${
            isExpanded ? 'max-h-full' : 'max-h-0 overflow-hidden'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Filter className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Category Filter</h3>
              </div>
              
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Layers className="w-4 h-4 text-gray-500" />
                    <span className={selectedCategory ? 'text-gray-800' : 'text-gray-500'}>
                      {selectedCategory || 'Select Category'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSelectedCategory('');
                          setIsCategoryDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">All Categories</span>
                      </button>
                      {categories && categories.map((category) => (
                        <button
                          key={category.id || category.name}
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <ArrowUp className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Sort Options</h3>
              </div>
              
              <div className="space-y-4">
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      {selectedSortOption && <selectedSortOption.icon className="w-4 h-4 text-gray-500" />}
                      <span className="text-gray-800">{selectedSortOption?.label || 'Sort by'}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSortDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-10">
                      <div className="p-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <option.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSortOrder('asc')}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      sortOrder === 'asc'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>Ascending</span>
                  </button>
                  <button
                    onClick={() => setSortOrder('desc')}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      sortOrder === 'desc'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span>Descending</span>
                  </button>
                </div>
              </div>
            </div>

            {(selectedCategory || sortBy !== 'name' || sortOrder !== 'asc') && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <RefreshCw className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Active Filters</h3>
                </div>
                
                <div className="space-y-3">
                  {selectedCategory && (
                    <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-700">Category: {selectedCategory}</span>
                      </div>
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="p-1 hover:bg-orange-200 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3 text-orange-600" />
                      </button>
                    </div>
                  )}
                  
                  {(sortBy !== 'name' || sortOrder !== 'asc') && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ArrowUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">
                          Sort: {selectedSortOption?.label} ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSortBy('name');
                          setSortOrder('asc');
                        }}
                        className="p-1 hover:bg-blue-200 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3 text-blue-600" />
                      </button>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSortBy('name');
                    setSortOrder('asc');
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default FilterSidebar; 
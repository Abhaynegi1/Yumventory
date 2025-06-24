# 🍽️ Yumventory - Food Product Explorer

A modern, responsive web application for exploring food products using the Open Food Facts API. Built with React, this application allows users to search, filter, and manage food products with an intuitive shopping cart system.

## 🎯 Project Overview

Yumventory is a comprehensive food product exploration platform that helps users discover nutritional information, ingredients, and product details from a vast database of food products. The application features a modern UI with advanced filtering, search capabilities, and a shopping cart system for managing product selections.

## 🚀 Features

### 🔍 Advanced Search & Discovery
- **Dual Search Modes**: 
  - Product name search with intelligent suggestions
  - Barcode lookup for specific product identification
- **Real-time Search**: Instant results as you type
- **Search History**: Clear search functionality with visual feedback
- **Barcode Support**: Direct product lookup using product barcodes
- **Search Filters**: Active search indicators and filter counts

### 🎛️ Smart Filtering & Sorting System
- **Category Filtering**: 
  - 50+ food categories with real-time counts
  - Dynamic category loading from Open Food Facts API
  - Visual category indicators and active filter badges
- **Multi-criteria Sorting**:
  - Product Name (A-Z / Z-A)
  - Nutrition Grade (A, B, C, D, E)
  - Category (alphabetical)
  - Date Added (newest/oldest)
- **Filter Management**: 
  - Clear individual filters
  - Reset all filters option
  - Active filter summary with counts

### 🛒 Shopping Cart System
- **Add to Cart**: 
  - Quick add from product cards (green "+" button)
  - Add from detailed product modal
  - Visual feedback with hover animations
- **Cart Management**:
  - Real-time cart counter in navigation
  - Quantity adjustment with +/- controls
  - Individual item removal with trash icon
  - Bulk cart clearing functionality
- **Cart Modal Interface**:
  - Large, responsive modal (max-w-3xl)
  - Rectangular product cards with images
  - Product details: name, brand, nutrition grade
  - Quantity controls with visual feedback
  - Checkout and continue shopping options

### 📱 Responsive Design & UX
- **Mobile-First Design**: 
  - Optimized for all screen sizes
  - Collapsible sidebar on mobile
  - Touch-friendly interface elements
- **Modern UI Components**:
  - Gradient headers and backgrounds
  - Smooth animations and transitions
  - Loading states with spinners
  - Error handling with user-friendly messages
- **Accessibility Features**:
  - Keyboard navigation support
  - Screen reader friendly
  - High contrast color schemes
  - Focus indicators

### 🏷️ Product Information Display
- **Product Cards**:
  - Square aspect ratio with hover effects
  - Nutrition grade badges with color coding
  - Brand information and product names
  - Quick stats: nutrition score, date added
  - Ingredients preview with truncation
- **Detailed Product Modal**:
  - Large modal (max-w-4xl) with comprehensive info
  - High-resolution product images
  - Complete nutritional information
  - Ingredients analysis and allergen warnings
  - Product metadata (code, stores, labels)
  - Nutrition facts per 100g serving

### 🎨 Visual Design System
- **Color Palette**:
  - Orange to red gradients for primary actions
  - Green for positive actions (add to cart)
  - Blue for informational elements
  - Gray scale for neutral content
- **Typography**: 
  - Clear hierarchy with proper font weights
  - Readable text sizes across devices
  - Consistent spacing and line heights
- **Icons**: Lucide React icons for consistency
- **Animations**: 
  - Hover effects on interactive elements
  - Loading animations and transitions
  - Smooth modal open/close animations

## 🛠️ Technical Implementation

### Frontend Architecture
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool for development and production
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful, customizable icons
- **Context API**: State management for cart functionality

### State Management Strategy
- **CartContext**: 
  - Custom context provider for global cart state
  - useReducer for complex cart operations
  - Actions: ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART
  - Helper functions: getCartTotal(), getCartItems()
- **Local State**: 
  - Component-level state for UI interactions
  - Loading states and error handling
  - Modal open/close states
- **API State**: 
  - Product data management
  - Search and filter states
  - Pagination handling

### API Integration Details
- **Open Food Facts API Endpoints**:
  - Product search: `/cgi/search.pl`
  - Category list: `/categories.json`
  - Barcode lookup: `/api/v0/product/{barcode}.json`
- **Data Handling**:
  - Error handling with fallback images
  - Data transformation and formatting
  - Loading states and user feedback
- **Performance Optimizations**:
  - Debounced search inputs
  - Efficient data caching
  - Optimized re-renders

### Component Architecture
```
src/
├── components/
│   ├── ProductCard.jsx          # Individual product display with hover effects
│   ├── ProductGrid.jsx          # Responsive grid layout with animations
│   ├── ProductDetailModal.jsx   # Large modal with comprehensive product info
│   ├── CartModal.jsx           # Shopping cart interface with rectangular items
│   ├── Navbar.jsx              # Navigation with search, cart, and mobile menu
│   └── FilterSidebar.jsx       # Category filters and sorting options
├── context/
│   └── CartContext.jsx         # Cart state management with useReducer
├── utils/
│   └── getGradeColor.js        # Nutrition grade color utility
└── App.jsx                     # Main application with CartProvider wrapper
```

### Key Technical Features
- **Responsive Grid System**: CSS Grid with breakpoint-specific columns
- **Modal Management**: Multiple modals with proper z-index handling
- **Image Optimization**: Fallback images and loading states
- **Search Functionality**: Debounced API calls and error handling
- **Cart Persistence**: State maintained across component re-renders
- **Mobile Navigation**: Collapsible sidebar and mobile menu

## 🎨 Design Philosophy

### User Experience Principles
- **Intuitive Navigation**: Clear visual hierarchy and logical flow
- **Progressive Disclosure**: Information revealed as needed
- **Consistent Interactions**: Similar patterns across components
- **Immediate Feedback**: Loading states and visual confirmations
- **Error Prevention**: Clear actions and confirmation dialogs

### Visual Design Approach
- **Modern Minimalism**: Clean layouts with purposeful whitespace
- **Color Psychology**: Semantic color usage for different actions
- **Typography Hierarchy**: Clear information architecture
- **Micro-interactions**: Subtle animations for enhanced UX
- **Accessibility First**: WCAG compliant design patterns

## 🔧 Development Process

### Problem-Solving Methodology
1. **Requirements Analysis**: Understanding user needs and API capabilities
2. **Component Planning**: Designing modular, reusable components
3. **State Architecture**: Planning data flow and state management
4. **UI/UX Design**: Creating intuitive user interfaces
5. **Implementation**: Building features with clean, maintainable code
6. **Testing & Refinement**: Iterative testing and optimization

### Key Technical Challenges Solved
- **API Integration**: Robust integration with Open Food Facts API
- **State Management**: Efficient cart state management using Context API
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Performance**: Optimized loading states and data fetching
- **User Experience**: Intuitive interfaces for complex functionality

## ⏱️ Time Investment

**Total Time: 8 hours**

### Detailed Breakdown:
- **Planning & Setup**: 1 hour
  - Project structure planning and architecture design
  - Open Food Facts API research and documentation review
  - Development environment setup with Vite and React
  - Component hierarchy and state management planning

- **Core Development**: 4 hours
  - Basic product display and grid layout implementation
  - API integration with error handling and loading states
  - Search functionality (name and barcode search)
  - Filtering and sorting system development
  - Responsive design implementation

- **Advanced Features**: 2 hours
  - Shopping cart system with Context API
  - Cart modal with quantity management
  - Product detail modal with comprehensive information
  - State management optimization and debugging

- **Refinement & Polish**: 1 hour
  - UI/UX improvements and visual enhancements
  - Code cleanup and optimization
  - Testing across different devices and screen sizes
  - Performance optimization and bug fixes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assignment/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally

## 📱 Usage Guide

### Product Discovery
1. **Search by Name**: Use the search bar to find products by name
2. **Barcode Lookup**: Enter product barcode for specific product lookup
3. **Browse Categories**: Use the sidebar to filter by food categories
4. **Sort Results**: Sort by name, nutrition grade, category, or date

### Shopping Cart Management
1. **Add Products**: Click the green "+" button on product cards
2. **View Cart**: Click the cart icon in the navigation bar
3. **Manage Quantities**: Use +/- buttons to adjust quantities
4. **Remove Items**: Click the trash icon to remove individual items
5. **Clear Cart**: Use "Clear Cart" button to remove all items

### Product Information
1. **Quick View**: Hover over product cards for quick actions
2. **Detailed View**: Click "View Details" for comprehensive information
3. **Nutrition Facts**: View detailed nutritional information per 100g
4. **Ingredients**: Check ingredients list and allergen information

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: User accounts and saved preferences
- **Product Reviews**: User reviews and ratings system
- **Nutrition Tracking**: Personal nutrition tracking features
- **Offline Support**: PWA capabilities for offline usage
- **Advanced Analytics**: Product popularity and trend analysis
- **Multi-language Support**: Internationalization for global users

### Technical Improvements
- **Performance**: Virtual scrolling for large product lists
- **Caching**: Local storage for cart persistence
- **Search**: Advanced search with filters and saved searches
- **API**: Rate limiting and request optimization
- **Testing**: Unit and integration test coverage

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Tailwind CSS, and the Open Food Facts API** 
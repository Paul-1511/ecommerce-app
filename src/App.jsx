import React, { useState, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import productsData from './data/products.json';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewedProducts, setViewedProducts] = useState([]);
  
  // useRef para mantener historial persistente de productos vistos
  const viewedProductsRef = useRef([]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'products') {
      setSelectedProduct(null);
    }
  };

  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
  };

  const handleBackFromDetail = () => {
    setCurrentPage('products');
    setSelectedProduct(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'products':
        return (
          <ProductList 
            products={productsData}
            onShowDetail={handleShowDetail}
            viewedProducts={viewedProductsRef}
            setViewedProducts={setViewedProducts}
          />
        );
      
      case 'detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={handleBackFromDetail}
            viewedProducts={viewedProducts}
            allProducts={productsData}
          />
        ) : null;
      
      case 'cart':
        return <CartPage />;
      
      default:
        return (
          <ProductList 
            products={productsData}
            onShowDetail={handleShowDetail}
            viewedProducts={viewedProductsRef}
            setViewedProducts={setViewedProducts}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="App">
        <Header 
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        <main className="main-content">
          {renderCurrentPage()}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
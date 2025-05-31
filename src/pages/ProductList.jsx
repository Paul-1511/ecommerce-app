import React, { useState, useRef, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const ProductList = ({ onShowDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewedProductsState, setViewedProductsState] = useState([]);
  
  // useRef para mantener historial de productos vistos
  const viewedProducts = useRef([]);
  const searchInputRef = useRef(null);

  // useMemo para filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // useMemo para obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(productsData.map(product => product.category))];
    return uniqueCategories.sort();
  }, []);

  // useMemo para estadísticas de productos
  const productStats = useMemo(() => {
    const totalProducts = filteredAndSortedProducts.length;
    const withDiscount = filteredAndSortedProducts.filter(p => p.discount).length;
    const avgRating = filteredAndSortedProducts.reduce((sum, p) => sum + p.rating, 0) / totalProducts;
    
    return {
      total: totalProducts,
      withDiscount,
      avgRating: avgRating.toFixed(1)
    };
  }, [filteredAndSortedProducts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getDiscountedProductsCount = () => {
    return filteredAndSortedProducts.filter(product => product.discount).length;
  };

  return (
    <div className="product-list">
      <div className="products-container">
        <div className="products-header">
          <h2>Nuestros Productos</h2>
          <div className="products-stats">
            <span>{productStats.total} productos</span>
            {productStats.withDiscount > 0 && (
              <span className="discount-count">
                🏷️ {productStats.withDiscount} en oferta
              </span>
            )}
            <span>⭐ Promedio: {productStats.avgRating}</span>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                className="clear-search-btn"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-controls">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="rating">Mejor calificados</option>
            </select>
          </div>
        </div>

        {searchTerm && (
          <div className="search-results-info">
            <p>
              {filteredAndSortedProducts.length} resultado(s) para "{searchTerm}"
              {getDiscountedProductsCount() > 0 && (
                <span className="discount-results">
                  {' '}({getDiscountedProductsCount()} con descuento)
                </span>
              )}
            </p>
          </div>
        )}

        {viewedProductsState.length > 0 && (
          <div className="viewed-products-info">
            <p>📝 Has visto {viewedProductsState.length} producto(s) recientemente</p>
          </div>
        )}

        <div className="products-grid">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onShowDetail={onShowDetail}
                viewedProducts={viewedProducts}
                setViewedProducts={setViewedProductsState}
              />
            ))
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No se encontraron productos</h3>
              <p>
                {searchTerm 
                  ? `No hay productos que coincidan con "${searchTerm}"`
                  : 'No hay productos en esta categoría'
                }
              </p>
              {searchTerm && (
                <button onClick={handleClearSearch} className="clear-filters-btn">
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </div>

        {filteredAndSortedProducts.length > 8 && (
          <div className="products-footer">
            <p>Mostrando {filteredAndSortedProducts.length} productos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
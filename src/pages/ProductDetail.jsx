import React, { useContext, useRef, useMemo } from 'react';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ product, onBack, viewedProducts, allProducts }) => {
  const { addToCart } = useContext(CartContext);
  const imageRef = useRef(null);
  const addButtonRef = useRef(null);

  // useMemo para calcular productos recomendados basados en historial
  const recommendations = useMemo(() => {
    if (!viewedProducts || !allProducts) return [];
    
    // Filtrar productos de la misma categoría que no sean el actual
    const sameCategory = allProducts.filter(p => 
      p.category === product.category && 
      p.id !== product.id
    );
    
    // Productos vistos recientemente (excluyendo el actual)
    const recentlyViewed = allProducts.filter(p => 
      viewedProducts.includes(p.id) && 
      p.id !== product.id
    );
    
    // Combinar y eliminar duplicados
    const combined = [...sameCategory, ...recentlyViewed];
    const unique = combined.filter((item, index, arr) => 
      arr.findIndex(p => p.id === item.id) === index
    );
    
    // Retornar máximo 4 recomendaciones
    return unique.slice(0, 4);
  }, [product, viewedProducts, allProducts]);

  const handleAddToCart = () => {
    addToCart(product);
    
    // Animación usando useRef
    if (addButtonRef.current) {
      addButtonRef.current.style.transform = 'scale(0.95)';
      addButtonRef.current.style.backgroundColor = '#28a745';
      addButtonRef.current.textContent = '¡Agregado!';
      
      setTimeout(() => {
        if (addButtonRef.current) {
          addButtonRef.current.style.transform = 'scale(1)';
          addButtonRef.current.style.backgroundColor = '';
          addButtonRef.current.textContent = 'Agregar al Carrito';
        }
      }, 1000);
    }
  };

  const handleImageClick = () => {
    // Efecto de zoom usando useRef
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1.1)';
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = 'scale(1)';
        }
      }, 300);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '⭐'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="product-detail">
      <div className="detail-container">
        <button onClick={onBack} className="back-btn">
          ← Volver a Productos
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <img
              ref={imageRef}
              src={product.image}
              alt={product.name}
              className="product-detail-image"
              onClick={handleImageClick}
              style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
            />
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <h1>{product.name}</h1>
              <span className="product-category">{product.category}</span>
            </div>

            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">
                {product.rating}/5 ({product.reviews} reseñas)
              </span>
            </div>

            <div className="product-price-section">
              {product.discount ? (
                <div className="price-with-discount">
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="current-price">${product.price}</span>
                  <span className="discount-badge">-{product.discount}% OFF</span>
                </div>
              ) : (
                <span className="current-price">${product.price}</span>
              )}
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            {product.features && (
              <div className="product-features">
                <h3>Características Principales</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-actions">
              <button
                ref={addButtonRef}
                onClick={handleAddToCart}
                className="add-to-cart-btn large"
                style={{ transition: 'all 0.3s ease' }}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h3>Productos Recomendados</h3>
            <p className="recommendations-subtitle">
              Basado en tu historial de navegación y productos similares
            </p>
            <div className="recommendations-grid">
              {recommendations.map(rec => (
                <div key={rec.id} className="recommendation-card">
                  <img src={rec.image} alt={rec.name} />
                  <div className="rec-info">
                    <h4>{rec.name}</h4>
                    <div className="rec-price">
                      {rec.discount ? (
                        <>
                          <span className="rec-original-price">${rec.originalPrice}</span>
                          <span className="rec-current-price">${rec.price}</span>
                        </>
                      ) : (
                        <span className="rec-current-price">${rec.price}</span>
                      )}
                    </div>
                    <div className="rec-rating">
                      {renderStars(rec.rating)} ({rec.rating})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
import React, { useContext, useRef } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product, onShowDetail, viewedProducts, setViewedProducts }) => {
  const { addToCart } = useContext(CartContext);
  const cardRef = useRef(null);

  const handleAddToCart = () => {
    addToCart(product);
    
    // Animación visual usando useRef
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'scale(1)';
        }
      }, 150);
    }
  };

  const handleViewDetail = () => {
    // Agregar al historial de productos vistos usando useRef
    if (!viewedProducts.current.includes(product.id)) {
      viewedProducts.current.push(product.id);
      setViewedProducts([...viewedProducts.current]);
    }
    onShowDetail(product);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div ref={cardRef} className="product-card">
      <img 
        src={product.image} 
        alt={product.name}
        className="product-image"
        onClick={handleViewDetail}
      />
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          {renderStars(product.rating)} ({product.rating}/5)
        </div>
        
        <div className="product-price">
          {product.discount ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="current-price">${product.price}</span>
              <span className="discount-badge">-{product.discount}%</span>
            </>
          ) : (
            <span className="current-price">${product.price}</span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            onClick={handleViewDetail}
            className="detail-btn"
          >
            Ver Detalle
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
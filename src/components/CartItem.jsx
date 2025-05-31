import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ product }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleIncrease = () => {
    if (product.quantity < 9) {
      updateQuantity(product.id, product.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const subtotal = (product.price * product.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img 
        src={product.image} 
        alt={product.name}
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <div className="quantity-controls">
          <button 
            onClick={handleDecrease}
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity">{product.quantity}</span>
          <button 
            onClick={handleIncrease}
            className="quantity-btn"
            disabled={product.quantity >= 9}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="subtotal">Subtotal: ${subtotal}</p>
        <button 
          onClick={() => removeFromCart(product.id)}
          className="remove-btn"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
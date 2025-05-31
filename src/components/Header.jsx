import React, { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';

const Header = ({ currentPage, onNavigate }) => {
  const { cartItems } = useContext(CartContext);

  // useMemo para calcular el total de items en el carrito
  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => onNavigate('products')}>
          🛒 MiTienda
        </h1>
        
        <nav className="navigation">
          <button 
            className={`nav-btn ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => onNavigate('products')}
          >
            Productos
          </button>
          
          <button 
            className={`nav-btn cart-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => onNavigate('cart')}
          >
            Carrito ({totalItems})
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
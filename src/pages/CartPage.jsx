import React, { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { 
    cartItems, 
    subtotal, 
    totalItems, 
    hasError, 
    formattedSubtotal, 
    clearCart 
  } = useContext(CartContext);

  // useMemo para calcular información adicional del carrito
  const cartSummary = useMemo(() => {
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08; // 8% de impuestos
    const total = subtotal + shipping + tax;

    return {
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      formattedTotal: `$${total.toFixed(2)}`
    };
  }, [subtotal]);

  const handlePurchase = () => {
    if (hasError) {
      alert('Error: El total excede $999.99. Por favor, reduce la cantidad de productos.');
      return;
    }
    
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Simulación de compra
    alert(`¡Compra realizada exitosamente!\nTotal: ${cartSummary.formattedTotal}\nProductos: ${totalItems}`);
    clearCart();
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }
    
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h2>Tu Carrito de Compras</h2>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p>¡Agrega algunos productos para comenzar a comprar!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Tu Carrito de Compras</h2>
          <p>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Resumen del Pedido</h3>
              
              <div className="summary-line">
                <span>Subtotal ({totalItems} productos):</span>
                <span>{formattedSubtotal}</span>
              </div>
              
              <div className="summary-line">
                <span>Envío:</span>
                <span>${cartSummary.shipping}</span>
              </div>
              
              <div className="summary-line">
                <span>Impuestos:</span>
                <span>${cartSummary.tax}</span>
              </div>
              
              <hr />
              
              <div className="summary-total">
                <span>Total:</span>
                <span className={hasError ? 'error-total' : ''}>
                  {cartSummary.formattedTotal}
                </span>
              </div>

              {hasError && (
                <div className="error-message">
                  ⚠️ ERROR: El total excede $999.99
                </div>
              )}

              <div className="cart-actions">
                <button 
                  onClick={handlePurchase}
                  className={`purchase-btn ${hasError ? 'disabled' : ''}`}
                  disabled={hasError}
                >
                  {hasError ? 'Total excede límite' : 'Finalizar Compra'}
                </button>
                
                <button 
                  onClick={handleClearCart}
                  className="clear-btn"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
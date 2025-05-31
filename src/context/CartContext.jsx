import React, { createContext, useReducer, useMemo } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Acciones del reducer
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Estado inicial del carrito
const initialState = {
  cartItems: []
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Si ya existe, incrementar cantidad (máximo 9)
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 9) }
              : item
          )
        };
      } else {
        // Si no existe, agregarlo con cantidad 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(Math.max(action.payload.quantity, 1), 9) }
            : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        cartItems: []
      };
    }

    default:
      return state;
  }
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Funciones para interactuar con el carrito
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // useMemo para calcular totales y evitar recálculos innecesarios
  const cartTotals = useMemo(() => {
    const subtotal = state.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
    
    const totalItems = state.cartItems.reduce(
      (total, item) => total + item.quantity, 
      0
    );

    const hasError = subtotal > 999.99;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      totalItems,
      hasError,
      formattedSubtotal: `$${subtotal.toFixed(2)}`
    };
  }, [state.cartItems]);

  // Valor del contexto que se pasará a los componentes
  const contextValue = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    ...cartTotals
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto más fácilmente
export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
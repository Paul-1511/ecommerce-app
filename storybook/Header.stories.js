import React from 'react';
import Header from '../components/Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header es la barra de navegación principal de la aplicación. Muestra el logo, navegación entre páginas y contador de items en el carrito usando useMemo para optimización.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      description: 'Página actual activa',
      control: 'select',
      options: ['products', 'cart'],
      table: {
        type: { summary: 'string' },
        category: 'Navigation',
      },
    },
    onNavigate: {
      description: 'Función llamada al cambiar de página',
      action: 'navigate',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
};

export const ProductsPage = {
  args: {
    currentPage: 'products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header en la página de productos. El botón "Productos" aparece activo.',
      },
    },
  },
};

export const CartPage = {
  args: {
    currentPage: 'cart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header en la página del carrito. El botón "Carrito" aparece activo.',
      },
    },
  },
};

export const EmptyCart = {
  args: {
    currentPage: 'products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header con carrito vacío (0 items). Esto es el estado por defecto.',
      },
    },
  },
};

// Story con carrito simulado
export const WithCartItems = {
  render: (args) => {
    // Mock del contexto con items en el carrito
    const MockCartProvider = ({ children }) => {
      const mockContextValue = {
        cartItems: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
          { id: 3, quantity: 3 },
        ],
      };
      
      return (
        <div>
          {React.cloneElement(children, { 
            // Simular el hook useContext manualmente para esta story
            totalItems: 6 
          })}
        </div>
      );
    };
    
    return (
      <MockCartProvider>
        <div style={{ minHeight: '100px' }}>
          <Header {...args} />
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            color: '#666',
            fontSize: '14px'
          }}>
            ⚠️ Nota: En esta story el contador se simula para demostración
          </div>
        </div>
      </MockCartProvider>
    );
  },
  args: {
    currentPage: 'products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header mostrando contador con 6 items en el carrito (simulado para demostración).',
      },
    },
  },
};

export const MobileView = {
  args: {
    currentPage: 'products',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Header en vista móvil para probar la responsividad.',
      },
    },
  },
};

export const Interactive = {
  render: (args) => {
    const [currentPage, setCurrentPage] = React.useState('products');
    
    return (
      <div>
        <Header 
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            args.onNavigate(page);
          }}
        />
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          color: '#666'
        }}>
          <p>Página actual: <strong>{currentPage}</strong></p>
          <p>Haz clic en los botones del header para navegar</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Header interactivo donde puedes probar la navegación entre páginas.',
      },
    },
  },
};
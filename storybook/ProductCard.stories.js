import React, { useRef, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProductCard es un componente reutilizable que muestra información de un producto con opciones para agregar al carrito y ver detalles. Incluye soporte para productos con descuento, rating con estrellas, y animaciones usando useRef.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: 'Objeto con información del producto',
      control: 'object',
      table: {
        type: { summary: 'object' },
        category: 'Data',
      },
    },
    onShowDetail: {
      description: 'Función llamada al hacer clic en "Ver Detalle"',
      action: 'show-detail',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
};

// Mock data para las stories
const mockProduct = {
  id: 1,
  name: "Smartphone Galaxy Pro",
  price: 299.99,
  image: "https://picsum.photos/300/300?random=1",
  rating: 4.5,
  reviews: 128,
  category: "Electrónicos",
  description: "Smartphone de última generación con cámara de 108MP"
};

const mockProductWithDiscount = {
  id: 2,
  name: "Auriculares Inalámbricos Pro",
  price: 79.99,
  originalPrice: 129.99,
  discount: 38,
  image: "https://picsum.photos/300/300?random=3",
  rating: 4.3,
  reviews: 256,
  category: "Audio",
  description: "Auriculares con cancelación activa de ruido"
};

// Story wrapper con useRef
const StoryWrapper = ({ product, onShowDetail }) => {
  const viewedProducts = useRef([]);
  const [viewedState, setViewedState] = useState([]);
  
  return (
    <ProductCard
      product={product}
      onShowDetail={onShowDetail}
      viewedProducts={viewedProducts}
      setViewedProducts={setViewedState}
    />
  );
};

export const Default = {
  render: (args) => <StoryWrapper {...args} />,
  args: {
    product: mockProduct,
  },
};

export const WithDiscount = {
  render: (args) => <StoryWrapper {...args} />,
  args: {
    product: mockProductWithDiscount,
  },
  parameters: {
    docs: {
      description: {
        story: 'ProductCard mostrando un producto con descuento. El precio original aparece tachado y se muestra el porcentaje de descuento.',
      },
    },
  },
};

export const HighRating = {
  render: (args) => <StoryWrapper {...args} />,
  args: {
    product: {
      ...mockProduct,
      rating: 4.9,
      reviews: 312,
      name: "Producto Premium",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'ProductCard con rating alto (4.9/5 estrellas) mostrando el sistema de calificación.',
      },
    },
  },
};

export const LowRating = {
  render: (args) => <StoryWrapper {...args} />,
  args: {
    product: {
      ...mockProduct,
      rating: 2.1,
      reviews: 45,
      name: "Producto Básico",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'ProductCard con rating bajo mostrando cómo se visualizan las estrellas vacías.',
      },
    },
  },
};

export const LongProductName = {
  render: (args) => <StoryWrapper {...args} />,
  args: {
    product: {
      ...mockProduct,
      name: "Smartphone Galaxy Pro Ultra Max con Cámara de 200MP y Pantalla AMOLED de 6.8 Pulgadas",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'ProductCard con nombre de producto largo para probar el manejo del texto.',
      },
    },
  },
};
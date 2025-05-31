import React from 'react';
import CartItem from '../components/CartItem';

export default {
  title: 'Components/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CartItem muestra un producto en el carrito con controles para aumentar/disminuir cantidad y eliminar. Incluye límite máximo de 9 unidades y cálculo automático del subtotal.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: 'Producto en el carrito con cantidad incluida',
      control: 'object',
      table: {
        type: { summary: 'object' },
        category: 'Data',
      },
    },
  },
};

const mockCartProduct = {
  id: 1,
  name: "Smartphone Galaxy Pro",
  price: 299.99,
  quantity: 2,
  image: "https://picsum.photos/300/300?random=1",
};

const mockCartProductMaxQuantity = {
  id: 2,
  name: "Auriculares Inalámbricos",
  price: 79.99,
  quantity: 9,
  image: "https://picsum.photos/300/300?random=3",
};

const mockCartProductSingle = {
  id: 3,
  name: "Tablet Ultra HD",
  price: 449.99,
  quantity: 1,
  image: "https://picsum.photos/300/300?random=5",
};

export const Default = {
  args: {
    product: mockCartProduct,
  },
  parameters: {
    docs: {
      description: {
        story: 'CartItem en estado normal con cantidad de 2 unidades.',
      },
    },
  },
};

export const SingleQuantity = {
  args: {
    product: mockCartProductSingle,
  },
  parameters: {
    docs: {
      description: {
        story: 'CartItem con cantidad mínima (1 unidad). Al hacer clic en "-" se elimina del carrito.',
      },
    },
  },
};

export const MaxQuantity = {
  args: {
    product: mockCartProductMaxQuantity,
  },
  parameters: {
    docs: {
      description: {
        story: 'CartItem con cantidad máxima (9 unidades). El botón "+" está deshabilitado.',
      },
    },
  },
};

export const HighPriceProduct = {
  args: {
    product: {
      id: 4,
      name: "Laptop Gaming RGB Premium",
      price: 1299.99,
      quantity: 1,
      image: "https://picsum.photos/300/300?random=2",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'CartItem con producto de precio alto para mostrar el formato de moneda.',
      },
    },
  },
};

export const MultipleItems = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <CartItem product={mockCartProduct} />
      <CartItem product={mockCartProductSingle} />
      <CartItem product={mockCartProductMaxQuantity} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Múltiples CartItems juntos para mostrar cómo se ve una lista completa del carrito.',
      },
    },
  },
};
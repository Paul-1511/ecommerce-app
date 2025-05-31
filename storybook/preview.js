import React from 'react';
import { CartProvider } from '../src/context/CartContext';
import '../src/App.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    
    docs: {
      theme: {
        base: 'light',
        brandTitle: 'E-Commerce Components',
        brandUrl: 'https://example.com',
        brandImage: null,
      },
      source: {
        type: 'code',
      },
    },
    
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        large: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    
    layout: 'centered',
    
    // Configure global story options
    options: {
      storySort: {
        order: [
          'Introduction',
          'Components',
          ['ProductCard', 'CartItem', 'Header'],
          'Pages',
          'Examples',
        ],
      },
    },
  },
  
  // Global decorators
  decorators: [
    // Cart Context Provider decorator
    (Story, context) => {
      // Only apply CartProvider for components that need it
      const needsCart = context.title.includes('Cart') || 
                       context.title.includes('Product') ||
                       context.title.includes('Header');
      
      if (needsCart) {
        return (
          <CartProvider>
            <div style={{ 
              padding: '20px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <Story />
            </div>
          </CartProvider>
        );
      }
      
      return (
        <div style={{ 
          padding: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Story />
        </div>
      );
    },
    
    // Responsive decorator
    (Story) => (
      <div style={{
        minHeight: '100vh',
        background: 'var(--sb-preview-background, #f6f9fc)',
      }}>
        <Story />
      </div>
    ),
  ],
  
  // Global args that apply to all stories
  args: {
    // Common props for all components
  },
  
  // Global argTypes
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Function called when element is clicked',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onShowDetail: {
      action: 'show-detail',
      description: 'Function called when showing product detail',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onNavigate: {
      action: 'navigate',
      description: 'Function called for navigation',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  
  // Global tags
  tags: ['autodocs'],
};

export default preview;
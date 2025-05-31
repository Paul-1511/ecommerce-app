/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y"
  ],
  
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  docs: {
    autodocs: "tag",
  },
  
  viteFinal: async (config) => {
    // Customize Vite config for Storybook
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('../src', import.meta.url).pathname,
    };
    
    return config;
  },
  
  core: {
    disableTelemetry: true,
  },
  
  features: {
    buildStoriesJson: true,
  },
  
  staticDirs: ['../public'],
  
  // Configure preview head
  previewHead: (head) => `
    ${head}
    <style>
      /* Reset styles for consistent Storybook experience */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    </style>
  `,
};

export default config;
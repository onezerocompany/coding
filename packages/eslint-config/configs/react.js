module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  extends: [
    './typescript.js',
    '../rules/react/react.js',
    '../rules/react/react-a11y.js',
    '../rules/react/react-hooks.js',
    '../rules/react/typescript.js',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};

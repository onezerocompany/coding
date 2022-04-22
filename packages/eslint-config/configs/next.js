module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@next/next'],
  extends: ['./react.js', '../rules/next/all.js', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
};

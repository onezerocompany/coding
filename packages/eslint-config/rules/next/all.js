/**
 * @file ESLint rules for Next.js projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    '@next/next/no-css-tags': ['warn'],
    '@next/next/no-sync-scripts': ['warn'],
    '@next/next/no-html-link-for-pages': ['warn'],
    '@next/next/no-img-element': ['warn'],
    '@next/next/no-head-element': ['warn'],
    '@next/next/no-unwanted-polyfillio': ['warn'],
    '@next/next/no-page-custom-font': ['warn'],
    '@next/next/no-title-in-document-head': ['warn'],
    '@next/next/google-font-display': ['warn'],
    '@next/next/google-font-preconnect': ['warn'],
    '@next/next/link-passhref': ['warn'],
    '@next/next/next-script-for-ga': ['warn'],
    '@next/next/no-document-import-in-page': ['error'],
    '@next/next/no-head-import-in-document': ['error'],
    '@next/next/no-script-in-document': ['error'],
    '@next/next/no-script-component-in-head': ['error'],
    '@next/next/no-server-import-in-page': ['error'],
    '@next/next/no-typos': ['warn'],
    '@next/next/no-duplicate-head': ['error'],
    '@next/next/inline-script-id': ['error'],
  },
};

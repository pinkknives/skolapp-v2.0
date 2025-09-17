module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
  settings: { react: { version: 'detect' } },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    
    // Design System Enforcement Rules
    'no-restricted-syntax': [
      'error',
      {
        selector: 'JSXAttribute[name.name="style"]',
        message: 'Inline styles are not allowed. Use design system CSS classes or design tokens instead.'
      },
      {
        selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
        message: 'Direct hex color values are not allowed. Use design tokens from design-tokens.ts instead.'
      },
      {
        selector: 'Literal[value=/\\d+px$/]',
        message: 'Direct pixel values are not allowed. Use spacing tokens from design-tokens.ts instead.'
      }
    ],
    
    // Accessibility enhancements  
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn'
  },
  overrides: [
    {
      // Allow hex colors and px values in design tokens file (source of truth)
      files: ['**/design-tokens.ts', '**/design-system.css'],
      rules: {
        'no-restricted-syntax': 'off'
      }
    },
    {
      // Test files configuration
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      env: {
        jest: true,
        vitest: true
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  ]
};

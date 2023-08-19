module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['resource/built', '.eslintrc.js', 'vite.config.js', 'bootstrap.js', 'broadcasts.ts'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'import/prefer-default-export': 'warn',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['warn', 'never'],
    indent: 'warn',
    'object-curly-newline': 'warn',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'no-continue': 'off',
  },
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: ['off'],
    'import/extensions': ['off'],
    'react/jsx-filename-extension': ['off'],
    'max-len': ['warn', { code: 100 }],
    indent: ['off', 4],
    'import/prefer-default-export': ['off'],
  },
};

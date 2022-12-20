module.exports = {
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    "max-classes-per-file": 'off',
    semi: 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

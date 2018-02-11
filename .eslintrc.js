module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'flowtype'
  ],
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:flowtype/recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow console warn and error message
    'no-console': ['error', { allow: ['warn', 'error'] }]
  }
}

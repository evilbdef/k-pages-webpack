module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jquery: true
  },
  extends: 'standard',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'prod' ? 2 : 0,
    'eol-last': 0,
    'space-before-function-paren': 0
  }
};
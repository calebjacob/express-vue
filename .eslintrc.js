module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  globals: {
    appRoot: true,
    nodeMocksHttp: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, vueIndentScriptAndStyle: true }],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-indent': 'off'
  },
  overrides: [
    {
      files: ['**/*.test.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};

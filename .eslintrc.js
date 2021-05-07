module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  globals: {
    appRoot: true,
    nodeMocksHttp: true
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-catch': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        vueIndentScriptAndStyle: true
      }
    ],
    'vue/attribute-hyphenation': ['error'],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/script-indent': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      'error'
    ],
    '@typescript-eslint/no-explicit-any': 'off'
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

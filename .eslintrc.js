module.exports = {
  extends: [
    'plugin:vue/recommended',
    'plugin:jest/recommended',
    '@vue/airbnb'
  ],

  env: {
    jest: true
  },

  globals: {
    appRoot: true,
    createLocalVue: true,
    mount: true,
    nodeMocksHttp: true,
    shallowMount: true
  },

  plugins: ['jest'],

  rules: {
    'arrow-body-style': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'brace-style': ['error', 'stroustrup'],
    'global-require': ['off'],
    'max-len': ['off'],
    'no-alert': ['off'],
    'no-console': ['off'],
    'no-else-return': ['off'],
    'no-multiple-empty-lines': ['error', {
        max: 3,
        maxEOF: 1
      }
    ],
    'no-param-reassign': ['off'],
    'no-plusplus': ['off'],
    'no-use-before-define': ['error', {
        functions: false
      }
    ],
    'prefer-destructuring': ['off'],

    'jest/consistent-test-it': ['error', {
        fn: 'it',
        withinDescribe: 'it'
      }
    ],

    'vue/attributes-order': 'never',
    'vue/max-attributes-per-line': 'never',

    'indent': 'off',
    'vue/script-indent': ['error', 2, {
        baseIndent: 1
      }
    ]
  },

  root: true
};

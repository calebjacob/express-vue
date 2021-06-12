module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "@vue/prettier",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier/@typescript-eslint"
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  globals: {
    appRoot: true,
    nodeMocksHttp: true
  },

  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-useless-catch": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        singleQuote: true,
        trailingComma: "none",
        vueIndentScriptAndStyle: true
      }
    ],
    "vue/attribute-hyphenation": ["error"],
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/script-indent": "off",
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "any",
        "normal": "any",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    'vue/html-button-has-type': ['error', {
      'button': true,
      'submit': true,
      'reset': true
    }],
    "@typescript-eslint/explicit-module-boundary-types": [
      "error"
    ],
    "@typescript-eslint/no-explicit-any": "off"
  },

  overrides: [
    {
      files: ["**/*.test.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ],

  ignorePatterns: ["dist"]
};

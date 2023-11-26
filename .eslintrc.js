module.exports = {
  root: true,
  env: {
    node: true
  },
  "plugins": ["jest"],
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-parsing-error': 'off',
    'vue/multi-word-component-names': 'off',
    "no-unused-vars": "off"
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        "**/*.spec.js",
        "**/*.test.js",
      ],
      env: {
        jest: true
      }
    }
  ]
}

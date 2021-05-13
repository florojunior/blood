module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier/vue'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/attribute-hyphenation': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-dupe-else-if': 'off',
    'no-import-assign': 'off',
    'no-setter-return': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/src/**/*.spec.(ts|tsx|js)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

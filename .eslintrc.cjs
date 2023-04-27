module.exports = {
  env: { browser: true, es2020: true, jest: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // Jest-specific rules:
    'jest/expect-expect': ['error', { 'assertFunctionNames': ['expect'] }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-expect-assertions': 'warn',
    'jest/valid-expect': 'error',
  },
};
module.exports = {
  root: true,
  globals: {
    JSX: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', '@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'max-classes-per-file': 'off',
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
}

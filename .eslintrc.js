module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'dot-notation': 'off',
    'react/state-in-constructor': 'off',
    'react/no-unused-state': 'error',
    'react/destructuring-assignment': ['off'],
    'react/no-did-update-set-state': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'global-require': 'off',
    'no-unused-vars': 'off',
    'prefer-promise-reject-errors': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
};

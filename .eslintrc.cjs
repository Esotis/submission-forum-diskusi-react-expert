module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  ignorePatterns: ['.next', 'out', 'dist', 'node_modules'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/button-has-type': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'no-alert': 'off',
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        'vitest.config.js',
        'vitest.setup.js',
        'src/test-utils.jsx',
        'cypress/**/*.js',
        'cypress.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['cypress/**/*.js'],
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
      },
    },
    {
      files: ['cypress.config.js', 'next.config.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'import/no-commonjs': 'off',
        'global-require': 'off',
        strict: 'off',
      },
    },
  ],
};

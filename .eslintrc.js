module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    'jest/globals': true
  },
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-react',
    'prettier',
    'prettier/standard',
    'prettier/react'
  ],
  plugins: ['jest', 'prettier', 'react', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: 'module'
  },
  rules: {
    'valid-jsdoc': 'error',
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false
      }
    ],
    'linebreak-style': ['error', 'unix']
  }
}

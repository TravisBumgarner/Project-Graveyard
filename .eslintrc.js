var path = require('path');

module.exports = {
  extends: "airbnb",
  env: {
    "browser": true,
  },
  rules: {
    'arrow-body-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-named-as-default': 'off',
    'max-len': 'off',
    'react/prefer-stateless-function': 'off',
    'no-nested-ternary': 'off',
    'react/forbid-prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      }
    }
  },
  parser: "babel-eslint",
};

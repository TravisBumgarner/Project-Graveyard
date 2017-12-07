var path = require('path');

module.exports = {
  extends: "airbnb",
  settings: {
    "import/resolver": {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      }
    }
  },
  parser: "babel-eslint",
};
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: "./dist",
    port: 3000,
    historyApiFallback: true,
  },
});
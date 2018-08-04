const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/, // TODO replace this with cloudfront or whatever
        loader: 'file-loader'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
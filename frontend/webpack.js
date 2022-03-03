const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const getEnvVariables = () => {
  if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV is not defined.")
  }
  return process.env.NODE_ENV === 'development' ? {
    __API_ENDPOINT__: "'http://localhost:5001'",
    __AUDIO_ENDPOINT__: "'http://localhost:5001'"
  } : {
    __API_ENDPOINT__: "'https://backend-7lp5bth6xq-uc.a.run.app'",
    __AUDIO_ENDPOINT__: "'http://localhost:5001'"
  }
}

const envVariables = getEnvVariables()

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      sharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
      sharedTypes: path.resolve(__dirname, 'src/sharedTypes/index.ts'),
      theme: path.resolve(__dirname, 'src/theme.tsx'),
      utilities: path.resolve(__dirname, 'src/utilities/'),
    },
  },
  devServer: {
    compress: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin(envVariables),
    new HtmlWebpackPlugin({
      template: './src/static/index.template.ejs',
      favicon: './src/static/favicon.png',
      inject: 'body',
    }),
  ],
  devtool: 'inline-source-map'
}

const path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    return {
        entry: {
            app: './src/index.tsx'
        },
        module: {
            rules: [
                {
                    test: /\.[jt]s[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: "file-loader"
                }
            ]
        },
        output: {
            filename: '[name]-[hash].bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        resolve: {
            alias: {
                Theme: path.resolve(__dirname, 'src/theme.ts'),
                sharedComponents: path.resolve(__dirname, 'src/sharedComponents'),
                media: path.resolve(__dirname, 'src/media')
            },
            extensions: ['.ts', '.tsx', '.js']
        },
        devServer: {
            contentBase: './public',
            port: 3000,
            historyApiFallback: true,
            publicPath: '/'
        },
        plugins: [
            new webpack.DefinePlugin({ __API__: '"https://storage.googleapis.com/eng40/media/"' }),
            new webpack.DefinePlugin({ __IS_PRODUCTION__: env.NODE_ENV === 'production' }),
            new HtmlWebpackPlugin({
                template: './src/index.template.ejs',
                favicon: "./src/favicon.png",
                inject: 'body'
            })
        ]
    }
}

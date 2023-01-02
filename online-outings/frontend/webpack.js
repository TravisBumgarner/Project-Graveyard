const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let apiHost = '';

(
    function () {
        switch (process.env.NODE_ENV) {
            case 'development':
                apiHost = "'http://localhost:8000'"
                break
            case 'production':
            default:
                apiHost = "'https://api.onlineoutings.com'"
                break
        }
    }
)()

if (!(apiHost && apiHost.length)) {
    throw new Error('No apiHost specified.')
}

module.exports = env => {
    return {
        entry: {
            app: './src/index.tsx'
        },
        output: {
            filename: '[name]-[hash].bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        resolve: {
            alias: {
                shared: path.resolve(__dirname, 'src/shared/'),
                theme: path.resolve(__dirname, 'src/theme.tsx'),
                images: path.resolve(__dirname, 'src/images/'),
                utilities: path.resolve(__dirname, 'src/utilities.tsx'),
            },
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.[jt]s[x]$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: "file-loader"
                }
            ]
        },
        devServer: {
            contentBase: './public',
            port: 3000,
            historyApiFallback: true,
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.template.ejs',
                favicon: "./src/favicon.png",
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                __API__: apiHost
            })
        ]
    }
}
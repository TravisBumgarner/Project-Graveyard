const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const PLUGIN_VARS = {
    local: {
        __API_ENDPOINT__: "'http://localhost:5001'",
        __FIREBASE_CONFIG__: "'staging'"
    },
    staging: {
        __API_ENDPOINT__: "'https://backend-rhtcuzbcma-uc.a.run.app'",
        __FIREBASE_CONFIG__: "'staging'"
    },
    production: {
        __API_ENDPOINT__: "' https://backend-sj2er5ckba-uc.a.run.app/'",
        __FIREBASE_CONFIG__: "'production'"
    }
}

const getEnvVariables = () => {
    if (!process.env.NODE_ENV) {
        throw new Error('NODE_ENV is not defined.')
    }
    return PLUGIN_VARS[process.env.NODE_ENV]
}

const envVariables = getEnvVariables()

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
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
            utilities: path.resolve(__dirname, 'src/utilities.ts'),
            types: path.resolve(__dirname, 'src/types.ts'),
            context: path.resolve(__dirname, 'src/Context/'),
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

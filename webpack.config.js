// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        rep_log: './web/assets/js/rep_log.js',
        login: './web/assets/js/login.js',
        layout: './web/assets/js/layout.js',
    },
    output: {
        path: path.join( __dirname, 'web','build'),
        filename: '[name].js',
        publicPath: "/build/"
    },
    watchOptions: {
        poll: true
    },

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ]
    }
};
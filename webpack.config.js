// webpack.config.js
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: true
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

const resolveUrlLoader = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true
    }
};

module.exports = {
    mode: 'development',
    entry: {
        rep_log: './assets/js/rep_log.js',
        login: './assets/js/login.js',
        layout: './assets/js/layout.js',
    },
    output: {
        path: path.join( __dirname, 'web','build'),
        filename: '[name].js',
        publicPath: "/build/"
    },
    watchOptions: {
        poll: true
    },

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
                use: [
                    styleLoader,
                    cssLoader
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    styleLoader,
                    cssLoader,
                    resolveUrlLoader,
                    sassLoader
                    // 'style-loader',
                    // 'css-loader',
                    // 'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name]-[hash:6].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name]-[hash:6].[ext]'
                    }
                }
            },
        ]
    },

    devtool: 'inline-source-map',


    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: './web',
        hot: true,
        disableHostCheck: true,
    },

/*
    devServer: {
        contentBase: './web',
        port: 8080,
        headers: { 'Access-Control-Allow-Origin': '*' },
        watchOptions: {
            poll: true
        },

        host: '192.168.8.11',
        allowedHosts: [
            '192.168.8.1'


        hot: true,
        inline: true,
        https: {
            key: fs.readFileSync("/etc/ssl/private/myprivatekey.key"),
            cert: fs.readFileSync("/etc/ssl/certs/myprivatepem.pem")
        },
        public: 'reactjs.test.com:8080'
    },
],*/

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
        }),

        new CopyWebpackPlugin([
            // copies to {output}/static
            { from: './assets/static', to: 'static' },
        ]),

        new webpack.HotModuleReplacementPlugin()

    ],
/*

    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial"
        }
    },
*/

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }


};
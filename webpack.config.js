// webpack.config.js
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ManifestPlugin = require('webpack-manifest-plugin');
// const WebpackChunkHash = require('webpack-chunk-hash');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const useDevServer = false;
const useVersioning = true;
const publicPath = useDevServer ? 'http://localhost:8080/build/' : '/build/'
const isProduction = process.env.NODE_ENV === 'production';
const useSourcemaps = !isProduction;

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: useSourcemaps
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: useSourcemaps
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
        sourceMap: useSourcemaps
    }
};


console.log(isProduction);

const webpackConfig = {
    mode: isProduction ? "production" : "development",

    entry: {
        rep_log: './assets/js/rep_log.js',
        login: './assets/js/login.js',
        layout: './assets/js/layout.js',
    },
    output: {
        path: path.join( __dirname, 'web','build'),
        filename: useVersioning ? '[name].[chunkhash:6].js' : '[name].js',
        // chunkFilename: '[name].bundle.js',
        publicPath: publicPath
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            // publicPath: publicPath,
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    // styleLoader,
                    cssLoader,
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            // publicPath: publicPath,
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    // styleLoader,
                    cssLoader,
                    resolveUrlLoader,
                    sassLoader
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
        headers: { 'Access-Control-Allow-Origin': '*' },
    },


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

        //HMR
        // new webpack.HotModuleReplacementPlugin(),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: '[name].css',
            // chunkFilename: '[id].css',
            filename: useVersioning ? '[name].[hash:6].css' : '[name].css',
        }),


        // passes these options to all loaders
        // but we should really pass these ourselves
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),


        new ManifestPlugin({
            basePath: "build/",
            writeToFileEmit: true
        }),

        // new WebpackChunkHash(),

        // for prod
        // new webpack.HashedModuleIdsPlugin()

        new CleanWebpackPlugin(),

    ],
/*

    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial"
        }
    },
*/


// REF) https://webpack.js.org/plugins/mini-css-extract-plugin/#root

    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
};

module.exports = webpackConfig;
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: "/"
                })
            },
            {
                test: /\.(less)$/,
                use: [{
                  loader: 'style-loader' // creates style nodes from JS strings
                }, {
                  loader: 'css-loader' // translates CSS into CommonJS
                }, {
                  loader: 'less-loader' // compiles Less to CSS
                }]
            }, 
            {
                test: /\.(png|gif|jpg|jpeg|)$/,
                loader: "file-loader",
                options: {
                    limit: 100000,
                    name: '[name].[ext]',
                    outputPath: 'images',
                    publicPath: '/images'
                }
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                    publicPath: '/fonts'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                    publicPath: '/fonts'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                    publicPath: '/fonts'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml',
                    name: '[name].[ext]',
                    outputPath: 'svg',
                    publicPath: '/svg'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "bundle.css",
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new ExtractTextPlugin({
                filename: "bundle.css",
                disable: false,
                allChunks: true
                }),
            new webpack.DefinePlugin({
                    "process.env": {
                        APPLICATION_BFF_URL: JSON.stringify("https://bloomkonnect.com:2001/admin-bff"),
                        MEDIA_SERVICE_ADDRESS: JSON.stringify("http://docker.kabloomstaging.com:2001/admin-bff"),
                        APPLICATION_CLOUD_URL: JSON.stringify("https://d2ob14u1yb5v44.cloudfront.net/media"),
                    },
            }),
            // new CompressionPlugin({
            //     asset: "[path].gz[query]",
            //     algorithm: "gzip",
            //     test: /\.js$|\.css$|\.html$/,
            //     threshold: 10240,
            //     minRatio: 0.8,
            //   }),
        ],
        devServer: {
            compress: true,
            contentBase: './',
            historyApiFallback: true
          },
});

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        vendor: [
            'react', 'react-dom'
        ],
        index: path.resolve(__dirname, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extension: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel']
            }, {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }, {
                test: /\.css/,
                loader: 'style!css'
            }
        ]
    },
    devServer: {
        contentBase: "build",
        inline: true,
        stats: {
            colors: true
        },
        historyApiFallback: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new HtmlWebpackPlugin({title: 'React Fundamental Demos', template: './index.html'}),
        new openBrowserWebpackPlugin({url: 'http://localhost:8080'})
    ],
    devtool: 'source-map'
};

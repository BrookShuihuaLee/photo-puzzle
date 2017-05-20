import path from 'path'
import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import webpackMd5Hash from 'webpack-md5-hash'

export default {
    entry: {
        vendor: ['babel-polyfill'],
        bundle: path.resolve(__dirname, '../src/entry.js')
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /.pug$/,
                use: 'pug-loader'
            }
        ]
    },
    plugins: [
        new webpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new HtmlPlugin({
            title: '拼出我的照片',
            template: path.resolve(__dirname, '../src/index.pug')
        })
    ],
    resolve: {
        alias: {
            'bce-sdk-js': 'bce-sdk-js/baidubce-sdk.bundle.min.js'
        }
    }
}
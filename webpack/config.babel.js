import path from 'path'
import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import webpackMd5Hash from 'webpack-md5-hash'

import packageJson from '../package.json'

export default {
    entry: {
        vendor: Object.keys(packageJson.dependencies),
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
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new HtmlPlugin({
            title: '拼出我的照片',
            template: path.resolve(__dirname, '../src/index.pug')
        })
    ]
}
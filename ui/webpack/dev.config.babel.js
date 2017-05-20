import path from 'path'
import webpackMerge from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'

import webpackConfig from './config.babel'

export default webpackMerge(webpackConfig, {
    entry: {
        bundle: path.resolve(__dirname, '../src/dev.entry.js')
    },
    plugins: [
        new HtmlPlugin({
            title: '拼出我的照片',
            template: path.resolve(__dirname, '../src/index.pug'),
            isDev: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '../dist'),
        port: 44444,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    devtool: 'inline-source-map'
})
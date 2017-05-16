import path from 'path'
import webpackMerge from 'webpack-merge'

import webpackConfig from './config.babel'

export default webpackMerge(webpackConfig, {
    entry: {
        bundle: path.resolve(__dirname, '../src/dev.entry.js')
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '../dist'),
        port: 44444,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    devtool: 'inline-source-map'
})
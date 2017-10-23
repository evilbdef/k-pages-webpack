const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  devtool: 'eval-source-map',
  devServer: {
    port: config.port,
    host: '0.0.0.0',
    disableHostCheck: true,
    inline: true,
    contentBase: resolve('dist'),
    open: `http://localhost:${config.port}/${config.pagePath}`,
    // openPage: `${config.pagePath}/index.html`,
    compress: true,
    progress: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            'postcss-loader','sass-loader'
          ]
        }),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: `${config.staticPath}/css/[name].css`
    })
  ]
})
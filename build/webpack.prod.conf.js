const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

let UglifyJsPluginOptions = {
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
}
if(config.isIe){
  UglifyJsPluginOptions = merge(UglifyJsPluginOptions, {
    compress: {
      properties: false,
    },
    output: {
      // beautify: true,
      quote_keys: true
    },
    mangle: {
      screw_ie8: false
    }
  })
}
module.exports = merge(baseWebpackConfig, {
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
                minimize: true //css压缩
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
    new ExtractTextPlugin({
      filename: `${config.staticPath}/css/[name].css`
    }),
    new webpack.optimize.UglifyJsPlugin(UglifyJsPluginOptions)
  ]
})
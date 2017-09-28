const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let configHtmlPlugins = [];
for(page in config.entryPath){
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${config.pagePath}/${page}.html`,
    template: path.resolve(__dirname, `../src/components/${page}/${page}.plan.js`),
    chunks: [page,'vendor']
  });
  configHtmlPlugins.push(htmlPlugin);
}

module.exports = {
  entry: config.entryPath,
  output: {
    path: config.assetsRoot,
    filename: `${config.staticPath}/js/[name].js`,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.hbs', '.json'],
    alias: {
      '@': resolve('src'),
      'part': resolve('src/part'),
      'common': resolve('src/common'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        include: [resolve('src')],
        query: {
          helperDirs: path.resolve(__dirname, '../src/helpers'),
          inlineRequires: '/images/'
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name:`${config.staticPath}/img/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `${config.staticPath}/fonts/[name].[hash:7].[ext]`
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity
    }),
    ...configHtmlPlugins
  ]
};
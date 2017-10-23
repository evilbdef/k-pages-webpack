const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let configHtmlPlugins = []
for (let page in config.entryPath) {
  const template = path.resolve(__dirname, `../src/page/${page}/${page}.plan.js`)
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${config.pagePath}/${page}.html`,
    template: template,
    chunks: [page, 'vendor'],
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    }
  })
  configHtmlPlugins.push(htmlPlugin)
}
let jsLoaderOptions
if(config.isIe){
  jsLoaderOptions = {
    test: /\.js$/,
    loader: 'es3ify-loader!babel-loader',
    enforce: 'post',
    include: [resolve('src')]
  }
}else{
  jsLoaderOptions = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')]
  }
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
      'page': resolve('src/page')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        include: [resolve('src')],
        query: {
          helperDirs: path.resolve(__dirname, '../src/helpers'),
          // inlineRequires: '/images/'
          inlineRequires: /^((?!http|https).)*(images|media|file)((?!http|https).)*$/
        }
      },
      jsLoaderOptions,
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `${config.staticPath}/img/[name].[ext]`
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${config.staticPath}/media/[name].[ext]`
        }
      }, 
      {
        test: /\.(docx|ppt|xlsx|pdf|txt)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `${config.staticPath}/file/[name].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `${config.staticPath}/fonts/[name].[ext]`
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: 2
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    ...configHtmlPlugins
  ]
}
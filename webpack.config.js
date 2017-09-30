var rimraf = require('rimraf')
var webpackConfig = process.env.NODE_ENV === 'dev'
  ? require('./build/webpack.dev.config.js')
  : require('./build/webpack.prod.config.js')

if (process.env.NODE_ENV !== 'dev') {
  rimraf('./dist', function (err) {
    if (err) throw err
  })
}

module.exports = webpackConfig
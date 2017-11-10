/* eslint-disable */
let file = {
  js: {
    flexible: require('!file-loader?name=static/js/[name].[ext]!../common/js/flexible.js')
  }
}

module.exports = function (e) {
  let out = file
  e = e.split(".")
  for (let i in e){
    out = out[e[i]]
  }
  return out
}
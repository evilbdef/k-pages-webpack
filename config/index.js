const path = require('path');
const fs = require("fs");

const filePath = path.resolve(__dirname, '../src/components');
let entryPath = {};
fs.readdirSync(filePath).forEach((ele, index) => {
  entryPath[ele] = path.resolve(__dirname, `../src/components/${ele}/${ele}.js`)
});

module.exports = {
  entryPath: entryPath,
  assetsRoot: path.resolve(__dirname, '../dist'),
  pagePath: 'page',
  staticPath: 'static'
}
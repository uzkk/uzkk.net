const { resolve } = require('path')
const svgFont = require('@shigma/svg-font')

svgFont({
  srcFile: resolve(__dirname, 'icons.svg'),
  outFile: resolve(__dirname, '../docs/.vuepress/styles/icons.css'),
})

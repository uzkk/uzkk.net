const yaml = require('js-yaml')
const { resolve } = require('path')
const { writeFileSync, readFileSync } = require('fs')

writeFileSync(
  resolve(__dirname, '../docs/.vuepress/data/characters.json'),
  JSON.stringify(yaml.safeLoad(
    readFileSync(resolve(__dirname, '../data/characters.yaml'), 'utf8')
  ))
)

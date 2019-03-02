const { promises: fs } = require('fs-extra')
const { parseString } = require('xml2js')
const { resolve } = require('path')
const fetch = require('node-fetch')

function getPages(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, { urlset: { url } }) => {
      if (err) throw reject(err)
      const output = []
      for (const { loc } of url) {
        output.push(loc[0])
      }
      resolve(output)
    })
  })
}

fetch('http://uzkk.net/sitemap.xml')
  .then(response => response.text())
  .then(getPages)
  .then(async pages => {
    for (let index = 0; index < pages.length; ++index) {
      const filename = `../temp/${index.toString().padStart(3)}.html`
      await fetch(pages[index])
        .then(response => response.text())
        .then(text => fs.writeFile(resolve(__dirname, filename), text))
    }
  })
  .catch(console.log)

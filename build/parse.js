const { safeDump } = require('js-yaml')
const { resolve } = require('path')
const cheerio = require('cheerio')
const fs = require('fs-extra')

const detok = {
  h1: makeWrap('#', '\n\n'),
  h2: makeWrap('##', '\n\n'),
  h3: makeWrap('###', '\n\n'),
  h4: makeWrap('####', '\n\n'),
  h5: makeWrap('#####', '\n\n'),
  h6: makeWrap('######', '\n\n'),
  ul: makeWrap('', ''),
  li: makeWrap('- ', ''),
  ol: makeWrap('- ', ''), // FIXME
  em: makeWrap('*'),
  strong: makeWrap('**'),
  del: makeWrap('-'),
  span: makeWrap(''),
  br: _ => '\n',
  a: el => `[${el.nodeValue}|${el.attribs.href}]`,
  img: el => `![image](${el.attribs.src})`,
  blockquote: makeWrap('> ', '\n\n'),
  p: makeWrap('> ', '\n\n'),
  div: makeWrap(''),
  hr: _ => '---\n\n',
  iframe: _ => '[[iframe]]',
  audio: _ => '[[audio]]',
  video: _ => '[[video]]',
  table: _ => '[[table]]',
  nav: _ => '[[nav]]',
  i: makeWrap(''),
  figure: makeWrap(''), // FIXME
  figcaption: makeWrap('\n', ''),
}

fs.readdirSync(resolve(__dirname, '../temp')).forEach(name => {
  const html = fs.readFileSync(resolve(__dirname, '../temp', name))
  const $ = cheerio.load(html, {
    decodeEntities: false,
  })
  if (!$('body').hasClass('single')) return

  const article = $('article')
  const thumbnail = article.find('.post-thumbnail img').attr('src')
  const title = article.find('header h1').text()
  const content = traverse(article.find('.entry-content')[0]).replace(/\n{3,}/g, '\n\n')
  const footer = article.find('footer')
  const postedOn = footer.find('.posted-on time').attr('datetime')
  const author = footer.find('.author a').text()
  const tags = footer.find('.tags-links a').toArray().map(el => el.children[0].nodeValue)
  const frontmatter = ensureNoUndef({
    thumbnail,
    postedOn,
    author,
    tags,
  })

  const output = [
    '---',
    safeDump(frontmatter).trim(),
    '---\n',
    `# ${title}`,
    content,
  ].join('\n')

  fs.writeFileSync(resolve(__dirname, '../docs/_posts', title.replace(/\\|\//g, ' ') + '.md'), output)
})

function traverse(el) {
  let result = ''
  for (const child of el.children) {
    if (child.type === 'text') {
      result += child.nodeValue
    } else if (child.type === 'tag') {
      if (child.tagName in detok) {
        result += detok[child.tagName](child)
      } else {
        console.log(child)
        throw child.tagName
      }
    }
  }
  return result
}

function makeWrap(leftWrap, rightWrap = leftWrap) {
  return el => leftWrap + traverse(el) + rightWrap
}

function ensureNoUndef(source) {
  if (Array.isArray(source)) {
    return source.map(value => {
      if (value === undefined) return null
      return ensureNoUndef(value)
    })
  } else if (typeof source !== 'object' || !source) {
    return source
  } else {
    const result = {}
    for (const key in source) {
      if (source[key] !== undefined) {
        result[key] = ensureNoUndef(source[key])
      }
    }
    return result
  }
}

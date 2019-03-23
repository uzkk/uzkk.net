module.exports = {
  targetDir: '_posts',
  sitemap: 'http://uzkk.net/sitemap.xml',
  maxConcurrentTasks: 10,
  getFileName (url) {
    if (!/\?p=(\d+)/.test(url)) return false
    return RegExp.$1
  },
  renderRules: {
    a (el, inner) {
      const href = el.attribs.href
      return `[${inner().trim()}](${href})`
    },
  },
  parseHTML ($, render) {
    const article = $('article')
    const thumbnail = article.find('.post-thumbnail img').attr('src')
    let title = article.find('header h1').text()
      .replace('[', '【')
      .replace(']', '】')
    let metaTitle
    let content = render(article.find('.entry-content')[0]).trim()
    const footer = article.find('footer')
    const createdAt = footer.find('.posted-on time').attr('datetime')
    const author = footer.find('.author a').text()
    const tags = footer.find('.tags-links a').toArray().map(el => el.children[0].nodeValue)
    let category = footer.find('.cat-links a').text()
    if (category === '千年幻想乡') {
      metaTitle = title + ' | 千年幻想乡'
      content = content
        .replace(/^.+组：/mg, str => '### ' + str)
    }
    if (category.includes('画师鉴赏')) {
      category = '画师鉴赏'
      title = title.replace(/-/, ' - ').replace(/ {2}/g, ' ')
      metaTitle = title + ' | 画师鉴赏'
    }

    return {
      frontmatter: {
        metaTitle,
        thumbnail,
        createdAt,
        author,
        title,
        category,
        tags,
      },
      filename: title.replace(/\\|\//g, ' ').replace(/!/g, '！'),
      content: `${content}`,
    }
  },
}

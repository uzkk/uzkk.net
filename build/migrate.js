module.exports = {
  targetDir: '_posts',
  sitemap: 'http://uzkk.net/sitemap.xml',
  maxConcurrentTasks: 10,
  getFileName(url) {
    if (!/\?p=(\d+)/.test(url)) return false
    return RegExp.$1
  },
  renderRules: {
    a(el, inner) {
      const href = el.attribs.href
      return `[${inner().trim()}](${href})`
    },
  },
  parseHTML($, render) {
    const article = $('article')
    const thumbnail = article.find('.post-thumbnail img').attr('src')
    const title = article.find('header h1').text()
      .replace('[', '【')
      .replace(']', '】')
    let content = render(article.find('.entry-content')[0]).trim()
    const footer = article.find('footer')
    const createdAt = footer.find('.posted-on time').attr('datetime')
    const author = footer.find('.author a').text()
    const tags = footer.find('.tags-links a').toArray().map(el => el.children[0].nodeValue)
    const category = footer.find('.cat-links a').text()
    if (category === '千年幻想乡') {
      content = content
        .replace(/^.+组：/mg, str => '### ' + str)
    }

    return {
      frontmatter: {
        thumbnail,
        createdAt,
        author,
        category,
        tags,
      },
      filename: title.replace(/\\|\//g, ' ').replace(/!/g, '！'),
      content: `# ${title}\n\n${content}`,
    }
  }
}

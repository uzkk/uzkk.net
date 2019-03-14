module.exports = {
  targetDir: '_posts',
  sitemap: 'http://uzkk.net/sitemap.xml',
  maxConcurrentTasks: 10,
  getFileName(url) {
    if (!/\?p=(\d+)/.test(url)) return false
    return RegExp.$1
  },
  parseHTML($, render) {
    const article = $('article')
    const thumbnail = article.find('.post-thumbnail img').attr('src')
    const title = article.find('header h1').text()
      .replace('[', '【')
      .replace(']', '】')
    const content = render(article.find('.entry-content')[0])
    const footer = article.find('footer')
    const createTime = footer.find('.posted-on time').attr('datetime')
    const author = footer.find('.author a').text()
    const tags = footer.find('.tags-links a').toArray().map(el => el.children[0].nodeValue)

    return {
      frontmatter: {
        thumbnail,
        createTime,
        author,
        tags,
      },
      filename: title.replace(/\\|\//g, ' ').replace(/!/g, '！'),
      content: `# ${title}\n\n${content}`,
    }
  }
}

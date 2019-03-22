const path = require('path')
const format = require('date-fns/format')

module.exports = ({
  postsDir = '_posts',
  postsLayout = 'Post',
  permalink = '/posts/:slug.html',
  lang,
}) => {
  const ensureBothSlash = str => str.replace(/^\/?(.*)\/?$/, '/$1/')

  return {
    name: '@theme-uzkk/vuepress-plugin-blog',

    plugins: [
      [require('../blog-vuepress'), {
        categoryIndexPageUrl: '/posts/categories/',
        tagIndexPageUrl: '/posts/tags/',
        permalink,
        postsDir,
        lang,
      }],
    ],

    extendPageData ($page) {
      // Test the page if is a post according to the postsDir
      if ($page.path.startsWith(ensureBothSlash(postsDir))) {
        // Set the meta data of the page
        $page.frontmatter.layout = $page.frontmatter.layout || postsLayout
        $page.frontmatter.permalink = $page.frontmatter.permalink || permalink
        $page.type = 'post'
        $page.tags = $page.frontmatter.tags || []
        $page.category = $page.frontmatter.category
        $page.createdAt = $page.frontmatter.createdAt ? format($page.frontmatter.createdAt, 'YYYY-MM-DD') : null
        $page.updatedAt = $page.lastUpdated ? format($page.lastUpdated, 'YYYY-MM-DD') : null
      }
    },

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceApp.js'),
    ],
  }
}

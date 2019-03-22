const { resolve } = require('path')
const mergeable = require('vuepress-mergeable')

module.exports = mergeable(({ lang }, context) => ({
  name: 'vuepress-theme-zukk',

  plugins: [
    [require('./plugins/blog'), { lang }],
    '@vuepress/nprogress',
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    '@vuepress/search',
    'pangu',
  ],

  globalUIComponents: 'Iconfont',

  enhanceAppFiles: resolve(__dirname, 'enhanceApp.js'),

  chainWebpack (config) {
    if (context.siteConfig.evergreen) {
      config.module
        .rule('js')
        .test(/\.js$/)
        .exclude.add(filePath => {
          if (filePath.startsWith(resolve(__dirname))) {
            return false
          }
          return true
        }).end()
        .use('cache-loader')
        .loader('cache-loader')
        .options({
          cacheDirectory: context.cacheDirectory,
          cacheIdentifier: context.cacheIdentifier,
        })
        .end()
        .use('babel-loader')
        .loader('babel-loader')
        .options({
          babelrc: false,
          configFile: false,
          presets: [
            require.resolve('@vue/babel-preset-jsx'),
          ],
        })
    }
  },

  ready () {
    context.addPage({
      permalink: '/',
      frontmatter: {
        title: lang.home,
        layout: 'Home',
      },
    })

    context.addPage({
      permalink: '/posts/',
      frontmatter: {
        title: lang.posts,
        layout: 'Posts',
      },
    })
  },
}), {
  lang: 'assign',
}, {
  comments: {},
  personalInfo: {},
  lang: {
    // default pages title
    home: '首页',
    posts: '文章',
    category: '分类',
    categories: '分类',
    tag: '标签',
    tags: '标签',
  
    // post filter
    allCategories: '全部',
    search: '查找',
    searchHint: '查找标题和摘要',
    noRelatedPosts: '没有相关文章',
  
    // post meta
    createdAt: '发布时间',
    updatedAt: '最后修改',
    prevPost: '上一篇',
    nextPost: '下一篇',
  
    // post nav
    toc: '文章目录',
    comments: '评论',
  
    // hints
    notFound: '哎呀！你要找的页面不在这里',
  },
})

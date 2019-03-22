const { resolve } = require('path')

module.exports = (context) => ({
  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  head: [
    ['link', { rel: 'icon', href: `/assets/logo/512x512.png` }],
    ['meta', { name: 'theme-color', content: '#1e90ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileImage', content: '/assets/logo/144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  plugins: [
    ['dehydrate'],
    ['migrate', require('../../build/migrate')],
  ],

  themeConfig: {
    lang: {
      home: '东方 Project - 从入坑到入坟',
      posts: 'My Posts',
    },

    personalInfo: {
      nickname: 'shigma',
      description: '北冥有鱼，其名为咸',
      email: '1700011071@pku.edu.cn',
      location: 'Peking, China',
      avatar: '/assets/avatar/shigma.png',

      sns: {
        github: {
          account: 'Shigma',
          link: 'https://github.com/Shigma',
        },
      },
    },

    nav: [
      { text: '主页', link: '/', exact: true },
      { text: '文章', link: '/posts/', exact: false },
      { text: '本命测试', link: '/favorite/', exact: false },
    ],
  },

  async ready () {
    context.addPage({
      title: '本命测试',
      path: '/favorite/',
      permalink: '/favorite/',
      frontmatter: {
        layout: 'Favorite',
      },
    })
  },

  evergreen: !context.isProd,
})

module.exports = (context) => ({
  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  theme: 'uzkk',

  plugins: [
    [require('@uzkk/shared-assets')],
    [require('@uzkk/favorite')],
    ['public-files', '.vuepress/public'],
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

  evergreen: () => !context.isProd,
})

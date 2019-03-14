module.exports = ({ isProd }) => ({
  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  theme: 'uzkk',

  plugins: [
    'ssr-mismatch-workaround',
    ['migrate', require('../../build/migrate')],
  ],

  themeConfig: {
    lang: Object.assign(require('vuepress-theme-uzkk/lib/langs/zh-CN'), {
      home: '东方 Project - 从入坑到入坟',
      posts: 'My Posts',
    }),
    
    personalInfo: {
      nickname: 'shigma',
      description: 'Happy Coding<br/>Happy Life',
      email: '1700011071@pku.edu.cn',
      location: 'Peking, China',
      organization: 'Peking University',
      avatar: '/assets/avatar/shigma.png',

      sns: {
        github: {
          account: 'Shigma',
          link: 'https://github.com/Shigma',
        },
      },
    },

    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false  },
    ],
  },
  
  evergreen: !isProd,
})

module.exports = ({ isProd }) => ({
  theme: 'uzkk',

  plugins: [
    'ssr-mismatch-workaround',
    ['migrate', require('../../build/migrate')],
  ],
  
  evergreen: !isProd,
})

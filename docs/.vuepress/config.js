module.exports = ({ isProd }) => ({
  theme: 'uzkk',

  plugins: [
    'serve',
    'ssr-mismatch-workaround',
    ['migrate', require('./migrate')],
  ],
  
  evergreen: !isProd,
})

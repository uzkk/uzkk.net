module.exports = ({ isProd }) => ({
  plugins: {
    migrate: require('./migrate'),
  },
  
  evergreen: !isProd,
})

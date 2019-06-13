const withCss = require('@zeit/next-css')
const conf = require('./lib/config')

const OAUTH_SCOPE = 'user'

const config = {
  webpack (config) {
    return config
  },
  env: {
    customKey: 'value'
  },
  publicRuntimeConfig: {
    OAUTH_URL: `https://github.com/login/oauth/authorize?client_id=${conf.git.client_id}&scope=${OAUTH_SCOPE}`
  }
}

module.exports = withCss(config)
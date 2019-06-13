const axios = require('axios')

const config = require('../lib/config')
const { client_id, client_secret } = config.git

module.exports = async (ctx, next) => {
  
  if (ctx.path === '/auth') {
    const code = ctx.query.code

    if (!code) {
      ctx.body = 'code not exist'
    }

    const res = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      data: {
        client_id,
        client_secret,
        code
      },
      headers: { Accept: 'application/json' }
    })

    if (res.status === 200 && (res.data && !res.data.error)) {
      
      const { access_token, token_type } = res.data
      const userInfoRes = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
          'Authorization': `${token_type} ${access_token}`
        }
      })
      ctx.session.userInfo = userInfoRes.data

      ctx.redirect('/')
    } else {
      ctx.body = `request token failed ${res.message}`
    }

  } else {
    await next()
  }
}
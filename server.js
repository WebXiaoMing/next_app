const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store')
const auth = require('./server/auth')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  const SESSION_CONFIG = {
    key: '__ui_ming',
    maxAge: 3600 * 1000,
    store: new RedisSessionStore(redis)
  }
  server.keys = ['Mu yun Chun Shu']
  server.use(session(SESSION_CONFIG, server))

  server.use(router.routes())

  server.use(auth)

  server.use(async (ctx) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000)
})


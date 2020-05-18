const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import session from 'koa-generic-session'
import Redis from 'koa-redis'
import koaBody from 'koa-body'

import mysql from './env/mysql.js'
import aside from './api/aside.js'
import tag from './api/tag.js'
import auth from './api/auth.js'
import user from './api/user.js'
import article from './api/article.js'
import test from './api/test.js'

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

app.keys = ['doc', 'mtapi']

app.use(koaBody())
app.use(session({
  key: 'doc',
  profix: 'mt',
  store: new Redis()
}))
app.use(mysql())

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

	app.use(aside.routes()).use(aside.allowedMethods())
  app.use(tag.routes()).use(tag.allowedMethods())
	app.use(auth.routes()).use(auth.allowedMethods())
	app.use(user.routes()).use(user.allowedMethods())
	app.use(article.routes()).use(article.allowedMethods())
	app.use(test.routes()).use(test.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()

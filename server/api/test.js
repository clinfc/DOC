import Router from 'koa-router'

const router = new Router({ prefix: '/api' })

router.get('/test/list', async ctx => {
  const { data } = await ctx.$mysql.query({
    sql: 'select * from aside'
  })
  ctx.body = {
    data
  }
})

router.get('/test/config', ctx => {
  ctx.body = ctx.$mysql._hander.config
})

router.get('/test/env', ctx => {
  ctx.body = {
    envs: typeof ctx.env,
    pass: process.env.sql_password
  }
})

router.post('/test/post', ctx => {
  ctx.body = {
    params: ctx.params,
    query: ctx.query
  }
})

router.put('/test/put', ctx => {
  ctx.body = {
    params: ctx.params,
    query: ctx.query
  }
})

export default router

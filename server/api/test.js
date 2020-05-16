import Router from 'koa-router'
import Redis from 'ioredis'

const router = new Router({ prefix: '/api' })
let redis = new Redis()

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

router.get('/test/redis', async ctx => {
  redis.set('name', '李白')
  redis.mset('age', 12, 'sex', '男')
  redis.setex('key', 60, '250')
  let values = await redis.mget('name','age','sex', 'key')
  let ttl = await redis.ttl('key')
  let pttl = await redis.pttl('key')
  ctx.body = {
    values,
    ttl,
    pttl
  }
})

router.get('/test/rt', async ctx => {
  let values = await redis.mget('name','age','sex', 'key')
  let ttl = await redis.ttl('key')
  let pttl = await redis.pttl('key')
  ctx.body = {
    values,
    ttl,
    pttl
  }
})

router.get('/test/data', async ctx => {
  let { data: data1 } = await ctx.$mysql.query({
    sql: 'select * from user where id = 1'
  })
  let { data: data2 } = await ctx.$mysql.query({
    sql: 'select * from user where id = 1 limit 1'
  })
  ctx.body = { data1, data2}
})

export default router

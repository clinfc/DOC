import Router from 'koa-router'
import Redis from 'ioredis'
import nodemailer from 'nodemailer'
import rejson from '../env/rejson.js'
import cfn from '../../plugins/custom/cfn.js'

let router = new Router({ prefix: '/api/user' })
let redis = new Redis()

function createKey(email) {
  return `${email}-email-code`
}

// 验证用户名
router.post('/verifyName', async ctx => {
	try{
		let name = ctx.request.body.name
		let { data } = await ctx.$mysql.query({
			sql: 'select * from `user` where `name` = ?',
			values: [name]
		})
    ctx.body = data.length ? rejson.error('该用户名已存在') : rejson.success('该用户名有效')
	}catch(e){
		console.log(e);
		ctx.body = rejson.error('服务器异常，验证失败')
	}
})

// 发送验证码
router.post('/sendCode', async ctx => {
  try{
    let email = ctx.request.body.email || ''
    let key = createKey(email)
    let code = await redis.get(key)
    if (cfn.validate(email, 'email') !== true) {
      ctx.body = rejson.error('无效的邮箱地址')
      return
    }
    // 判断是否存在且未过期
    if (code) {
      ctx.body = rejson.error('当前操作过快，请稍后再试')
      return
    }
    // 判断有效是否已注册
    let { data } = await ctx.$mysql.query({
      sql: 'select * from `user` where `email` = ?',
      values: [email]
    })
    if (data.length) {
      ctx.body = rejson.error('该邮箱已被注册，不可重复注册')
      return
    }
    // 不存在，生成验证码
    code = cfn.code()
    // 发送验证码
    let transporter = nodemailer.createTransport({
      host: process.env.smtp_host,
      port: process.env.smtp_port,
      secure: false,
      auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_pass
      }
    })
    let into = await transporter.sendMail({
      from: `"DOC笔记" <${process.env.smtp_user}>`,
      to: email,
      subject: '【用户注册验证码】',
      html: `<p>你的注册验证码为：<strong>${code}</strong>，有效期三分钟</p>`
    })
    // 缓存验证码
    redis.setex(key, 60, code)
    ctx.body = rejson.success('验证码已发送至您的邮箱，有效期三分钟')
  }catch(e){
    console.log(e);
    ctx.body = rejson.error('服务器异常')
  }
})

// 用户注册
router.post('/register', async ctx => {
  let { name, email, pass, code } = ctx.request.body
  let key = createKey(email)
  let reCode = await redis.get(key)
  // 验证码是否有效
  if (!reCode) {
    ctx.body = rejson.error('该验证码已过期，请重新获取')
    return
  }
  // 验证码是否正确
  if (code.toUpperCase() !== reCode) {
    ctx.body = rejson.error('验证码错误')
    return
  }
  // 验证用户名和邮箱是否未被注册
  let { data: seldata } = await ctx.$mysql.query({
    sql: 'select * from `user` where name = ? or email = ?',
    values: [name, email]
  })
  if (seldata.length) {
    ctx.body = rejson.error('用户名或邮箱已被注册')
    return
  }
  // 写入数据库
  let timestamp = cfn.timestamp
  let { data } = await ctx.$mysql.query({
    sql: 'insert into `user` set ?',
    values: { name, email, pass, create: timestamp, update: timestamp }
  })
  ctx.body = rejson.data({
    inserId: data.insertId,
    affected: data.affectedRows
  })
})

// 用户登录
router.post('/login', async ctx => {
  try{
    let { name, pass } = ctx.request.body
    let { data } = await ctx.$mysql.query({
      sql: 'select * from `user` where `name` = ? or `email` = ? limit 1',
      values: [name, name]
    })
    if (!data[0] || pass !== data[0].pass) {
      ctx.body = rejson.error('用户名/邮箱/密码 错误，请确认后进行登录')
      return
    }
    ctx.session.user = {id: data[0].id, name: data[0].name}
    ctx.body = rejson.success('登录成功！')
  }catch(e){
    console.log(e);
    ctx.body = rejson.error('服务器异常')
  }
})

export default router

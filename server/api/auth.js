import Router from 'koa-router'
import rejson from '../env/rejson'

let router = new Router({ prefix: '/api/auth' })

// 权限分组 - 列表
router.get('/list', async ctx => {
  try{
    let { data } = await ctx.$mysql.query({
      sql: 'select * from `auth_group`'
    })
    ctx.body = rejson.data(data)
  }catch(e){
    ctx.body = rejson.error('服务器异常')
  }
})

// 添加|修改 权限
router.post('/:type', async ctx => {
  try{
    let type = ctx.params.type
    if (type !== 'add' && type !== 'edit') {
      ctx.body = rejson.error('无效的操作')
      return
    }
    let { id, ...values } = ctx.request.body
    if (type === 'add') {
      // 添加权限
      var { data } = await ctx.$mysql.query({
        sql: 'insert into `auth_group` set ?',
        values
      })
    } else if (type === 'edit') {
      // 修改权限
      var { data } = await ctx.$mysql.query({
        sql: 'update `auth` set ? where id = ?',
        values: [values, id]
      })
    }
    ctx.body = rejson.data({
      inserId: data.insertId,
      affected: data.affectedRows
    })
  }catch(e){
    console.log(1);
    ctx.body = rejson.error('服务器异常')
  }
})

export default router

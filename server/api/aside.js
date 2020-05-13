import Router from 'koa-router'
import rejson from'../env/rejson'

const router = new Router({prefix: '/api'})

let errBody = {
  code: -1,
  msg: '服务器异常',
  data: []
}

// 菜单列表
router.get('/aside/all', async ctx => {
  try {
    let { data } = await ctx.$mysql.query({
      sql: 'select * from `aside` order by `sort` asc'
    })
    ctx.body = rejson.data(data)
  } catch (e) {
    ctx.body = rejson.error('服务器异常')
  }
})

// 添加菜单
router.post('/aside/add', async ctx => {
  try{
    let keys = ['title', 'to', 'icon', 'pid', 'sort', 'status', 'type']
    let values = {}
    keys.forEach(key => values[key] = ctx.request.body[key])
    let { data } = await ctx.$mysql.query({
      sql: 'insert into aside set ?',
      values
    })
    ctx.body = rejson.data({
      inserId: data.insertId,
      affected: data.affectedRows
    })
  }catch(e){
    console.log(e);
    ctx.body = rejson.error('服务器异常')
  }
})

// 编辑表单
router.post('/aside/edit', async ctx => {
  try{
    let keys = ['id', 'title', 'to', 'icon', 'pid', 'sort', 'status', 'type']
    let values = {}
    keys.forEach(key => values[key] = ctx.request.body[key])
    let { data } = await ctx.$mysql.query({
      sql: 'update aside set ? where id = ?',
      values: [values, values.id]
    })
    ctx.body = rejson.data({
      inserId: data.insertId,
      affected: data.affectedRows
    })
  }catch(e){
    console.log(e);
    ctx.body = rejson.error(e.code === 'ER_DUP_ENTRY' ? e.sqlMessage : '服务器异常')
  }
})

// 删除菜单（硬删除）
router.delete('/aside/del/:id', async ctx => {
  try{
    let id = parseInt(ctx.params.id)
    if (typeof id !== 'number') {
      ctx.body = rejson.error('无效的ID')
      return
    }
    let { data } = await ctx.$mysql.query({ sql: 'delete from aside where id = ? or pid = ?', values: [id, id] })
    ctx.body = rejson.data({
      inserId: data.insertId,
      affected: data.affectedRows
    })
  }catch(e){
    ctx.body = rejson.error('服务器异常')
  }
})

// 表单排序
router.post('/aside/sort', async ctx => {
  try{
    let sort = ctx.request.body.sort
    if (!sort || !sort.length) {
      ctx.body = rejson.error('您还未传参')
      return
    }
    let id = []
    let values = []
    sort.forEach(row => {
      id.push(row.id)
      values.push(`when ${row.id} then ${row.sort}`)
    })
    let { data } = await ctx.$mysql.query({
      sql: `update aside set sort = case id ${values.join(' ')} end where id in (${id.join(',')})`
    })
    ctx.body = rejson.data({
      inserId: data.insertId,
      affected: data.affectedRows
    })
  }catch(e){
    console.log(e)
    ctx.body = rejson.error('服务器异常')
  }
})

export default router

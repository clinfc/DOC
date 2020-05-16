import Router from 'koa-router'
import cfn from '../../plugins/custom/cfn'

const router = new Router({ prefix: '/api/tag' })

var errBody = {
  code: -1,
  msg: '服务器异常',
  data: ''
}

// 标签列表
router.get('/list', async ctx => {
  try{
    let { data } = await ctx.$mysql.query({
      sql: 'select * from `tag`'
    })
    ctx.body = {
      code: 0,
      msg: '',
      data
    }
  }catch(e){
    ctx.body = errBody
  }
})

// 添加标签
router.post('/add', async ctx => {
  try{
    let { pid, name } = ctx.request.body
    let { data } = await ctx.$mysql.query({
      sql: 'insert into tag set ?',
      values: { pid, name }
    })
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: {
        insertId: data.insertId,
        affected: data.affectedRows
      }
    }
  }catch(e){
    ctx.body = errBody
  }
})

// 修改标签
router.post('/edit', async ctx => {
  try{
    let { id, pid, name } = ctx.request.body
    let { data } = await ctx.$mysql.query({
      sql: 'update `tag` set ? where id = ?',
      values: [{ pid, name }, id]
    })
    ctx.body = {
      code: 0,
      msg: '已修改',
      data: {
        insertId: data.insertId,
        affected: data.affectedRows
      }
    }
  }catch(e){
    ctx.body = errBody
  }
})

// 删除标签
router.delete('/del/:id', async ctx => {
  try{
    let id = ctx.params.id
    if (!cfn.isNumber(id)) {
      ctx.body = {
        code: -1,
        msg: '无效的ID',
        data: ''
      }
      return
    }
    let { data } = await ctx.$mysql.query({
      sql: 'delete from `tag` where id = ? or pid = ?',
      values: [id, id]
    })
    ctx.body = {
      code: 0,
      msg: '已删除',
      data: {
        insertId: data.insertId,
        affected: data.affectedRows
      }
    }
  }catch(e){
    ctx.body = errBody
  }

})

export default router

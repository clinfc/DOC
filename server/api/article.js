import Router from 'koa-router'
import rejson from '../env/rejson.js'
import cfn from '../../plugins/custom/cfn.js'

let router = new Router({ prefix: '/api/article' })

router.post('/save', async ctx => {
  try{
    let { id, title, tags, aid, content } = ctx.request.body
    if (id > 0) {
      // 修改
      let { data: ad } = await ctx.$mysql.query({
        sql: 'update `article` set ? where ?',
        values: [{ content }, { id: aid }]
      })
      let { data } = await ctx.$mysql.query({
        sql: 'update `title` set ? where ?',
        values: [{ title, tags, content: aid }, { id }]
      })
      ctx.body = rejson.data({
        insertId: data.insertId,
        affected: data.affectedRows
      })
    } else {
      // 添加
      let { data: ad } = await ctx.$mysql.query({
        sql: 'insert into `article` set ?',
        values: {content}
      })
      let { data } = await ctx.$mysql.query({
        sql: 'insert into `title` set ?',
        values: { title, tags, type, content: ad.insertId }
      })
      ctx.body = rejson.data({
        insertId: data.insertId,
        affected: data.affectedRows
      })
    }
  }catch(e){
    console.log(e);
    ctx.body = rejson.error('服务器异常')
  }
})

router.get('/:id', async ctx => {
  try{
    let id = ctx.params.id
    if (!cfn.isNumber(id)) {
      ctx.body = rejson.error('无效的id')
      return
    }
    let { data } = await ctx.$mysql.query({
      sql: 'select t.`id`, t.`title`, t.`tags`, t.`content` aid, a.`content` from `title` t, `article` a where t.`id` = ? and t.`content` = a.`id`',
      values: [id]
    })
    ctx.body = rejson.data(data[0])
  }catch(e){
    console.log(e);
    ctx.body = rejson.error('服务器异常')
  }
})

export default router

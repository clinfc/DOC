/**
 * 将 MySQL 封装为 koa 中间件，并挂载到 content 中，以实现 content.$mysql 的方式进行调用
 */

import Sql from 'mysql'
import cfn from '../../plugins/custom/cfn.js'

class mysql
{
  constructor(options) {
    // MySQL实例化句柄
    this._hander = Sql.createConnection(options)
    // 是否已创建连接
    this._connected = false
  }

  /**
   * 创建 MySQL 连接
   * @param {Function} err_fn 错误处理的回调函数
   */
  connect(err_fn) {
    if (!this._connected) {
      this._hander.connect(err_fn)
      this._connected = true
    }
    return this
  }

  /**
   * 执行 SQL 语句
   * @param {Object} options
   *  - {String} sql SQL语句
   *  - {Array|Object} values SQL语句中占位符对应的值
   *  - {Number} timeout
   * @return {Promise}
   */
  query({ sql, values, timeout }) {
    if (!sql) {
      throw new Error('未定义 SQL 语句')
    }
    var opts = { sql }
    if (typeof values !== 'undefined') {
      opts.values = values
    }
    if (cfn.isNumber(timeout)) {
      opts.timeout = timeout
    }
    if (!this._connected) {
      this.connect()
    }
    return new Promise((resolve, reject) => {
      this._hander.query(opts, (error, results, fields) => {
        if (error) {
          reject(error)
        }
        resolve({ data: results, fields })
      })
    })
  }

  /**
   * 关闭数据库连接
   *
   * 在向MySQL服务器发送COM_QUIT包之前，所有之前加入队列的查询仍然存在。
   * 如果在发送COM_QUIT包之前发生了致命错误，将向回调提供一个err参数，但是不管发生什么情况，连接都将终止。
   * @param {Function} err_fn 错误回调函数，可选
   */
  end(err_fn) {
    if (this._connected) {
      this._hander.end(err_fn)
      this._connected = false
    }
  }

  /**
   * 关闭数据库连接
   *
   * 基础套接字立即终止。不会为连接触发更多的事件或回调。
   */
  destroy() {
    if (this._connected) {
      this._hander.destroy()
      this._connected = false
    }
  }
}

module.exports = function() {
  return async function(content, next) {
    var config = {
      host: process.env.sql_host,
      port: process.env.sql_port,
      user: process.env.sql_user,
      password: process.env.sql_password,
      database: process.env.sql_database,
      debug: process.env.sql_debug
    }
    content.$mysql = new mysql(config)
    await next()
    content.$mysql.end()
  }
}

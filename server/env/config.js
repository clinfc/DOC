// mysql 配置项
export const localSql = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'doc',
  debug: false
}

// SMTP 配置项
export const smtp = {}

// 自定义函数
export const cfn = {
  isNumber(tar) {
    switch (typeof tar) {
      case 'number':
        return true
      case 'string':
        return /^\d+(\.?\d+)?$/g.test(tar)
      default:
        return false
    }
  }
}

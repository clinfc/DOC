/**
 * 自定义函数库
 */
class CustomFunction {
  /**
   * 判断是否为数字或数字字符串（不包含 NaN）
   * @param {any} tar 被判断的对象
   * @return {Boolean}
   */
  isNumber (tar) {
    switch (typeof tar) {
      case 'number':
        return true
      case 'string':
        return /^\d+(\.?\d+)?$/g.test(tar)
      default:
        return false
    }
  }

  /**
   * 判断是否为空，包括：null, undefined，空字符串，空数组，空对象
   * @param {any} tar
   * @return {Boolean}
   */
  isEmpty (tar) {
    if (tar === null || tar === undefined) {
      return true
    }
    switch (typeof tar) {
      case 'string':
      case 'array':
        return tar.length === 0
      case 'object':
        return Object.keys(tar).length === 0
    }
    return false
  }

  isObject (tar) {
    return tar instanceof Object
  }

  isArray (tar) {
    return Array.isArray(tar)
  }

  /**
   * 将数据转换为树形结构，转换后的数据将与原数据不再有关联
   * @param {Array} tar 将数据行数组转换为 tree 解构
   * @param {String} k 主键
   * @param {String} fk 外键名。将依据此键进行数据 tree 化操作
   * @param {Function} filter
   * @return {Array}
   */
  toTree (tar, k, fk, filter) {
    const temp = []
    const data = this.copy(tar)
    data.forEach((row) => {
      if (!temp[row[fk]]) {
        temp[row[fk]] = []
      }
      temp[row[fk]].push(row)
    })
    return data.filter((row) => {
      if (temp[row[k]]) {
        row.children = temp[row[k]]
      }
      return filter(row)
    })
  }

  /**
   * 数组去重
   * @param {Array} tar
   * @param {Boolean} concat 是否合并子数组
   * @return {Array}
   */
  unique (tar, concat = false) {
    if (this.isArray(tar)) {
      if (concat) {
        tar = [].concat(...tar)
      }
      return [...new Set(tar)]
    }
    return []
  }

  /**
   * 生成验证码
   * @param {Int} len 验证码长度
   * @return {String}
   */
  get code () {
    return (len = 6) => {
      return Math.random().toString(16).slice(2, len + 2).toUpperCase()
    }
  }

  /**
   * 生成过期时间
   * @param {Int} time 有效时长，从当前时间开始计算（单位：秒，默认：180）
   * @return {Int} 过期时间（单位：毫秒）
   */
  get expire () {
    return (time = 180) => {
      return new Date().getTime() + time * 1000
    }
  }

  /**
   * 浅拷贝数组或对象（不会拷贝原型链）
   * @param {Object|Array} tar
   * @return {Object|Array}
   */
  copy (tar) {
    if (Array.isArray(tar)) {
      return copyArray(tar)
    }
    if (this.isObject(tar)) {
      return copyObject(tar)
    }
    return false
  }

  /**
   * 字符串验证
   * @param {String} value 需要验证的数据
   * @param {String} type 验证类型
   * @return {Boolean}
   */
  validate (value, type) {
    switch (type) {
      // 邮箱
      case 'email':
        return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(value) ? true : '无效的邮箱地址'
      // 纯字母
      case 'alpha':
        return /^[A-Za-z]+$/.test(value) ? true : '不能含有除字母以外的其它字符'
      // 字母和数字
      case 'alphaNum':
        return /^[A-Za-z0-9]+$/.test(value) ? true : '不能含有除字母和数字以外的其它字符'
      // 字母和数字，下划线_及破折号-
      case 'alphaDash':
        return /^[a-zA-Z0-9_-]+$/.test(value) ? true : '不能含有除字母、数字、下划线和破折号以外的其它字符'
      // 汉字
      case 'chs':
        return /^[\u4E00-\u9FA5]{0,}$/.test(value) ? true : '不能含有除汉字以外的其它字符'
    }
  }

  /**
   * 获取当前的时间戳
   */
  get timestamp () {
    return Math.floor(new Date().getTime() / 1000)
  }
}

function copyObject (object) {
  const temp = { ...object }
  for (const k in temp) {
    if (Array.isArray(temp[k])) {
      temp[k] = copyArray(temp[k])
    } else if (temp[k] instanceof Object) {
      temp[k] = copyObject(temp[k])
    }
  }
  return temp
}

function copyArray (array) {
  const temp = [...array]
  for (const k in temp) {
    if (Array.isArray(temp[k])) {
      temp[k] = copyArray(temp[k])
    } else if (temp[k] instanceof Object) {
      temp[k] = copyObject(temp[k])
    }
  }
  return temp
}

export default new CustomFunction()

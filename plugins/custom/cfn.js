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

  bothway (tar, forward, reverse, filter) {

  }

  /**
   * 浅拷贝数组或对象（不会拷贝原型链）
   * @param {Object|Array} tar
   * @return {Object|Array}
   */
  copy (tar) {
    if (this.isArray(tar)) {
      return copyArray(tar)
    }
    if (this.isObject(tar)) {
      return copyObject(tar)
    }
    return false
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
}

function copyObject (object) {
  const temp = { ...object }
  for (const k in temp) {
    switch (typeof temp[k]) {
      case 'object':
        temp[k] = copyObject(temp[k])
        break
      case 'array':
        temp[k] = copyArray(temp[k])
        break
    }
  }
  return temp
}

function copyArray (array) {
  const temp = [...array]
  for (const k in temp) {
    switch (typeof temp[k]) {
      case 'object':
        temp[k] = copyObject(temp[k])
        break
      case 'array':
        temp[k] = copyArray(temp[k])
        break
    }
  }
  return temp
}

export default new CustomFunction()

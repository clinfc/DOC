const state = () => ({
  // 原始数据（全部数据）
  initial: [],
  // 键值对（以ID为键）（全部数据）
  kvList: [],
  // 树形结构（全部数据）
  tree: [],
  // 菜单名集合（全部数据）
  titles: [],
  // 原始数据（admin 模块）
  aInitial: [],
  // 树形结构（admin 模块）
  aTree: []
})

const mutations = {
  // 传入原始数据，经过一系列的处理后分别存储
  set (state, data) {
    // 保存原始数据（所有数据）
    state.initial = data
    // 数据拆分
    const titles = []
    const aInitial = []
    data.forEach((row) => {
      titles[row.id] = row.title
      if (row.type === 'admin') {
        aInitial.push(row)
      }
    })
    state.titles = titles
    state.aInitial = aInitial
    // 保存树形结构数据（全部数据）
    state.tree = this.$cfn.toTree(data, 'id', 'pid', row => row.pid === 0)
    // 保存树形结构数据（admin 模块）
    state.aTree = this.$cfn.toTree(aInitial, 'id', 'pid', row => row.pid === 0)
  },
  kvList (state, data) {
    const kv = []
    data.forEach((row) => {
      kv[row.id] = row
    })
    state.kvList = kv
  }
}

const actions = {
  set ({ commit }, data) {
    commit('set', data)
  },
  kvList ({ commit }, data) {
    commit('kvList', data)
  },
  async reload ({ commit }) {
    const { status, data: { code, data } } = await this.$axios.get('/api/aside/all')
    if (status === 200 && code === 0) {
      commit('set', data)
    }
  }
}

export default { namespaced: true, state, mutations, actions }

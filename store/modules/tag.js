const state = () => ({
  // 原始数据
  initial: [],
  // tree数据
  tree: []
})

const mutations = {
  set (state, data) {
    if (data.length === 0) {
      return
    }
    state.initial = data
    state.tree = this.$cfn.toTree(data, 'id', 'pid', row => row.pid === 0)
  }
}

const actions = {
  set ({ commit }, data) {
    commit('set', data)
  },
  async reload ({ commit }) {
    const { status, data: { code, data } } = await this.$axios.get('/api/tag/list')
    if (status === 200 && code === 0) {
      commit('set', data)
    }
  }
}

export default { namespaced: true, state, mutations, actions }

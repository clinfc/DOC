const state = () => ({
  // 原始数据
  initial: []
})

const mutations = {
  set (state, data) {
    state.initial = data
  }
}

const actions = {
  set ({ commit }, data) {
    commit('set', data)
  },
  async reload ({ commit }) {
    const { status, data: { code, data } } = await this.$axios.get('/api/auth/list')
    if (status === 200 && code === 0) {
      commit('set', data)
    }
  }
}

export default { namespaced: true, state, mutations, actions }

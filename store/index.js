import Vue from 'vue'
import Vuex from 'vuex'

import aside from './modules/aside'
import tag from './modules/tag'
import auth from './modules/auth'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    aside,
    tag,
    auth
  },
  actions: {
    async nuxtServerInit ({ commit, dispatch }, { req, app }) {
      // 侧边导航栏
      const { status: asides, data: { code: asidec, data: asided } } = await app.$axios.get('/api/aside/all')
      if (asides === 200 && asidec === 0) {
        commit('aside/set', asided)
      }
      // 标签
      const { status: tags, data: { code: tagc, data: tagd } } = await app.$axios.get('/api/tag/list')
      if (tags === 200 && tagc === 0) {
        commit('tag/set', tagd)
      }
      // 权限组
      const { status: auths, data: { code: authc, data: authd } } = await this.$axios.get('/api/auth/list')
      if (auths === 200 && authc === 0) {
        commit('auth/set', authd)
      }
    }
  }
})

export default store

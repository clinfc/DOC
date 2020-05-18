<template>
  <div>
    <el-header class="article-header">
      Header
    </el-header>
    <el-main class="article-main">
      <div class="article-center" v-html="data.html" />
    </el-main>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      data: {}
    }
  },
  async beforeCreate () {
    const id = this.$route.params.id
    if (this.$cfn.isNumber(id)) {
      const { status, data } = await this.$axios.get(`/api/article/${id}`)
      if (status === 200 && data.code === 0) {
        this.data = data.data
      }
      this.data.html = marked(data.data.content || '', {
        highlight (code, language) {
          const hljs = require('highlight.js')
          const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
          return hljs.highlight(validLanguage, code).value
        }
      })
    }
  }
}
</script>

<style>
  .article-center {
    width: 980px;
    margin: auto;
  }
</style>

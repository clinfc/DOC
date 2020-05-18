<template>
  <div class="markdown-editor">
    <div class="markdown-editor-top">
      <el-form :inline="true" :model="form">
        <el-form-item class="article-title">
          <el-input v-model="form.title" required placeholder="文章标题" />
        </el-form-item>
        <el-form-item>
          <el-cascader
            v-model="tags"
            :options="tagTree"
            :props="props"
            collapse-tags
            clearable
            required
            placeholder="文章标签"
            @change="change"
          />
        </el-form-item>
        <el-form-item class="save-btn">
          <el-button @click="cancel">
            取 消
          </el-button>
          <el-button type="primary" @click="submit">
            保 存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="markdown-editor-bot">
      <mavon-editor v-model="form.content" />
    </div>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      tags: [],
      form: {
        id: 0,
        aid: 0,
        title: '',
        tags: '',
        content: ''
      },
      props: {
        multiple: true,
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    tagTree () {
      return this.$store.state.tag.tree
    },
    kv () {
      const temp = []
      this.$store.state.tag.initial.forEach((row) => {
        temp[row.id] = row
      })
      return temp
    }
  },
  async beforeCreate () {
    const id = this.$route.params.id
    const { code, data } = await this.$axios.$get(`/api/article/${id}`)
    if (code === 0 && data.id) {
      this.form = data
      this.reverse()
    }
  },
  methods: {
    // 取消表单
    cancel () {
      this.$router.go(-1)
    },
    // 表单提交
    submit () {
      // 验证表单
      if (!this.form.title) {
        this.$message.error('文章标题不能为空')
        return
      }
      if (!this.form.tags) {
        this.$message.error('文章标签不能为空')
        return
      }
      if (!this.form.content) {
        this.$message.error('文章内容不能为空')
        return
      }
      // 保存数据
      this.$axios.post('/api/article/save', this.form).then(({ status, data }) => {
        if (status === 200 && data.code === 0) {
          // 保存成功
          const id = this.form.id || data.data.insertId
          this.$router.push(`/article/d/${id}`)
        } else {
          this.$message.error(data.msg || '服务器异常')
        }
      })
    },
    // 标签数据同步
    change () {
      this.form.tags = this.$cfn.unique(this.tags, true).join()
    },
    // 逆向解析 form.tags
    reverse () {
      const temp = []
      const ids = this.form.tags.split(',')
      if (ids[0]) {
        ids.forEach((id) => {
          const item = [id]
          let pid = this.kv[id].pid
          while (pid) {
            item.unshift(pid)
            pid = this.kv[pid].pid
          }
          temp.push(item)
        })
      }
      this.tags = temp
    }
  }
}
</script>

<style>
  .markdown-editor {
    width: 90%;
    min-width: 980px;
    margin: auto;
    height: 100%;
  }
  .markdown-editor-top {
    height: 75px;
    padding-top: 25px;
  }
  .markdown-editor-bot {
    height: calc(100% - 100px);
  }
  .markdown-editor-bot>div {
    height: 95%;
  }
  .article-title>div {
    width: 450px;
  }
  .save-btn {
    float: right;
  }
</style>

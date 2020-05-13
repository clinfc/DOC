<template>
  <el-dialog :title="title" :visible.sync="showForm" :before-close="()=>$emit('close')" width="600px" @opened="darlogOpend">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="父级标签">
        <el-select v-model="form.pid" placeholder="请选择父级">
          <el-option label="0" value="0" />
          <el-option v-for="row in $store.state.tag.initial" :key="row.id" :label="row.name" :value="row.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签名" required>
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入标签名" @keyup.enter="submit" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">
        取 消
      </el-button>
      <el-button type="primary" @click="submit">
        保 存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    pid: {
      type: Number,
      default: 0
    },
    showForm: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      form: {
        id: 0,
        pid: 0,
        name: ''
      }
    }
  },
  computed: {
    title () {
      return this.type === 'add' ? '添加标签' : '编辑标签'
    }
  },
  created () {
    console.log(this.$store.state.tag.titles)
  },
  methods: {
    // 打开动画结束时的回调
    darlogOpend () {
      if (this.type === 'add') {
        this.form = {
          id: 0,
          name: '',
          pid: this.pid
        }
      } else {
        this.form = { ...this.data }
      }
    },
    // 提交表单
    submit () {
      const self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { id, pid, name } = self.form
          self.$axios.post(`/api/tag/${self.type}`, {
            id: id || '',
            pid: pid || 0,
            name
          }).then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              // 刷新aside
              self.$emit('reload')
              self.$emit('close')
            } else {
              self.$alert(data && data.msg ? data.msg : '服务器连接失败', '异常')
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>

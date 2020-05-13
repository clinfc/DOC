<template>
  <el-dialog :title="title" :visible.sync="showForm" :before-close="()=>$emit('close')" width="600px" @opened="darlogOpend">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="父级标签">
        <el-select v-model="form.pid" placeholder="请选择父级">
          <el-option v-for="(v, k) in $store.state.aside.titles" :key="k" :label="v" :value="k" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="可见" value="1" />
          <el-option label="隐藏" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="区块">
        <el-input v-model="form.type" autocomplete="off" placeholder="请输入区块名" />
      </el-form-item>
      <el-form-item label="菜单名" required>
        <el-input v-model="form.title" autocomplete="off" placeholder="请输入菜单名" />
      </el-form-item>
      <el-form-item label="路由" required>
        <el-input v-model="form.to" autocomplete="off" placeholder="请输入路由, 比如: /admin" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" type="number" min="0" autocomplete="off" placeholder="请输入排序号,数字越小,权重越大" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" autocomplete="off" placeholder="请输入图标" />
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
        title: '',
        pid: 0,
        to: '/',
        icon: '',
        sort: 0,
        status: '1',
        type: ''
      }
    }
  },
  computed: {
    title () {
      return this.type === 'add' ? '添加菜单' : '编辑菜单'
    }
  },
  methods: {
    // 打开动画结束时的回调
    darlogOpend () {
      if (this.type === 'add') {
        this.form = {
          id: 0,
          title: '',
          pid: this.pid,
          to: '/',
          icon: '',
          sort: 0,
          status: '1',
          type: ''
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
          const { id, pid, to, ...args } = self.form
          self.$axios.post(`/api/aside/${self.type}`, {
            id: id || '',
            pid: pid || 0,
            to: to || '/',
            ...args
          }).then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              // 刷新aside
              self.$emit('reload')
              self.$emit('close')
            } else {
              self.$alert(data && data.msg ? data.msg : '连接失败', '异常')
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

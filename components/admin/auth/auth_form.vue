<template>
  <el-dialog :title="title" :visible.sync="showForm" :before-close="() => $emit('close')" width="600px" @opened="darlogOpend">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="正常" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" required>
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="权限">
        <el-cascader
          v-model="auth"
          :options="aside"
          :props="options"
          collapse-tags
          clearable
          placeholder="请选择分组权限"
          @change="formate"
        />
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.explain" type="textarea" autosize placeholder="请输入说明内容" />
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
      auth: [],
      form: {
        id: 0,
        status: '1',
        name: '',
        auth: [],
        explain: ''
      },
      options: {
        multiple: true,
        value: 'id',
        label: 'title'
      }
    }
  },
  computed: {
    title () {
      return this.type === 'add' ? '添加权限组' : '编辑权限组'
    },
    aside () {
      return this.$store.state.aside.tree
    },
    kv () {
      return this.$store.state.aside.kvList
    }
  },
  methods: {
    // 打开动画结束时的回调
    darlogOpend () {
      if (this.type === 'add') {
        this.form = {
          id: '',
          status: '1',
          name: '',
          auth: '',
          explain: ''
        }
      } else {
        this.form = { ...this.data }
        this.data.auth.split(',').forEach((id) => {
          this.auth.push([id])
        })
      }
      this.reversal()
    },
    // 通过 form.auth 逆向获取生成级联选择器对应的数据
    reversal () {
      const auth = []
      const ids = this.form.auth.split(',')
      if (ids[0]) {
        ids.forEach((id) => {
          const item = [id]
          let pid = this.kv[id].pid
          while (pid) {
            item.unshift(pid)
            pid = this.kv[pid].pid
          }
          auth.push(item)
        })
      }
      this.auth = auth
    },
    // 提交表单
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post(`/api/auth/${this.type}`, this.form).then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              // 刷新aside
              this.$emit('reload')
              this.$emit('close')
            } else {
              this.$alert(data && data.msg ? data.msg : '连接失败', '异常')
            }
          })
        }
      })
    },
    // 将级联选择器数据同步到 form.auth
    formate () {
      this.form.auth = this.$cfn.unique(this.auth, true).sort((a, b) => a - b).join()
    }
  }
}
</script>

<style></style>

<template>
  <el-card class="admin-card-mc admin-card-shadow">
    <div slot="header" class="clearfix">
      <span>标签列表</span>
      <el-button style="float: right; padding: 3px 10px" type="text" @click="append({id: 0})">
        添加
      </el-button>
    </div>
    <el-tree
      :data="tree"
      :props="{label: 'name'}"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click.stop="append(data)">
            添加
          </el-button>
          <el-button type="text" size="mini" @click.stop="edit(data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click.stop="remove(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <tag-form
      :data="data"
      :pid="pid"
      :type="type"
      :show-form="showForm"
      @close="close"
      @reload="reload"
    />
  </el-card>
</template>

<script>
import TagForm from '@/components/admin/tag/tag_form'
export default {
  components: {
    TagForm
  },
  data () {
    return {
      data: {},
      pid: 0,
      type: 'add',
      showForm: false
    }
  },
  computed: {
    tree () {
      return this.$store.state.tag.tree
    }
  },
  methods: {
    // 显示表单
    open () {
      this.showForm = true
    },
    // 隐藏表单
    close () {
      this.showForm = false
    },
    // 添加标签
    append (data) {
      this.pid = data.id
      this.data = {}
      this.type = 'add'
      this.open()
    },
    // 编辑标签
    edit (data) {
      this.pid = 0
      this.data = data
      this.type = 'edit'
      this.open()
    },
    // 删除标签
    remove (data) {
      const self = this
      this.$confirm(`此操作将删除【${data.name}】标签${data.children ? '以及其子标签' : ''}，是否继续操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.$axios.delete(`/api/tag/del/${data.id}`).then(({ status, data }) => {
          if (status === 200 && data.code === 0) {
            self.reload()
          } else {
            self.$alert(data && data.msg ? data.msg : '服务器连接失败', '异常')
          }
        })
      }).catch(() => {})
    },
    // 数据重载
    reload () {
      this.$store.dispatch('tag/reload')
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node__content:hover {
    background-color: #E5E5E5;
  }
</style>

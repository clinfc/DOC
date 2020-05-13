<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card admin-card-shadow">
        <div slot="header" class="clearfix">
          <span>菜单列表</span>
          <el-button style="float: right; padding: 3px 10px" type="text" @click="append({id: 0})">
            添加
          </el-button>
        </div>
        <el-tree
          :data="tree"
          :props="{label: 'title'}"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="check"
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
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card admin-card-shadow">
        <div slot="header" class="clearfix">
          <span>菜单详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editDetail">
            编辑
          </el-button>
        </div>
        <div v-for="(v, k) in detail" :key="k" class="detail-item">
          <template v-if="k !== 'children'">
            <span class="datail-key">{{ k | label(labels) }}</span>
            <span class="detail-value">{{ v | labelVal(k, titles) }}</span>
          </template>
        </div>
      </el-card>
      <aside-form
        :data="data"
        :pid="pid"
        :type="type"
        :show-form="showForm"
        @close="close"
        @reload="reload"
      />
    </el-col>
  </el-row>
</template>

<script>
import AsideForm from '@/components/admin/aside/aside_form.vue'
export default {
  components: {
    AsideForm
  },
  filters: {
    label (key, labels) {
      return labels[key]
    },
    labelVal (val, key, titles) {
      switch (key) {
        case 'pid':
          return titles[val] || '顶级'
        case 'icon':
          return val || '未定义'
        case 'status':
          return val === '1' ? '可见' : '隐藏'
        default:
          return val
      }
    }
  },
  data () {
    return {
      // 传给子组件的数据
      data: {},
      // 子组件 pid
      pid: 0,
      // 子组件显示开关
      showForm: false,
      // 显示面板的数据
      detail: {},
      // 面板的操作类型：add|edit
      type: 'add',
      labels: {
        id: 'ID',
        pid: '父级菜单',
        title: '菜单名',
        to: '路由',
        icon: '图标',
        sort: '排序',
        status: '状态',
        type: '区块'
      }
    }
  },
  computed: {
    tree () {
      return this.$store.state.aside.tree
    },
    initial () {
      return this.$store.state.aside.initial
    },
    titles () {
      return this.$store.state.aside.titles
    }
  },
  methods: {
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
      console.log(data)
    },
    // 编辑详情面板对应的标签
    editDetail () {
      if (!this.detail.id) {
        return
      }
      this.pid = 0
      this.data = this.detail
      this.type = 'edit'
      this.open(`编辑 - ${this.data.title}`)
    },
    // 删除标签
    remove (data) {
      this.$confirm(`此操作会将【${data.title}】菜单及其子菜单放入回收站, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { status, data: { code, msg } } = await this.$axios.delete(`/api/aside/del/${data.id}`)
        if (status === 200) {
          if (code === 0) {
            this.$notify({ title: '成功', message: msg, type: 'success' })
            this.reload()
          } else {
            this.$alert(msg, '异常')
          }
        }
      }).catch(() => {})
    },
    // 设置详情面板的数据
    check (data) {
      this.detail = data
    },
    // 打开|显示 表单
    open () {
      this.showForm = true
    },
    // 关闭|隐藏 表单
    close () {
      this.showForm = false
    },
    // 重载导航栏信息
    reload () {
      this.$store.dispatch('aside/reload')
      if (this.detail && this.detail.id) {
        this.detail = this.initial.filter(row => row.id === this.detail.id)[0]
      }
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
.detail-item {
  display: flex;
}
.detail-item>span {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 40px;
  box-sizing: border-box;
}
.datail-key {
  width: 100px;
  text-align: right;
  color: #606266;
  padding: 0 18px 0 0;
}
.detail-value {
  width: calc(100% - 100px);
  font-weight: 600;
}
</style>

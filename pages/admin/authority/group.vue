<template>
  <el-card class="admin-card-mc admin-card-shadow">
    <div slot="header" class="clearfix">
      <span>权限分组</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="append">
        添加
      </el-button>
    </div>
    <el-table :data="table">
      <el-table-column type="index" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="状态" prop="status" :formatter="formatter" />
      <el-table-column label="说明" prop="explain" show-overflow-tooltip />
      <el-table-column label="操作" header-align="center" fixed="right" width="95">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button type="text" @click="delete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <auth-form :type="type" :data="data" :show-form="showForm" @close="close" @reload="reload" />
  </el-card>
</template>

<script>
import AuthForm from '@/components/admin/auth/auth_form'
export default {
  components: {
    AuthForm
  },
  data () {
    return {
      type: 'add',
      showForm: false,
      data: {}
    }
  },
  computed: {
    table () {
      return this.$store.state.auth.initial
    }
  },
  created () {
    const data = this.$store.state.aside.initial
    this.$store.dispatch('aside/kvList', data)
  },
  methods: {
    append () {
      this.data = {}
      this.type = 'add'
      this.open()
    },
    edit (data) {
      this.data = data
      this.type = 'edit'
      this.open()
    },
    delete (row) {},
    formatter (row) {
      return row.status === '1' ? '正常' : '禁用'
    },
    open () {
      this.showForm = true
    },
    close () {
      this.showForm = false
    },
    reload () {
      this.$store.dispatch('auth/reload')
    }
  }
}
</script>

<style></style>

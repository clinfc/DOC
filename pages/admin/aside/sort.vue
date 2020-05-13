<template>
  <el-card class="box-card admin-card-mc admin-card-shadow">
    <div slot="header" class="clearfix">
      <span>菜单排序</span>
      <el-select v-model="value" style="float: right" size="mini" placeholder="请选择">
        <el-option v-for="row in rank" :key="row.id" :label="row.title" :value="row.id" />
      </el-select>
    </div>
    <el-table :data="sortData" style="width: 100%">
      <el-table-column type="index" fixed />
      <el-table-column label="菜单名" prop="title" fixed width="150px" />
      <el-table-column label="路由" prop="to" />
      <el-table-column label="区块" prop="type" />
      <el-table-column label="排序" prop="sort" sortable width="120px">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sort" type="number" min="0" size="mini" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="65px">
        <template slot-scope="scope">
          <el-button type="text" @click="save(scope.row)">
            save
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="show" class="admin-aside-sort-card-foot">
      <el-button size="mini" @click="resort">
        reset
      </el-button>
      <el-button size="mini" type="primary" @click="save()">
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      show: false
    }
  },
  computed: {
    titles () {
      return this.$store.state.aside.titles
    },
    // 筛选可用于排序的父级目录
    rank () {
      const temp = []
      const ids = []
      this.$store.state.aside.initial.forEach((row) => {
        if (!ids.includes(row.pid)) {
          ids.push(row.pid)
          temp.push({ id: row.pid, title: this.titles[row.pid] || '顶级目录' })
        }
      })
      return temp
    },
    data () {
      return this.$cfn.copy(this.$store.state.aside.initial)
    },
    sortData () {
      return this.data.filter(row => row.pid === this.value)
    }
  },
  watch: {
    value (val) {
      if (val !== '') {
        this.show = true
      }
    }
  },
  methods: {
    resort () {
      this.sortData.forEach((row, k) => {
        row.sort = k
      })
    },
    save (item) {
      const data = []
      if (item) {
        data.push({ id: item.id, sort: item.sort })
      } else {
        this.sortData.forEach(row => data.push({ id: row.id, sort: row.sort }))
      }
      if (!data.length) { return false }
      this.$axios.post('/api/aside/sort', {
        sort: data
      }).then(({ status, data }) => {
        if (status === 200 && data.code === 0) {
          this.$alert('已保存', '提示')
          this.$store.dispatch('aside/reload')
        } else {
          this.$alert(data.msg || '服务器连接失败', '异常')
        }
      })
    }
  }
}
</script>

<style>
  .admin-aside-sort-card-foot {
    padding: 10px 0 0;
    text-align: right;
  }
</style>

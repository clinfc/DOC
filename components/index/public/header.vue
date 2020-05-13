<template>
  <el-menu class="index-header-menu" mode="horizontal">
    <template v-for="row in data">
      <el-menu-item v-if="!row.children" :key="row.id" :index="row.id | toRouter">
        {{ row.name }}
      </el-menu-item>
      <el-submenu v-else-if="row.children" :key="row.id" :index="row.id | toString">
        <template slot="title">
          {{ row.name }}
        </template>
        <el-menu-item :index="row.id | toRouter">
          {{ row.name }}
        </el-menu-item>
        <template v-for="child in row.children">
          <el-menu-item v-if="!child.children" :key="child.id" :index="child.id | toRouter">
            {{ child.name }}
          </el-menu-item>
          <el-submenu v-else-if="child.children" :key="child.id" :index="child.id | toString">
            <template slot="title">
              {{ child.name }}
            </template>
            <el-menu-item :index="child.id | toRouter">
              {{ child.name }}
            </el-menu-item>
            <el-menu-item v-for="item in child.children" :key="item.id" :index="item.id | toRouter">
              {{ item.name }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
    <el-menu-item class="index-header-search">
      <el-autocomplete v-model="search" size="small" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" />
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  filters: {
    toRouter (val) {
      return `/${val}`
    },
    toString (val) {
      return `${val}`
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    data () {
      return this.$store.state.tag.tree
    }
  },
  methods: {
    handleSelect () {},
    querySearchAsync () {}
  }
}
</script>

<style>
  .index-header-menu {
    width: 980px;
    margin: auto;
  }
  .index-header-search {
    float: right !important;
  }
</style>

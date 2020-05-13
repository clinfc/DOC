<template>
  <el-aside class="admin-body-aside" width="220px">
    <el-menu
      class="admin-body-aside-menu"
      background-color="#393d49"
      text-color="#fff"
      unique-opened
      router
    >
      <template v-for="(row, i) in $store.state.aside.aTree">
        <!-- 无子分类 -->
        <el-menu-item v-if="!row.children" :key="i" :index="row.to">
          <i :class="row.icon" />
          <span slot="title">{{ row.title }}</span>
        </el-menu-item>
        <!-- 有子分类 -->
        <el-submenu v-else :key="i" :index="row.to">
          <template slot="title">
            <i :class="row.icon" />
            <span>{{ row.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(child, ci) in row.children" :key="ci" :index="child.to">
              <i :class="child.icon" />
              {{ child.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {

}
</script>

<style>
.admin-body-aside-menu .iconfont {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
}
</style>

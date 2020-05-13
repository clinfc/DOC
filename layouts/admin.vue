<template>
  <el-container class="admin">
    <ad-header />
    <el-container class="admin-body">
      <ad-aside />
      <el-main class="admin-body-main">
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdHeader from '@/components/admin/public/header'
import AdAside from '@/components/admin/public/aside'
export default {
  components: {
    AdHeader,
    AdAside
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.admin {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 960px;
  display: flex;
  flex-direction: column;
}
.admin-head {
  padding: 0;
}
.admin-head .uinfo {
  float: right;
}
.admin-body {
  height: calc(100% - 60px);
}
.admin-body-aside {
  height: 100%;
  overflow: hidden;
}
.admin-body-aside-menu {
  width: calc(100% + 17px);
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.admin-body-main {
  min-width: 700px;
}
.admin-card-shadow {
  box-shadow: 0 7px 30px 0px #909399 !important;
}
.admin-card-mc {
  max-width: 800px;
  margin: 30px auto 0;
}
</style>

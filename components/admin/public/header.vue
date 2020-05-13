<template>
  <el-header class="admin-head">
    <el-menu
      mode="horizontal"
      background-color="#333"
      text-color="#fff"
      active-text-color="#393D49"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <div class="web-ico">
          DOC-APP
        </div>
      </el-menu-item>
      <el-submenu index="2" class="uinfo">
        <template slot="title">
          <el-avatar size="small" src="/admin/images/avatar.jpg" />
        </template>
        <el-menu-item index="4-1">
          个人中心
        </el-menu-item>
        <el-menu-item index="4-2">
          注销
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  methods: {
    handleSelect () {}
  }
}
</script>

<style>
  .web-ico {
    display: inline-block;
    width: 178px;
    text-align: center;
    font-size: 24px;
    float: left;
  }
</style>

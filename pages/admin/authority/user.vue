<template>
  <el-card class="admin-card-mc admin-card-shadow">
    <div slot="header" class="clearfix">
      <span>用户权限</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        添加
      </el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>
</template>

<script>
</script>

<style>
</style>

<template>
  <el-container class="index">
    <el-header class="index-header">
      <index-header />
    </el-header>
    <el-main class="index-main">
      <nuxt />
    </el-main>
    <el-footer class="index-footer">
      Footer
    </el-footer>
  </el-container>
</template>

<script>
import IndexHeader from '@/components/index/public/header'
export default {
  components: {
    IndexHeader
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
  .index-header {
    border-bottom: solid 1px #e6e6e6;
  }
  .index-main {
    width: 980px;
    margin: auto;
  }
</style>

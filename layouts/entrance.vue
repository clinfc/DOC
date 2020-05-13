<template>
  <el-container class="admin-entrance">
    <nuxt />
  </el-container>
</template>

<style>
  .admin-entrance {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .ad-ruleForm {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    box-shadow: 0 7px 30px 0px #909399;
    padding: 70px 45px 15px 15px;
    width: 550px;
  }
  .ad-ruleForm>.rule-form-title {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    text-align: center;
    width: 100%;
    line-height: 60px;
    color: #888888;
    font-size: 24px;
  }
</style>

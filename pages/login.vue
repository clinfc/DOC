<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ad-ruleForm">
    <h3 class="rule-form-title">
      用户登录
    </h3>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入用户名或电子邮箱" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">
        立即登录
      </el-button>
      <el-button @click="resetForm('ruleForm')">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'entrance',
  data () {
    return {
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>

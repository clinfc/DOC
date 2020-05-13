<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ad-ruleForm">
    <h3 class="rule-form-title">
      用户注册
    </h3>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="邮箱" prop="pass">
      <el-input v-model="ruleForm.email" type="email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="ruleForm.code" autocomplete="off" placeholder="请输入验证码">
        <template slot="append">
          <span class="send-cod">{{ sendCodeTxt }}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="请确认密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">
        立即创建
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
      timer: 0,
      ruleForm: {
        name: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass')
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (value !== this.ruleForm.pass) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    sendCodeTxt () {
      return this.timer === 0 ? '获取验证码' : `${this.timer} S`
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
  .ad-ruleForm .send-cod {
    cursor: pointer;
  }
</style>

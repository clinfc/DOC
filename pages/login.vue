<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
    class="ad-ruleForm"
    autocomplete="off"
  >
    <h3 class="rule-form-title">
      用户登录
    </h3>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" placeholder="请输入用户名或电子邮箱" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="form.pass" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">
        重 置
      </el-button>
      <el-button type="primary" @click="submit">
        立即登录
      </el-button>
      <div class="log-reg-link">
        还没有账号？
        <nuxt-link to="/register">
          前往注册
        </nuxt-link>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'entrance',
  data () {
    return {
      form: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { status, data } = await this.$axios.post('/api/user/login', this.form)
          if (status === 200 && data.code === 0) {
            this.$router.push('/')
          } else {
            this.$message.error(data.msg || '服务器异常')
          }
        }
      })
    },
    // 重置
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>

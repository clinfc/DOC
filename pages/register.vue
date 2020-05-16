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
      用户注册
    </h3>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" placeholder="请输入用户名">
        <template slot="append">
          <span class="pointer" @click="verifyName">验证用户名</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" type="email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="form.code" placeholder="请输入验证码">
        <template slot="append">
          <span class="pointer" :style="cursor" @click="sendCode">{{ sendCodeTxt }}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="form.pass" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="确认密码" prop="repass">
      <el-input v-model="form.repass" type="password" placeholder="请输入确认密码" />
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">
        重 置
      </el-button>
      <el-button type="primary" @click="submit">
        立即注册
      </el-button>
      <div class="log-reg-link">
        已有账号？ <nuxt-link to="/login">
          前往登录
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
      timer: 0,
      loading: '',
      form: {
        name: '',
        email: '',
        code: '',
        pass: '',
        repass: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        repass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.pass) {
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
    },
    cursor () {
      return { cursor: this.timer > 0 ? 'no-drop' : 'pointer' }
    }
  },
  methods: {
    // 验证用户名
    verifyName () {
      this.$refs.form.validateField('name', async (valid) => {
        if (!valid) {
          const { status, data } = await this.$axios.post('/api/user/verifyName', { name: this.form.name })
          if (status === 200) {
            this.$message({
              type: data.code === 0 ? 'success' : 'error',
              message: data.msg
            })
          } else {
            this.$message.error('服务器异常')
          }
        }
      })
    },
    // 显示加载层
    openLoading () {
      if (this.loading === '') {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          customClass: 'loading-fixed'
        })
      }
    },
    // 隐藏加载层
    closeLoading () {
      if (this.loading !== '') {
        this.loading.close()
        this.loading = ''
      }
    },
    // 发送验证码
    sendCode () {
      if (this.timer > 0) { return }
      this.$refs.form.validateField('email', (valid) => {
        if (!valid) {
          const email = this.form.email
          this.openLoading()
          this.$axios.post('/api/user/sendCode', { email }).then(({ status, data }) => {
            this.closeLoading()
            if (status === 200 && data.code === 0) {
              this.timer = 180
              const end = new Date().getTime() + this.timer * 1000
              const interval = setInterval(() => {
                if (this.timer <= 0) {
                  clearInterval(interval)
                  this.timer = 0
                } else {
                  this.timer = Math.round((end - new Date().getTime()) / 1000)
                }
              }, 500)
              this.$message({
                message: data.msg,
                type: 'success'
              })
            } else {
              this.$message.error(data.msg || '服务器异常', '提示')
            }
          })
        }
      })
    },
    // 重置表单
    reset () {
      this.openLoading()
      this.$refs.form.resetFields()
    },
    // 提交表单
    submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { repass, ...args } = this.form
          const { status, data } = await this.$axios.post('/api/user/register', args)
          if (status === 200 && data.code === 0) {
            this.$message.success('注册成功，即将为您跳转到登录页面')
            setTimeout(() => { this.$router.push('/login') }, 2000)
          } else {
            this.$message.error(data.msg || '服务器异常')
          }
        }
      })
    }
  }
}
</script>

<style>
  .ad-ruleForm .pointer {
    cursor: pointer;
  }
  .loading-fixed {
    position: fixed;
    top: 1000;
  }
</style>

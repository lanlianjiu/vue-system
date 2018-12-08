<template>
  <div class="login-page">
    
    <div class="login-wrap">
      <el-col
        :class="translateLeft"
        :span="10"
      >

        <div v-if="notforget">
          <div class="logo">
            <icon
              name="tree"
              :scale="8"
            ></icon>
            <div class="title">
              <a>
                <span>VUE</span><span class="subtitle">SYSTEM</span>
              </a>
            </div>
          </div>

          <div class="login-form">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm">
              <el-form-item prop="username">
                <el-input
                  :placeholder="login.userplaceholder"
                  v-model="ruleForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :placeholder="login.pwdplaceholder"
                  type="password"
                  v-model="ruleForm.password">
                </el-input>
              </el-form-item>
              <el-form-item class="btn">
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="handleLogin('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="login-footer">
            <el-col :span="12">
              <el-checkbox
                v-model="remember"
                name="type"
              >记住我</el-checkbox>
            </el-col>
            <el-col
              class="forgetpwd"
              :span="12"
            >
              <span @click="wrapSwitch(false)">忘记密码</span>
            </el-col>
          </div>
        </div>

        <div v-else>
          <div class="title forgetwrap-title">
            <a>
              <span>VUE</span><span class="subtitle">SYSTEM</span>
            </a>
          </div>
          <div class="forget-form">
            <el-form
              :model="forgetForm"
              ref="forgetRuleForm"
            >
              <el-form-item>
                <el-input
                  :placeholder="login.forget_email"
                  v-model="forgetForm.email"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  :placeholder="login.forget_code"
                  v-model="forgetForm.code"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  :placeholder="login.forget_passwrd"
                  type="password"
                  v-model="forgetForm.newPassword"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  :placeholder="login.confirm_passwrd"
                  type="password"
                  v-model="forgetForm.confirmPassword"
                ></el-input>
              </el-form-item>
              <el-form-item class="btn">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button
                      @click="wrapSwitch(true)"
                      type="primary"
                    >返回</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      @click="forgetHandle"
                      type="primary"
                    >重置</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </div>

      </el-col>

      <el-col
        :class="translateRight"
        :span="14"
      >
        <div class="wallpaper"></div>
      </el-col>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage'

const useRegexp = {
  exist: /\S+/
}

export default {
  name: 'login',
  components: {},
  mounted() {
    // this.$notify({
    //   title: '登陆提示',
    //   message: '用户名 admin 密码随意输入',
    //   position: 'top-left',
    //   duration: 0
    // })
  },
  data() {
    const validobj = {
      username: [{ ruleName: 'exist', error: '用户名为空！' }],
      password: [{ ruleName: 'exist', error: '密码为空！' }]
    }

    const _typeof = val =>
      Object.prototype.toString
        .call(val)
        .replace(/^\S+\s/, '')
        .replace(/]$/, '')
        .toLocaleLowerCase()

    const validfn = (rule, value, callback) => {
      const _validobj = validobj[rule.field.replace(/^\S+(?=\.)\./g, '')]
      for (let i = 0; i < _validobj.length; i++) {
        let _rule = useRegexp[_validobj[i].ruleName]
        if (_typeof(_rule) === 'regexp') {
          if (!_rule.test(value)) {
            return callback(new Error(_validobj[i].error))
          }
        } else if (_typeof(_rule) === 'function') {
          if (_rule(value, _validobj[i].params)) {
            return callback(new Error(_validobj[i].error))
          }
        }
      }
      callback()
    }

    return {
      login: {
        userplaceholder: '请输入用户名',
        pwdplaceholder: '请输入密码',
        forget_email: '请输入邮箱',
        forget_code: '请输入验证码',
        forget_passwrd: '请输入新密码',
        confirm_passwrd: '请输入确认密码'
      },
      ruleForm: {
        username: storage.get('loginUser') || 'admin',
        password: ''
      },
      rules: {
        username: [{ validator: validfn, trigger: 'blur', required: true }],
        password: [{ validator: validfn, trigger: 'blur', required: true }]
      },
      remember: true,
      loading: false,
      switchLeft: false,
      switchRight: false,
      notforget: true,
      forgetForm: {
        email: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    translateLeft() {
      return {
        'translate-left': true,
        'login-col': true,
        'switch-left': this.switchLeft
      }
    },
    translateRight() {
      return {
        'translate-right': true,
        'login-col': true,
        'switch-right': this.switchLeft
      }
    }
  },
  methods: {
    wrapSwitch(state) {
      this.switchLeft = !this.switchLeft
      this.switchRight = !this.switchRight
      setTimeout(() => {
        this.notforget = state
        this.$refs['ruleForm'].resetFields()
        // this.$refs['forgetRuleForm'].resetFields()
      }, 300)
    },
    handleLogin(formName) {
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let { username, password } = this.ruleForm
            this.remember
              ? storage.set('loginUser', username)
              : storage.remove('loginUser', username)
            const response = await this.$store.dispatch('loginbyUser', {
              username: username.trim(),
              password: password
            })

            this.loading = false
            if (response.status == 200) {
              this.$notify.closeAll()
              this.$router.push({ path: '/' })
            } else {
              this.$message({
                message: response.message,
                type: 'error',
                duration: 10000,
                showClose: true
              })
            }
          } catch (error) {
            this.loading = false
            throw new Error(error)
          }
        } else {
          this.loading = false
          this.$message.error('登陆校验未通过，是不是哪里出问题了？')
        }
      })
    },
    forgetHandle() {
      this.$message.success('密码重置成功！')
      this.wrapSwitch(true)
    }
  }
}
</script>



<style lang="stylus" scoped>
@import '../../assets/styl/variables.styl'
.forget-form, .login-form
  .el-form-item__content
    line-height 40px
  .el-input__inner
    padding-top 2px
    height 40px
    line-height 40px
.btn button
  width 100%
  padding 12px 20px
.login-col
  height 100%
.login-page
  display flex
  justify-content center
  align-items center
  position absolute
  height 100%
  width 100%
  .lang
    position absolute
    right 59px
    top 24px
  .svg-github
    position absolute
    right 29px
    top 25px
  .translate-left, .translate-right
    will-change auto
    transform translateX(0px)
    transition transform 0.6s ease-in-out
  .switch-left
    transform translateX(525px)
  .switch-right
    transform translateX(-375px)
.login-wrap
  overflow hidden
  width 900px
  height 400px
  background white
  border-radius 4px
  transform translateY(-10px)
  box-shadow 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04)
  .logo
    padding-top 26px
    text-align center
  .title
    font-weight bold
    color main-color
    padding-top 8px
    font-size 22px
    a
      cursor cell
    a:before
      content '['
      opacity 0
      margin-right 10px
      transform translateX(-10px)
      transition transform 0.2s, opacity 0.2s
    a:after
      content ']'
      opacity 0
      margin-left 10px
      transform translateX(10px)
      transition transform 0.2s, opacity 0.2s
    a:hover:before, a:hover:after
      opacity 1
      transform translateX(0)
    .subtitle
      color sub-color
  .forgetwrap-title
    padding-top 30px
    padding-left 15px
  .forget-form
    padding 20px 30px 30px
    padding-bottom 0
  .login-form
    padding 30px
    padding-bottom 0
  .login-footer
    padding 0 30px
    .forgetpwd
      text-align right
      span
        cursor pointer
        font-size 14px
        font-weight 500
        color #606266
  .wallpaper
    width 100%
    height 100%
    background url('../../assets/images/loginwallpaper.jpg')
    background-size cover
    position relative
</style>

<template>
  <el-dialog v-loading='loading' title="" v-if='show' :visible.sync="show" class="login-dialog" :class="{'force-login': forceLogin}" :before-close="handleClose">
    <div v-show="isLoginForm">
    <h3 class="login-title">{{$t('common.login')}}</h3>
      <el-form class="login-dialog-form" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :placeholder="$t('common.loginAccount')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" :placeholder="$t('common.password')" @keyup.enter.native="login('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login('ruleForm')">{{$t('common.login')}}</el-button>
        </el-form-item>
        <div class="login-dialog-form-operate">
          <div class="forget-pwd"><a href="/wiki/find_pwd">{{$t('common.forgetPassword')}}?</a></div>
          <div class="signIn">{{$t('common.noAccount')}}<a href="#" @click.stop.prevent="register">{{$t('common.clickRegister')}}</a></div>
        </div>
        <div class="login-dialog-form-three-login">
          <div class="title">
            <span>{{$t('common.usingFollowingAccount')}}</span>
          </div>
          <div class="three-login-wrap">
            <a @click="authorizedToLogin('qq')">
              <img src="@/assets/img/wiki_qq.png" alt="">
            </a>
            <a @click="authorizedToLogin('weixin')">
              <img src="@/assets/img/wiki_wechat.png" alt="">
            </a>
            <a @click="authorizedToLogin('xinlangweibo')">
              <img src="@/assets/img/wiki_sina_weibo.png" alt="">
            </a>
            <a @click="authorizedToLogin('github')">
              <img src="@/assets/img/wiki_github_logo.png" alt="">
            </a>
          </div>
        </div>
      </el-form>
    </div>
    <div v-show="isRegisterForm">
      <register-dialog @close="handleClose"></register-dialog>
      <div class="register-oprate">
        <div @click="backHome" class="back-home-page">{{$t('editor.backHomePage')}}</div>
        <div @click="hasAccountToLogin" class="has-account">{{$t('common.alreadyOwnAccount')}}<span class="login-now">{{$t('common.fastLogin')}}</span></div>
      </div>
    </div>
    <div v-show="isPerfectRegisterInfo">
      <perfect-register-info @close="handleClose" :userThreeService="userThreeService"></perfect-register-info>
    </div>
  </el-dialog>

</template>
<script>
import { mapActions } from 'vuex'
import PerfectRegisterInfo from '@/components/common/PerfectRegisterInfo'
import RegisterDialog from '@/components/common/RegisterDialog'

export default {
  name: 'LoginDialog',
  props: {
    show: Boolean,
    forceLogin: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      // envIsForDevelopment: process.env.NODE_ENV === 'development',
      loading: false,
      isLoginForm: true,
      isRegisterForm: false,
      isPerfectRegisterInfo: false,
      nowOrigin: document.location.origin,
      userThreeService: {},
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t('common.inputUsername'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('common.inputPassword'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      userLogin: 'user/login',
      userThirdLogin: 'user/thirdLogin'
    }),
    handleClose() {
      !this.forceLogin && this.$emit('close')
    },
    hasAccountToLogin() {
      this.isLoginForm = true
      this.isRegisterForm = false
      this.isPerfectRegisterInfo = false
    },
    showMessage(type, message) {
      this.$message({
        message,
        type,
        showClose: true
      })
    },
    async login(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let payload = {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }
          this.loading = true
          console.warn(payload)
          let info = await this.userLogin(payload).catch(e => {
            this.loading = false
          })
          this.loading = false
          if (info) {
            // return console.warn('dialog info:', info)
            this.$emit('close')
            return window.location.reload()
          }
          this.showMessage('error', this.$t('common.IncorrectUsernameOrPassword'))
        } else {
          return false
        }
      })
    },
    register() {
      this.isLoginForm = false
      this.isRegisterForm = true
      this.isPerfectRegisterInfo = false
    },
    authorizedToLogin(provider) {
      this.$auth
        .authenticate(provider)
        .then(async result => {
          this.handleLoginResult(result)
        })
        .catch(async result => {
          this.handleLoginResult(result)
        })
    },
    async handleLoginResult(result) {
      if (result && result.data && result.data.error == 0) {
        if (result.data.token == 'token') {
          // 用户未绑定  跳完善注册信息页
          this.isLoginForm = false
          this.isRegisterForm = false
          this.isPerfectRegisterInfo = true
          this.userThreeService = result.data.data
        } else {
          // 登录成功  进行页面跳转
          let token = result.data.token
          let userinfo = result.data.data
          this.userThirdLogin({ token, userinfo })
          this.handleClose()
          this.showMessage('success', this.$t('common.loginSuccess'))
        }
      } else {
        this.showMessage('error', this.$t('common.logonFailed'))
      }
    },
    backHome() {
      window.location.href = this.nowOrigin
    }
  },
  components: {
    RegisterDialog,
    PerfectRegisterInfo
  }
}
</script>

<style lang="scss">
.login-dialog {
  .login-title {
    padding: 0 32px;
    margin: 0 auto 30px;
    font-size: 18px;
    color: #303133;
  }
  .register-oprate{
    margin: 0 32px;
    display: flex;
    .back-home-page{
      font-size: 14px;
      flex: 1;
      color: #1272cc;
      cursor: pointer;
    }
    .has-account {
      flex: 1;
      text-align: right;
      .login-now{
        font-size: 14px;
        color: #1272cc;
        cursor: pointer;
      }
    }
  }
  &.force-login {
    .el-dialog__header {
      .el-dialog__headerbtn {
        display: none;
      }
    }
  }
  .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }
    max-width: 352px;
    padding: 40px 0;
  }
  &-form {
    padding: 0 32px;
    margin: 0 auto;
    .el-form-item{
      margin-bottom: 18px;
    }
    .el-form-item__content {
      .el-input__inner {
        &:focus {
          box-shadow: 1px 1px 3px #daeaf6, -1px -1px 3px #daeaf6;
        }
      }
    }
    &-operate {
      display: flex;
      .forget-pwd {
        flex: 1;
        cursor: pointer;
        text-align: left;
      }
      a {
        text-decoration: none;
        color: #1272cc;
      }
      .signIn {
        flex: 1;
        text-align: right;
      }
    }
    &-three-login {
      .three-login-wrap {
        display: flex;
        a {
          flex: 1;
          text-align: center;
          img {
            cursor: pointer;
          }
        }
      }
      .title {
        margin: 15px 0;
        padding: 20px 0 15px;
        text-align: center;
        position: relative;
        span {
          background: #fff;
          position: relative;
          z-index: 2;
          padding: 0 4px;
        }
        &::after {
          content: '';
          height: 2px;
          width: 100%;
          position: absolute;
          right: 0;
          top: 54%;
          background: #d6e6f4;
        }
      }
    }
    .login-btn {
      width: 100%;
      margin: 10px 0;
      height: 44px;
      padding: 10px 16px;
      font-size: 18px;
      border-radius: 6px;
    }
  }
}
</style>

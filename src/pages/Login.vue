<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="Kevin?"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="checkLogin" :loading="logining">登录
      </el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  // import NProgress from 'nprogress'
  import * as api from '../api/task-list-api'
  import * as types from '../store/mutation-types'
  import store from '../store/index'

  export default {
    data () {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
            // { validator: validaePass }
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
            // { validator: validaePass2 }
          ]
        },
        checked: true
      }
    },
    methods: {
      checkLogin: function () {
        this.$refs['ruleForm2'].validate(
          (valid) => {
            if (valid) {
              const name = this.ruleForm2.account
              const password = this.ruleForm2.checkPass
              const params = new URLSearchParams()
              params.append('name', name)
              params.append('password', password)
              this.$http.post(api.LOGIN, params).then(
                res => {
                  const data = res.data
                  if (data.code && data.code === '1') {
                    this.$message.success('登录成功')
                    const userInfo = 'kevin'
                    store.commit(types.SET_USER_INFO, userInfo)
                    this.$router.push('/dashboard')
                  } else {
                    this.$message.error('请输入正确的用户名和密码')
                  }
                }
              )
            } else {
              this.$message.error('验证错误')
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>

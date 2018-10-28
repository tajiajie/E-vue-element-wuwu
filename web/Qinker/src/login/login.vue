<template>
  <div class="body">
    <div class="dowebok">
      <div class="logo"></div>
      <!--<div class="zh" v-if="loginShow"><a @click="changeShow">账号登录</a></div>
      <div class="sm" v-if="!loginShow"><a @click="changeShow">扫码登录</a></div>
      <div id="login" v-if="loginShow">
        <iframe :src="smLogin" height="100%" width="100%" scrolling="No"></iframe>
      </div>
      <div class="form-item" id="zhLogin" v-if="!loginShow">
        <iframe :src="zhLogin" frameborder="0" width="100%" scrolling="No" height="100%"></iframe>
      </div>-->
      <el-row style="margin: 100px auto 30px">
        <el-col :push="4" :span="16"><button class="loginBtn" @click="smlogin">扫码登录</button></el-col>
      </el-row>
      <el-row>
        <el-col :push="4" :span="16"><button class="loginBtn" @click="zhlogin">账号登录</button></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          loginShow: true,
          loginUrl: '112.124.107.209:9090'
        }
      },
      beforeMount() {
        this.getUser()
        this.setStorage()
      },
      computed: {
        zhUrl() {
          return `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoazxgehiidbbuypoaw&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://${this.loginUrl}/loginBack`
        },
        smUrl() {
          return `https://oapi.dingtalk.com/connect/qrconnect?appid=dingoazxgehiidbbuypoaw&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://${this.loginUrl}/loginBack`
        }
      },
      methods: {
        setStorage() {
          let storage = window.localStorage
          if (!storage.firstLogin) {
            storage.setItem('firstLogin', '1')
          }
        },
        smlogin() {
          window.location.href = this.smUrl
        },
        zhlogin() {
          window.location.href = this.zhUrl
        },
        getUser() {
          this.$http.get('/api/user/current').then((res) => {
            if (res.data.code === 403) {
              this.$router.push('/login')
            } else if (res.data.code === 500) {
              this.$router.push('/404')
            } else if (res.data.code === 200) {
              this.$router.push('/index')
             // window.top.location.href = 'http://112.124.107.209:8090/#/index'
            }
          })
        }
      }
    }
</script>

<style scoped>
  html { height: 100%; }
  .body { height: 100%; background: #fff url(./img/background/backgroud.png) 50% 50% no-repeat; background-size: cover;}
  .dowebok { position: absolute; left: 50%; top: 50%; width: 360px; height: 450px; margin: -240px 0 0 -215px; border: 1px solid #fff; border-radius: 20px; overflow: hidden;}
  .logo { width: 35%; background:url(./img/logo.png) no-repeat; height: 124px; margin: 50px auto 50px;}
  .zh a, .sm a{color: #000; position: absolute; background: #fff; width:30px;padding: 10px 0 10px 0; top: 30px; text-align: center; left: 0;}
  #login{ height:360px;width: 380px; margin: 0 auto;}
  .form-item {width:100%; height:100%;position: absolute;top: 190px;}
  .reg-bar { width: 360px; margin: 10px auto 0; font-size: 14px; overflow: hidden;}

.loginBtn{
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 8px;
  background-image: linear-gradient(#ddd, #bbb)
}

  .dowebok ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
  .dowebok :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
  .dowebok ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
  .dowebok :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

</style>

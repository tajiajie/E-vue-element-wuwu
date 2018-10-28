<!--头组件-->
<template>
  <div class="header">
    <el-row>
      <el-col :span="1">
        <img class="img" src="../../common/img/logo.png" alt="qinker">
      </el-col>
      <el-col :span="4">
      <div class="logoTitle">内部管理系统</div>
    </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover" v-if="isHeader">
          <span class="el-dropdown-link userinfo-inner"><img :src="userData.avatar" />{{userData.nickname}}</span>
          <el-dropdown-menu slot="dropdown">
           <!-- <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>-->
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span v-else>请先登录</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        userData: []
      }
    },
    beforeMount() {
      this.getUser()
    },
    computed: {
      isHeader() {
        if (this.userData.length !== 0) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.userData = res.data.data
          }
        })
      },
      logout: function () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/user/logout').then((res) => {
            if (res.data.code === 200) {
              _this.$router.push('/login')
            }
          })
        }).catch(() => {

        })
      }
    }
  }
</script>

<style scoped>
  .header {
    line-height: 70px;
    color:#fff;
  }
  .header .img{
    display: block;
    width: 65px;
    margin-top: 5px;
  }
  .header .logoTitle{
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size: 27px;
    color: #fff;
  }
  .userinfo {
    text-align: right;
    padding-right: 40px;
    float: right;
  }
  .userinfo .userinfo-inner {
    cursor: pointer;
    color:#fff;
  }
  .userinfo .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px 0px 10px 10px;
    float: right;
  }

</style>

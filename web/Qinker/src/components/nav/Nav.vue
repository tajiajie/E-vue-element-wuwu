<!--左侧导航-->
<template>
  <div id="Nav">
    <el-row class="tac">
      <el-col :span="10">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#393939"
          text-color="#fff"
          unique-opened
          :router="true"
          :collapse="isCollapse"
          active-text-color="#f8d347">
          <!--f8d347 57c8f2  -->
          <nav-menu :nav-menus="Menudata" :isCollapse="isCollapse"></nav-menu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="tagStyle">
      <el-col :span="1"><p>v_2.1</p></el-col>
    </el-row>
  </div>
</template>

<script>
  import navMenu from './navMenu'
  export default {
    name: 'Nav',
    props: {
      isCollapse: {
        type: Boolean
      }
    },
    data() {
      return {
        Menudata: {}
      }
    },
    components: {
      navMenu
    },
    created() {
      this.getNav()
    },
    methods: {
      getNav() {
        this.$http.get('/api/module').then((res) => {
          if (res.data.code === 200) {
            this.Menudata = res.data.data
          }
        }, (err) => {
          console.log(err.status)
        })
      }
    }

  }
</script>
<style scoped>
  #Nav{
    width:100%;
    position: relative;
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    border: none;
  }
  .tac{
    height: 500px;
  }
  .tagStyle{
    color:#ccc;
    line-height: 10px;
    position: absolute;
    bottom: 0;
    left: 15px;
  }
  .icon{
    color: #fff;
  }
</style>

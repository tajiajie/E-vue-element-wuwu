<template>
  <el-container>
    <el-header height="70px">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <Nav :isCollapse="isCollapse"></Nav>
      </el-aside>
      <el-row class="collapse">
        <el-col>
          <div :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="changeCollapse"></div>
        </el-col>
      </el-row>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Header from '../header/Header'
  import Nav from '../nav/Nav'
  import Order from '../order/order'
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    components: {
      Nav,
      Header,
      Order
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style>
  html,body, .el-container{
    height:100%;
  }
  .el-header{
    background-color: #393939;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #393939;
    color: #333;
    line-height: 100px;
  }
  .collapse{
    background: #393939;
    color: #fff;
    width: 20px;
    line-height: 50px;
    height: 50px;
    margin-top: 20%;
    margin-left: -17px;
  }
  .el-main {
    background-color: #eff0f4; /*eff0f4 E4E7ED */
    color: #333;
  }
  .el-radio-group{
    position: absolute;
    left: 0;
    top: 0;
  }
  .el-radio-button_inner{
    background-color: rgb(255, 208, 75);
    color: #eff0f4;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>

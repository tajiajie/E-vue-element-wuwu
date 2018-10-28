<template>
  <div class="page-container">
    <div class="login">
      <router-link to="/login">
        <el-button type="primary" style="width: 140%;">重新登录</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  html,body,.page-container{
    height:100%;
  }
  .page-container {
    height: 100%;
    font-size: 20px;
    color: rgb(192, 204, 218);
    background: #fbfbfb url('./404.jpg') 50% 50% no-repeat;
    background-size: 80% 80%;
  }
  .login{
    position: absolute;
    top:62%;
    left: 43%;
  }
</style>

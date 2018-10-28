<!--导航组件-->
<template>
  <div>
    <label v-for="(navMenu,index) of navMenus" :key="index">
      <el-menu-item v-if="navMenu.sonMenus.length===0" :key="index" :index="navMenu.url" :router="navMenu.url">
        <i :class="navMenu.iconUrl"></i>
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
      <el-submenu
        v-if="navMenu.sonMenus.length>0"
        :key="index"
        :index="navMenu.id.toString()"
        :router="navMenu.url">
        <template slot="title">
          <i :class="navMenu.iconUrl"></i>
          <span v-if="!isCollapse">{{navMenu.name}}</span>
        </template>
        <nav-menu :nav-menus="navMenu.sonMenus"></nav-menu>
      </el-submenu>
    </label>
   <!--<el-menu-item index="/index/order">
      <i class="el-icon-menu"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title" v-if="!isCollapse">财务管理</span>
      </template>
        <el-submenu index="2-1">
          <span slot="title">结算页</span>
          <el-menu-item index="/index/unchecked">未审核</el-menu-item>
          <el-menu-item index="/index/checked">已审核</el-menu-item>
        </el-submenu>
        &lt;!&ndash;<el-menu-item index="2-2">额度审核</el-menu-item>&ndash;&gt;
        &lt;!&ndash;<el-menu-item index="2-3">报销审核</el-menu-item>&ndash;&gt;
        &lt;!&ndash;<el-menu-item index="2-4">退款审核</el-menu-item>&ndash;&gt;
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title" v-if="!isCollapse">资源管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/supplier">供应商管理</el-menu-item>
        <el-menu-item index="/index/stock">库存管理</el-menu-item>
        <el-menu-item index="/index/record">申请记录</el-menu-item>
        <el-menu-item index="/index/stockRecord">库存申请</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="4" route="/chrome">
      <i class="el-icon-download"></i>
      <span slot="title">chrome</span>
    </el-menu-item>-->
    <!--<el-menu-item index="5" route="/login">-->
      <!--<span slot="title">登录</span>-->
    <!--</el-menu-item>-->
  </div>
</template>

<script>
  import navMenu from './navMenu'
  export default {
    name: 'navMenu',
    props: {
      navMenus: {
        dafalut: []
      },
      isCollapse: {
        type: Boolean
      }
    },
    data() {
      return {}
    },
    components: {
      navMenu
    }
  }
</script>

<style scoped>
i{
  color: #fff;
}
</style>

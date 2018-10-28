<!--供应商管理-->
<template>
  <div>
    <el-row>
      <el-col :span="3"><span class="supplierTitle">供应商管理</span></el-col>
    </el-row>
    <!--搜索-->
    <el-row class="rowChange">
      <el-col :span="4">
        <el-input
          size="small"
          placeholder="供应商名称"
          prefix-icon="el-icon-search"
          clearable
          v-model="name"
          @input="searchData"
        >
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="type" placeholder="类型"  filterable clearable size="small" @change="searchData">
          <el-option
            v-for="(item,index) in types"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="usePlace" placeholder="使用范围" filterable clearable size="small" @change="searchData">
          <el-option
            v-for="(item1,index) in ranges"
            :key="index"
            :label="item1"
            :value="item1"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="status" placeholder="状态" clearable size="small" @change="searchData">
          <el-option
            v-for="(item,index) in state"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select v-model="clearingForm" placeholder="结算方式" filterable clearable size="small" @change="searchData">
          <el-option
            v-for="(item2,index) in clearingForms"
            :key="index"
            :label="item2"
            :value="item2"
          >
          </el-option>
        </el-select>
      </el-col>

      <!--<el-col :span="4">-->
      <!--<el-input-->
      <!--size="small"-->
      <!--placeholder="结算方式"-->
      <!--clearable-->
      <!--v-model="clearingForm"-->
      <!--@input="searchData">-->
      <!--</el-input>-->
      <!--</el-col>-->
      <el-col :span="2">
        <el-button size="small" @click="handleReset" type="danger" style="width: 100%">清空搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width: 100%" size="small" @click="newSupplier=true" type="primary" icon="el-icon-edit">新建</el-button>
      </el-col>
    </el-row>
    <!--列表-->
    <el-table
      class="scroll"
      :data="supplierData"
      border
      :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
      style="width: 100%"
      :empty-text='empty'
    >
      <el-table-column
        prop="id"
        label="供应商id"
        width="130">
      </el-table-column>
      <el-table-column
        prop="name"
        label="供应商名称"
        width="140">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="110">
      </el-table-column>
      <el-table-column
        prop="usePlace"
        label="使用范围"
        width="130">
      </el-table-column>
      <el-table-column width="120" label="状态">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.status">使用中</el-button>
          <el-button type="text" size="small" v-else disabled>已停用</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="clearingForm"
        label="结算方式"
        width="130">
      </el-table-column>
      <el-table-column
        label="操作"
        width="230">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="handleStatus(scope.row)" style="margin-right: 10px"></el-switch>
          <el-button @click="detailClick(scope.row.id)" type="info plain">查看详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :data="formData"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="supplierSize"
        background
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--新建弹出框-->
    <el-dialog :visible.sync="newSupplier"><span class="supplierTitle">新建供应商</span>
      <new-supplier @getData="handleClick"></new-supplier>
    </el-dialog>
    <!--详情页弹出框-->
    <el-dialog :visible.sync="supplierDetail" @close="closeDetail">
      <router-view @closeDetail="handleClose"></router-view>
    </el-dialog>
  </div>
</template>

<script>
  import newSupplier from './newSupplier'
  export default {
    data() {
      return {
        empty: '正在加载，请稍后...',
        name: '', // 供应商名称
        type: '', // 类型
        usePlace: '', // 使用范围
        status: '', // 状态
        clearingForm: '',
        clearingForms: [], // 结算方式
        page: 1, // 页数
        types: [], // 供应商的类型
        filedName: 'type', // 范围名称
        tableName: 'provider_t', // 数据表名字
        filedName1: 'use_place', // 范围名称
        ranges: [], // 供应商的使用范围接口
        state: [
          {
            value: true,
            label: '使用中'
          },
          {
            value: false,
            label: '已停用'
          }
        ],
        supplierData: [], // 获取所有供应商列表
        formData: {}, // 获取所有,渲染总个数
        total: 0, // 渲染总个数
        /* 新建弹出框 */
        newSupplier: false,
        /* 详情弹出框 */
        supplierDetail: false,
        // /* 页码 */
        // currentPage1: 1,
        supplierSize: 0 // 每页个数
      }
    },
    components: {
      newSupplier
    },
    methods: {
      /* 获取用户信息 */
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.$router.push('/index/supplier')
          } else if (res.data.code === 403) {
            this.$router.push('/login')
          } else if (res.data.code === 500) {
            this.$router.push('/404')
          }
        })
      },
      /* 点击详情保存时关闭弹窗 */
      handleClose(val) {
        this.supplierDetail = val
        if (this.type === '' && this.name === '' && this.usePlace === '' && this.status === '' && this.clearingForm === '') {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      // 关闭详情弹框
      closeDetail() {
        this.$router.go(-1)
        if (this.type === '' && this.name === '' && this.usePlace === '' && this.status === '' && this.clearingForm === '') {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      /* 清空搜索 */
      handleReset() {
        this.name = ''
        this.type = ''
        this.usePlace = ''
        this.status = ''
        this.clearingForm = ''
        this.page = 1
        this.empty = '正在加载，请稍后...'
        this.getData()
      },
      /* 查看详情 */
      detailClick(id) {
        this.supplierDetail = true
        this.$router.push({
          path: `/index/supplier/supplierDetail/${id}`
        })
      },
      /* 控制页码 */
      handleCurrentChange(e) {
        this.page = e
        if (this.type === '' && this.name === '' && this.usePlace === '' && this.status === '' && this.clearingForm === '') {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      saveNewData() {
        this.newSupplier = false
      },
      /* 获取所有供应商 */
      getData () {
        this.$http.get(`/api/provider/${this.page}`).then(res => {
          if (res.data.code === 200) {
            this.formData = res.data.data
            this.total = res.data.data.total
            this.supplierData = res.data.data.list
            this.supplierSize = res.data.data.pageSize
            if (res.data.data.list.length === 0) {
              this.empty = '暂无数据'
            }
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        })
      },
      /* 获取已有供应商的使用范围接口 */
      providerData () {
        let params = {
          filedName: this.filedName1,
          tableName: this.tableName
        }
        this.$http.post('/api/provider/input', params).then(res => {
          this.ranges = res.data.data
        })
      },
      // 结算方式
      clearing () {
        let params = {
          filedName: 'clearing_form',
          tableName: 'provider_t'
        }
        this.$http.post('/api/provider/input', params).then(res => {
          this.clearingForms = res.data.data
        })
      },
      /* 子组件传值 */
      handleClick (val) {
        this.getData()
        this.newSupplier = val
      },
      /* 搜索 */
      searchData () {
        this.page = 1
        if (this.type === '' && this.name === '' && this.usePlace === '' && this.status === '' && this.clearingForm === '') {
          this.empty = '正在加载，请稍后...'
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      changeSearch () {
        let params = {
          name: this.name,
          type: this.type,
          usePlace: this.usePlace,
          status: this.status,
          clearingForm: this.clearingForm
        }
        this.$http.post(`/api/provider/${this.page}`, params).then(res => {
          if (res.data.data.list.length === 0) {
            this.empty = '暂无数据'
          }
          this.formData = res.data.data
          this.total = res.data.data.total
          this.supplierData = res.data.data.list
          this.supplierSize = res.data.data.pageSize
        })
      },
      /* 指定供应商是否可用 */
      handleStatus (item) {
        let data = {
          id: item.id,
          status: item.status
        }
        this.$http.post('/api/provider', data).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
          }
        })
      },
      /* 获取所有供应商的类型 */
      getType () {
        let params = {
          filedName: this.filedName,
          tableName: this.tableName
        }
        this.$http.post('/api/provider/input', params).then(res => {
          this.types = res.data.data
        })
      }
    },
    created () {
      this.getData()
      this.providerData()
      this.getType()
      this.clearing()
    },
    beforeMount() {
      this.getUser()
    }
  }
</script>

<style scoped>
  .el-row{
    margin-bottom: 5px;
    background-color: #fff;
  }
  .el-col{
    line-height: 35px;
  }
  .rowChange{
    margin-top: -5px;
    padding-bottom:10px;
  }
  .rowChange .el-col{
    line-height: 35px;
    margin-left: 8px;
  }
  .supplierTitle{
    display: block;
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size:18px;
    line-height: 35px;
    margin-left: 10px;
  }
  .block{
    margin-top: 10px;
    padding-top:5px ;
    float: right;
  }
  .el-col-push-1 {
    left: 0.16667%;
  }
  .scroll ::-webkit-scrollbar {
    width: 5px;
    height: 16px;
  }
  .scroll ::-webkit-scrollbar-thumb{
    background-color: #ddd;
  }
  .scroll ::-webkit-scrollbar-thumb:hover{
    background-color: #bbb;
  }
  .scroll ::-webkit-scrollbar-track-piece{
    background-color: #eee;
  }
</style>

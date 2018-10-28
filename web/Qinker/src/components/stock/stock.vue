<!--库存管理 -->
<template>
  <div>
    <el-row>
      <el-col :span="3"><span class="stockTitle">库存管理</span></el-col>
    </el-row>
    <!--搜索-->
    <el-row class="rowChange">
      <el-col :span="4">
        <el-input
          size="small"
          placeholder="物品名称"
          prefix-icon="el-icon-search"
          clearable
          v-model="name" @input="searchData" >
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="type" filterable clearable placeholder="类型" size="small" @change="searchData">
          <el-option
            v-for="(item,index) in types"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="status" clearable placeholder="状态" size="small" @change="searchData">
          <el-option
            v-for="(item,index) in stockStates"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button size="small" @click="handleReset" type="danger" style="width: 100%">清空搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button  style="width: 100%" size="small" clearable @click="newStock=true" type="primary" icon="el-icon-edit">新建</el-button>
      </el-col>
    </el-row>
    <!--列表-->
    <el-table
      class="scroll"
      :data="stockData"
      border
      :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
      style="width: 100%"
      :empty-text='empty'
    >
      <el-table-column
        prop="id"
        label="物品id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="物品名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="110">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        width="120">
      </el-table-column>
      <el-table-column width="120" label="状态">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.status">可选</el-button>
          <el-button type="text" size="small" v-else disabled>不可选</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="decription"
        label="介绍"
        width="220">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="handleStatus(scope.row)" style="margin-right: 10px"></el-switch>
          <el-button @click="detailClick(scope.row.id)" type="info" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :data="formData"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="stockSize"
        background
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--新建弹窗-->
    <el-dialog :visible.sync="newStock" title="新增库存" width="55%">
      <new-stock @getData="handleData"></new-stock>
    </el-dialog>

    <!--详情页弹出框-->
    <el-dialog :visible.sync="stockDetail" @close="closeDetail">
      <router-view @closeDetail="handleClose"></router-view>
    </el-dialog>
  </div>
</template>

<script>
  import newStock from './newStock'
  export default {
    name: 'stock',
    data () {
      return {
        empty: '正在加载，请稍后...',
        stockDetail: false, // 详情页弹窗
        name: '', // 库存名称
        status: '', // 状态
        page: 1, // 页数
        formData: {}, // 获取所有，进而渲染总个数
        total: 0, // 渲染总个数
        filedName: 'type',
        tableName: 'inventory',
        type: '', // 类型
        types: [], // 类型
        stockStates: [ // 状态
          {
            label: '可选',
            value: true
          },
          {
            label: '不可选',
            value: false
          }
        ],

        stockData: [], // 列表库存渲染
        /* 弹出框 */
        newStock: false,
        stockSize: 0 // 每页个数
      }
    },
    components: {
      newStock
    },
    methods: {
      /* 获取用户信息 */
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.$router.push('/index/stock')
          } else if (res.data.code === 403) {
            this.$router.push('/login')
          } else if (res.data.code === 500) {
            this.$router.push('/404')
          }
        })
      },
      /* 控制页码 */
      handleCurrentChange(e) {
        this.page = e
        if (this.type === '' && this.name === '' && this.status === '') {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      /* 点击详情保存时关闭弹窗 */
      handleClose(val) {
        this.stockDetail = val
        if (this.type === '' && this.name === '' && this.status === '') {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      /* 关闭详情弹框 */
      closeDetail() {
        this.$router.go(-1)
        if (this.type === '' && this.name === '' && this.status === '') {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      /* 清空搜索 */
      handleReset() {
        this.name = ''
        this.status = ''
        this.type = ''
        this.page = 1
        this.empty = '正在加载，请稍后...'
        this.getData()
      },
      /* 详情点击 */
      detailClick(id) {
        this.stockDetail = true
        this.$router.push({
          path: `/index/stock/stockDetail/${id}`
        })
      },
      /* 新建弹窗 */
      handleData (val) {
        this.getData()
        this.newStock = val
      },
      /* 列表渲染 */
      getData () {
        this.$http.get(`/api/inventory/${this.page}`).then(res => {
          if (res.data.code === 200) {
            this.stockData = res.data.data.list
            this.stockSize = res.data.data.pageSize
            this.formData = res.data.data
            this.total = res.data.data.total
            if (res.data.data.list.length === 0) {
              this.empty = '暂无数据'
            }
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        })
      },
      /* 指定库存是否可用接口 */
      handleStatus (item) {
        let data = {
          id: item.id,
          status: item.status
        }
        this.$http.post('/api/inventory', data
        ).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
          }
        })
      },
      /* 获取所有库存的类型 */
      getType () {
        let params = {
          filedName: this.filedName,
          tableName: this.tableName
        }
        this.$http.post('/api/provider/input', params).then(res => {
          this.types = res.data.data
        })
      },
      /* 搜索 */
      searchData () {
        this.page = 1
        if (this.type === '' && this.name === '' && this.status === '') {
          this.empty = '正在加载，请稍后...'
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      changeSearch () {
        let params = {
          name: this.name,
          status: this.status,
          type: this.type
        }
        this.$http.post(`/api/inventory/${this.page}`, params).then(res => {
          this.formData = res.data.data
          this.total = res.data.data.total
          this.stockData = res.data.data.list
          this.stockSize = res.data.data.pageSize
          if (res.data.data.list.length === 0) {
            this.empty = '暂无数据'
          }
        })
      }
    },
    created () {
      this.getData()
      this.getType()
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
  .stockTitle{
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

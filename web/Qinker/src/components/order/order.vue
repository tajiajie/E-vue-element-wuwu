<!-- 订单管理——>main -->
<template>
  <div class="order">
    <el-row>
      <el-col :span="3"><span class="orderTitle">订单管理</span></el-col>
    </el-row>
    <!--搜索栏-->
    <el-row class="rowChange">
      <el-col :span="2">
        <el-input
          size="small"
          placeholder="订单号"
          clearable
          v-model="orderNum"
          @input="change">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-input
          size="small"
          placeholder="订单联系人"
          clearable
          v-model="customerName"
          @input="change">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-select v-model="nickname" placeholder="定制师" filterable clearable size="small" @change="change">
          <el-option
            v-for="(item,index) in nicknames"
            :key="index"
            :label="item.nickname"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="state" clearable placeholder="订单状态" size="small" @change="change">
          <el-option
            v-for="(item,index) in options1"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="platform" placeholder="平台" clearable size="small" @change="change">
          <el-option
            v-for="(item,index) in options3"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="types" placeholder="订单类型" clearable size="small" :disabled="typeAble" @change="change">
          <el-option
            v-for="(item,index) in option"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-date-picker
          style="width:100%;"
          v-model="formation"
          type="daterange"
          size="small"
          unlink-panels
          clearable
          range-separator="-"
          start-placeholder="成团时间"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="change">
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-date-picker
          style="width: 100%;"
          v-model="backformation"
          type="daterange"
          size="small"
          clearable
          unlink-panels
          range-separator="-"
          start-placeholder="归团时间"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="change">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button size="small" style="width: 100%;" type="danger" @click="bulidNo">清空搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button size="small" style="width: 100%;" type="primary" @click="bulidNewOrder" v-if="userData.roleName==='管理员'" icon="el-icon-edit">新建</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="orderData"
      border
      class="tableScroll"
      :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
      style="width: 100%;">
      <el-table-column
        prop="itemNumber"
        label="订单号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="130">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="订单联系人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="manFlat"
        label="平台"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="定制师"
        width="120">
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="出发日期"
        width="160"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="income"
        label="订单收入金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="cost"
        label="总成本金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="revenue"
        label="利润"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="220">
        <template slot-scope="scope">
          <!--<el-tooltip effect="light" content="订单详情" placement="top-start">-->
            <el-button @click="orderDetail(scope.row)" type="info" icon="el-icon-tickets" size="small">订单详情</el-button>
          <!--</el-tooltip>-->
          <!--<el-tooltip effect="light" content="结算单" placement="top-start">-->
            <el-button type="success" @click="jiesuan(scope.row)" :disabled="!scope.row.finish" size="small" icon="el-icon-edit-outline">结算单</el-button>
          <!--</el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="nowPage"
        :page-size="pageSize"
        background
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--订单详情-->
    <el-dialog :visible.sync="orderDetailShow" title="订单详情" width="78%" @close="closeDialog">
      <router-view @closeDetail="closeorDetail"></router-view>
    </el-dialog>
    <!--新建订单弹框-->
    <el-dialog :visible.sync="newOrder" title="新建订单" width="55%">
      <new-order @newBuildClick="newBuildSave"></new-order>
    </el-dialog>
    <!--结算单弹框-->
    <el-dialog :visible.sync="jiesuanShow" title="结算单" width="92%" @close="closeDialog">
      <router-view></router-view>
    </el-dialog>
    <el-dialog :visible.sync="openconTag" title="轻刻内部管理系统V_2.1" center width="40%" @close="closeconTag">
      <p class="titleTag">优化UI界面</p>
      <p>2. 全面接入钉钉审批，工作通知，群消息</p>
      <p>3. 更改申请付款流程</p>
      <p>4. 修复财务模块数据BUG</p>
      <p>5. 优化资源管理</p>
      <p>6. 修复上传插件潜在BUG</p>
      <p class="titleTag">用户需注意</p>
      <p>1. 请及时更新上传插件，老插件无法使用</p>
      <p>2. 在使用过程当中如遇问题请询问组长，不能解决请至人事部@黄钦煜</p>
      <p>3. 具体操作过程IT组及运维人员会展开相关培训，如有问题请当场提出</p>
    </el-dialog>
  </div>
</template>

<script>
  import newOrder from './newOrder'
  import jiesuan from './jiesuan'
  import moment from 'moment'

  export default {
    name: 'order',
    data() {
      return {
        orderNum: '', // 订单号
        customerName: '', // 订单联系人
        nickname: '', // 定制师
        nickId: '', // 定制师ID

        state: '', // 订单状态
        platform: '', // 平台
        types: '', // 订单类型
        startFormation: '', // 成团时间
        endFormation: '',
        startBackformation: '', // 归团时间
        endBackformation: '',

        formation: '', // 成团时间
        backformation: '', // 归团时间

        nowPage: 1, // 当前页
        pageSize: 0, // 每页显示多少条数据
        total: 0, // 总条数

        nicknames: [],
        orderData: [],

        orderDetailShow: false,
        newOrder: false,
        jiesuanShow: false,

        /* 订单状态 */
        options1: [
          {
          value: '未成团',
          label: '未成团'
          }, {
          value: '已成团',
          label: '已成团'
          }, {
          value: '已审核',
          label: '已审核'
         }, {
          value: '问题订单',
          label: '问题订单'
          }, {
            value: '订单结束',
            label: '订单结束'
          }
        ],
        /* 订单类型 */
        options2: [
          {
            value: '刷单',
            label: '刷单'
          }, {
            value: '真实订单',
            label: '真实订单'
          }
        ],
        options21: [
          {
            value: '复购',
            label: '复购'
          }, {
            value: '线下',
            label: '线下'
          }, {
            value: '员工出行',
            label: '员工出行'
          }
        ],
        /* 平台 */
        options3: [
          {
            value: '携程',
            label: '携程'
          }, {
            value: '途牛',
            label: '途牛'
          }, {
            value: '马蜂窝',
            label: '马蜂窝'
          }, {
            value: '去哪儿',
            label: '去哪儿'
          }, {
            value: '自营',
            label: '自营'
          }
        ],

        /* 结算单 */
        jiesuanData: [],
        /* 登录用户信息 */
        userData: [],
        openconTag: false
      }
    },
    components: {
      newOrder,
      jiesuan
    },
    computed: {
      typeAble: function() {
        if (this.platform) {
          return false
        } else {
          // eslint-disable-next-line
          this.types = ''
          return true
        }
      },
      option: function() {
        if (this.platform === '自营') {
          return this.options21
        } else {
          return this.options2
        }
      }
    },
    created() {
      this.getOrderData()
      this.getNickData()
      this.getStorage()
    },
    beforeMount() {
      this.getUser()
    },
    methods: {
      getStorage() {
        if (Number(window.localStorage.firstLogin)) {
          this.openconTag = true
        } else {
          this.openconTag = false
        }
      },
      closeconTag() {
        let storage = window.localStorage
        storage.setItem('firstLogin', '0')
      },
      /* 获取用户信息 */
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.userData = res.data.data
            this.$router.push('/index')
          } else if (res.data.code === 403) {
            this.$router.push('/login')
          } else if (res.data.code === 500) {
            this.$router.push('/404')
          }
        })
      },
      /* 时间戳->年月日 */
      dateFormat: function(row, column) {
        let date = row[column.property]
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          return ''
        }
      },
      /* 根据分页获取数据-接口 */
      getOrderData() {
        this.$http.get(`/api/order/${this.nowPage}`).then((res) => {
          if (res.data.code === 200 && res.data.msg === 'success') {
            this.orderData = res.data.data.list
            this.total = res.data.data.total
            this.pageSize = res.data.data.pageSize
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 搜索订单-接口 */
      searchData() {
        if (this.nickname === '') {
          this.nickId = 0
        } else {
          this.nickId = this.nickname
        }
        if (this.formation) {
          this.startFormation = this.formation[0]
          this.endFormation = this.formation[1]
        } else {
          this.startFormation = ''
          this.endFormation = ''
        }
        if (this.backformation) {
          this.startBackformation = this.backformation[0]
          this.endBackformation = this.backformation[1]
        } else {
          this.startBackformation = ''
          this.endBackformation = ''
        }
        let data = {
          backEnd: this.endBackformation, // 归团时间
          backStart: this.startBackformation,
          clusteringEnd: this.endFormation, // 成团时间
          clusteringStart: this.startFormation,
          customerName: this.customerName,
          itemNumber: this.orderNum,
          manFlat: this.platform,
          orderType: this.types,
          status: this.state,
          uid: this.nickId
        }
        this.$http.post(`/api/order/search?page=${this.nowPage}`, data).then((res) => {
          if (res.data.code === 200 && res.data.msg === 'success') {
            this.orderData = res.data.data.list
            this.total = res.data.data.total
            this.pageSize = res.data.data.pageSize
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 触发搜索 */
      change() {
        this.nowPage = 1
        if (!this.orderNum && !this.customerName && !this.nickname && !this.state && !this.platform && !this.types && !this.formation && !this.backformation) {
          this.getOrderData()
        } else {
          this.searchData()
        }
      },
      /* 置空 */
      bulidNo() {
        this.nowPage = 1
        this.orderNum = ''
        this.customerName = ''
        this.nickname = ''
        this.state = ''
        this.platform = ''
        this.types = ''
        this.formation = ''
        this.backformation = ''
        this.getOrderData()
      },
      /* 获取定制师-接口 */
      getNickData() {
        this.$http.get('/api/user').then((res) => {
          if (res.data.code === 200 && res.data.msg === 'success') {
            this.nicknames = res.data.data
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 新建按钮-弹出框 */
      bulidNewOrder() {
        this.newOrder = true
      },
      /* 保存关闭新建弹出框 */
      newBuildSave(val) {
        this.newOrder = val
        if (!this.orderNum && !this.customerName && !this.nickname && !this.state && !this.platform && !this.types && !this.formation && !this.backformation) {
          this.getOrderData()
        } else {
          this.searchData()
        }
       // window.location.reload()
      },
      /* 订单详情 */
      orderDetail(row) {
        this.orderDetailShow = true
        this.$router.push({
          path: `/index/order/orderDetail/${row.id}`
        })
      },
      /* 结算单 */
      jiesuan(row) {
        this.jiesuanShow = true
        this.$router.push({
          path: `/index/order/jiesuan/${row.id}`
        })
      },
      /* 关闭弹出框 */
      closeDialog() {
        this.$router.push('/index')
        if (!this.orderNum && !this.customerName && !this.nickname && !this.state && !this.platform && !this.types && !this.formation && !this.backformation) {
          this.getOrderData()
        } else {
          this.searchData()
        }
       // this.getOrderData()
      },
      /* 关闭订单详情 */
      closeorDetail(val) {
        this.orderDetailShow = val
        if (!this.orderNum && !this.customerName && !this.nickname && !this.state && !this.platform && !this.types && !this.formation && !this.backformation) {
          this.getOrderData()
        } else {
          this.searchData()
        }
      },
      /* 分页 */
      handleCurrentChange(val) {
        this.nowPage = val
        if (!this.orderNum && !this.customerName && !this.nickname && !this.state && !this.platform && !this.types && !this.formation && !this.backformation) {
          this.getOrderData()
        } else {
          this.searchData()
        }
        // this.getOrderData()
      }
    }
  }
</script>

<style scoped>
  .order{
    font-size: 16px;
  }
  .el-row{
    margin-bottom: 0px;
    background-color: #fff;
  }
  .el-col{
    line-height: 35px;
  }
  .rowChange{
    margin-top: 0px;
    padding-bottom:20px;
  }
  .rowChange .el-col{
    line-height: 35px;
    margin-left: 8px;
  }
  .orderTitle{
    display: block;
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size:18px;
    line-height: 35px;
    margin-left: 10px;
  }
   .block{
    margin-top: 10px;
    padding-top:5px;
    float: right;
   }
   .titleTag{
     font-weight: 900;
     font-size: 14px;
     color: #000;
   }
  .tableScroll ::-webkit-scrollbar-thumb{
    background-color: #ddd;
  }
  .tableScroll ::-webkit-scrollbar-thumb:hover{
    background-color: #bbb;
  }
  .tableScroll ::-webkit-scrollbar-track-piece{
    background-color: #eee;
  }
  .tableScroll ::-webkit-scrollbar {
    width: 5px;
    height: 16px;
  }
</style>

<!--已审核-->
<template>
  <div class='pay'>
    <div class="top">
      <div>已审核款项</div>
      <!--<el-button type='primary' class="button">导出</el-button>-->
    </div>

    <el-tabs type='border-card'>
      <el-tab-pane label='单结' tab-click="">
        <!--搜索栏-->
        <el-row class="rowChange">
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="订单号"
              clearable
              v-model="itemNumber"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="预订平台"
              clearable
              v-model="providerName"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="预订平台单号"
              clearable
              v-model="orderNum"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="申请人"
              clearable
              v-model="applyName"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="金额"
              clearable
              v-model="cost"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="状态"
              clearable
              v-model="payStatus"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              size="small"
              placeholder="付款人"
              clearable
              v-model="auditName"
              @input="changeData">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 20%;">
            <el-date-picker
              style="width: 100%;"
              v-model="useTimes"
              type="daterange"
              size="small"
              clearable
              unlink-panels
              range-separator="-"
              start-placeholder="使用开始时间"
              end-placeholder="使用结束时间"
              value-format="yyyy-MM-dd"
              @change="changeData">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="width: 20%;">
            <el-date-picker
              style="width: 100%;"
              v-model="applyTimes"
              type="daterange"
              size="small"
              clearable
              unlink-panels
              range-separator="-"
              start-placeholder="申请开始时间"
              end-placeholder="申请结束时间"
              value-format="yyyy-MM-dd"
              @change="changeData">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="width: 20%;">
            <el-date-picker
              style="width: 100%;"
              v-model="payTimes1"
              type="daterange"
              size="small"
              clearable
              unlink-panels
              range-separator="-"
              start-placeholder="付款开始时间"
              end-placeholder="付款结束时间"
              value-format="yyyy-MM-dd"
              @change="changeData">
            </el-date-picker>
          </el-col>
          <el-col :span="2" :push="1" style="width: 12%">
            <el-button class="button" size="small" type="primary" style="width: 100%" @click="handleReset1">清空搜索</el-button>
          </el-col>
          <!--<el-col :span="2" :push="2" style="width: 11%">-->
          <!--<el-button size="small" type="primary" class="button" style="width: 100%" icon="el-icon-edit" @click="changeData">搜索</el-button>-->
          <!--</el-col>-->
        </el-row>
        <!--列表-->
        <el-table
          class="scroll"
          :data='singleData'
          :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
          style='width: 100%'
          :empty-text='empty1'
        >
          <el-table-column
            prop='itemNumber'
            label='订单号'
            width='160'>
          </el-table-column>
          <el-table-column
            prop='applyName'
            label='申请人'
            width='100'>
          </el-table-column>
          <el-table-column
            prop='providerName'
            label='预订平台'
            width='140'>
          </el-table-column>
          <el-table-column
            prop='applyTime'
            label='申请日期'
            :formatter="dateFormat"
            width='130'>
          </el-table-column>
          <el-table-column
            prop='useTime'
            label='使用日期'
            :formatter="dateFormat"
            width='130'>
          </el-table-column>
          <el-table-column
            prop='orderNum'
            label='预订平台订单号'
            width='150'>
          </el-table-column>
          <el-table-column
            prop='cost'
            label='金额'
            width='120'>
          </el-table-column>

          <el-table-column
            label='状态'
            width='120'>
            <template slot-scope="scope">
              <p v-if="scope.row.payStatus !== '已拒绝'">
                {{scope.row.payStatus}}
              </p>
              <el-tooltip placement="top" :content="scope.row.refuseReason" v-if="scope.row.payStatus === '已拒绝'">
                <p>
                  {{scope.row.payStatus}}
                </p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop='payTime'
            label='付款时间'
            :formatter="dateFormat"
            width='120'>
          </el-table-column>
          <el-table-column
            prop='auditName'
            label='付款人'
            width='120'>
          </el-table-column>
          <el-table-column
            prop='comment'
            label='备注'
            width='120'>
          </el-table-column>

          <el-table-column label='操作' width='150' fixed="right">
            <template slot-scope='scope'>
              <el-button
                size='mini'
                type='primary'
                @click='orderBillButton(scope.row.id)'>付款凭证</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!--页-->
        <div class="block" v-if="show">
          <el-pagination
            :data="singlepn"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="singleSize"
            background
            layout="total, prev, pager, next"
            :total="singlepn">
          </el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label='周结'>
        <!--搜索栏-->
        <el-row class="rowChange">
          <el-col :span="2" style="width: 14%">
            <el-input
              size="small"
              placeholder="合并订单名称"
              clearable
              v-model="mergeOrderName"
              @input="changeWeek">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 13%">
            <el-input
              size="small"
              placeholder="总金额"
              clearable
              v-model="totalCost"
              @input="changeWeek">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 13%">
            <el-input
              size="small"
              placeholder="付款人"
              clearable
              v-model="payerName"
              @input="changeWeek">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 20%;">
            <el-date-picker
              style="width: 100%;"
              v-model="mergeTimes"
              type="daterange"
              size="small"
              clearable
              unlink-panels
              range-separator="-"
              start-placeholder="合并开始时间"
              end-placeholder="合并结束时间"
              value-format="yyyy-MM-dd"
              @change="changeWeek">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="width: 20%;">
            <el-date-picker
              style="width: 100%;"
              v-model="payTimes"
              type="daterange"
              size="small"
              clearable
              unlink-panels
              range-separator="-"
              start-placeholder="付款开始时间"
              end-placeholder="付款结束时间"
              value-format="yyyy-MM-dd"
              @change="changeWeek">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="width: 10%">
            <el-button class="button" size="small" type="primary" style="width: 100%;" @click="handleReset2">清空搜索</el-button>
          </el-col>
          <!--<el-col :span="2" style="width: 10%">-->
          <!--<el-button size="small" type="primary" class="button" style="width: 100%" icon="el-icon-edit" @click="changeWeek">搜索</el-button>-->
          <!--</el-col>-->
        </el-row>
        <!--列表-->
        <el-table
          class="scroll"
          :data='weekData'
          :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
          style='width: 100%'
          :empty-text='empty2'
        >
          <el-table-column
            prop='mergeOrderName'
            label='合并订单名称'
            width='180'>
          </el-table-column>
          <el-table-column
            prop='mergeTime'
            label='合并日期'
            :formatter="dateFormat"
            width='160'>
          </el-table-column>
          <el-table-column
            prop='mergerName'
            label='合并人'
            width='120'>
          </el-table-column>
          <el-table-column
            prop='totalCost'
            label='总金额'
            width='150'>
          </el-table-column>
          <el-table-column
            prop='payerName'
            label='付款人'
            width='120'>
          </el-table-column>
          <el-table-column
            prop='payTime'
            label='付款日期'
            :formatter="dateFormat"
            width='160'>
          </el-table-column>

          <el-table-column label='操作' width='150'>
            <template slot-scope='scope'>
              <el-button
                size='mini'
                type='primary'
                @click='orderAfterNumberButton(scope.row)'>查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--页-->
        <div class="block" v-if="show">
          <el-pagination
            :data="weekDatapn"
            @current-change="handleCurrentChange2"
            :current-page.sync="currentPage2"
            :page-size="weekSize"
            background
            layout="total, prev, pager, next"
            :total="weekDatapn">
          </el-pagination>
        </div>

      </el-tab-pane>

    </el-tabs>

    <!--单结付款凭证-->
    <el-dialog title='付款凭证' :visible.sync='dialogFormVisible' width='40%'>
      <el-row style="width: 450px; margin: 0 auto">
        <div v-if="carousel">
          <div class="evidence">
            <div class="demonstration">共{{urlLength}}张凭证</div>
            <el-button
              size='mini'
              type='primary'
              @click="printDeal()"
            >
              查看并打印凭证
            </el-button>
          </div>
          <el-carousel trigger="click" height="300px" style="width: 450px;" :autoplay=false @change="handleIndex">
            <el-carousel-item v-for="(item,index) in urlData" :key="index">
              <h3 id="printBox">
                <img :src="item.url" class="image">
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="!carousel">
          暂无上传凭证
        </div>
      </el-row>
    </el-dialog>

    <!--  显示合并订单页面详情-->
    <el-dialog title='合并订单详情' :visible.sync='dialogFormVisible4' width='1030px' @close="handleEmpty">
      <el-row style="font-size: 16px; display: flex; justify-content: start; margin-bottom: 20px">
        <div style="margin-right: 40px">
          <span style="font-weight: 700">合并订单名称：</span><span>{{mergeOrderName1}}</span>
        </div>
        <div>
          <span style="font-weight: 700">总金额：</span><span>{{totalCost1}}元</span>
        </div>
      </el-row>
      <!--搜索栏-->
      <el-row class="rowChange">
        <el-col :span="2" style="width: 19%;">
          <el-input
            size="small"
            placeholder="订单号"
            clearable
            v-model="itemNumber1"
            @input="changeDataMerge">
          </el-input>
        </el-col>
        <el-col :span="2" style="width: 19%;">
          <el-input
            size="small"
            placeholder="预订平台"
            clearable
            v-model="providerName1"
            @input="changeDataMerge">
          </el-input>
        </el-col>
        <el-col :span="2" style="width: 18%;">
          <el-input
            size="small"
            placeholder="预订平台订单号"
            clearable
            v-model="orderNum1"
            @input="changeDataMerge">
          </el-input>
        </el-col>
        <el-col :span="2" style="width: 18%;">
          <el-input
            size="small"
            placeholder="申请人"
            clearable
            v-model="applyName1"
            @input="changeDataMerge">
          </el-input>
        </el-col>
        <el-col :span="2" style="width: 18%;">
          <el-input
            size="small"
            placeholder="金额"
            clearable
            v-model="cost1"
            @input="changeDataMerge">
          </el-input>
        </el-col>
        <el-col :span="2" style="width: 28%;">
          <el-date-picker
            style="width: 100%;"
            v-model="applyTimes1"
            type="daterange"
            size="small"
            clearable
            unlink-panels
            range-separator="-"
            start-placeholder="申请开始时间"
            end-placeholder="申请结束时间"
            value-format="yyyy-MM-dd"
            @change="changeDataMerge">
          </el-date-picker>
        </el-col>
        <el-col :span="2" style="width: 28%;">
          <el-date-picker
            style="width: 100% "
            v-model="useTimes1"
            type="daterange"
            size="small"
            clearable
            unlink-panels
            range-separator="-"
            start-placeholder="使用开始时间"
            end-placeholder="使用结束时间"
            value-format="yyyy-MM-dd"
            @change="changeDataMerge">
          </el-date-picker>
        </el-col>
        <el-col :span="2" :push="6" style="width: 13%; margin-right: 0">
          <el-button class="button" size="small" type="primary" style="width: 100%;" @click="handleReset3">清空搜索</el-button>
        </el-col>
        <!--<el-col :span="2" style="width: 13%">-->
        <!--<el-button size="small" type="primary" class="button" style="width: 100%" icon="el-icon-edit" @click="changeDataMerge">搜索</el-button>-->
        <!--</el-col>-->
      </el-row>
      <!--列表-->
      <el-table
        class="scroll"
        :data='merge'
        :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
        style='width: 100%'
        :empty-text='empty'
      >
        <el-table-column
          prop='itemNumber'
          label='订单号'
          width='120'>
        </el-table-column>
        <el-table-column
          prop='providerName'
          label='预订平台'
          width='120'>
        </el-table-column>
        <el-table-column
          prop='orderNum'
          label='预订平台订单号'
          width='150'>
        </el-table-column>
        <el-table-column
          prop='useTime'
          label='使用日期'
          :formatter="dateFormat"
          width='120'>
        </el-table-column>
        <el-table-column
          prop='applyName'
          label='申请人'
          width='120'>
        </el-table-column>
        <el-table-column
          prop='applyTime'
          label='申请日期'
          :formatter="dateFormat"
          width='120'>
        </el-table-column>
        <el-table-column
          prop='cost'
          label='金额'
          width='120'>
        </el-table-column>
        <el-table-column
          prop='comment'
          label='备注'
          width='120'>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  // var time = require('../../time')
  import moment from 'moment'
  export default {
    data() {
      return {
        empty1: '正在加载，请稍后...',
        empty2: '正在加载，请稍后...',
        empty: '正在加载，请稍后...',
        model: '',
        singleData: [], // 单结
        singlepn: 0, // 获取单结页
        weekDatapn: 0, // 获取周结页
        show: true,
        weekData: [], // 周结
        currentPage1: 1, // 单结页
        currentPage2: 1, // 周结页
        itemNumber: '', // 订单号
        providerName: '', // 预定平台
        orderNum: '', // 预定平台订单号
        applyName: '', // 申请人
        cost: '', // 金额
        payStatus: '', // 状态是否审核
        mergeOrderName: '', // 周结合并订单名称
        totalCost: '', // 周结总金额
        payerName: '', // 周结付款人
        billAlert: [],
        dialogFormVisible: false,
        dialogFormVisible4: false,
        urlData: [], // 付款凭证
        urlLength: '', // 付款凭证的长度
        merge: [], // 合并订单详情列表
        carousel: true, // 图片是否显示
        mergeOrderName1: '', // 合并订单名称
        totalCost1: '', // 总金额
        payTime: '', // 付款时间
        // useTime: '', // 使用时间
        mergeTime: '', // 合并时间
        auditName: '', // 付款人
        itemNumber1: '', // 合并搜索订单列表
        providerName1: '', // 合并搜索预定平台
        orderNum1: '', // 合并搜索预定平台订单号
        applyName1: '', // 合并搜索申请人
        cost1: '', // 合并搜索金额
        mergeCostId: '', // 合并搜索合并订单id
        useTimes: '', // 单结使用时间
        startuseTimes: '',
        enduseTimes: '',
        applyTimes: '', // 单结申请时间
        startapplyTimes: '',
        endapplyTimes: '',
        payTimes1: '', // 单结付款时间
        startpayTimes1: '',
        endpayTimes1: '',
        mergeTimes: [], // 周结合并时间
        startmergeTimes: '',
        endmergeTimes: '',
        payTimes: [], // 周结付款时间
        startpayTimes: '',
        endpayTimes: '',
        applyTimes1: [], // 合并申请时间
        startapplyTimes1: '',
        endapplyTimes1: '',
        useTimes1: [], // 合并使用时间
        startuseTimes1: '',
        enduseTimes1: '',
        id: '', // 获取凭证的id
        index: 0, // 凭证当前索引
        singleSize: 0, // 单结每页个数
        weekSize: 0 // 周结每页个数
      }
    },

    methods: {
      /* 获取用户信息 */
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.$router.push('/index/checked')
          } else if (res.data.code === 403) {
            this.$router.push('/login')
          } else if (res.data.code === 500) {
            this.$router.push('/404')
          }
        })
      },
      /* 时间戳->年月日 */
      dateFormat: function(row, column) {
        var date = row[column.property]
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          return ''
        }
      },
      // 点击获取合并订单详情（周结页点击）
      orderAfterNumberButton(row) {
        this.dialogFormVisible4 = true
        this.mergeOrderName1 = row.mergeOrderName
        this.totalCost1 = row.totalCost
        this.mergeCostId = row.id
        this.$http.get(`/api/finance/getMergeDetail?id=${row.id}`).then(res => {
          if (res.data.code === 200) {
            this.merge = res.data.data
            if (res.data.data.length === 0) {
              this.empty = '暂无数据'
            }
          }
        })
      },
      // 点击付款凭证（单结页点击）
      orderBillButton(row) {
        this.id = row
        this.$http.get(`/api/finance/applyUrlList?orderCostId=${row}`).then(res => {
          this.urlData = res.data.data
          this.dialogFormVisible = true
          if (this.urlData.length === 0) {
            this.carousel = false
          } else {
            this.urlLength = res.data.data.length
            this.carousel = true
          }
        })
      },
      /* 控制单结页码 */
      handleCurrentChange(e) {
        this.currentPage1 = e
        if (!this.itemNumber && !this.providerName && !this.orderNum && !this.applyName && !this.cost && !this.payStatus && !this.auditName && !this.useTimes && !this.applyTimes && !this.payTimes1) {
          this.getData()
        } else {
          this.changeSearch()
        }
      },
      /* 控制周结页码 */
      handleCurrentChange2(e) {
        this.currentPage2 = e
        if (!this.mergeOrderName && !this.totalCost && !this.payerName && !this.mergeTimes && !this.payTimes) {
          this.getmergeList()
        } else {
          this.changeweekSearch()
        }
      },
      // 单结重置
      handleReset1() {
        this.itemNumber = ''
        this.providerName = ''
        this.orderNum = ''
        this.applyName = ''
        this.cost = ''
        this.payStatus = ''
        this.auditName = ''
        this.useTimes = []
        this.applyTimes = []
        this.payTimes1 = []
        this.currentPage1 = 1
        this.empty1 = '正在加载，请稍后...'
        this.getData()
      },
      // 搜索列表（直连财务模块(单结)）
      changeSearch () {
        if (this.useTimes) {
          this.startuseTimes = this.useTimes[0]
          this.enduseTimes = this.useTimes[1]
        } else {
          this.startuseTimes = ''
          this.enduseTimes = ''
        }
        if (this.applyTimes) {
          this.startapplyTimes = this.applyTimes[0]
          this.endapplyTimes = this.applyTimes[1]
        } else {
          this.startapplyTimes = ''
          this.endapplyTimes = ''
        }
        if (this.payTimes1) {
          this.startpayTimes1 = this.payTimes1[0]
          this.endpayTimes1 = this.payTimes1[1]
        } else {
          this.startpayTimes1 = ''
          this.endpayTimes1 = ''
        }
        let params = {
          itemNumber: this.itemNumber,
          providerName: this.providerName,
          orderNum: this.orderNum,
          applyName: this.applyName,
          cost: this.cost,
          payStatus: this.payStatus,
          auditName: this.auditName,
          applyTimeEnd: this.endapplyTimes,
          applyTimeStart: this.startapplyTimes,
          payTimeEnd: this.endpayTimes1,
          payTimeStart: this.startpayTimes1,
          useTimeEnd: this.enduseTimes,
          useTimeStart: this.startuseTimes,
          page: this.currentPage1,
          payType: 1
        }
        this.$http.post('/api/finance/financeListByProperties', params).then(res => {
            this.singlepn = res.data.data.total
            this.singleData = res.data.data.list
            this.singleSize = res.data.data.pageSize
            if (res.data.data.list.length === 0) {
              this.empty1 = '暂无数据'
            }
        })
      },
      /* 触发单结搜索 */
      changeData() {
        this.currentPage1 = 1
        if (!this.itemNumber && !this.providerName && !this.orderNum && !this.applyName && !this.cost && !this.payStatus && !this.auditName && !this.useTimes && !this.applyTimes && !this.payTimes1) {
          this.empty1 = '正在加载，请稍后...'
          this.getData()
        } else {
          setTimeout(() => {
            this.changeSearch() // 搜索接口
          }, 600)
        }
      },
      // 周结重置
      handleReset2() {
        this.mergeOrderName = ''
        this.totalCost = ''
        this.payerName = ''
        this.mergeTimes = []
        this.payTimes = []
        this.currentPage2 = 1
        this.empty2 = '正在加载，请稍后...'
        this.getmergeList()
      },
      // 周结搜索
      changeweekSearch () {
        if (this.mergeTimes) {
          this.startmergeTimes = this.mergeTimes[0]
          this.endmergeTimes = this.mergeTimes[1]
        } else {
          this.startmergeTimes = ''
          this.endmergeTimes = ''
        }
        if (this.payTimes) {
          this.startpayTimes = this.payTimes[0]
          this.endpayTimes = this.payTimes[1]
        } else {
          this.startpayTimes = ''
          this.endpayTimes = ''
        }
        let params = {
          mergeOrderName: this.mergeOrderName,
          mergeTimeEnd: this.endmergeTimes,
          mergeTimeStart: this.startmergeTimes,
          page: this.currentPage2,
          payTimeEnd: this.endpayTimes,
          payTimeStart: this.startpayTimes,
          payerName: this.payerName,
          totalCost: this.totalCost,
          status: 1
        }
        this.$http.post('/api/finance/mergeListProperties', params).then(res => {
            this.weekDatapn = res.data.data.total
            this.weekData = res.data.data.list
            this.weekSize = res.data.data.pageSize
            if (res.data.data.list.length === 0) {
              this.empty2 = '暂无数据'
            }
        })
      },
      /* 触发周结搜索 */
      changeWeek () {
        this.currentPage2 = 1
        if (!this.mergeOrderName && !this.totalCost && !this.payerName && !this.mergeTimes && !this.payTimes) {
          this.empty2 = '正在加载，请稍后...'
          this.getmergeList()
        } else {
          setTimeout(() => {
            this.changeweekSearch()
          }, 500)
        }
      },

      /* 关闭合并 */
      handleEmpty() {
        this.itemNumber1 = ''
        this.providerName1 = ''
        this.orderNum1 = ''
        this.applyName1 = ''
        this.cost1 = ''
        this.applyTimes1 = []
        this.useTimes1 = []
        this.merge = []
        this.empty = '正在加载，请稍后...'
      },
      // 合并重置
      handleReset3() {
        this.itemNumber1 = ''
        this.providerName1 = ''
        this.orderNum1 = ''
        this.applyName1 = ''
        this.cost1 = ''
        this.applyTimes1 = []
        this.useTimes1 = []
        this.empty = '正在加载，请稍后...'
        this.changeDataMerge()
      },
      // 合并搜索
      changeDataMerge () {
        setTimeout(() => {
          if (this.applyTimes1) {
            this.startapplyTimes1 = this.applyTimes1[0]
            this.endapplyTimes1 = this.applyTimes1[1]
          } else {
            this.startapplyTimes1 = ''
            this.endapplyTimes1 = ''
          }
          if (this.useTimes1) {
            this.startuseTimes1 = this.useTimes1[0]
            this.enduseTimes1 = this.useTimes1[1]
          } else {
            this.startuseTimes1 = ''
            this.enduseTimes1 = ''
          }
          let params = {
            applyName: this.applyName1,
            applyTimeEnd: this.endapplyTimes1,
            applyTimeStart: this.startapplyTimes1,
            cost: this.cost1,
            itemNumber: this.itemNumber1,
            mergeCostId: this.mergeCostId,
            orderNum: this.orderNum1,
            providerName: this.providerName1,
            useTimeEnd: this.enduseTimes1,
            useTimeStart: this.startuseTimes1
          }
          this.$http.post('/api/finance/searchMergeDetail', params).then(res => {
            if (res.data.code === 200) {
              this.merge = res.data.data
              if (res.data.data.length === 0) {
                this.empty = '暂无数据'
              }
            }
          })
        }, 600)
      },
      // 分页获取财务审核列表（直连财务模块(单结)）
      getData() {
        this.$http.get(`/api/finance/financeListNotEApplication?page=${this.currentPage1}&payStatus=1&isEApplication=0`).then(res => {
          if (res.data.code === 200) {
            this.singlepn = res.data.data.total
            this.singleData = res.data.data.list
            this.singleSize = res.data.data.pageSize
            if (res.data.data.list.length === 0) {
              this.empty1 = '暂无数据'
            }
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        })
      },
      // 财务模块审核列表分页显示（周结）
      getmergeList() {
        this.$http.get(`/api/finance/mergeList?page=${this.currentPage2}&status=1`).then(res => {
          if (res.data.code === 200) {
            this.weekDatapn = res.data.data.total
            this.weekData = res.data.data.list
            this.weekSize = res.data.data.pageSize
            if (res.data.data.list.length === 0) {
              this.empty2 = '暂无数据'
            }
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        })
      },
      handleIndex(e) {
        this.index = e
      },
      /* 打印 */
      printDeal () {
        window.open(`#/evidence?id=${this.id}&index=${this.index}`)
      }
    },
    created () {
      this.getData()
      this.getmergeList()
    },
    beforeMount() {
      this.getUser()
    }
  }
</script>

<style scoped>
  .row > div {
    text-align: center;
    border: 0.1px solid rgba(100, 100, 100, 0.1);
  }
  .row {
    height: 50px;
    line-height: 50px;
    margin-top: 5px;
  }
  .payClass {
    height: 35px;

    position: relative;
    top: 10px;
  }
  .data_body {
    cursor: pointer;
  }
  .data_body:hover {
    border: 0.1px solid rgba(100, 100, 100, 0.3);
  }
  .data_title {
    font-size: 18px;
  }
  .detail_title {
    background: rgba(100, 100, 100, 0.2);
    font-size: 17px;
  }
  .detail_body_hover {
    border: 0.1px solid rgba(100, 100, 100, 0.3);
  }
  .orderDate {
    font-size: 12px;
  }
  .data_body > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cell {
    text-align: center;
  }
  .Zcol {
    border: 1px solid rgba(1, 1, 1, 0.2);
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    margin-top: 1px;
  }
  .block{
    margin-top: 10px;
    padding-top:5px ;
    float: right;
  }
  .top{
    background: #fff;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 0 14px;
    margin-bottom: 15px;
  }
  /*.button{*/
  /*line-height: 30px;*/
  /*width: 100px;*/
  /*padding: 0;*/
  /*}*/
  .rowChange{
    width: 100%;
    margin: 0 0 10px;
  }
  .el-col{
    margin-right: 14px;
    width: 15%;
    margin-top: 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .image{
    width: 450px;
    height: 300px;
  }
  .evidence{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .demonstration{
    font-size: 16px;
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
  .scroll ::-webkit-scrollbar {
    width: 5px;
    height: 16px;
  }
</style>

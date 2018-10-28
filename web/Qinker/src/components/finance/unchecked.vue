<template>
  <div class="pay">
    <div class="top">
      <div>待审核款项</div>
      <!--<el-button type='primary' class="button">导出</el-button>-->
    </div>
    <el-container>
      <el-aside width="12%" v-if="showMerge">
        <!--  aside -->
        <el-tabs type="border-card" style="margin-top: 15px;width: 90%; line-height: 30px">
          <el-button size="small" style="width: auto;" v-show=" orderCostList.length === 0 ">没有合并订单</el-button>
          <el-button size="small" @click="openMergeOrder" v-show=" orderCostList.length !== 0 ">一共有{{orderCostList.length}}个合并订单</el-button>
        </el-tabs>
      </el-aside>
      <div :class="{content1:showMerge, content2: !showMerge}">
        <!--  main -->
        <el-card class="box-card" v-if="showMerge">
          <el-button type="primary" @click="getMergeOrder" :disabled="!this.selectOrder.length">添加结算单</el-button>
        </el-card>

        <el-tabs type="border-card" @tab-click="cardClick" v-model="tabNumber">
          <el-tab-pane label="单结" name="first">
            <!--  单结页面 -->
            <el-row class="searchDan">
              <el-col :span="3">
                <el-input v-model="searchMerge.itemNumber" placeholder="订单号" size="small" clearable @input="postSearch"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input v-model="searchMerge.platform" placeholder="预订平台" size="small" clearable @input="postSearch"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input v-model="searchMerge.platformNum" placeholder="预订平台订单号" size="small" clearable @input="postSearch"></el-input>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  style="width: 100%;"
                  v-model="searchMerge.useDate"
                  type="daterange"
                  size="small"
                  clearable
                  unlink-panels
                  range-separator="-"
                  start-placeholder="使用日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="postSearch">
                </el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-input v-model="searchMerge.applyName"  placeholder="申请人" size="small" clearable @input="postSearch"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input v-model="searchMerge.cost" placeholder="金额" size="small" clearable @input="postSearch"></el-input>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  style="width: 100%;"
                  v-model="searchMerge.applyDate"
                  type="daterange"
                  size="small"
                  clearable
                  unlink-panels
                  range-separator="-"
                  start-placeholder="申请日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="postSearch">
                </el-date-picker>
              </el-col>
              <!--<el-col :span="2">-->
                <!--<el-button type="primary" style="width: 100%"  @click="postSearch" size="mini">查询</el-button>-->
              <!--</el-col>-->
              <el-col :span="2">
                <el-button type="primary" style="width: 100%"  @click="orderItemsBack" size="mini">清空</el-button>
              </el-col>
            </el-row>
            <el-table
              ref="multipleTable"
              :data="orderItems"
              tooltip-effect="dark"
              class="tableScroll"
              :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
              style="width:100%"
              @selection-change="getAllPayOrder">
              <el-table-column
                type="selection"
                fixed
                :selectable="getDisabeld"
                width="50">
              </el-table-column>
              <el-table-column
                prop="itemNumber"
                label="订单号"
                width="140">
              </el-table-column>
              <el-table-column
                prop="applyName"
                label="申请人"
                width="100">
              </el-table-column>
              <el-table-column
                prop="providerName"
                label="预订平台"
                width="120">
              </el-table-column>
              <el-table-column
                prop="useTime"
                label="使用日期"
                width="140"
                :formatter="dateFormat">
              </el-table-column>
              <el-table-column
                prop="orderNum"
                label="预订平台订单号"
                width="140">
              </el-table-column>
              <el-table-column
                prop="payStatus"
                label="状态"
                width="80">
              </el-table-column>
              <el-table-column
                prop="cost"
                label="金额"
                width="120">
              </el-table-column>
              <el-table-column
                prop="applyTime"
                label="申请时间"
                width="140"
                :formatter="dateFormat">
              </el-table-column>
              <el-table-column
                prop="comment"
                label="备注"
                width="160">
              </el-table-column>
              <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="showPayDetail(scope.row)">付 款</el-button>
                  <el-button size="mini" type="danger" @click="cancelApply(scope.row)">拒 绝</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--  foot -->
            <div style="text-align: right">
              <el-pagination
                @current-change="danCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                background
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="周结" name="second">
            <!-- 周结页面 -->
            <el-row class="searchDan">
              <el-col :span="3">
                <el-input v-model="searchMergeAfter.mergeNumber" size="small" clearable placeholder="合并订单名称" @input="postSearchAfter"></el-input>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  style="width: 100%;"
                  v-model="searchMergeAfter.mergeDate"
                  type="daterange"
                  size="small"
                  clearable
                  unlink-panels
                  range-separator="-"
                  start-placeholder="合并日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="postSearchAfter">
                </el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-input v-model="searchMergeAfter.providerName" size="small" clearable placeholder="供应商" @input="postSearchAfter"></el-input>
              </el-col>
              <!--<el-col :span="2">
                <el-button type="primary" style="width: 100%" @click="postSearchAfter" size="mini">查询</el-button>
              </el-col>-->
              <el-col :span="2">
                <el-button type="primary" style="width: 100%;" @click="orderMonthItemsBack" size="mini">清空</el-button>
              </el-col>
            </el-row>
            <el-table
              :center="true"
              ref="multipleTable2"
              class="tableScroll"
              :data="orderMonthItems"
              :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
              tooltip-effect="dark"
              style="width: 100%; margin-left: 20px;">
              <el-table-column
                prop="mergeOrderName"
                label="合并订单名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="providerName"
                label="供应商"
                width="140">
              </el-table-column>
              <el-table-column
                prop="mergeTime"
                label="合并日期"
                width="150"
                :formatter="dateFormat">
              </el-table-column>
              <el-table-column
                prop="mergerName"
                label="合并人"
                width="140">
              </el-table-column>
              <el-table-column
                prop="totalCost"
                label="总金额"
                width="150">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="loadMergeOrderAfter(scope.row)">明细</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteMerge(scope.row)">取消合并</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--  foot -->
            <div style="text-align: right">
              <el-pagination
                @current-change="monCurrentChange"
                :current-page.sync="monthCurrentPage"
                :page-size="monthPageSize"
                background
                layout="total, prev, pager, next"
                :total="monthTotal">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>

        <!-- 单结付款-->
        <el-dialog title="付款" :visible.sync="dialogFormVisible" width="40%">
          <el-row>
            <el-form :model="payForm">
                <el-form-item label="支付账户">
                  <el-select v-model="payForm.orderCost.payAccount" placeholder="请选择付款方式">
                    <el-option label="支付宝" value="支付宝"></el-option>
                    <el-option label="公账" value="公账"></el-option>
                    <el-option label="JC信用卡" value="JC信用卡"></el-option>
                    <el-option label="stone信用卡" value="stone信用卡"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
          </el-row>
          <div slot="footer">
            <el-button type="primary" @click="postPayOrder">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 单结拒绝 -->
        <el-dialog title="拒绝理由" :visible.sync="dialogFormVisible5" width="40%">
          <el-row>
            <el-col>
              <el-input type="textarea" placeholder="请输入内容" :row="10" v-model="refuseData.orderCost.refuseReason"></el-input>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="danCancel" size="medium">保 存</el-button>
          </div>
        </el-dialog>
        <!-- 合并订单模块-->
        <el-dialog title="合并订单" :visible.sync="dialogFormVisible2" width="70%">
          <el-row>
            <el-col>
              <el-form :inline="true" label-width="110px" :model="mergeOrderName">
                <el-form-item label="合并订单名称">
                  <el-select clearable filterable v-model="mergeOrderName.name" style="width: 180px" @change="changeSelectDan($event)" placeholder="类型" size="small">
                    <el-option
                      v-for="(item,index) in mergeNames"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-form-item v-if="addNewInp">
                    <el-input size="small" style="width: 180px;" clearable v-model="mergeOrderName.name" placeholder="新建"></el-input>
                  </el-form-item>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <!-- 合并订单模块表格-->
          <el-table :data="orderCostList" :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}">
            <el-table-column property="itemNumber" label="订单号" width="150"></el-table-column>
            <el-table-column property="applyName" label="申请人" width="80"></el-table-column>
            <el-table-column prop="providerName" label="预订平台" width="120"></el-table-column>
            <el-table-column prop="useTime" label="使用日期" width="100" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="orderNum" label="预订平台订单号" width="150"></el-table-column>
            <el-table-column prop="payStatus" label="状态" width="80"></el-table-column>
            <el-table-column prop="cost" label="金额" width="80"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" width="100" :formatter="dateFormat"></el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="deleteOnePay(scope.row)" type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="8">
              <div style="margin-top: 15px">总金额：{{dan_costs}}元</div>
            </el-col>
          </el-row>
          <div slot="footer">
            <el-button type="danger" @click="delMergeOrder">取消结算单</el-button>
            <el-button type="primary" @click="postMergeOrder">合并结算单</el-button>
          </div>
        </el-dialog>
        <!-- 合并订单明细-->
        <el-dialog title="合并订单明细" :visible.sync="dialogFormVisible3" width="80%" @close="closeDialog">
          <el-row style="margin-bottom: 15px">
            <el-col :span="6">
              <div>合并订单名称：{{mergeRowName}}</div>
            </el-col>
            <el-col :span="6">
              <div>总金额：{{allMoney}}</div>
            </el-col>
          </el-row>
          <el-row class="searchDan">
            <el-col :span="3">
              <el-input v-model="searchDetail.itemNumber" placeholder="订单号" size="small" clearable @input="searchDetailbtn"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchDetail.platform" placeholder="预订平台" size="small" clearable @input="searchDetailbtn"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="searchDetail.orderNum" placeholder="预订平台订单号" size="small" clearable @input="searchDetailbtn"></el-input>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                style="width: 100%;"
                v-model="searchDetail.useDate"
                type="daterange"
                size="small"
                clearable
                unlink-panels
                range-separator="-"
                start-placeholder="使用日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="searchDetailbtn">
              </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchDetail.applyName"  placeholder="申请人" size="small" clearable @input="searchDetailbtn"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchDetail.cost" placeholder="金额" size="small" clearable @input="searchDetailbtn"></el-input>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                style="width: 100%;"
                v-model="searchDetail.applyDate"
                type="daterange"
                size="small"
                clearable
                unlink-panels
                range-separator="-"
                start-placeholder="申请日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="searchDetailbtn">
              </el-date-picker>
            </el-col>
            <!--<el-col :span="2">
              <el-button type="primary" style="width: 100%" @click="searchDetailbtn" size="mini">查询</el-button>
            </el-col>-->
            <el-col :span="2">
              <el-button type="primary" style="width: 100%;" @click="orderItemsBackDetail" size="mini">清空</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="allPayAfter"
            tooltip-effect="dark"
            :empty-text="emptyDetail"
            :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
            style="width: 100%">
            <el-table-column prop="itemNumber" label="订单号" width="120"></el-table-column>
            <el-table-column prop="providerName" label="预订平台" width="120"></el-table-column>
            <el-table-column prop="orderNum" label="预订平台订单号" width="150"></el-table-column>
            <el-table-column prop="useTime" label="使用日期" width="100" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="applyName" label="申请人" width="80"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" width="100" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="cost" label="金额" width="80"></el-table-column>
            <el-table-column prop="comment" label="备注" width="160"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="getAfterOrder(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer">
            <el-button type="primary" @click="dialogFormVisible4 = true" size="small">确认付款</el-button>
            <el-button type="primary" size="small" @click="saveMergeDetail">保存</el-button>
          </div>
        </el-dialog>
        <!-- 合并订单付款模块 -->
        <el-dialog title="合并付款" :visible.sync="dialogFormVisible4" width="40%" append-to-body>
          <el-form :model="payFormAfter">
            <el-form-item>
              <el-select v-model="payFormAfter.payMent" label="付款方式" placeholder="请选择付款方式">
                <el-option label="支付宝" value="支付宝"></el-option>
                <el-option label="公账" value="公账"></el-option>
                <el-option label="JC信用卡" value="JC信用卡"></el-option>
                <el-option label="stone信用卡" value="stone信用卡"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="付款流水号" label-width="120">
              <el-input v-model="payFormAfter.payNumber"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer">
            <el-button @click="cancelPostAfterOrder">取 消</el-button>
            <el-button type="primary" @click="postAfterOrder">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-container>
  </div>

</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        tabNumber: 'first',
        showMerge: true,
        /* 单结列表 */
        orderItems: [], // 单结数组
        orderCostList: [], // 合并模块数组
        selectOrder: [], // 勾选数组
        // 合并订单名称 输入
        mergeOrderName: {
          name: ''
        },
        addNewInp: false,
        mergeNames: [], // 合并订单名称组
        orderMonthItems: [], // 周结数组
        allPayAfter: [], // 合并后数组 明细

        providername: '', // 相同预订平台
        dan_costs: 0, // 合并 弹框 总金额
        sub_total: 0, // 周结 总金额

        /* 单结付款 */
        payForm: {
          orderCost: {
            id: 0,
            payAccount: ''
          }
        },
        /* 单结拒绝 */
        refuseData: {
          orderCost: {
            id: 0,
            refuseReason: '信息填写错误'
          }
        },
        /* 单结页数 */
        currentPage: 1, // 当前页
        pageSize: 0, // 每页显示多少条数据
        total: 0, // 总条数

        /* 周结 */
        monthCurrentPage: 1, // 当前页
        monthTotal: 0, // 总页数
        monthPageSize: 0, // 每页显示多少

        mergeRow: [], // 周结 合并一行
        mergeIds: [], // 明细 被删除Id

        dialogFormVisible: false,
        dialogFormVisible5: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        // 合并订单付款
        payFormAfter: {
          payMent: '',
          payNumber: ''
        },
        // 单结搜索
        searchMerge: {
          itemNumber: '', // 订单号
          platform: '', // 预定平台
          platformNum: '', // 预订平台订单号
          applyName: '', // 申请人
          cost: '', // 金额
          useDate: '', // 使用日期
          applyDate: '' // 申请时间
        },
        // 明细搜索
        searchDetail: {
          itemNumber: '', // 订单号
          platform: '', // 预定平台
          orderNum: '', // 预订平台订单号
          useDate: '', // 使用日期
          applyName: '', // 申请人
          cost: '', // 金额
          applyDate: '' // 申请时间
        },
        // 周结 搜索
        searchMergeAfter: {
          mergeNumber: '',
          mergeDate: '',
          providerName: ''
        },
        emptyDetail: '正在加载，请稍等...'
      }
    },
    computed: {
      mergeRowName() {
        return this.mergeRow.mergeOrderName
      },
      allMoney() {
        return `${this.mergeRow.totalCost}元`
      }
    },
    created() {
      this.getPageOrder() // 单结 分页 接口
    },
    beforeMount() {
      this.getUser()
    },
    methods: {
      /* 获取用户信息 */
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.$router.push('/index/unchecked')
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
      // 单结 搜索
      postSearch() {
        let searchMerge = this.searchMerge
        this.currentPage = 1
        if (!searchMerge.itemNumber && !searchMerge.platform && !searchMerge.platformNum && !searchMerge.applyName && !searchMerge.cost && !searchMerge.useDate && !searchMerge.applyDate) {
          this.getPageOrder()
        } else {
          setTimeout(() => {
            this.loadPostSearch() // 搜索接口
          }, 300)
        }
      },
      // 单结 搜索接口
      loadPostSearch() {
        let useTimeStart, useTimeEnd, applyTimeStart, applyTimeEnd
        if (this.searchMerge.useDate) {
          useTimeStart = this.searchMerge.useDate[0]
          useTimeEnd = this.searchMerge.useDate[1]
        } else {
          useTimeStart = ''
          useTimeEnd = ''
        }
        if (this.searchMerge.applyDate) {
          applyTimeStart = this.searchMerge.applyDate[0]
          applyTimeEnd = this.searchMerge.applyDate[1]
        } else {
          applyTimeStart = ''
          applyTimeEnd = ''
        }
        let data = {
          applyName: this.searchMerge.applyName, // 申请人
          applyTimeStart, // 申请时间
          applyTimeEnd,
          cost: this.searchMerge.cost, // 金额
          itemNumber: this.searchMerge.itemNumber, // 订单号
          orderNum: this.searchMerge.platformNum, // 预定平台订单号
          page: this.currentPage, // 分页
          payType: 0, // 未审核
          providerName: this.searchMerge.platform, // 预订平台
          useTimeStart, // 使用时间
          useTimeEnd
        }
        this.$http.post('/api/finance/financeListByProperties', data).then((res) => {
          if (res.data.code === 200) {
            this.orderItems = res.data.data.list
            this.total = res.data.data.total
            this.pageSize = res.data.data.pageSize
          }
        })
      },
      // 单结 搜索清空
      orderItemsBack() {
        for (let i in this.searchMerge) {
          this.searchMerge[i] = ''
        }
        this.currentPage = 1
        this.getPageOrder()
      },
      // 周结 清空搜索
      orderMonthItemsBack() {
        for (let i in this.searchMergeAfter) {
          this.searchMergeAfter[i] = ''
        }
        this.monthCurrentPage = 1
        this.monGetPageOrder()
      },
      // 周结 搜索
      postSearchAfter() {
        this.monthCurrentPage = 1
        let searchMergeAfter = this.searchMergeAfter
        if (!searchMergeAfter.mergeNumber && !searchMergeAfter.mergeDate && !searchMergeAfter.providerName) {
          this.monGetPageOrder()
        } else {
          this.loadPostSearchAfter()
        }
      },
      // 周结 搜索接口
      loadPostSearchAfter() {
        let mergeTimeStart, mergeTimeEnd
        if (this.searchMergeAfter.mergeDate) {
          mergeTimeStart = this.searchMergeAfter.mergeDate[0]
          mergeTimeEnd = this.searchMergeAfter.mergeDate[1]
        } else {
          mergeTimeStart = ''
          mergeTimeEnd = ''
        }
        let data = {
          mergeOrderName: this.searchMergeAfter.mergeNumber, // 合并订单名称
          mergeTimeStart,
          mergeTimeEnd,
          page: this.monthCurrentPage,
          status: 0,
          providerName: this.searchMergeAfter.providerName
        }
        this.$http.post('/api/finance/mergeListProperties', data).then((res) => {
          if (res.data.code === 200) {
            this.orderMonthItems = res.data.data.list
            this.monthTotal = res.data.data.total
            this.monthPageSize = res.data.data.pageSize
          }
        })
      },
      // 详情 搜索 清空
      orderItemsBackDetail() {
        for (let i in this.searchDetail) {
          this.searchDetail[i] = ''
        }
        this.getMergeOrderAfter()
      },
      // 详情 搜索
      searchDetailbtn() {
        let searchDetail = this.searchDetail
        if (!searchDetail.itemNumber && !searchDetail.platform && !searchDetail.orderNum && !searchDetail.useDate && !searchDetail.applyName && !searchDetail.cost && !searchDetail.applyDate) {
          this.getMergeOrderAfter()
        } else {
          setTimeout(() => {
            this.postSearchDetail()
          }, 500)
        }
      },
      // 关闭详情弹框
      closeDialog() {
        for (let i in this.searchDetail) {
          this.searchDetail[i] = ''
        }
      },
      // 详情 搜索接口
      postSearchDetail() {
        let useTimeStart, useTimeEnd, applyTimeStart, applyTimeEnd
        if (this.searchDetail.useDate) {
          useTimeStart = this.searchDetail.useDate[0]
          useTimeEnd = this.searchDetail.useDate[1]
        } else {
          useTimeStart = ''
          useTimeEnd = ''
        }
        if (this.searchDetail.applyDate) {
          applyTimeStart = this.searchDetail.applyDate[0]
          applyTimeEnd = this.searchDetail.applyDate[1]
        } else {
          applyTimeStart = ''
          applyTimeEnd = ''
        }
        let data = {
          mergeCostId: this.mergeRow.id,
          applyName: this.searchDetail.applyName, // 申请人
          applyTimeStart, // 申请时间
          applyTimeEnd,
          cost: this.searchDetail.cost, // 金额
          itemNumber: this.searchDetail.itemNumber, // 订单号
          orderNum: this.searchDetail.orderNum, // 预定平台订单号
          providerName: this.searchDetail.platform, // 预订平台
          useTimeStart, // 使用时间
          useTimeEnd
        }
        this.$http.post('/api/finance/searchMergeDetail', data).then((res) => {
          if (res.data.code === 200) {
            this.allPayAfter = res.data.data
            if (!this.allPayAfter.length) {
              this.emptyDetail = '暂无数据'
            }
          }
        })
      },
      // 单结 切换 页数
      danCurrentChange(val) {
        this.currentPage = val
        let searchMerge = this.searchMerge
        if (!searchMerge.itemNumber && !searchMerge.platform && !searchMerge.platformNum && !searchMerge.applyName && !searchMerge.cost && !searchMerge.useDate && !searchMerge.applyDate) {
          this.getPageOrder()
        } else {
          this.loadPostSearch() // 搜索接口
        }
      },
      /* 根据分页获取 单结数据 */
      getPageOrder() {
        this.$http.get(`/api/finance/financeListNotEApplication?page=${this.currentPage}&payStatus=0&isEApplication=0`).then((res) => {
          if (res.data.code === 200) {
            this.orderItems = res.data.data.list
            this.total = res.data.data.total
            this.pageSize = res.data.data.pageSize
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      // 周结 分页
      monCurrentChange(val) {
        this.monthCurrentPage = val
        let searchMergeAfter = this.searchMergeAfter
        if (!searchMergeAfter.mergeNumber && !searchMergeAfter.mergeDate && !searchMergeAfter.providerName) {
          this.monGetPageOrder()
        } else {
          this.loadPostSearchAfter()
        }
      },
      /* 根据分页获取 周结数据 */
      monGetPageOrder() {
        this.$http.get(`/api/finance/mergeList?page=${this.monthCurrentPage}&status=0`).then((res) => {
          if (res.data.code === 200) {
            this.orderMonthItems = res.data.data.list
            this.monthTotal = res.data.data.total
            this.monthPageSize = res.data.data.pageSize
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 合并订单名称 下拉选项 */
      changeSelectDan(val) {
        if (val === '新建') {
          this.addNewInp = true
          this.mergeOrderName.name = ''
        } else {
          this.addNewInp = false
        }
      },
      // 获取合并订单名称 接口
      getMergeNameData() {
        this.$http.get('/api/finance/mergeListByStatus').then((res) => {
          if (res.data.code === 200) {
            this.mergeNames = res.data.data
            this.mergeNames.unshift('新建')
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      // 打开合并结算单
      openMergeOrder() {
        this.getMergeNameData() // 合并订单名称选项接口
        this.dialogFormVisible2 = true
      },
      // 取消确认付款 btn
      cancelPostAfterOrder() {
        this.dialogFormVisible4 = false
        for (let i in this.payFormAfter) {
          this.payFormAfter[i] = ''
        }
      },
      // 确认付款
      postAfterOrder() {
        let orderCostList = []
        for (let attr in this.allPayAfter) {
          orderCostList.push(this.allPayAfter[attr])
        }
        let data = {
          orderCostList,
          orderCostMerge: {
            id: this.mergeRow.id,
            payAccount: this.payFormAfter.payMent, // 支付方式
            paySerialNumber: this.payFormAfter.payNumber // 流水账
          }
        }
        this.$http.post('/api/finance/mergeConfirmPay', data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.dialogFormVisible3 = false
            this.dialogFormVisible4 = false
            this.payFormAfter.payMent = ''
            this.payFormAfter.payNumber = ''
            this.monGetPageOrder()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        })
      },
      // 单结 付款 确定
      postPayOrder() {
        this.$http.post('/api/finance/isFinanceSuccessPay', this.payForm).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.dialogFormVisible = false
            this.payForm.orderCost.payAccount = ''
            this.getPageOrder()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      // 切换单结/周结
      cardClick(tab) {
        let index = tab._data.index
        if (index === '0') {
          this.getPageOrder()
          this.showMerge = true
        } else {
          this.showMerge = false
          this.monGetPageOrder()
        }
      },
      // 查看明细 按钮
      loadMergeOrderAfter(row) {
        this.mergeRow = row
        this.getMergeOrderAfter()
      },
      // 明细接口
      getMergeOrderAfter() {
        this.dialogFormVisible3 = true
        this.$http.get(`/api/finance/getMergeDetail?id=${this.mergeRow.id}`).then((res) => {
          if (res.data.code === 200) {
            this.allPayAfter = res.data.data
            if (!this.allPayAfter.length) {
              this.emptyDetail = '暂无数据'
            }
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      // 明细中 删除单项
      getAfterOrder(row, index) {
        this.mergeIds.push({
          id: row.id,
          cost: row.cost
        })
        this.allPayAfter.splice(index, 1)
      },
      // 保存 明细
      saveMergeDetail() {
        let orderCostList = []
        for (let attr in this.mergeIds) {
          orderCostList.push(this.mergeIds[attr])
        }
        let data = {
          orderCostList,
          orderCostMerge: {
            id: this.mergeRow.id
          }
        }
        this.$http.post('/api/finance/deleteDetail', data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.dialogFormVisible3 = false
            this.mergeIds = []
            this.monGetPageOrder()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        })
      },
      // 周结 取消合并按钮
      deleteMerge(row) {
        let item = row
        this.$confirm('此操作将取消合并, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$http.post(`/api/finance/cancelMerge?mergeCostId=${item.id}`).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(`${res.data.msg}`)
                this.monGetPageOrder()
              } else if (res.data.code !== 200) {
                this.$message.success(`${res.data.msg}`)
              }
            }, (err) => {
              console.log(err.status)
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 单结 取消合并结算单 按钮
      delMergeOrder() {
        let _this = this
        this.$confirm('此操作将取消合并, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _this.orderCostList = []
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            _this.dan_costs = 0
            _this.mergeOrderName.name = ''
            _this.providername = ''
            _this.dialogFormVisible2 = false
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已放弃取消合并'
            })
          })
      },
      // 合并结算单
      postMergeOrder() {
        if (!this.mergeOrderName.name) {
          this.$message.error('请选择合并订单名称')
          return
        }
        let orderCostList = []
        for (let attr in this.orderCostList) {
          orderCostList.push(this.orderCostList[attr])
        }
        let data = {
          orderCostList,
          orderCostMerge: {
            providerName: this.providername,
            mergeOrderName: this.mergeOrderName.name,
            totalCost: this.dan_costs
          }
        }
        this.$http.post('/api/finance/addMerge', data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.orderCostList = []
            this.dan_costs = 0
            this.mergeOrderName.name = ''
            this.dialogFormVisible2 = false
            this.providername = ''
            this.getPageOrder()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      // 单结 合并订单弹框 删除
      deleteOnePay(row) {
        let index = this.orderCostList.indexOf(row)
        this.orderCostList.splice(index, 1)
        this.dan_costs -= row['cost']
      },
      // 单结 付款 按钮
      showPayDetail(row) {
        this.dialogFormVisible = true
        this.payForm.orderCost.id = row.id
      },
      // 禁止选中
      getDisabeld(row, index) {
        if (this.orderCostList.length) {
          let id = row.id
          let index = false
          for (let i of this.orderCostList) {
            if (i.id === id) index = true
          }
          if (index) return 0
          return 1
        } else {
          return 1
        }
      },
      // 添加结算单 按钮
      getMergeOrder() {
        let allPay = this.orderCostList
        let select = this.selectOrder
        let proName = select[0]['providerName']
        let boo = true
        if (this.providername) {
          if (this.providername !== proName) {
            boo = false
          } else {
            for (let attr in select) {
              if (select[attr]['providerName'] !== proName) {
                boo = false
                break
              }
            }
          }
        } else {
          for (let attr in select) {
            if (select[attr]['providerName'] !== proName) {
              boo = false
              break
            }
          }
        }
        if (boo) {
          for (let attr in select) {
            this.dan_costs += select[attr]['cost']
          }
          for (let i of select) {
            allPay.push(i)
          }
          this.providername = this.orderCostList[0]['providerName']
        } else {
          this.$message({message: '预订平台不一致', type: 'warning'})
        }
        this.$refs.multipleTable.clearSelection()
      },
      // 获取选择的数据
      getAllPayOrder(row) {
        this.selectOrder = row
      },
      // 拒绝 按钮
      cancelApply(row) {
        this.dialogFormVisible5 = true
        this.refuseData.orderCost.id = row.id
      },
      // 拒绝-保存
      danCancel() {
        let _this = this
        this.$http.post('/api/finance/isFinanceSuccessPay', this.refuseData).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.dialogFormVisible5 = false
            _this.payForm.orderCost.payAccount = ''
            this.getPageOrder()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      }
    }
  }
</script>

<style scoped>
  .pay .rowTitle{
    margin-bottom: 0;
    background-color: #fff;
  }
  .pay .rowTitle .el-col{
    line-height: 35px;
  }
  .checkTitle{
     display: block;
     font-family: "Helvetica Neue",Arial,sans-serif;
     font-size:18px;
     line-height: 35px;
     margin-left: 10px;
   }
  .top{
    background: #fff;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 0 14px;
  }
  .button{
    line-height: 30px;
    width: 100px;
    padding: 0;
  }
  .pay .el-aside {
    background: #eff0f4;
  }

  .searchDan .el-col {
    margin: 0 0 8px 8px;
    line-height: 40px;
  }
  .content1 {
    margin-top: 15px;
    width: 88%;
  }
  .content2 {
    margin-top: 15px;
    width: 100%;
  }
  .row > div {
    text-align: center;
    border: 0.1px solid rgba(100, 100, 100, 0.1);
  }
  .row {
    height: 50px;
    line-height: 50px;
    margin-top: 5px;
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

<!--结算单-->
<template>
  <div>
    <el-row class="rowSty">
      <div><strong>定制师：</strong><span>{{nickname}}</span></div><div><strong>订单号：</strong><span>{{itemNumber}}</span></div>
    </el-row>
    <el-row class="rowSty marginTop">
      <div><strong>订单总收入：</strong><span>{{allIncome}}</span></div>
      <div><strong>订单总成本：</strong><span>{{allCost}}</span></div>
      <div><strong>利润：</strong> <span>{{allRevenue}}</span></div>
    </el-row>
    <el-row>
      <el-tabs v-model="number" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="预定款项" name="first">
          <el-form :rules="rules" :model="data" ref="form">
            <el-table
            :data="data.costs"
            tooltip-effect="dark"
            :empty-text="emptyCon"
            style="width: 100%;"
            ref="costsTable"
            class="tableScroll"
            :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
            @selection-change="selectRowCost">
            <el-table-column type="selection" width="40" :selectable="getDisabeld" fixed></el-table-column>
            <el-table-column label="成本支出项目" width="140">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][type]'" :rules="rules.type">
                  <el-select v-model="scope.row.type" filterable :disabled="statusDisable(scope.row.payStatus)" size="small" placeholder="成本支出项目" @change="getType(scope.row,scope.$index)">
                    <el-option
                      v-for="(item,index) in types"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="名称" width="100">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][category]'" :rules="rules.category">
                  <el-input size="small" clearable v-model="scope.row.category" :disabled="statusDisable(scope.row.payStatus)" placeholder="用途"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="预订平台" width="140">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][providerName]'" :rules="rules.providerName">
                  <el-select size="small" filterable :disabled="statusDisable(scope.row.payStatus)" v-model="scope.row.providerName" @change="getprovideId(scope.row)" @focus="getProviderData(scope.$index)" placeholder="预订平台">
                    <el-option
                      v-for="(item,index) in providers"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="使用日期" width="150">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][useTime]'" :rules="rules.useTime">
                  <el-date-picker
                    size="small"
                    clearable
                    v-model="scope.row.useTime"
                    type="date"
                    style="width: 100%;"
                    value-format="timestamp"
                    placeholder="使用日期">
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="预订平台订单号/库存数量" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][orderNum]'">
                  <el-input placeholder="预订平台单号" clearable :disabled="statusDisable(scope.row.payStatus)" size="small" v-model="scope.row.orderNum"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="金额" width="140">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][cost]'" :rules="rules.cost">
                  <el-input placeholder="金额" clearable :disabled="statusDisable(scope.row.payStatus)" size="small" v-model.number="scope.row.cost"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="付款状态" width="145">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][payStatus]'">
                  <el-input size="small" v-model="scope.row.payStatus" clearable disabled></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="是否立即付款" width="120">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][sosStatus]'">
                  <el-select size="small" v-model="scope.row.sosStatus" :disabled="sosStatusDisable(scope.row.payStatus,scope.row.type)" placeholder="是否立即付款">
                    <el-option label="是" value="立即付款"></el-option>
                    <el-option label="否" value="延时付款"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="付款人" width="120">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][auditName]'">
                  <el-select size="small" v-model="scope.row.auditName" clearable :disabled="statusDisable(scope.row.payStatus)" placeholder="付款人" @change="getAuditId(scope.row, scope.row.auditName)">
                    <el-option
                      v-for="(item,index) in auditNames"
                      :key="index"
                      :label="item.nickname"
                      :value="item.nickname"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="220">
              <template slot-scope="scope">
                <el-form-item :prop="'costs['+scope.$index+'][comment]'">
                  <el-input v-model="scope.row.comment" :disabled="statusDisable(scope.row.payStatus)" clearable type="textarea" :rows="1" placeholder="备注"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="二维码" width="100">
              <template slot-scope="scope">
                <el-button type="primary" @click="submitUpload1(scope.$index)" :disabled="statusDisable(scope.row.payStatus)" size="small">二维码</el-button>
                <el-dialog title="二维码" :visible.sync="uploadShow1" width="35%" append-to-body>
                  <el-upload
                    :limit="5"
                    action="/api/upload/accessory"
                    drag
                    multiple
                    :file-list="fileList1"
                    style="margin-top: -20px"
                    :before-upload="beforeUpload"
                    :on-success="uploadSuccess1"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :on-remove="uploadOnRemove1"
                    :on-exceed="handleExceed">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </el-dialog>
              </template>
            </el-table-column>
            <el-table-column label="凭证" width="100">
              <template slot-scope="scope">
                <el-button type="primary" @click="submitUpload2(scope.$index, scope.row)" :disabled="!statusDisable(scope.row.payStatus)" size="small">凭证</el-button>
                <el-dialog title="凭证" :visible.sync="uploadShow2" width="35%" append-to-body>
                  <el-upload
                    :limit="5"
                    action="/api/upload/accessory"
                    drag
                    multiple
                    :file-list="fileList2"
                    style="margin-top: -20px"
                    :on-success="uploadSuccess2"
                    :on-preview="handlePreview"
                    :on-remove="uploadOnRemove2"
                    :on-exceed="handleExceed">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                  <div slot="footer">
                    <el-button type="primary" @click="savePaper">保存凭证</el-button>
                  </div>
                </el-dialog>
              </template>
            </el-table-column>
            <el-table-column type="expand" width="60" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="2"><span class="orderTitle">退款详情</span></el-col>
                </el-row>
                <el-form :rules="rules" :model="scope.row" ref="formRefund">
                  <el-table
                    :data="scope.row.orderRefunds"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    ref="refundsTable"
                    :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
                    @selection-change="selectRowRefund">
                    <el-table-column type="selection" :selectable="getDisabeldRefund" width="40"></el-table-column>
                    <el-table-column label="类型" width="140">
                      <template slot-scope="scope">
                        <el-form-item :prop="'orderRefunds['+scope.$index+'][type]'" :rules="rules.typeRefund">
                          <el-select size="small" clearable :disabled="statusDisable(scope.row.status)" v-model="scope.row.type" placeholder="类型">
                            <el-option label="供应商退款" value="供应商退款"></el-option>
                            <el-option label="供应商赔款" value="供应商赔款"></el-option>
                            <el-option label="客户退款" value="客户退款"></el-option>
                          </el-select>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="退款金额" width="140">
                      <template slot-scope="scope">
                        <el-form-item :prop="'orderRefunds['+scope.$index+'][cost]'" :rules="rules.costRefund">
                          <el-input size="small" v-model.number="scope.row.cost" clearable :disabled="statusDisable(scope.row.status)" placeholder="退款金额"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="退款状态" width="140">
                      <template slot-scope="scope">
                        <el-form-item :prop="'orderRefunds['+scope.$index+'][status]'">
                          <el-input size="small" v-model="scope.row.status" clearable disabled></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="退款信息" width="220">
                      <template slot-scope="scope">
                        <el-form-item :prop="'orderRefunds['+scope.$index+'][refundInfo]'">
                          <el-input size="small" v-model="scope.row.refundInfo" clearable :disabled="statusDisable(scope.row.status)"  type="textarea" :rows="1" placeholder="退款信息"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column width="60">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteRefound(scope.row,scope.$index)"  v-if="!statusDisable(scope.row.status)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form>
                <el-row style="margin-top: 20px;">
                  <el-col :offset="10" :span="1">
                    <el-button class="el-icon-plus" type="primary" :disabled="!statusDisable(scope.row.payStatus)" size="small" @click="addRefound(scope.row)"></el-button>
                  </el-col>
                  <el-col :span="1">
                    <el-button type="warning" size="small" @click="addSubmit">提交退款申请</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column width="40" fixed="right">
              <template slot-scope="scope">
                <i @click="deleteNewMoney(scope.$index)" class="el-icon-delete" v-if="!statusDisable(scope.row.payStatus)"></i>
              </template>
            </el-table-column>
            <el-table-column width="30" fixed="right">
              <template slot-scope="scope">
                <img src="../../common/img/tui.png" style="width: 20px;" v-show="scope.row.orderRefunds.length">
              </template>
            </el-table-column>
          </el-table>
          </el-form>
          <el-row style="margin: 20px 0 10px 0">
            <el-col :span="2" :push="18">
              <el-button type="primary" icon="el-icon-circle-plus" @click="addNewMoney" size="small">添加</el-button>
            </el-col>
            <el-col :span="2" :push="18">
              <el-button type="primary" size="small" @click="saveChangeCost">保存</el-button>
            </el-col>
            <el-col :span="2" :push="18">
              <el-button type="danger" @click="applySubmit" :disabled="!applyData.costs.length" size="small" >提交审核</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="收入" name="second">
          <el-table
            :data="data.incomeVos"
            tooltip-effect="dark"
            style="width:100%;"
            row-key="type"
            :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
            :expand-row-keys="expands"
            @expand-change="expandIncomes"
            @row-click="rowClick">
            <el-table-column
              label="项目"
              width="200"
              prop="type">
            </el-table-column>
            <el-table-column
              label="总金额"
              width="700"
              prop="subTotal">
            </el-table-column>
            <el-table-column type="expand" width="40">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="3"><span class="orderTitle">收入明细</span></el-col>
                </el-row>
                <el-form :rules="rules" :model="scope.row" ref="formIncome">
                  <el-table
                  :data="scope.row.orderIncomes"
                  tooltip-effect="dark"
                  :header-cell-style="{background:'#ddd',color:'#000',fontWeight:'bolder'}"
                  style="width: 100%;">
                  <el-table-column label="金额" width="150">
                    <template slot-scope="scope">
                      <el-form-item :prop="'orderIncomes['+scope.$index+'][cost]'" :rules="rules.costIncome">
                        <el-input size="small" clearable v-model.number="scope.row.cost" placeholder="金额"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="类型" width="150" v-if="isShow">
                    <template slot-scope="scope">
                      <el-form-item :prop="'orderIncomes['+scope.$index+'][platForm]'" :rules="rules.platForm">
                        <el-select size="small" clearable v-model="scope.row.platForm" @change="getIncomePlat(scope.row,scope.$index,scope.row.platForm)" placeholder="类型">
                          <el-option
                            v-for="(item,index) in platForms"
                            :key="index"
                            :value="item.id"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="来源" width="150">
                    <template slot-scope="scope">
                      <el-form-item :prop="'orderIncomes['+scope.$index+'][source]'" :rules="rules.source">
                        <el-select size="small" clearable v-model="scope.row.source" placeholder="来源" @focus="getsourceData(scope.$index)">
                        <el-option
                          v-for="(item,index) in allCategory"
                          :key="index"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="日期" prop="balanceDate" width="150">
                    <template slot-scope="scope">
                      <el-form-item :prop="'orderIncomes['+scope.$index+'][costTime]'" :rules="rules.costTime">
                        <el-date-picker clearable size="small" v-model="scope.row.costTime" type="date" style="width: 100%;" placeholder="结算日期" value-format="timestamp"></el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" width="180" v-if="isShow">
                    <template slot-scope="scope">
                      <el-form-item :prop="'orderIncomes['+scope.$index+'][note]'">
                        <el-input size="small" clearable placeholder="备注" type="textarea" :rows="1" v-model="scope.row.note"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column width="60">
                    <template slot-scope="scope">
                      <i class="el-icon-delete" @click="deleteIncomes(scope.row,scope.$index)"></i>
                    </template>
                  </el-table-column>
                </el-table>
                </el-form>
                <el-row style="margin-top: 20px;">
                  <el-col :span="1" :offset="22">
                    <el-button class="el-icon-plus" type="primary" size="small" @click="addIncomes(scope.row)"></el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin: 10px 0 10px 0">
            <el-col :span="2" :push="16">
              <el-button size="small" type="primary" @click="saveChangeIncome">保存</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        number: 'first',
        /* 头信息 */
        nickname: '', // 定制师
        itemNumber: '', // 订单号
        allIncome: 0, // 订单总收入
        allCost: 0, // 订单总成本
        allRevenue: 0, // 订单利润
        /* 附件 */
        uploadShow1: false,
        uploadShow2: false,
        pinzhengRow: [], // 凭证一行的信息
        index: 0,
        fileList1: [], // 二维码
        fileList2: [], // 凭证
        /* 数据 */
        data: {
          orderId: this.$route.params.id,
          /* 预定款项 */
          costs: [
            // {
            //   id: 0,
            //   orderId: 0,
            //   type: '', // 成本支出项目
            //   category: '', // 名称
            //   providerId: 0, // 预定平台ID
            //   providerName: '', // 预定平台
            //   useTime: '', // 使用日期
            //   orderNum: 0, // 预定平台订单号
            //   cost: 0, // 金额
            //   payStatus: '', // 付款状态
            //   sosStatus: '延时付款', // 付款紧急状态
            //   auditId: 0, // 付款人Id
            //   auditName: '',
            //   comment: '', // 备注
            //   applyFiles: [], // 二维码
            //   payFiles: [], // 凭证
            //   orderRefunds: [
            //     {
            //       orderCostId: 0, // 成本id
            //       id: 0, // 退款id
            //       type: '', // 类型
            //       cost: 0, // 退款金额
            //       status: '', // 退款状态
            //       refundInfo: '' // 退款备注
            //     }
            //   ]
            // }
          ],
          /* 收入 */
          incomeVos: [
          //   {
          //     type: '订单收入', // 项目
          //     subTotal: 0, // 总金额
          //     orderIncomes: [
          //       {
          //         id: 0,
          //         orderId: 0,
          //         cost: 0, // 金额
          //         platForm: '', // 类型
          //         source: '', // 来源
          //         costTime: '', // 日期
          //         note: '' // 备注
          //       }
          //     ]
          //   },
          //   {
          //     type: '平台收入',
          //     subTotal: '',
          //     orderIncomes: [
          //       {
          //         id: 0,
          //         orderId: 0,
          //         cost: 0, // 金额
          //         source: '', // 来源
          //         costTime: '' // 日期
          //       }
          //     ]
          //   },
          //   {
          //     type: '实际收入',
          //     subTotal: '',
          //     orderIncomes: [
          //       {
          //         id: 0,
          //         orderId: 0,
          //         cost: '', // 金额
          //         source: '', // 来源
          //         costTime: '' // 日期
          //       }
          //     ]
          //   }
          ]
        },
        /* 检验 */
        rules: {
          // 预订款项校验
          type: { required: true, message: '成本支出项必填', trigger: 'change' },
          category: { required: true, message: '用途必填', trigger: 'change' },
          providerName: { required: true, message: '预定平台字段', trigger: 'change' },
          cost: [
            { required: true, message: '金额不能为空', trigger: 'change' },
            { type: 'number', message: '金额必须为数字值', trigger: 'change' }
          ],
          // 退款校验
          typeRefund: { required: true, message: '退款项必填', trigger: 'change' },
          costRefund: [
            { required: true, message: '金额不能为空', trigger: 'change' },
            { type: 'number', message: '金额必须为数字值', trigger: 'change' }
          ],
          // 收入校验
          costIncome: [
            { required: true, message: '金额不能为空', trigger: 'change' },
            { type: 'number', message: '金额必须为数字值', trigger: 'change' }
          ],
          platForm: { required: true, message: '类型必填', trigger: 'change' },
          source: { required: true, message: '来源必填', trigger: 'change' },
          costTime: { required: true, message: '日期必填', trigger: 'change' }
        },
        /* 提交 付款审核 */
        applyData: {
          orderId: this.$route.params.id,
          type: '',
          costs: []
        },
        /* 提交退款审核 */
        applyRefunds: [],

        types: [], // 成本支出项
        providerArr: [], // 预定平台总
        providers: [],

        auditNames: [], // 付款人

        /* 订单收入 类型 */
        platForms: [],
        /* 订单收入 */
        categorys1Arr: [],
        categorys1: [],
        /* 平台收入 */
        categorys2: [
          {name: '去哪儿'},
          {name: '马蜂窝'},
          {name: '携程'},
          {name: '途牛'}
        ],
        /* 实际收入 */
        categorys3: [
          {name: '远方美域'}
        ],
        /* 收入行数据 */
        incomeRow: [],
        /* 点击行展开 */
        expands: [],
        emptyCon: '正在加载，请稍等...'
      }
    },
    computed: {
      /* 收入（类型 备注）  */
      isShow: function() {
        if (this.incomeRow.type === '订单收入') {
          return true
        } else {
          return false
        }
      },
      /* 收入（来源） */
      allCategory: function() {
        if (this.incomeRow.type === '平台收入') {
          return this.categorys2
        } else if (this.incomeRow.type === '实际收入') {
          return this.categorys3
        } else if (this.incomeRow.type === '订单收入') {
          return this.categorys1
        }
      }
    },
    created() {
      this.openJiesuan()
    },
    beforeMount() {
      this.getSelectData() // 获取成本支出项
      this.getPayData() // 获取付款人
    },
    methods: {
      /* 选项卡 */
      handleClick (tab) {
        let index = tab._data.index
        if (index === '1') {
          this.getIncomeSelectData(195) // 收入 类型 一级
        }
      },
      /* 根据状态判断是否修改 */
      statusDisable(status) {
        if (status === '待提交' || status === '已拒绝') {
          return false
        } else {
          return true
        }
      },
      /* 是否立即付款判断 */
      sosStatusDisable(status, type) {
        if (type === '库存') {
          return true
        } else {
          if (status === '待提交' || status === '已拒绝') {
            return false
          } else {
            return true
          }
        }
      },
      /* 收入 行展开 */
      rowClick(row) {
        /* eslint-disable */
        Array.prototype.remove = function(val) {
          let index = this.indexOf(val)
          if (index > -1) {
            this.splice(index, 1)
          }
        }
        if (this.expands.indexOf(row.type) < 0) {
          this.expands = []
          this.expands.push(row.type)
        } else {
          this.expands.remove(row.type)
        }
        this.incomeRow = row
      },
      /* 点击 收入展开图标 */
      expandIncomes(row) {
        this.incomeRow = row
      },
      /* 预定款项 */
      /* 二级联动 一级 */
      getType(row, index) {
        this.getSelectData2(index, row.type)
      },
      /* 二级 获取焦点 */
      getProviderData(index) {
        let provideLen = this.providerArr.length
        let costsLen = this.data.costs.length
        if (provideLen > costsLen) {
          this.providerArr.splice(provideLen - 1, 1)
        }
        for (let i in this.providerArr) {
          if (this.providerArr[i]['index'] === index) {
            this.providers = this.providerArr[i]['data']
            break
          } else {
            this.providers = []
          }
        }
      },
      /* 预订平台 二级 */
      getprovideId(row) {
        for (let attr in this.providers) {
           if (row.providerName === this.providers[attr]['name']) {
             row.providerId = this.providers[attr]['id']
           }
        }
      },
      /* 获取下拉选项一级 */
      getSelectData() {
        let data = {
          filedName: 'type',
          tableName: 'provider_t'
        }
        this.$http.post('/api/provider/input', data).then((res) => {
          this.types = res.data.data
          this.types.unshift('库存')
        })
      },
      getSelectData2(index, val) {
        this.$http.get(`/api/provider/inputProvider?type=${val}`).then((res) => {
          this.providerArr.push({
            index: index,
            data: res.data.data
          })
          for (let i in this.providerArr){
            if (this.providerArr[i]['index'] === index) {
              this.providerArr[i]['data'] = res.data.data
              break
            }
          }
        })
      },
      /* 收入 */
      /* 类型 一级 */
      getIncomePlat(row, index, id) {
        this.getIncomeSelectData2(index, id)
        for (let attr in this.platForms) {
          if (id === this.platForms[attr]['id']) {
            row.platForm = this.platForms[attr]['name']
          }
        }
      },
      /* 来源 二级 */
      getsourceData(index) {
        let categorys1Len = this.categorys1Arr.length
        let incomesLen = this.data.incomeVos[0]['orderIncomes'].length
        if (categorys1Len > incomesLen) {
          this.categorys1Arr.splice(categorys1Len - 1, 1)
        }
        for (let i in this.categorys1Arr) {
          if (index === this.categorys1Arr[i]['index']) {
            this.categorys1 = this.categorys1Arr[i]['data']
            break
          } else {
            this.categorys1 = []
          }
        }
      },
      /* 获取下拉选项一级 */
      getIncomeSelectData(id) {
        this.$http.get(`/api/dic?id=${id}`).then((res) => {
          this.platForms = res.data.data
        })
      },
      /* 获取下拉选项二级 */
      getIncomeSelectData2(index, id) {
        this.$http.get(`/api/dic?id=${id}`).then((res) => {
          this.categorys1Arr.push({
            index: index,
            data: res.data.data
          })
          for (let i in this.categorys1Arr){
            if (this.categorys1Arr[i]['index'] === index) {
              this.categorys1Arr[i]['data'] = res.data.data
              break
            }
          }
        })
      },
      /* 获取付款人 */
      getPayData() {
        this.$http.get('/api/user/pay/user').then((res) => {
          if (res.data.code === 200) {
            this.auditNames = res.data.data
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 获取付款人Id */
      getAuditId(row, name) {
        if (name) {
          for (let i in this.auditNames) {
            if (this.auditNames[i]['nickname'] === name) {
              row.auditId = this.auditNames[i]['id']
            }
          }
        } else {
          row.auditId = ''
        }
      },
      /* 上传组价 */
      /* 二维码打开弹出框 */
      submitUpload1(index) {
        this.uploadShow1 = true
        this.index = index
        this.fileList1 = this.data.costs[index].applyFiles
      },
      /* 凭证打开弹出框 */
      submitUpload2(index, row) {
        this.uploadShow2 = true
         this.index = index
        this.pinzhengRow= row
        this.fileList2 = this.data.costs[index].payFiles
      },
      /* 上传文件之前触发 */
      beforeUpload(file) {
        // let formData = new FormData()
        // formData.append('file', file)
        // let files = formData
        // this.$http.post('/upload/accessory', files).then((res) => {
        //   this.fileList.push({
        //     name: res.data.data.name,
        //     url: res.data.data.url
        //   })
        // })
      },
      /* 二维码上传成功 */
      uploadSuccess1(file) {
        this.fileList1.push({
          name: file.data.name,
          url: file.data.url
        })
        this.data.costs[this.index].applyFiles = this.fileList1
      },
      /* 凭证上传成功 */
      uploadSuccess2(file) {
        this.fileList2.push({
          name: file.data.name,
          url: file.data.url
        })
        this.data.costs[this.index].payFiles = this.fileList2
      },
      /* 点击文件列表中已上传的文件时的钩子 */
      handlePreview (file) {
        let a = document.createElement('a')
        a.download = name || `${file.name}`
        a.href = `${file.url}`
        a.target = '_blank'
        a.click()
       // window.open(file.url)
      },
      /* 删除文件之前的钩子 */
      beforeRemove (file) {
        return this.$confirm(`确定移除${file.name}?`)
      },
      /* 删除二维码 */
      uploadOnRemove1(file, fileList) {
        this.fileList1 = fileList
        this.data.costs[this.index].applyFiles = this.fileList1
      },
      /* 删除凭证 */
      uploadOnRemove2(file, fileList) {
        this.fileList2 = fileList
        this.data.costs[this.index].payFiles = this.fileList2
      },
      /* 保存凭证 */
      savePaper() {
        let row = this.pinzhengRow
        if (!row.useTime) {
          this.$message('请填写使用时间')
          return false
        }
        let data = {
          id: row.id,
          useTime: row.useTime,
          payFiles: row.payFiles
        }
        this.$http.post('/api/finance/updateOrderCost', data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.uploadShow2 = false
            this.openJiesuan()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 限制上传附件数量 */
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择5个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}`)
      },
      /* 保存修改 预订款项 */
      saveChangeCost() {
        if (!!this.$refs['formRefund']) {
          this.$refs['formRefund'].validate((valid, model)=>{
            if (valid) {
              this.providerArr = []
              this.changeJiesuan()
            } else {
              this.$message.error('退款填写不完整')
              return false
            }
          })
        } else {
          this.$refs['form'].validate((valid, model)=>{
            if (valid) {
              this.providerArr = []
              this.changeJiesuan()
            } else {
              return false
            }
          })
        }
      },
      /* 保存修改 收入 */
      saveChangeIncome() {
        this.$refs['formIncome'].validate((valid, model)=>{
          if (valid) {
            this.changeJiesuan()
            this.categorys1Arr = []
            this.expands = []
          } else {
            return false
          }
        })
      },
      /* 勾选 预定款项 */
      selectRowCost(select) {
        if (!select.length) {
          this.applyData.type = ''
        } else {
          this.applyData.type = 'pc'
        }
        this.applyData.costs = select
        console.log(this.applyData.costs)
      },
      // 禁止预选中
      getDisabeld(row, index) {
        if (row.payStatus ==='待提交' || row.payStatus === '已拒绝') {
          return 1
        } else {
          return 0
        }
      },
      getDisabeldRefund(row, index) {
        if (row.status ==='待提交' || row.status === '已拒绝') {
          return 1
        } else {
          return 0
        }
      },
      /* 提交预定款项审核 */
      applySubmit() {
        let select = this.applyData.costs
        for (let attr = 0; attr < select.length; attr++) {
          if (!select[attr]['auditName']) {
            this.$message({message: '请选择付款人', type: 'warning'})
            return false
          }
        }
        this.applySubmitData()
      },
      /* 打开结算单弹出框-获取结算单数据 */
      openJiesuan() {
        this.$http.get(`/api/order/item?id=${this.data.orderId}`).then((res) => {
          if (res.data.code === 200 && res.data.msg === 'success') {
            this.data = res.data.data
            this.nickname = this.data.order.nickname
            this.itemNumber = this.data.order.itemNumber
            this.allIncome = this.data.order.income
            this.allCost = this.data.order.cost
            this.allRevenue = this.data.order.revenue
            for (let i in this.data.costs) {
              this.getSelectData2(Number(i), this.data.costs[i].type)
            }
            if (!this.data.costs.length) {
              this.emptyCon = '暂无数据'
            }
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 修改结算单 */
      changeJiesuan() {
        let data = {...this.data}
        this.$http.post('/api/order/item', data).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(`${res.data.msg}`)
              this.openJiesuan()
            } else if (res.data.code !== 200) {
              this.$message.error(`${res.data.msg}`)
            }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 提交审核接口 */
      applySubmitData() {
        this.$http.post('/api/orderApply', this.applyData).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.openJiesuan()
          } else if (res.data.code !== 200) {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 勾选 退款 */
      selectRowRefund(row) {
        this.applyRefunds = row
      },
      /* 提交退款审核 */
      addSubmit() {
        let applys = this.applyRefunds
        if (applys.length === 0) {
          this.$message.error('请勾选退款项')
          return false
        } else {
          this.submitRefund(applys)
        }
      },
      /* 退款审核接口 */
      submitRefund(data) {
        this.$http.post('/api/orderApply/refunds', data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.openJiesuan()
          } else {
            this.$message.error(`${res.data.msg}`)
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 删除预定款项 */
      deleteNewMoney(index) {
        for (let i in this.providerArr) {
          if (index === this.providerArr[i]['index']) {
            this.providerArr.splice(i, 1)
          }
        }
        this.data.costs.splice(index, 1)
        let j = Number(index) + 1
        for (j; j <= this.providerArr.length; j++){
          this.providerArr[index]['index'] = this.providerArr[index]['index'] - 1
          index++
        }
        if (!this.data.costs.length) {
          this.emptyCon = '暂无数据'
        }
      },
      /* 添加预定款项 */
      addNewMoney() {
        this.data.costs.push({
          id: 0,
          orderId: this.$route.params.id,
          type: '', // 成本支出项目
          category: '', // 类目
          providerId: 0, // 预定平台ID
          providerName: '', // 预定平台
          useTime: '', // 使用日期
          orderNum: '', // 预定平台订单号
          cost: '', // 金额
          payStatus: '待提交', // 付款状态
          sosStatus: '延时付款', // 付款紧急状态
          auditName: '', // 付款人
          auditId: 0, // 付款人Id
          comment: '', // 备注
          applyFiles: [], // 二维码
          payFiles: [], // 凭证
          orderRefunds: []
        })
      },
      /* 删除退款 */
      deleteRefound(row, index) {
        for (let i in this.data.costs) {
          if (this.data.costs[i]['id'] === row['orderCostId']) {
            this.data.costs[i].orderRefunds.splice(index, 1)
          }
        }
      },
      /* 添加退款 */
      addRefound(row) {
        row.orderRefunds.push({
          orderCostId: row.id, // 成本id
          id: 0, //退款id
          type: '', // 类型
          cost: '', // 退款金额
          status: '待提交', // 退款状态
          refundInfo: '' // 退款备注
        })
      },
      /* 添加收入明细 */
      addIncomes(row) {
        row.orderIncomes.push({
          id: 0,
          orderId: this.$route.params.id,
          cost: '', // 金额
          platForm: '', // 类型
          category: '', // 来源
          costTime: '', // 日期
          note: '' // 备注
        })
      },
      /* 删除收入明细 */
      deleteIncomes(row,index) {
        for (let i in this.categorys1Arr) {
          if (index === this.categorys1Arr[i]['index']) {
            this.categorys1Arr.splice(i, 1)
          }
        }
        this.incomeRow.orderIncomes.splice(index, 1)
        let j = Number(index) + 1
        for (j; j <= this.categorys1Arr.length; j++){
          this.categorys1Arr[index]['index'] = this.categorys1Arr[index]['index'] - 1
          index++
        }
      }
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
  .marginTop{
    margin-top: -5px;
  }
  .rowSty div{
    width: 250px;
    line-height: 35px;
    float: left;
    margin-left: 15px;
  }
  .rowSty div strong, .rowSty div span{
    float: left;
    font-size: 14px;
  }
  .rowSty div strong{
    font-weight: bolder;
  }
  .orderTitle{
    display: block;
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size:16px;
    line-height: 35px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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

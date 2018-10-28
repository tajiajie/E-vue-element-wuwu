<!--订单详情-->
<template>
  <div>
    <el-form :rules="rules" :model="data" ref="formDetail1">
      <el-row class="rowChange top">
        <el-col :span="4">
          <el-form-item label="订单号">
            <el-input
            size="small"
            placeholder="订单号"
            prefix-icon="el-icon-search"
            clearable
            v-model="data.itemNumber">
          </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="平台">
            <el-input
              size="small"
              clearable
              v-model="data.manFlat"
              disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单类型">
            <el-select v-model="data.orderType" :disabled="userDisable" placeholder="订单类型" clearable size="small">
              <el-option
                v-for="(item,index) in option"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态">
            <el-select v-model="data.status" placeholder="订单状态" clearable size="small" @change="getStatus">
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rowChange">
        <el-col :span="4">
          <el-form-item :prop="'outDate'" label="成团时间" :rules="rules.outDate">
            <el-date-picker
              style="width: 100%;"
              v-model="data.outDate"
              type="date"
              size="small"
              unlink-panels
              value-format="timestamp"
              :picker-options="pickerOptions"
              placeholder="成团时间"
              :disabled="disableOut">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="定制师">
            <el-select v-model="data.uId" placeholder="定制师" :disabled="userData.roleName!=='管理员'" filterable clearable size="small">
              <el-option
                v-for="(item,index) in nicknames"
                :key="index"
                :label="item.nickname"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :prop="'actualQuotation'" label="实际报价" :rules="rules.actualQuotation">
            <el-input
              size="small"
              placeholder="实际报价"
              clearable
              v-model.number="data.actualQuotation">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rowChange">
        <el-col :span="17">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="订单备注"
              v-model="data.comment">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="rowChange top">
        <el-col :span="6">
          <el-form-item label="母账户">
            <el-input
              style="width: 70%;"
              size="small"
              placeholder="母账户"
              prefix-icon="el-icon-edit"
              clearable
              v-model="data.manAccount">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="子账号">
            <el-input
              style="width: 75%;"
              size="small"
              placeholder="子账号"
              prefix-icon="el-icon-edit"
              clearable
              v-model="data.manSonaccount">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号等级">
            <el-input
              style="width: 70%;"
              size="small"
              placeholder="账号等级"
              prefix-icon="el-icon-edit"
              clearable
              v-model="data.accountLevel">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rowSty">
        <div><strong>用户下单时间：</strong><span>{{data.xiadanTime}}</span></div>
        <div><strong>首呼状态：</strong><span></span>{{data.callStatus}}</div>
        <div><strong>首呼时间：</strong><span></span>{{data.callTime | dateFormat}}</div>
        <div><strong>首呼时长：</strong><span>{{data.callLong}}</span></div>
      </el-row>
    </el-form>
    <el-form :rules="rules" :model="data" :inline="true"  ref="formDetail2">
      <el-row class="rowChange top">
       <el-col :span="4">
         <el-form-item :prop="'customerName'" label="顾客姓名" :rules="rules.customerName">
           <el-input
             size="small"
             placeholder="姓名"
             clearable
             v-model="data.customerName">
           </el-input>
         </el-form-item>
       </el-col>
       <el-col :span="4">
         <el-form-item :prop="'customerWechat'" label="顾客微信" :rules="rules.customerWechat">
           <el-input
             size="small"
             placeholder="微信"
             clearable
             v-model="data.customerWechat">
           </el-input>
         </el-form-item>
       </el-col>
       <el-col :span="4">
         <el-form-item label="预算">
           <el-input
             size="small"
             placeholder="金额"
             clearable
             v-model="data.budget">
           </el-input>
         </el-form-item>
       </el-col>
        <el-col :span="4">
          <el-form-item label="区域">
            <el-input
              size="small"
              disabled
              placeholder="区域"
              clearable
              v-model="data.manArea">
            </el-input>
          </el-form-item>
        </el-col>
     </el-row>
      <el-row class="rowChange">
        <el-col :span="4">
          <el-form-item :prop="'departure'" label="出发地" :rules="rules.departure">
            <el-input
              size="small"
              clearable
              placeholder="出发地"
              v-model="data.departure">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :prop="'destination'" label="目的地" :rules="rules.destination">
            <el-input
              size="small"
              placeholder="目的地"
              clearable
              v-model="data.destination">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出行人关系">
            <el-select v-model="data.playRelation" placeholder="出行人关系" clearable size="small">
              <el-option
                v-for="(item,index) in relations"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="出行人数">
            <el-select v-model="people" placeholder="0" clearable size="mini" style="width: 30%">
              <el-option
                v-for="(item,index) in 100"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>成人
            <el-select v-model="child" placeholder="0" clearable size="mini" style="width: 30%">
              <el-option
                v-for="(item,index) in 100"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>儿童
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rowChange">
        <el-col :span="4">
          <el-form-item :prop="'startDate'" label="出行日期" :rules="rules.startDate">
            <el-date-picker
              v-model="data.startDate"
              style="width: 100%"
              type="date"
              size="small"
              unlink-panels
              placeholder="出行日期"
              value-format="timestamp"
              @change="getPlayDays">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :prop="'backDate'" label="归团日期" :rules="rules.backDate">
            <el-date-picker
              v-model="data.backDate"
              type="date"
              size="small"
              style="width: 100%"
              unlink-panels
              value-format="timestamp"
              placeholder="归团日期"
              @change="getPlayDays">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出行天数" :prop="'playDays'" :rules="rules.playDays">
            <el-input
              size="small"
              placeholder="出行天数"
              disabled
              v-model="data.playDays">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rowChange">
        <el-col :span="18">
          具体需求：
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="具体需求"
            v-model="data.need">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="save">
      <el-col :span="2" :push="19">
        <el-form-item>
          <el-button @click="save" type="primary" size="medium">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        // orderNum: this.$route.params.id,
        data: {
          id: this.$route.params.id,
          itemNumber: '',
          manFlat: '', /* 平台 */
          orderType: '', /* 类型 */
          status: '', /* 状态 */
          outDate: '', /* 成团时间 */
          uId: '', /* 定制师 */
          actualQuotation: '', /* 实际报价 */
          comment: '', /* 备注 */
          /* 刷单 */
          manAccount: '', /* 母账户 */
          manSonaccount: '', /* 子账号 */
          accountLevel: '', /* 账号等级 */
          xiadanTime: '', /* 下单时间 */
          callStatus: '', /* 首呼状态 */
          callTime: '', /* 首呼时间 */
          callLong: '', /* 时长 */
          /* 顾客信息 */
          customerName: '', /* 姓名 */
          customerWechat: '', /* 顾客微信 */
          budget: '', /* 预算 */
          manArea: '', /* 区域 */
          departure: '', /* 出发地 */
          destination: '', /* 目的地 */
          userNum: '', /* 人数 */
          playRelation: '', /* 关系 */
          startDate: '', /* 出行日期 */
          backDate: '', /* 归团日期 */
          playDays: '', /* 出行天数 */
          need: '' /* 需求 */
        },
        rules: {
          outDate: { required: true, message: '成团日期必填', trigger: 'change' },
          actualQuotation: [
            { required: true, message: '报价不能为空', trigger: 'change' },
            { type: 'number', message: '报价必须为数字值', trigger: 'change' }
          ],
          customerName: { required: true, message: '顾客姓名必填', trigger: 'change' },
          customerWechat: { required: true, message: '微信必填', trigger: 'change' },
          departure: { required: true, message: '出发地必填', trigger: 'change' },
          destination: { required: true, message: '目的地必填', trigger: 'change' },
          startDate: { required: true, message: '出行日期必填', trigger: 'change' },
          backDate: { required: true, message: '归团日期必填', trigger: 'change' },
          playDays: { required: true, message: '天数必填', trigger: 'change' }
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        people: 0,
        child: 0,
        nicknames: [], // 定制师
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
        relations: [ /* 出行人关系 */
          {
            value: '家庭',
            label: '家庭'
          }, {
            value: '朋友',
            label: '朋友'
          }
        ], // 出行人关系
        userData: [] // 获取用户信息
      }
    },
    created() {
      this.getUser()
      this.getDetailData()
      this.getData()
    },
    computed: {
      disableOut() {
        if (this.data.status === '未成团') {
          return true
        } else {
          return false
        }
      },
      option: function() {
        if (this.data.manFlat === '自营') {
          return this.options21
        } else {
          return this.options2
        }
      },
      userDisable() {
        if (this.userData.roleName === '管理员' || this.userData.roleName === '运营') {
          return false
        } else {
          return true
        }
      }
    },
    filters: {
      /* 时间戳->年月日 时分秒 */
      dateFormat: function(time) {
        if (time) {
          return moment(time).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return ''
        }
      }
    },
    methods: {
      getUser() {
        this.$http.get('/api/user/current').then((res) => {
          if (res.data.code === 200) {
            this.userData = res.data.data
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 获取天数 时间戳->天数 */
      getPlayDays() {
        if (this.data.startDate && this.data.backDate) {
          let days = (this.data.backDate - this.data.startDate) / 86400000
          if (days < 0) {
            this.$message.error('天数不能为负值')
            this.data.startDate = ''
            this.data.backDate = ''
            this.data.playDays = ''
            return false
          } else {
            this.data.playDays = `${days}天` // 1000*60*60*24
          }
        }
      },
      getStatus(val) {
        if (val === '已成团') {
          this.data.startDate = ''
          this.data.backDate = ''
        }
      },
      goBack() {
        this.$emit('closeDetail', false)
      },
      /* 获取定制师接口 */
      getData() {
        this.$http.get('/api/user').then((res) => {
          if (res.data.code === 200 && res.data.msg === 'success') {
            this.nicknames = res.data.data
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 获取数据 */
      getDetailData() {
        this.$http.get(`/api/order?id=${this.data.id}`).then((res) => {
           if (res.data.code === 200 && res.data.msg === 'success') {
             this.data = res.data.data
             if (res.data.data.actualQuotation === 0) {
               this.data.actualQuotation = ''
             }
             let num = this.data.userNum.match(/\d+/g)
             // eslint-disable-next-line
             if (!!num) {
               this.people = num[0]
               this.child = num[1]
             }
          }
        }, (err) => {
          console.log(err.status)
        })
      },
      /* 修改订单详情-接口 */
      changeDetailData() {
        this.data.userNum = `${this.people}成人${this.child}儿童`
        this.$http.post('/api/order/modify', this.data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
          }
        }).catch((err) => {
          console.log(err.status)
        })
      },
      save() {
        if (this.data.status === '已成团') {
          this.$refs['formDetail1'].validate((valid1, model) => {
            if (valid1) {
              this.$refs['formDetail2'].validate((valid2, model) => {
                if (valid2) {
                  this.changeDetailData()
                  this.goBack()
                } else {
                  return false
                }
              })
            } else {
              return false
            }
          })
        } else {
          this.changeDetailData()
          this.goBack()
        }
      }
    }
  }
</script>

<style scoped>
  .el-row{
    background-color: #fff;
  }
  .el-col{
   line-height: 30px;
 }
  .top{
    margin-top: 20px;
  }
  .rowChange .el-col{
    margin-left: 10px;
  }
  .orderTitle{
    display: block;
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size:18px;
    line-height: 35px;
  }
  .save{
    margin-: 15px;
  }
  .rowSty{
  }
  .rowSty div{
    width: 250px;
    line-height: 35px;
    float: left;
    margin-left: 20px;
  }
  .rowSty div strong, .rowSty div span{
    float: left;
    font-size: 14px;
  }
  .rowSty div strong{
    font-weight: bolder;
  }
</style>

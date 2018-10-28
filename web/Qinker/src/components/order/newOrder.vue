<template>
  <div>
    <el-row class="rowChange">
      <el-col :span="5">
        <span>订单号</span>
        <el-input
          size="small"
          placeholder="订单号"
          prefix-icon="el-icon-search"
          clearable
          v-model="orderNum">
        </el-input>
      </el-col>
      <dingzhi :span="5" :show="true" @dingzhi="dingzhi"></dingzhi>
      <plat-state :span="5" :show="true" @platState="platState"></plat-state>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="20">
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import dingzhi from '../base/dingzhi'
  import platState from '../base/platState'
  export default {
    data() {
      return {
        orderNum: '',
        nicknameId: '',
        platform: '',
        types: ''
      }
    },
    components: {
      dingzhi,
      platState
    },
    methods: {
      dingzhi(nick) {
        this.nicknameId = nick
      },
      platState(plat, type) {
        this.platform = plat
        this.types = type
      },
      /* 添加数据 */
      save() {
        if (!this.orderNum) {
          this.$message.error('请输入订单号')
          return false
        } else if (!this.nicknameId) {
          this.$message.error('请选择定制师')
          return false
        } else if (!this.platform) {
          this.$message.error('请选择平台')
          return false
        } else if (!this.types) {
          this.$message.error('请选择订单类型')
          return false
        } else {
          this.saveData()
        }
      },
      // 接口
      saveData() {
        this.$http.post(`/api/order`, {
          // 'accountLevel': '',
          'actualQuotation': 0, // 实际报价
          'backDate': '', // 归团时间
          'budget': '', // 客人预算
          'callLong': '', // 首呼时长
          'callStatus': '', // 首呼状态
          'callTime': '', // 首呼时间
          'comment': '', // 备注
          'cost': 0, // 成本支出
          'customerName': '', // 顾客姓名
          'customerWechat': '', // 顾客微信
          'departure': '', // 出发地
          'destination': '', // 目的地
          'income': '', // 收入
          'itemNumber': this.orderNum, // 订单号
          'manAccount': '', // 主账号
          // 'manArea': '', // 国家
          'manFlat': this.platform, // 平台
          'manSonaccount': '', // 子账号
          'need': '', // 需求
          'orderType': this.types, // 订单类型
          'outDate': '', // 成团时间
          'playDays': '', // 出行天数
          'playRelation': '', // 出行人关系
          'revenue': 0, // 利润
          'startDate': '', // 出行日期
          'status': '未成团', // 订单状态
          'uId': this.nicknameId, // 用户id
          'userNum': '' // 出行人数
        }, {
          // content-type ：application / json; charset = UTF-8
          emulateJSON: true
        }).then((res) => {
          if (res.data.code !== 200) {
            this.$message.error(`${res.data.msg}`)
          } else if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
            this.orderNum = ''
            this.nicknameId = ''
            this.platform = ''
            this.types = ''
            this.$emit('newBuildClick', false)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .rowChange{
    margin-top: -5px;
    padding-bottom:15px;
  }
  .rowChange .el-col{
    line-height: 35px;
    margin-left: 10px;
  }
</style>

<!--供应商详情-->
<template>
  <div>
    <el-row style="padding-bottom: 20px">
      <el-col :span="5"><span class="orderTitle">供应商详情</span></el-col>
      <el-col :span="3" :offset="14">
        <el-button size="mini" type="primary" @click="application=true" v-if="applyShow">申请供应商额度</el-button>
      </el-col>
    </el-row>
    <!--详情-->
    <el-row>
      <!--基本信息-->
      <el-form ref="form" label-position="right" label-width="95px" :model="formData" :rules="rules">
        <el-row class="changeRow">
          <el-col :span="4"><p>基本信息</p></el-col>
        </el-row>
        <el-form-item class="formItemNo" label="供应商名称"  prop="name">
          <el-input v-model="formData.name" clearable style="width: 160px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="供应商类型" prop="type">
          <el-select clearable v-model="formData.type" filterable style="width: 160px" @change="changeType($event)" placeholder="类型" size="small">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-form-item ref="otherInp" v-if="otherInp" class="rightInput" label="新增类型">
            <el-input size="small" style="width: 160px;" clearable v-model="formData.type" placeholder="新增"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="使用范围" prop="usePlace">
          <el-select v-model="formData.usePlace" filterable clearable style="width: 160px;" placeholder="使用范围" size="small" @change="changeRange($event)">
            <el-option
              v-for="(item,index) of ranges"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-form-item v-if="otherRange" class="rightInput" label="新增范围">
            <el-input size="small" style="width: 160px;" clearable v-model="formData.usePlace" placeholder="新增"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="结算方式" prop="clearingForm">
          <el-select v-model="formData.clearingForm" filterable clearable style="width: 160px" @change="changeKuncun($event)" placeholder="结算方式" size="small">
            <el-option
              v-for="(item,index) of jiesuans"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-form-item v-if="otherWay" class="rightInput" label="新增方式">
            <el-input size="small" style="width: 160px;" clearable v-model="formData.clearingForm" placeholder="新增"></el-input>
          </el-form-item>

          <el-form-item label="额度" v-if="kucunInp" class="rightInput">
            <el-input :disabled="true" size="small" v-model="formData.balance" clearable style="width: 160px;"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="状态">
          <!--<el-radio v-model="formData.status" label=true>上线</el-radio>-->
          <!--<el-radio v-model="formData.status" label=false>停用</el-radio>-->
          <el-switch v-model="formData.status" active-text="上线" inactive-text="停用" style="margin-right: 44px"></el-switch>
        </el-form-item>
      </el-form>
      <!--银行账户-->
      <el-form ref="bankform" style="display: block" :model="formData" label-position="right" label-width="95px">
        <el-row class="changeRow">
          <el-col :span="4"><p>银行账号</p></el-col>
        </el-row>
        <el-form-item class="formItemNo" label="账户类型">
          <el-select v-model="formData.bankType" clearable placeholder="账户类型" style="width: 160px" size="small">
            <el-option
              v-for="(item,index) in zhTypes"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户名称">
          <el-input size="small" clearable v-model="formData.bankName" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input size="small" clearable v-model="formData.bankId" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input size="small" clearable v-model="formData.bankOpenName" style="width:160px;"></el-input>
        </el-form-item>
      </el-form>
      <!--网址-->
      <el-form ref="urlform" style="display: block" :model="formData" label-position="right" label-width="95px">
        <el-row class="changeRow">
          <el-col :span="3"><p>网址</p></el-col>
        </el-row>
        <el-form-item class="formItemNo" label="网址">
          <el-input size="small" clearable v-model="formData.url" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="企业编号">
          <el-input size="small" clearable v-model="formData.companyId" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="账号名">
          <el-input size="small" clearable v-model="formData.platformId" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input size="small" clearable v-model="formData.password" style="width:160px;"></el-input>
        </el-form-item>
      </el-form>
      <!--支付宝账号-->
      <el-form ref="alipayform" style="display: block" :model="formData" label-position="right" label-width="95px">
        <el-row class="changeRow">
          <el-col :span="5"><p>支付宝账号</p></el-col>
        </el-row>
        <el-form-item class="formItemNo" label="账号名称">
          <el-input size="small" clearable v-model="formData.alipayName" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input size="small" clearable v-model="formData.alipayId" style="width:160px;"></el-input>
        </el-form-item>
      </el-form>

      <el-row class="rowSty">
        <el-col :span="2" :offset="22">
          <el-button type="primary" @click="clickSave">保存</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!--申请额度-->
    <el-dialog :visible.sync="application" title="申请额度" width="50%" append-to-body>
      <el-form ref="applicationform" :model="applicationData" label-position="right" label-width="80px">
        <el-form-item label="金额">
          <el-input size="small" clearable v-model="applicationData.cost" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="对应额度">
          <el-input size="small" clearable v-model="applicationData.actualCost" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input clearable type="textarea" placeholder="请输入内容" style="width: 500px;" :autosize="{ minRows: 4, maxRows: 4}" v-model="applicationData.remark"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="formItemNo">
        <el-col :span="3" :offset="22">
          <el-button size="small" type="primary" @click="submit">提交申请</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        applyShow: false,
        application: false,
        applicationData: {
          actualCost: '', // 实际金额
          cost: '', // 付款金额
          name: '', // 供应商名称
          remark: '', // 备注
          category: '额度',
          proId: '' // 供应商id
        },
        types: [],
        ranges: [],
        jiesuans: [],
        zhTypes: [
          {
            value: '个人账户',
            label: '个人账户'
          },
          {
            value: '企业账户',
            label: '企业账户'
          }
        ], // 账户类型
        /* 全部信息 */
        formData: {
          name: '', // 供应商名称
          type: '', // 类型
          usePlace: '', // 使用范围
          clearingForm: '', // 结算方式
          status: '', // 状态
          balance: 0, // 额度
          bankType: '', // 银行类型
          bankName: '', // 银行账户名称
          bankId: '', // 账号
          bankOpenName: '', // 开户行
          url: '', // 网址
          companyId: '', // 企业编号
          platformId: '', // 网址账号名
          password: '', // 密码
          alipayName: '', // 支付宝账号名称
          alipayId: '' // 支付宝账号
        },
        otherInp: false, /* 类型-其他 */
        otherRange: false, /* 范围-其他 */
        otherWay: false, /* 结算方式-新增 */
        kucunInp: false, /* 库存金额-单结 */
        closeSupplier: false, /* 关闭弹出框 */
        rules: {
          name: [
            { required: true, message: '请输入供应商名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择供应商类型', trigger: 'change' }
          ],
          usePlace: [
            { required: true, message: '请选择使用范围', trigger: 'change' }
          ],
          clearingForm: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      /* 额度申请 */
      submit() {
        let params = {
          actualCost: Number(this.applicationData.actualCost), // 实际金额
          cost: Number(this.applicationData.cost), // 付款金额
          name: this.applicationData.name, // 供应商名称
          remark: this.applicationData.remark, // 备注
          category: this.applicationData.category,
          proId: this.applicationData.proId // 供应商id
        }
        this.$http.post('/api/provider/orderResource', params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('提交成功')
            let params = {
              ...this.formData
            }
            this.$http.post('/api/provider/reset', params).then(res => {})
            setTimeout(() => {
              this.application = false
            }, 1000)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },

      /* 供应商类型 */
      changeType(event) {
        if (event === '新增') {
          this.otherInp = true
        } else {
          this.otherInp = false
        }
      },
      /* 获取所有供应商的类型 */
      getType () {
        let params = {
          filedName: 'type', // 范围名称
          tableName: 'provider_t' // 数据表名字
        }
        this.$http.post('/api/provider/input', params).then(res => {
          res.data.data.unshift('新增')
          this.types = res.data.data
        })
      },
      /* 使用范围 */
      changeRange(event) {
        if (event === '新增') {
          this.otherRange = true
        } else {
          this.otherRange = false
        }
      },
      /* 获取已有供应商的使用范围接口 */
      providerData () {
        let params = {
          filedName: 'use_place',
          tableName: 'provider_t'
        }
        this.$http.post('/api/provider/input', params).then(res => {
          res.data.data.unshift('新增')
          this.ranges = res.data.data
        })
      },
      /* 结算方式 */
      changeKuncun(event) {
        if (event === '额度') {
          this.kucunInp = true
          this.otherWay = false
        } else if (event === '新增') {
          this.otherWay = true
          this.kucunInp = false
        } else {
          this.kucunInp = false
          this.otherWay = false
        }
        if (event === '额度') {
          this.applyShow = true
        } else {
          this.applyShow = false
        }
      },
      clearing () {
        let params = {
          filedName: 'clearing_form',
          tableName: 'provider_t'
        }
        this.$http.post('/api/provider/input', params).then(res => {
          res.data.data.unshift('新增')
          if (res.data.data.indexOf('额度') === -1) {
            res.data.data.push('额度')
          }
          this.jiesuans = res.data.data
        })
      },
      /* 根据id获取指定供应商接口 */
      getData () {
        let id = this.$route.params.id
        this.applicationData.proId = id
        this.$http.get(`/api/provider/one/${this.applicationData.proId}`).then(res => {
          this.applicationData.name = res.data.data.name
          this.formData = res.data.data
          if (res.data.data.clearingForm === '额度') {
            this.kucunInp = true
            this.applyShow = true
          } else {
            this.kucunInp = false
            this.applyShow = false
          }
        })
      },
      /* 保存 */
      clickSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.handleData()
          } else {
            this.$message.error('请将星号标记的信息填写完整')
          }
        })
      },
      /* 清空校验 */
      resetForm() {
        this.$refs['form'].resetFields()
      },
      /* 更新供应商接口 */
      handleData () {
        let params = {
          ...this.formData
        }
        // console.log(params)
        this.$http.post('/api/provider/reset', params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('修改成功')
            this.resetForm()
            this.$emit('closeDetail', false)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    created () {
      this.getData()
    },
    beforeMount () {
      this.getType()
      this.providerData()
      this.clearing()
    }
  }
</script>

<style scoped>
  .el-row{
    margin:0 auto 0;
    width: 90%;
    line-height: 40px;
    background: #fff;
  }
  .el-col{
    line-height: 35px;
  }
  .icon{
    color: #000;
    margin-left: 8px;
  }
  .orderTitle{
    display: block;
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size:18px;
    line-height: 35px;
  }
  .formItemNo{
    margin-top: 15px;
  }

  .changeRow{
    margin:0 0 10px 0;
  }
  .changeRow p{
    font-size: 14px;
    font-weight: bolder;
  }
  .el-form{
    border: 1px solid #ccc;
    padding: 15px 0 0 10px;
  }
  .rightInput{
    float: right;
    margin: 0 230px 0 0;
  }
  .rowSty{
    margin-top: 20px;
  }
  .item{
    color: lightgray;
    font-size: 12px;
  }
</style>

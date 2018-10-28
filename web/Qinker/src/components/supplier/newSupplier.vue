<!-- 新建供应商 -->
<template>
  <div>

    <el-form ref="form" label-position="right" label-width="95px" :model="formData" :rules="rules">
      <el-row class="changeRow">
        <el-col :span="3"><p>基本信息</p></el-col>
      </el-row>
      <el-form-item class="formItemNo" label="供应商名称" prop="name">
        <el-input v-model="formData.name" clearable style="width: 160px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="供应商类型" prop="type">
        <el-select clearable v-model="formData.type" style="width: 160px" filterable @change="changeType($event)" placeholder="类型" size="small">
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
      <el-form-item label="结算方式"  prop="clearingForm">
        <el-select v-model="formData.clearingForm" filterable clearable style="width: 160px" @change="changeKuncun($event)" placeholder="结算方式" size="small">
          <el-option
            v-for="(item,index) of clearingForms"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-form-item v-if="otherWay" class="rightInput" label="新增方式">
          <el-input size="small" style="width: 160px;" clearable v-model="formData.clearingForm" placeholder="新增"></el-input>
        </el-form-item>
        <el-form-item label="额度" v-if="kucunInp" class="rightInput">
          <el-input size="small" v-model="formData.balance" clearable style="width: 160px;"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="formData.status" active-text="上线" inactive-text="停用" style="margin-right: 44px"></el-switch>
      </el-form-item>
    </el-form>
    <!--银行账户-->
    <el-form ref="bankform" style="display: block" :model="formData" label-position="right" label-width="95px">
      <el-row class="changeRow">
        <el-col :span="3"><p>银行账号</p></el-col>
      </el-row>
      <el-form-item class="formItemNo" label="账户类型">
        <el-select v-model="formData.bankType" clearable placeholder="账户类型" style="width: 160px" size="small">
          <el-option
            v-for="(item,index) in bankTypes"
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
        <el-col :span="3"><p>支付宝账号</p></el-col>
      </el-row>
      <el-form-item class="formItemNo" label="账号名称">
        <el-input size="small" clearable v-model="formData.alipayName" style="width:160px;"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input size="small" clearable v-model="formData.alipayId" style="width:160px;"></el-input>
      </el-form-item>
    </el-form>

      <el-row style="margin-top: 15px">
        <el-col :span="2" :offset="17" class="buttons">
          <el-button type="primary" size="small" @click="clearData">清除填写数据</el-button>
          <el-button type="primary" size="small" @click="clickSave">保存</el-button>
        </el-col>
      </el-row>
    <!--</el-row>-->

  </div>
</template>

<script>
  export default {
    // inject: ['reload'],
    data() {
      return {
        types: [], // 供应商类型
        ranges: [], // 使用范围
        clearingForms: [], // 结算方式
        bankTypes: [ // 账户类型
          {
            value: '个人账户',
            label: '个人账户'
          },
          {
            value: '企业账户',
            label: '企业账户'
          }
        ],
        /* 全部信息 */
        formData: {
          name: '', // 供应商名称
          type: '', // 类型
          usePlace: '', // 使用范围
          clearingForm: '', // 结算方式
          status: true, // 状态
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
        if (this.formData.clearingForm !== '额度') {
          this.formData.balance = 0
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
          this.clearingForms = res.data.data
        })
      },
      /* 点击保存 */
      clickSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.saveNewData()
          } else {
            this.$message.error('请将星号标记的信息填写完整')
          }
        })
      },
      /* 清空校验 */
      resetForm() {
        this.$refs['form'].resetFields()
      },
      /* 添加供应商接口 */
      saveNewData () {
        let params = {
          ...this.formData
        }
        this.$http.post('/api/provider/new', params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('保存成功')
            this.clearData()
            this.$emit('getData', false)
          } else if (res.data.code === 50001) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.error('请将必填信息填写完整')
          }
        })
      },
      clearData () {
        this.formData.name = '' // 供应商名称
        this.formData.type = '' // 类型
        this.formData.usePlace = '' // 使用范围
        this.formData.clearingForm = '' // 结算方式
        this.formData.status = true // 状态
        this.formData.balance = 0 // 额度
        this.formData.bankType = '' // 银行类型
        this.formData.bankName = '' // 银行账户名称
        this.formData.bankId = '' // 账号
        this.formData.bankOpenName = '' // 开户行
        this.formData.url = '' // 网址
        this.formData.companyId = '' // 企业编号
        this.formData.platformId = '' // 网址账号名
        this.formData.password = '' // 密码
        this.formData.alipayName = '' // 支付宝账号名称
        this.formData.alipayId = '' // 支付宝账号
        this.resetForm()
      }
    },
    created() {
      this.getType()
      this.providerData()
      this.clearing()
    }
  }
</script>

<style scoped>
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
  .el-form-item{
    margin-bottom: 16px;
  }
  .formItemNo{
    margin-top: 15px;
  }
  .rightInput{
    float: right;
    margin: 10px 300px 0 0;
  }
  .buttons{
    display: flex;
  }
</style>

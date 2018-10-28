<!--新建库存-->
<template>
  <div>
    <el-form ref="form" label-position="right" label-width="95px" :model="newStockData" :rules="rules">
      <el-row class="changeRow">
        <el-col :span="3"><p>基本信息</p></el-col>
      </el-row>
      <el-form-item label="物品名称" prop="name">
        <el-input clearable v-model="newStockData.name" style="width: 160px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select  clearable v-model="newStockData.type" filterable @change="change($event)" style="width: 160px" placeholder="类型" size="small">
          <el-option
            v-for="(item,index) in stockTypes"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-form-item class="rightInput" v-if="otherInp">
          <el-input clearable size="small" style="width: 160px;" v-model="newStockData.type" placeholder="新增"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input clearable size="small" v-model.number="newStockData.number" style="width:160px;"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="unitPrice">
        <el-input clearable size="small" v-model="newStockData.unitPrice" style="width:160px;"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="newStockData.status" active-text="可选" inactive-text="不可选"></el-switch>
      </el-form-item>
      <el-form-item label="介绍" prop="decription">
        <el-input clearable type="textarea" placeholder="请输入内容" style="width: 500px;" :autosize="{ minRows: 4, maxRows: 4}" v-model="newStockData.decription"></el-input>
      </el-form-item>
    </el-form>
    <el-row style="margin-top: 15px">
      <el-col :span="2" :offset="17" class="buttons">
        <el-button type="primary" size="small" @click="clearData">清除填写数据</el-button>
        <el-button type="primary" size="small" @click="clickSave">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'newStock',
    data() {
      return {
        stockTypes: [], // 类型
        newStockData: {
          name: '', // 库存名称
          type: '', // 类型
          number: '', // 数量
          unitPrice: '', // 单价
          status: true, // 状态
          decription: '' // 介绍
        },
        otherInp: false,
        rules: {
          name: [
            { required: true, message: '请输入物品名称', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '数量不能为空' },
            { type: 'number', message: '数量必须为数字值' }
          ],
          unitPrice: [
            { required: true, message: '请输入物品单价', trigger: 'blur' }
          ],
          decription: [
            { required: true, message: '请输入相关介绍', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /* 类型 */
      change(event) {
        if (event === '新增') {
          this.otherInp = true
        } else {
          this.otherInp = false
        }
      },
      /* 获取所有库存的类型 */
      getType () {
        let params = {
          filedName: 'type',
          tableName: 'inventory'
        }
        this.$http.post('/api/provider/input', params).then(res => {
          res.data.data.unshift('新增')
          this.stockTypes = res.data.data
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
      /* 提交添加信息，即保存 */
      saveNewData () {
        let params = {
          ...this.newStockData
        }
        this.$http.post('/api/inventory/new', params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('保存成功')
            this.clearData()
            this.$emit('getData', false)
          } else if (res.data.code === 50005) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.error('请将必填信息填写完整')
          }
        })
      },
      clearData () {
        this.newStockData.name = '' // 库存名称
        this.newStockData.name = ''
        this.newStockData.type = '' // 类型
        this.newStockData.number = '' // 数量
        this.newStockData.unitPrice = '' // 单价
        this.newStockData.status = true // 状态
        this.newStockData.decription = '' // 介绍
        this.resetForm()
      }
    },
    created() {
      this.getType()
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
  .rightInput{
    float: right;
    margin: 0 260px 0 0;
  }
  .buttons{
    display: flex;
  }
</style>

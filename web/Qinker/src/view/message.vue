<template>
  <div class="message">
    <el-row>
      <el-col :span="span"><div class="messageTitle">完善信息</div></el-col>
    </el-row>
    <el-form :model="data" label-position="right" :inline="true" size="medium" :label-width="labelWidth">
      <el-form-item label="定制师">
        <el-input v-model="data.applyName" style="width: 90%" size="medium" disabled></el-input>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input size="medium" v-model="data.itemNumber" style="width:90%;" disabled></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <el-input size="medium" v-model="data.cost" style="width:90%;" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-input size="medium" v-model="data.type" style="width:90%;" disabled></el-input>
      </el-form-item>
      <el-form-item label="预订平台">
        <el-input v-model="data.providerName" style="width: 90%" size="medium" disabled></el-input>
      </el-form-item>
      <el-form-item label="预订平台订单号">
        <el-input size="medium" v-model="data.orderNum" style="width:90%;" disabled></el-input>
      </el-form-item>
      <el-form-item label="用途">
        <el-input size="medium" :rows="2" type="textarea" v-model="data.category" style="width:130%;" disabled></el-input>
      </el-form-item>
      <el-form-item label="使用日期">
        <el-date-picker
          v-model="data.useTime"
          type="date"
          size="medium"
          value-format="timestamp"
          placeholder="选择日期"
          :formatter="dateFormat">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="付款凭证" class="fileSty">
        <el-upload
          :limit="5"
          action="/upload/accessory"
          multiple
          :file-list="fileList"
          list-type="picture-card"
          :on-success="uploadSuccess"
          :on-preview="handlePreview"
          :before-remove="beforeRemove"
          :on-remove="uploadOnRemove"
          :on-exceed="handleExceed">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl">
        </el-dialog>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" size="medium" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        plaform: 'pc',
        span: '',
        labelWidth: '',
        id: 0,
        data: {
          applyName: '',
          itemNumber: 0,
          cost: '',
          type: '',
          providerName: '',
          orderNum: '',
          category: '',
          useTime: '',
          payFiles: []
        },
        nicknames: [],
        flats: [],
        fileList: [],
        dialogVisible: false,
        dialogImageUrl: ''
      }
    },
    created() {
      this.getUrlId()
      this.getData()
      this.documentWidth()
    },
    methods: {
      getUrlId() {
        let url = window.location.href
        this.id = url.split('?')[1].split('=')[1]
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
      documentWidth() {
        if (document.documentElement.clientWidth > 768) {
          this.plaform = 'pc'
          this.span = 3
          this.labelWidth = '120px'
        } else {
          this.plaform = 'mobile'
          this.span = 24
          this.labelWidth = '85px'
        }
      },
      /* 上传成功 */
      uploadSuccess(file) {
        if (file.code === 200) {
          this.fileList.push({
            name: file.data.name,
            url: file.data.url
          })
        } else {
          this.$message.error(`${file.data}`)
        }
      },
      /* 点击文件列表中已上传的文件时的钩子 */
      handlePreview (file) {
        console.log(file)
         let a = document.createElement('a')
        a.download = name || `${file.name}`
        a.href = `${file.url}`
        a.target = '_blank'
        a.click()
        window.open(file.url)
      },
      /* 删除文件之前的钩子 */
      beforeRemove (file) {
       // return this.$confirm(`确定移除${file.name}?`)
      },
      /* 删除文件 */
      uploadOnRemove(file, fileList) {
        this.fileList = fileList
        this.data.payFiles = this.fileList
      },
      /* 限制上传附件数量 */
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择5个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}`)
      },
      /* 保存 */
      submitForm() {
        this.changeMessage()
      },
      /* 获取 */
      getData() {
        this.$http.get(`/finance/one?id=${this.id}`).then((res) => {
          if (res.data.code === 200) {
            this.data = res.data.data
            this.fileList = this.data.payFiles
            this.dialogImageUrl = this.fileList.url
          }
        })
      },
      /* 保存修改接口 */
      changeMessage() {
        let data = {
          id: this.id,
          useTime: this.data.useTime,
          payFiles: this.fileList
        }
        this.$http.post('/finance/updateOrderCost', data).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(`${res.data.msg}`)
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

  @media only screen and (min-width: 768px){
    .el-row{
      padding: 15px 0 0 15px;
      height: 50px;
    }
    .el-col{
      line-height: 45px;
    }
    .el-col div{
      text-align: center;
      border-bottom: 3px solid blue;
    }
    .messageTitle{
      display: block;
      font-family: "Helvetica Neue",Arial,sans-serif;
      font-size:20px;
      font-weight: bolder;
      line-height: 35px;
      margin-left: 10px;
    }
    .el-form{
      margin: 20px auto;
      width: 80%;
    }
    .el-form-item{
      width: 30%;
    }
    .fileSty{
      width: 100%;
    }
    .submit{
      margin: 30px 0 0 50px;
    }
  }
  @media only screen and (max-width: 767px){
    .el-row{
      height: 45px;
    }
    .el-col{
      border-bottom: 1px solid #000;
    }
    .el-col div{
      text-align: center;
      line-height: 45px;
    }
    .messageTitle{
      display: block;
      font-family: "Helvetica Neue",Arial,sans-serif;
      font-size:20px;
      line-height: 35px;
      margin-left: 10px;
    }
    .el-form{
      margin: 20px auto;
    }
    .fileSty{
      margin: 0 auto;
    }
    .submit{
      margin:30px 120px 0;
    }
  }
</style>

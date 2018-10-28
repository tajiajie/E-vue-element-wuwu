<!--库存详情-->
<template>
  <div>
    <el-row>
      <el-col :span="5"><span class="orderTitle">库存详情</span></el-col>
      <el-col :span="2" :offset="14">
        <el-button size="mini" type="primary" @click="applicationStock=true">申请增加库存</el-button>
      </el-col>
    </el-row>

    <el-row>
      <new-stock @close="handleClose"></new-stock>
    </el-row>

    <el-dialog :visible.sync="applicationStock" title="申请库存" width="50%" append-to-body>
      <el-form ref="applicationform" :model="applicationStockData" label-position="right" label-width="80px">
        <el-form-item label="总金额">
          <el-input clearable size="small" v-model="applicationStockData.cost" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input clearable size="small" v-model="applicationStockData.actualCost" style="width:160px;"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input clearable type="textarea" placeholder="请输入内容" style="width: 500px;" :autosize="{ minRows: 4, maxRows: 4}" v-model="applicationStockData.remark"></el-input>
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
  import newStock from './newStock1'
  export default {
    name: 'stockDetail',
    data() {
      return {
        applicationStock: false,
        applicationStockData: {
          cost: '', // 付款金额
          actualCost: '', // 实际金额
          remark: '', // 备注
          proId: '', // 库存id
          name: '', // 库存名称
          category: '库存'
        }
      }
    },
    components: {
      newStock
    },
    methods: {
      handleClose(val) {
        this.$emit('closeDetail', val)
      },
      /* 申请 */
      submit() {
        let params = {
          actualCost: Number(this.applicationStockData.actualCost), // 实际金额
          cost: Number(this.applicationStockData.cost), // 付款金额
          name: this.applicationStockData.name, // 供应商名称
          remark: this.applicationStockData.remark, // 备注
          category: this.applicationStockData.category,
          proId: this.applicationStockData.proId // 供应商id
        }
        this.$http.post('/api/provider/orderResource', params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('提交成功')
            setTimeout(() => {
              this.applicationStock = false
            }, 1000)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      /* 详情信息 */
      getData () {
        let id = this.$route.params.id
        this.applicationStockData.proId = id
        this.$http.get(`/api/inventory/one/${this.applicationStockData.proId}`).then(res => {
          this.applicationStockData.name = res.data.data.name
        })
      }
    },
    created () {
      this.getData()
    }
  }
</script>

<style scoped>
  .el-row{
    margin:0 auto 15px;
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
  .el-form{
    border: 1px solid #999;
    padding: 15px 0 0 10px;
    margin-bottom: 5px;
  }
  .formItemNo{
    margin-top: 15px;
  }
</style>

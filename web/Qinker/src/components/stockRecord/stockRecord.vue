<!--库存申请-->
<template>
  <div>
    <el-row>
      <el-col :span="3"><span class="stockTitle">库存申请</span></el-col>
    </el-row>
    <el-row>
      <el-tabs v-model="number" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="未审核" name="first">
          <el-row>
            <el-col :span="4">
              <el-input
                size="small"
                placeholder="物品名称"
                prefix-icon="el-icon-search"
                clearable
                v-model="unitemName">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="unitemType" clearable placeholder="类型" size="small">
                <el-option
                  v-for="(item,index) in unitemTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="unperson" clearable placeholder="申请人" size="small">
                <el-option
                  v-for="(item,index) in unpersons"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table
            :data="unauditedData"
            style="width: 100%">
            <el-table-column
              prop="auditedId"
              label="订单号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="name"
              label="库存名称"
              width="130">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="数量"
              width="130">
            </el-table-column>
            <el-table-column
              prop="UseDate"
              label="使用日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="recordDate"
              label="申请日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="recordMan"
              label="申请人"
              width="130">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="small">通过</el-button>
                <el-button type="danger" size="small">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="unauditedPage"
              :page-size="10"
              background
              layout="total, prev, pager, next"
              :total="100">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核" name="second">
          <el-row>
            <el-col :span="4">
              <el-input
                size="small"
                placeholder="物品名称"
                prefix-icon="el-icon-search"
                clearable
                v-model="itemName">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="itemType" clearable placeholder="类型" size="small">
                <el-option
                  v-for="(item,index) in itemTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="person" clearable placeholder="申请人" size="small">
                <el-option
                  v-for="(item,index) in persons"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table
            :data="auditedData"
            style="width: 100%">
            <el-table-column
              prop="auditedId"
              label="订单号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="name"
              label="库存名称"
              width="130">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="数量"
              width="130">
            </el-table-column>
            <el-table-column
              prop="UseDate"
              label="使用日期"
              width="140">
            </el-table-column>
            <el-table-column
              prop="recordDate"
              label="申请日期"
              width="140">
            </el-table-column>
            <el-table-column
              prop="recordMan"
              label="申请人"
              width="130">
            </el-table-column>
            <el-table-column
              prop="auditedTime"
              label="审核时间"
              width="140">
            </el-table-column>
            <el-table-column
              prop="auditedPerson"
              label="审核人"
              width="130">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="unauditedPage"
              :page-size="10"
              background
              layout="total, prev, pager, next"
              :total="100">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        number: 'first',
        /* 未审核-搜索栏 */
        unitemName: '',
        unitemType: '',
        unperson: '',
        unitemTypes: [
          {
            label: '电话卡',
            value: 'type1'
          },
          {
            label: '其他',
            value: 'type2'
          }
        ],
        unpersons: [
          {
            label: '张三',
            value: 'person1'
          },
          {
            label: '李四',
            value: 'person2'
          },
          {
            label: '王五',
            value: 'person3'
          }
        ],
        /* 未审核 */
        unauditedData: [
          {
            auditedId: '32323',
            name: '西瓜卡',
            amount: '200',
            UseDate: '2018-11-11',
            recordDate: '2018-08-12',
            recordMan: 'Rita'
          },
          {
            auditedId: '32323',
            name: '西瓜卡',
            amount: '200',
            UseDate: '2018-11-11',
            recordDate: '2018-08-12',
            recordMan: 'Rita'
          }
        ],
        unauditedPage: 5,

        /* 已审核-搜索栏 */
        itemName: '',
        itemType: '',
        person: '',
        itemTypes: [
          {
            label: '电话卡',
            value: 'type1'
          },
          {
            label: '其他',
            value: 'type2'
          }
        ],
        persons: [
          {
            label: '张三',
            value: 'person1'
          },
          {
            label: '李四',
            value: 'person2'
          },
          {
            label: '王五',
            value: 'person3'
          }
        ],
        /* 已审核 */
        auditedData: [
          {
            auditedId: '32323',
            name: '西瓜卡',
            amount: '200',
            UseDate: '2018-11-11',
            recordDate: '2018-08-12',
            recordMan: 'Rita',
            auditedTime: '',
            auditedPerson: ''
          },
          {
            auditedId: '32323',
            name: '西瓜卡',
            amount: '200',
            UseDate: '2018-11-11',
            recordDate: '2018-08-12',
            recordMan: 'Rita',
            auditedTime: '',
            auditedPerson: ''
          }
        ],
        auditedPage: 5 /* 分页（每页显示条目个数） */
      }
    },
    methods: {
      /* 选项卡 */
      handleClick (tab, event) {
        console.log(tab, event)
      },
      /* 控制页码 */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>
  .el-row{
    margin-bottom: 15px;
    background-color: #fff;
  }
  .el-col{
    line-height: 35px;
    margin-left: 10px;
  }
  .stockTitle{
    display: block;
    font-family: "Helvetica Neue",Arial,sans-serif;
    font-size:18px;
    line-height: 35px;
    margin-left: 10px;
  }
  .block{
    margin: 15px 20px 0 0;
    padding-top:5px ;
    float: right;
  }
</style>

<!--申请记录-->
<template>
  <div>
    <el-row>
      <el-col :span="3"><span class="stockTitle">申请记录</span></el-col>
    </el-row>
    <el-row>
      <el-tabs v-model="number" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="供应商额度" name="first">
          <el-row>
            <el-col :span="4">
              <el-input
                size="small"
                placeholder="供应商名称"
                prefix-icon="el-icon-search"
                clearable
                v-model="supName">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="supType" clearable placeholder="类型" size="small">
                <el-option
                  v-for="(item,index) in supTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="supState" clearable placeholder="状态" size="small">
                <el-option
                  v-for="(item,index) in supStates"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table
            :data="recordSupData"
            style="width: 100%">
            <el-table-column
              prop="recordSupId"
              label="记录id"
              width="130">
            </el-table-column>
            <el-table-column
              prop="recordSup"
              label="供应商"
              width="130">
            </el-table-column>
            <el-table-column
              prop="recordMoney"
              label="申请金额"
              width="140">
            </el-table-column>
            <el-table-column
              prop="supBalance"
              label="余额"
              width="130">
            </el-table-column>
            <el-table-column
              prop="supDate"
              label="申请日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="SupMan"
              label="申请人"
              width="130">
            </el-table-column>
            <el-table-column
              prop="SupState"
              label="状态"
              width="140">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="supPage"
              :page-size="10"
              background
              layout="total, prev, pager, next"
              :total="100">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="库存" name="second">
          <el-row>
            <el-col :span="4">
              <el-input
                size="small"
                placeholder="物品名称"
                prefix-icon="el-icon-search"
                clearable
                v-model="stockName">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="stockType" clearable placeholder="类型" size="small">
                <el-option
                  v-for="(item,index) in stockTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="stockState" clearable placeholder="状态" size="small">
                <el-option
                  v-for="(item,index) in stockStates"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table
            :data="recordStockData"
            style="width: 100%">
            <el-table-column
              prop="recordStockId"
              label="记录id"
              width="130">
            </el-table-column>
            <el-table-column
              prop="recordStock"
              label="库存"
              width="130">
            </el-table-column>
            <el-table-column
              prop="stockMoney"
              label="申请金额"
              width="140">
            </el-table-column>
            <el-table-column
              prop="stockBalance"
              label="余额"
              width="130">
            </el-table-column>
            <el-table-column
              prop="stockDate"
              label="申请日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="stockMan"
              label="申请人"
              width="130">
            </el-table-column>
            <el-table-column
              prop="stockState"
              label="状态"
              width="140">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="stockPage"
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
    name: 'record',
    data() {
      return {
        number: 'first',
        /* 供应商-搜索栏 */
        supName: '',
        supType: '',
        supState: '',
        supTypes: [
          {
            label: '电话卡',
            value: 'type1'
          },
          {
            label: '其他',
            value: 'type2'
          }
        ],
        supStates: [
          {
            label: '使用中',
            value: 'state1'
          },
          {
            label: '停用',
            value: 'state2'
          }
        ],
        /* 供应商记录 */
        recordSupData: [
          {
            recordSupId: '1',
            recordSup: '电话卡',
            recordMoney: '3000',
            supBalance: '100',
            supDate: '2018-05-12',
            SupMan: 'Rita',
            SupState: '待审核'
          },
          {
            recordSupId: '1',
            recordSup: '电话卡',
            recordMoney: '3000',
            supBalance: '100',
            supDate: '2018-05-12',
            SupMan: 'Rita',
            SupState: '待审核'
          },
          {
            recordSupId: '1',
            recordSup: '电话卡',
            recordMoney: '3000',
            supBalance: '100',
            supDate: '2018-05-12',
            SupMan: 'Rita',
            SupState: '待审核'
          }
        ],
        supPage: 5, /* 分页（每页显示条目个数） */

        /* 库存-搜索栏 */
        stockName: '',
        stockType: '',
        stockState: '',
        stockTypes: [
          {
            label: '电话卡',
            value: 'type1'
          },
          {
            label: '其他',
            value: 'type2'
          }
        ],
        stockStates: [
          {
            label: '可选',
            value: 'state1'
          },
          {
            label: '不可选',
            value: 'state2'
          }
        ],
        recordStockData: [
          {
            recordStockId: '2212',
            recordStock: '抱枕',
            stockMoney: '3000',
            stockBalance: '200',
            stockDate: '2018-03-12',
            stockMan: 'Amy',
            stockState: '待审核'
          },
          {
            recordStockId: '2212',
            recordStock: '抱枕',
            stockMoney: '3000',
            stockBalance: '200',
            stockDate: '2018-03-12',
            stockMan: 'Amy',
            stockState: '待审核'
          },
          {
            recordStockId: '2212',
            recordStock: '抱枕',
            stockMoney: '3000',
            stockBalance: '200',
            stockDate: '2018-03-12',
            stockMan: 'Amy',
            stockState: '待审核'
          }
        ],
        stockPage: 6
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
    margin: 15px 40px 0 0;
    padding-top:5px ;
    float: right;
  }
</style>

<template>
  <div>
    <el-col :span="span">
      <span v-if="show">平台</span>
      <el-select v-model="plat" placeholder="平台" clearable size="small" @change="change">
        <el-option
          v-for="(item,index) in options3"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="span">
      <span v-if="show">订单类型</span>
      <el-select v-model="type" placeholder="订单类型" clearable size="small" :disabled="typeAble" @change="change">
        <el-option
          v-for="(item,index) in option"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </div>
</template>

<script>
  export default {
    props: ['span', 'show'],
    data() {
      return {
        plat: '',
        type: '',
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
        /* 平台 */
        options3: [
          {
            value: '携程',
            label: '携程'
          }, {
            value: '途牛',
            label: '途牛'
          }, {
            value: '马蜂窝',
            label: '马蜂窝'
          }, {
            value: '去哪儿',
            label: '去哪儿'
          }, {
            value: '自营',
            label: '自营'
          }
        ]
      }
    },
    computed: {
      typeAble: function() {
        if (this.plat) {
          return false
        } else {
          // eslint-disable-next-line
          this.type = ''
          return true
        }
      },
      option: function() {
        if (this.plat === '自营') {
          return this.options21
        } else {
          return this.options2
        }
      }
    },
    methods: {
      change() {
        this.$emit('platState', this.plat, this.type)
      }
    }
  }
</script>

<style scoped>
 .el-col{
    line-height: 35px;
    margin-left: 8px;
  }
</style>

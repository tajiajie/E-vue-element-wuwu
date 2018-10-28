<template>
  <el-col :span="span">
    <span v-if="show">定制师</span>
    <el-select v-model="nickname" placeholder="定制师" filterable clearable size="small" @change="change">
      <el-option
        v-for="(item,index) in nicknames"
        :key="index"
        :label="item.nickname"
        :value="item.id">
      </el-option>
    </el-select>
  </el-col>
</template>

<script>
  export default {
    props: ['span', 'show'],
    data() {
      return {
        /* 定制师 */
        nickname: '',
        nicknames: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
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
      change() {
       this.$emit('dingzhi', this.nickname)
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

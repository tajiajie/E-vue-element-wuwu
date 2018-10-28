<template>
  <div class="box">
    <div class="content">
      <el-button
        size='mini'
        type='primary'
        @click="printDeal()"
      >
        打印该凭证
      </el-button>
      <div id="printBox">
        <img :src="url">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index: '',
        id: '',
        url: ''
      }
    },
    methods: {
      getUrl() {
        let url = window.location.href
        this.id = url.split('=')[1].split('&')[0]
        this.index = url.split('index=')[1]
        this.$http.get(`/api/finance/applyUrlList?orderCostId=${this.id}`).then(res => {
          this.url = res.data.data[this.index].url
        })
      },
      printDeal () {
        var printBox = document.getElementById('printBox')
        var newContent = printBox.innerHTML // 拿到打印的区域的html内容
        var oldContent = document.body.innerHTML // 将旧的页面储存起来，当打印完成后返给给页面。
        document.body.innerHTML = newContent // 赋值给body
        window.print() // 执行window.print打印功能
        window.location.reload() // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
        document.body.innerHTML = oldContent
        return false
      }
    },
    created() {
      this.getUrl()
    }
  }
</script>

<style scoped>
  .box{
    width: 80%;
    height: 80%;
    margin: 30px auto;
  }
</style>

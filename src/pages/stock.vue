<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <a class="mui-btn l-btn-main" href="tel:020-85655842"><i class="l-icon l-margin-r-s">&#xe649;</i>联系采购客服</a>
    </footer>
    <div class="mui-content">
      <!-- 库存列表 -->
      <div class="l-stock" v-if="goodsList">
        <div class="l-stock-item l-flex-hc" v-for="item in goodsList">
          <div class="l-rest">
            <h3>{{item.typeName}}</h3>
            <p class="l-text-gray l-fs-s">商品剩余数量：</p>
            <p><span class="l-text-hot l-fs-l">{{item.goodsStock}}</span></p>
          </div>
          <img class="_thumb" :src="item.image" alt="">
        </div>
      </div>
      <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      <!-- 库存列表 end-->
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      loading: false,
      goodsList: null
    }
  },
  created() {
    this.loading = true
    this.$server.getStock().then(({data})=>{
      setTimeout(()=>{
        this.goodsList = data
        this.loading = false
      }, 600)
    }).catch(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-stock-item{
  background: #fff; background: #fff; margin-bottom: 0.75rem; padding: 0.75rem;
  ._thumb{width: 6rem; height: 4rem;}
}
</style>
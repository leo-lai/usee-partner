<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <div class="l-index-menu">
        <router-link class="_item" to="/income">
          <img src="~assets/images/layout-004.jpg" alt="">
          <div class="_inner l-flex-vhc">
            <p class="l-fs-xl"><b class="l-icon">&#xe6cb;</b>{{indexData.accumulatedIncome || 0}}</p>
            <p class="l-fs-m"><i class="l-icon l-margin-r-s">&#xe9cb;</i>累计收益</p>
          </div>
        </router-link>
        <router-link class="_item" to="/stock">
          <img src="~assets/images/layout-005.jpg" alt="">
          <div class="_inner l-flex-vhc">
            <p class="l-fs-xl">{{indexData.goodShok || 0}}</p>
            <p class="l-fs-m"><i class="l-icon l-margin-r-s">&#xe64e;</i>剩余库存</p>
          </div>
        </router-link>
        <router-link class="_item" to="/me/customer">
          <img src="~assets/images/layout-006.jpg" alt="">
          <div class="_inner l-flex-vhc">
            <p class="l-fs-xl">{{indexData.bindingNumber || 0}}</p>
            <p class="l-fs-m"><i class="l-icon l-margin-r-s">&#xe8fe;</i>我的客户</p>
          </div>
        </router-link>
      </div>
      <div class="l-loading-inline" v-if="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'

export default {
  components: {
    navTab
  },
  data () {
    return {
      loading: false,
      indexData: {}
    }
  },
  created() {
    this.loading = true
    this.$server.getIndexData().then(({data})=>{
      this.indexData = data
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-index-menu{
  ._item{
    position: relative; text-align: center; display: block; margin: 0.75rem; min-height: 5.75rem;
  }
  ._item:after{
    position: absolute; top:0; left: 0; bottom: 0; right: 0; z-index: 1;
    content:''; background-color: rgba(0, 0, 0, 0.4);
  }
  .l-fs-xl{
    font-size: 1.8rem !important;
  }
  ._inner{
    position: absolute; top:0; left: 0; bottom: 0; right: 0; z-index: 2;
    color: #fff;
  }
}
</style>
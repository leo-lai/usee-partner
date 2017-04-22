<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-income-count l-flex-hc">
        <div class="l-rest">
          <h3 class="l-fs-xl">{{income.accumulatedIncome}}</h3>
          <p class="l-fs-s l-text-gray">累计收益(元)</p>
        </div>
        <div class="l-rest">
          <h3 class="l-fs-xl">{{income.marketValue}}</h3>
          <p class="l-fs-s l-text-gray">总市值(元)</p>
        </div>
      </div>

      <div class="l-income-month l-flex-hc l-link-arrow" @click="$link('/income/details')">
        <div class="l-border-r _month">
          <b>{{month}}</b>月收益
        </div>
        <div class="l-rest l-margin-l">
          <b class="l-text-warn l-fs-xl">+{{income.amount}}</b>
        </div>
        <div class="l-text-gray">
          <span class="l-fs-s">收益明细</span>
        </div>
      </div>

      <div class="l-loading-inline" v-if="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
    </div>
  </div>
</template>
<script>
let month = new Date().getMonth() + 1
month = month > 9 ? month : '0' + month

export default {
  data () {
    return {
      month,
      loading: false,
      income: {},
    }
  },
  methods: {
    
  },
  created() {
    this.loading = true
    this.$server.getIncome().then(({data})=>{
      this.income = data
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-income-count{
  background: linear-gradient(135deg, #1e1716, #4c3530, #403534); color: #fff; text-align: center;
  padding: 1rem 0; min-height: 5.3rem;
}
.l-income-month{
  padding: 1rem 0;
  background: #fff; margin: 0.75rem 0; 
  ._month{
    width: 5rem; padding: 0 0.75rem 0 0; line-height: 1.2; text-indent: 17px; text-align: center;
    b{ font-size: 1.6rem;}
  }
}
</style>
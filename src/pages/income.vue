<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-income-count">
        <div class="l-flex-hc">
          <div class="l-rest">
            <h3 class="l-fs-l">{{income.allBackAmount | currency}}</h3>
            <p class="l-fs-s l-text-gray">总收益(元)</p>
          </div>
          <div class="l-rest">
            <h3 class="l-fs-l">{{income.marketValue | currency}}</h3>
            <p class="l-fs-s l-text-gray">库存总值(元)</p>
          </div>
        </div>
        <div class="l-flex-hc" style="border-top:0.05rem solid rgba(255, 255, 255, 0.1); margin-top:0.75rem; padding-top: 0.75rem;">
          <div class="l-rest">
            <h3 class="l-fs-l">{{income.accumulatedIncome | currency}}</h3>
            <p class="l-fs-s l-text-gray">已返利金额(元)</p>
          </div>
          <div class="l-rest">
            <h3 class="l-fs-l">{{income.readyAmount | currency}}</h3>
            <p class="l-fs-s l-text-gray">待返利金额(元)</p>
          </div>
        </div>
      </div>

      <div class="l-income-month l-flex-hc l-link-arrow" @click="$link('/income/details')">
        <div class="l-border-r _month">
          <b>{{month}}</b>月返利
        </div>
        <div class="l-rest l-margin-l">
          <b class="l-text-warn l-fs-l">+{{income.amount | currency}}</b>
        </div>
        <div class="l-text-gray">
          <span class="l-fs-s">返利明细</span>
        </div>
      </div>

      <div class="l-income-month l-flex-hc l-link-arrow" @click="$link('/income/details2')">
        <div class="l-border-r _month">
          <b>{{month}}</b>月返现
        </div>
        <div class="l-rest l-margin-l">
          <b class="l-text-warn l-fs-l">+{{income.remittanceAmount | currency}}</b>
        </div>
        <div class="l-text-gray">
          <span class="l-fs-s">返现明细</span>
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
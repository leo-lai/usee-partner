<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-income-count l-sticky">
        <div class="_top">
          <span class="l-icon l-fs-xl l-abs" style="top:-1px; right:0.75rem;">&#xe611;</span>
          <span>{{month}}月返现(元)</span>
          <input type="month" @change="sltMonth">
        </div>
        <div class="l-padding">
          <p><span class="l-fs-xl">{{totalAmount | currency}}</span></p>  
          <p class="l-fs-xs l-margin-t">注：平台打款与银行实际到账时间可能存在3个工作日内的时间差，请留意您的账户信息</p>
        </div>
      </div>
      <table class="l-details-list l-fs-s">
        <thead>
          <tr>
            <th width="70">打款时间</th>
            <th width="40">金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>{{item.remittanceDate}}</td>
            <td><span class="l-text-error">{{ item.remittanceAmount | currency }}</span></td>
          </tr>
        </tbody>
      </table>
      <infinite-loading :on-infinite="onInfinite" ref="infinite">
        <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
        <div class="l-text-gray l-fs-m" slot="no-results">没有相关的数据</div>
        <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
import infiniteLoading from 'components/vue-infinite-loading'

let month = new Date().getMonth() + 1
export default {
  components: {
    infiniteLoading
  },
  data () {
    return {
      rebateRecordState: {
        '0': {
          cls: 'l-text-warn',
          name: '返利中'
        },
        '1': {
          cls: 'l-text-ok',
          name: '已返利'
        },
        '2': {
          cls: 'l-text-error',
          name: '返利失败'
        }
      },
      rebateRecordType: ['','商城销售返点','销售额外奖励','区域管理返点','集团分红','推荐区域返点','邮寄直接返点', '成本返利'],
      month,
      loading: false,
      totalAmount: 0,
      page: 1,
      list: [],
    }
  },
  methods: {
    sltMonth(e) {
      this.month = Number(e.target.value.split('-')[1])
      this.list = []
      this.$refs.infinite.$emit('$InfiniteLoading:reset')
    },
    onInfinite() {
      this.$server.getIncomeDetails2(this.month, this.page)
      .then(({data})=>{
        let returnList = data.remittances
        this.totalAmount = (data.allAmount || 0).toFixed(2)
        this.list = this.list.concat(returnList)
        if(returnList.length > 0){
          this.$nextTick(()=>{
            this.$refs.infinite.$emit('$InfiniteLoading:loaded')    
          })
          
          if(returnList.length >= data.rows){
            this.page++
          }else{
            this.$refs.infinite.$emit('$InfiniteLoading:complete')
          }
        }else{
          this.$refs.infinite.$emit('$InfiniteLoading:complete')
        }
      }).catch(()=>{
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      })
    }
  },
  created() {

  }
}
</script>
<style scoped lang="less">
.l-income-count{
  background: linear-gradient(135deg, #1e1716, #4c3530, #403534); color: #fff; text-align: center;
  ._top{
    padding: 0.375rem 0.75rem ; font-size: 0.75rem; border-bottom: 0.05rem solid rgba(255, 255, 255, 0.1);
    position: relative;
    input{position: absolute; top:0;left:0; width: 100%; height: 100%; opacity: 0; margin: 0;}
  }
}
.l-details-list{
  width: 100%; table-layout: fixed;
  tbody{background: #fff;}
  th, td{padding: 0.5rem; text-align: center;border-bottom: 1px solid #ddd;}
}
</style>
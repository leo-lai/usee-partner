<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-income-count">
        <div class="_top">
          <span class="l-icon l-fs-xl l-abs" style="top:-1px; right:0.75rem;">&#xe611;</span>
          <span>{{month}}月收益</span>
          <input type="month" @change="sltMonth">
        </div>
        <div class="l-padding">
          <p><span class="l-fs-xl" style="">+{{totalAmount}}</span></p>  
        </div>
      </div>
      <table class="l-details-list l-fs-s">
        <thead>
          <tr>
            <th width="50">收益类型</th>
            <th width="30">时间</th>
            <th width="20">金额</th>
            <!-- <th width="10">查看</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>
              <p>{{item.goodsName}}</p>
              <p>{{item.orderCode}}</p>
              <p class="l-text-ok" v-if="item.rebateRecordState == 1">已返利</p>
              <p class="l-text-warn" v-else>返利中</p>
            </td>
            <td>{{item.startDate}}</td>
            <td><span class="l-text-warn">+{{item.amount}}</span></td>
            <!-- <td><a class="l-icon l-fs-l">&#xe71d;</a></td> -->
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
      this.$server.getIncomeDetails(this.month)
      .then(({data})=>{
        let returnList = data.rebateRecords
        this.totalAmount = (data.totalAmount || 0).toFixed(2)
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
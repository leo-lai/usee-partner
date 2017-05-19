<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-income-count l-sticky">
          <div class="_top">
            <span class="l-icon l-fs-xl l-abs" style="top:-1px; right:0.75rem;">&#xe611;</span>
            <span>{{month}}月返利(元)</span>
            <input type="month" @change="sltMonth">
          </div>
          <div class="l-padding">
            <p><span class="l-fs-xl">{{totalAmount | currency}}</span></p>
            <p class="l-fs-xs l-margin-t" @click="$pageTo('#page-rules', '返利说明')"><i class="l-icon">&#xe689;</i>&ensp;返利说明</p>
          </div>
        </div>
        <table class="l-details-list l-fs-s">
          <thead>
            <tr>
              <th width="70">返利类型</th>
              <th width="30">时间</th>
              <th width="20">金额</th>
              <!-- <th width="10">查看</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td class="l-fs-xs" style="text-align:left;white-space: nowrap;">
                <p>订单：{{item.orderCode}}</p>
                <p>类型：{{rebateRecordType[Math.abs(item.rebateRecordType)]}}</p>
                <p>区域：{{item.area || ''}}</p>
                <p>状态：<span :class="rebateRecordState[item.rebateRecordState].cls">{{ item.amount > 0 ? rebateRecordState[item.rebateRecordState].name : '退货扣除' }}</span>
                </p>
              </td>
              <td>{{item.startDate}}</td>
              <td><span :class="item.amount > 0 ? 'l-text-ok' : 'l-text-error'">{{ item.amount | currency }}</span></td>
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
    <div class="l-page" id="page-rules">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">返利说明</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-about-item l-margin-b">
          <h3 class="_tit">舒眼水返利类型介绍</h3>
          <div class="_cont">
            <h4 class="l-text-center l-margin-t">成本返点</h4>
            <p>当您线上的库存大于0时，您的客户直接购买或者其他客户购买配送至您的代理区域则直接产生199.00元的返成本点；</p>
            <h4 class="l-text-center l-margin-t">商城销售返点</h4>
            <p>您的客户直接购买或者其他客户购买配送至您的代理区域则直接产生商城销售返点，计算为前1000套每套返点29.85元，之后销售每套返点39.8元。</p>
            <h4 class="l-text-center l-margin-t">销售额外奖励</h4>
            <p>当您的客户直接购买和其他客户购买配送至您的代理区域累积数量每到达到3000套时，会产生销售额外奖励17910元。</p>
            <h4 class="l-text-center l-margin-t">邮寄直接返点</h4>
            <p>当您选择将您线上大于0的库存提货至线下时，将直接返点提货数量的成本及对应的销售收益及累计收益等。</p>
            <h4 class="l-text-center l-margin-t">集团分红返点</h4>
            <p>当集团累计销售到6000万套及以上,当您完成本区域的销售任务即可产生集团分红返点，计算规则销售套数*199元的1%的加权平分。</p>
          </div>
        </div>
        <div class="l-about-item l-margin-b">
          <h3 class="_tit">返点规则</h3>
          <div class="_cont">
            <ul>
              <li>所有订单需要实际付款才能产生返点；</li>
              <li>当订单出现退款并被平台通过时，该订单会根据退款金额生成对冲返利流水抵扣部分或全部同一订单产生的返点金额；</li>
              <li>订单支付成功产生的返利处于返利中的状态，需要经过平台审核返点的流水状态才能变成已返利；</li>
              <li>首页统计的累计返利为所有订单产生的返利中和已返利金额的总和</li>
            </ul>   
          </div>
        </div>
        <div class="l-about-item l-margin-b">
          <h3 class="_tit">返点提现</h3>
          <div class="_cont">
            <ul>
              <li>所有返点流水将由平台审核通过直接打款给区域代理商；</li>
              <li>审核和打款频率为每周一次；</li>
              <li>打款明细可以在“累计收益”中的“返现明细”中查看；</li>
            </ul>   
          </div>
        </div>
      </div>
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
        },
        '3': {
          cls: 'l-text-ok',
          name: '已打款'
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
      this.$server.getIncomeDetails(this.month, this.page)
      .then(({data})=>{
        let returnList = data.rebateRecords
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
.l-about-item{
  overflow: hidden; background: #fff; padding: 0.5rem 0;
  ._tit{
    text-align: center; color: #ff784e; margin: 0.75rem 0;
  }
  ._tit:after{
    content: ''; display: block; width: 1rem; margin:0.125rem auto 0; height: 0.1rem; background: #ff784e;
  }
  ._cont{
    margin: 0.75rem; font-size: 0.75rem;
    p{text-indent: 2em;}
    ul{ list-style-type: decimal; padding: 0 0 0 1rem; }
  }
}
</style>
<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <div class="l-index-menu">
        <router-link class="_item" to="/income">
          <img src="~assets/images/layout-004.jpg" alt="">
          <div class="_inner l-flex-vhc">
            <p class="l-fs-xl"><b class="l-icon">&#xe6cb;</b>{{indexData.accumulatedIncome | currency}}</p>
            <p class="l-fs-m"><i class="l-icon l-margin-r-s">&#xe9cb;</i>总收益 <span class="l-fs-s">(含待返利)</span></p>
          </div>
        </router-link>
        <router-link class="_item" to="/stock">
          <img src="~assets/images/layout-005.jpg" alt="">
          <div class="_inner l-flex-vhc">
            <p class="l-fs-xl">{{indexData.goodShok}}</p>
            <p class="l-fs-m"><i class="l-icon l-margin-r-s">&#xe64e;</i>剩余库存</p>
          </div>
        </router-link>
        <router-link class="_item" to="/me/customer">
          <img src="~assets/images/layout-006.jpg" alt="">
          <div class="_inner l-flex-vhc">
            <p class="l-fs-xl">{{indexData.bindingNumber}}</p>
            <p class="l-fs-m"><i class="l-icon l-margin-r-s">&#xe8fe;</i>我的客户</p>
          </div>
        </router-link>
      </div>
      <div class="l-loading-inline" v-if="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      <div class="l-margin-tb">
        <div class="l-qrcode-img">
          <div class="canvas" ref="qrcode">
            <qrcanvas :options="qrcodeObj"></qrcanvas>
          </div>
          <img :src="qrcodeImg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
import Qrcanvas from 'qrcanvas-vue'

let qrLogo = require('assets/images/logo.jpg')
export default {
  components: {
    navTab, Qrcanvas
  },
  data () {
    return {
      loading: false,
      indexData: {},
      defaultAvatar: require('assets/images/avatar.jpg'),
      userInfo: {
        amount: 0,
        bindingNumber: 0,
        totalAmount: 0
      },
      qrcodeObj: {},
      qrcodeImg: ''
    }
  },
  methods: {
    convertToImage(){
      const qrcodeCanvas = this.$refs.qrcode.children[0]
      if(!qrcodeCanvas) return ''

      const type = 'image/png'
      // let imageData = qrcodeCanvas.toDataURL(type).replace(type, 'image/octet-stream') || ''
      let imageData = qrcodeCanvas.toDataURL(type) || ''
      this.$storage.local.set('qrcode_img', imageData, 1000*60*1)
      return imageData
    },
    createQrcode(imageData) {
      const self = this
      let bgImg = new Image()
      bgImg.onload = function(){
        self.qrcodeObj = Object.assign({}, self.qrcodeObj, {
          data: self.$server.getShopHost() + '/shop?_from=scan&_qruc=' + self.userInfo.userCode,
          cellSize: 5,
          correctLevel: 'H',
          typeNumber: 5,
          foreground: [
            {style: '#1e1716'},
            // outer squares of the positioner
            {row: 0, rows: 7, col: 0, cols: 7, style: '#4c3530'},
            {row: -7, rows: 7, col: 0, cols: 7, style: '#4c3530'},
            {row: 0, rows: 7, col: -7, cols: 7, style: '#4c3530'},
            // inner squares of the positioner
            {row: 2, rows: 3, col: 2, cols: 3, style: '#a27e76'},
            {row: -5, rows: 3, col: 2, cols: 3, style: '#a27e76'},
            {row: 2, rows: 3, col: -5, cols: 3, style: '#a27e76'},
          ],
          background: '#ffffff',
          logo: {
            image: bgImg,
            size: 0.1,
            fontStyle: 'bold',
            color: '#f35b54',
            text: 'U视一号',
            margin: 3
          },
          effect: {
            key: 'round', // image liquid round
            value: 0.2  
          }
        })

        self.$nextTick(()=>{
          self.qrcodeImg = self.convertToImage()
        })
      }
      bgImg.src = imageData
    },
    getUserInfo() {
      this.loading = true
      this.$server.user.getInfo().then(({data})=>{
        this.userInfo = data
        
        if(this.$storage.local.get('qrcode_img')){
          this.$nextTick(()=>{
            this.qrcodeImg = this.$storage.local.get('qrcode_img')
          })
        }else{
          this.$server.getImageBase64(data.avatar).then(({data})=>{
            qrLogo = data
          }).finally(()=>{
            setTimeout(()=>{
              this.createQrcode(qrLogo)  
            }, 600)
          })
        }
      }).finally(()=>{
        this.loading = false
      })
    }
  },
  created() {
    this.loading = true
    this.$server.getIndexData().then(({data})=>{
      this.indexData = data
    }).finally(()=>{
      this.loading = false
    })

    this.$storage.local.remove('qrcode_img')
    this.getUserInfo()
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

.l-qrcode-img{
  width: 8rem; height: 8rem; margin:0 auto; text-align: center; position: relative; z-index: 1;
  .canvas{display: none;}
  img{width: 100%; height: 100%;}
}
.l-qrcode-img:after{
  content: '二维码生成中...'; position: absolute; left:0; right: 0; text-align: center; top: 50%; margin-top: -0.3rem;
  font-size: 0.6rem; color: #999; z-index: -1;
}
</style>
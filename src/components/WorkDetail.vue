<template>
<div class="content scroll">
  <x-header style="width: 100%; position: absolute; left: 0; top: 0; z-index: 100;">This is the page title.</x-header>
  <div style="position: absolute;top: 46px;bottom: 50px;width: 100%;left: 0;overflow-y: auto">
    <user-info-min :info="userinfo" />
    <div class="detail_content">
      <div class="detail_content_info" v-html="info"></div>
      <ul class="detail_content_show" v-html="show"></ul>
    </div>
  </div>

  <div class="footer">
    <div style="width: 45%;display: flex;">
      <div class="footer_item" style="padding-top: 5px;width: 50%;padding-left: 16px;">
        <i class="icon iconfont icon-shouye112"></i>
        <div style="margin-top: -3px;">喜欢</div>

      </div>
      <div class="footer_item" style="padding-top: 5px;width: 50%;padding-right: 16px;">
        <i class="icon iconfont icon-icon26"></i>
        <div style="margin-top: -3px;">分享</div>
      </div>
    </div>
    <div class="footer_item" style="width: 55%;background:#fe2a43 ">
      <div style="width: 100%;font-size: 18px;float: left;line-height: 50px;color:#fff">立即购买</div>
    </div>
  </div>

</div>
</template>

<script>
import { jsonp, $dom, workInfor, workShow, getUserInfoMin, showloadin, hideloadin } from '../mixin/util'
import { io_detail } from '../mixin/url'
import UserInfoMin from './UserInfoMin.vue'
import { XHeader } from 'vux'

export default {
  components: { XHeader,UserInfoMin },
  name: 'workDetail',
  mounted() {
    showloadin()
    jsonp(io_detail, {path: this.$route.path}).then(res => $dom(res.body)).then($ => {
      this.info = workInfor($)
      this.show = workShow($)
      this.userinfo = getUserInfoMin($)
      hideloadin()
    })
  },
  data () {
    return {
      info: '',
      show: '',
      userinfo: {}
    }
  }
}
</script>

<style lang="less">
  @import "../style/mixin.less";
  .footer {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, .16);
    z-index: 90;

    &_item {
      display: inline-block;
      text-align: center;
      font-size: 11px;
      color: @color_desc;
      transition: all .3s ease;
      /*&:nth-child(1) {*/
         /*width: 18%;*/
        /*padding-left: 20px;*/
      /*}*/
  /*&:nth-child(2) {*/
     /*width: 18%;*/
   /*}*/


      &.active {
         color: @color_active;
      }
      i {
        display: block;
        font-size: 24px;
        line-height: 1.2;
      }
    }
  }
  .detail_content{
    li {
      list-style: none;
    }
    &_info {
      margin-bottom: 15px;
    }
    &_show {
      .wsContent{
        font-size: 0;
      }
      .wsDes p{
        line-height: 1.4;
        margin: 6px auto;
      }
    }
  }
</style>

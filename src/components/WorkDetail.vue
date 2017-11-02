<template>
<div class="content">
  <x-header style="width: 100%; position: absolute; left: 0; top: 0; z-index: 100;">This is the page title.</x-header>
  <div style="position: absolute;top: 46px;bottom: 50px;width: 100%;left: 0;overflow-y: auto">
    <user-info-min :info="userinfo" />
    <div class="detail_content">
      <div class="detail_content_info" v-html="info"></div>
      <ul class="detail_content_show" v-html="show"></ul>
    </div>
  </div>

  <div id="s-actionBar-container">
    <div class="action-bar-wrap j-bottom-bar    ">
      <a class="support cell" href="http://im.m.taobao.com/ww/ad_ww_dialog.htm?item_num_id=524011612556&amp;pds=wwseller%23h%23detail&amp;to_user=saa94LnZt73G7L2iteo%3D">客服</a>

      <a class="toshop cell" href="//pg.m.tmall.com">进店</a>

      <a class="addfav cell">收藏</a>
      <div class="mods-wrap"></div>
      <div class="trade">
        <a class="cart " role="button">加入购物车</a>
        <a class="info" role="button"></a>
        <a class="buy " role="button">立即购买</a>
      </div>
    </div>
    <a href="//h5.m.taobao.com/awp/base/cart.htm" class="cart-link"><span>购物车</span></a>
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

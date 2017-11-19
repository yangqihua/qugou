<template>
  <div class="goods_detail">
    <x-header class="header">趣购</x-header>
    <div class="content">
      <previewer :list="preview_imgs" ref="previewer" :options="options"></previewer>
      <swiper loop :aspect-ratio="900/900" dots-class="dots" :show-dots="true" dots-position="center">
        <swiper-item v-for="(img, index) in goodsDetails.img_urls" :key="index" @click.native="previewImage(index)">
          <img :src="img.url" class="previewer-img">
        </swiper-item>
      </swiper>
      <div class="good_info">
        <div class="good_info_title">{{goodsDetails.name}}</div>
        <div class="good_info_home_desc">{{goodsDetails.goods_desc}}</div>
        <div class="good_info_price">￥{{goodsDetails.price}}</div>
        <div class="good_info_msg">
          <div class="good_info_like"><i class="icon iconfont icon-shouye112"></i>{{goodsDetails.collection_num}}</div>
          <div class="good_info_share"><i class="icon iconfont icon-icon26"></i>{{goodsDetails.share_num}}</div>
        </div>
        <div class="good_info_detail_desc" v-for="(item,index) in goodsDetails.detail_desc_array">{{item}}</div>
        <div class="good_info_video">
          <div v-for="item in goodsDetails.video_urls">
            <div>{{item.desc}}</div>
            <video style="width: 100%;background:#888" controls :src="item.url"></video>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div style="width: 45%;display: flex;">
        <div class="footer_item" @click.prevent.stop="collect" style="padding-top: 5px;width: 50%;padding-left: 16px;">
          <i class="icon iconfont icon-shouye112"></i>
          <div style="margin-top: -3px;">喜欢</div>

        </div>
        <div class="footer_item" @click.prevent.stop="share" style="padding-top: 5px;width: 50%;padding-right: 16px;">
          <i class="icon iconfont icon-icon26"></i>
          <div style="margin-top: -3px;">分享</div>
        </div>
      </div>
      <div class="footer_item" style="width: 55%;background:#fe2a43 ">
        <div style="width: 100%;font-size: 18px;float: left;line-height: 50px;color:#fff" @click.stop.prevent="buy">
          立即购买
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {base_public_url} from '../../utils/url'
  import {XHeader, Swiper, SwiperItem, Previewer, TransferDom} from 'vux'
  import {jsonp, $dom, workInfor, workShow, getUserInfoMin, showloadin, hideloadin} from '../../utils/util'
  import {io_detail} from '../../utils/url'

  export default {
    name: 'goodsDetail',
    directives: {TransferDom},
    components: {XHeader, Swiper, SwiperItem, Previewer},
    data () {
      return {
        info: '',
        show: '',
        userinfo: {},
        swiperList: [
          {'src': 'https://img1.360buyimg.com/da/jfs/t9658/50/2497799532/100899/dc9874fc/59f7f316N4a2ec114.jpg'},
          {'src': 'https://m.360buyimg.com/mobilecms/s720x322_jfs/t7339/201/3658119282/143571/eef8b8e7/59f69d4bNbbc598e8.jpg!q70.jpg'},
          {'src': 'https://img1.360buyimg.com/da/jfs/t10711/27/2299238356/87351/43136b5c/59f2f52bN41a490be.jpg'},
          {'src': 'https://m.360buyimg.com/mobilecms/s720x322_jfs/t10960/73/2293607924/78443/e3aa7e5f/59f3720cNd8348186.jpg!q70.jpg'}
        ],
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            let options = {x: 0, y: rect.top + pageYScroll, w: rect.width}
            return options
            // http://javascript.info/tutorial/coordinates
          }
        },
        videoList: [
          {
            'desc': '专业吐槽20年',
            'link': 'http://gslb.miaopai.com/stream/59GHBucVUhQz0bgrhHdlvKh-5X2BipKUhWVjJw__.mp4?ssig=434174728ab2a1be6848c6e083f5e26a&time_stamp=1509550023250&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=59GHBucVUhQz0bgrhHdlvKh-5X2BipKUhWVjJw__'
          },
        ],
        goodsDetails: {},
        preview_imgs: [],
      }
    },
    methods: {
    	collect(){
        this.$vux.toast.text('开发中...');
      },
      share(){
        this.$vux.toast.text('开发中...');
      },
      buy(){
        location.href = this.goodsDetails['link']
      },
      previewImage(index){
        this.$refs.previewer.show(index);
      }
    },
    mounted() {
      showloadin()
      let params = {
        url: 'goods/details?goods_id=' + this.$route.params.id,
        scb: (data) => {
          hideloadin()
          this.goodsDetails = data
          if(this.goodsDetails.img_urls) {
            this.goodsDetails.img_urls.map(item => {
              item.url = base_public_url + item.url
              let preview_img = {src: item.url};
              this.preview_imgs.push(preview_img);
            })
          }
          if(this.goodsDetails.video_urls){
            this.goodsDetails.video_urls.map(item => {
              item.url = base_public_url + item.url
            })
          }
        },
        ecb: (err) => {
          hideloadin()
        }
      }
      this.$ajax(params)
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/mixin.less";

  .good_info {
    text-align: center;
    line-height: 28px;
    margin-top: 16px;
    margin-bottom: 16px;
    .good_info_title {
      font-size: 18px;
    }
    .good_info_home_desc {
      font-size: 13px;
      color: #888;
    }
    .good_info_price {
      margin-top: 5px;
      font-size: 20px;
      color: @color_active;
    }
    .good_info_msg {
      font-size: 13px;
      display: flex;
      justify-content: center;
      color: @color_desc;
      .good_info_like {
        padding-right: 10px;
      }
      .good_info_share {
        padding-left: 10px;
      }
      .iconfont {
        margin-right: 2px;
        font-size: 13px;
      }
    }
    .good_info_detail_desc {
      text-indent: 2em;
      text-align: left;
      font-size: 14px;
      color: #888;
    }
    .good_info_video {
      font-size: 14px;
      margin-top: 15px;
      /*color: #888;*/
    }
  }

  .previewer-img {
    width: 100%;
  }

  .cc_dots {
    bottom: 5px !important;
    .vux-icon-dot {
      background-color: rgba(255, 255, 255, .4) !important;
      &.active {
        background-color: #ff0000 !important;
      }
    }
  }

  .goods_detail {
    .content {
      /*position: absolute;*/
      padding-top: 46px;
      padding-bottom: 50px;
      width: 100%;
      overflow-y: auto
    }
  }

  .footer {
    display: flex;
    position: fixed;
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

  .detail_content {
    li {
      list-style: none;
    }
    &_info {
      margin-bottom: 15px;
    }
    &_show {
      .wsContent {
        font-size: 0;
      }
      .wsDes p {
        line-height: 1.4;
        margin: 6px auto;
      }
    }
  }
</style>

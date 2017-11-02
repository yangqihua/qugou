<template>

  <div>
    <flexbox :gutter="0" style="background-color: #EFEFF4;">
      <flexbox-item span="60">
        <img height="22" src="../assets/logo-wenzi.png" style="margin: 6px 0 0 12px">
      </flexbox-item>
      <flexbox-item>
        <search
          @result-click="resultClick"
          @on-change="getResult"
          :results="results"
          v-model="value"
          position="absolute"
          auto-scroll-to-top
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search"></search>
      </flexbox-item>
    </flexbox>

    <!--<video id="vdo" style="width: 100%" controls src="https://wsqncdn.miaopai.com/stream/DtgNKNaSdsn~df2NefBbu1kKv8eUI5FKBtS7iw___0_1509418344.mp4?ssig=bb454cd92a093dcb84f4efb1c928f158&time_stamp=1509547390598"></video>-->
    <!--<video id="vdo" style="width: 100%" controls src="http://gslb.miaopai.com/stream/59GHBucVUhQz0bgrhHdlvKh-5X2BipKUhWVjJw__.mp4?ssig=434174728ab2a1be6848c6e083f5e26a&time_stamp=1509550023250&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=59GHBucVUhQz0bgrhHdlvKh-5X2BipKUhWVjJw__"></video>-->

    <div class="cc_tabs">
      <tab :line-width="2" active-color="#fe2a43" defaultColor="#2b333b">
        <tab-item selected @on-item-click="onItemClick">精选</tab-item>
        <tab-item @on-item-click="onItemClick">实用类</tab-item>
        <tab-item @on-item-click="onItemClick">有趣类</tab-item>
        <tab-item @on-item-click="onItemClick">冷门类</tab-item>
        <tab-item @on-item-click="onItemClick">黑科技</tab-item>
      </tab>
    </div>

    <scroller lock-x use-pullup
              v-model="status"
              @on-pullup-loading="pullup"
              height="-138"
              ref="scroller">


      <div>
        <swiper loop auto :aspect-ratio="350/900" dots-class="cc_dots" :show-dots="true" dots-position="center">
          <swiper-item class="black" v-for="(img, index) in data.showbox" :key="index"
                       :style="{background:'url('+img.image+') center center / cover no-repeat'}">
          </swiper-item>
        </swiper>
        <!--<content-nav/>-->
        <!--<div class="part"></div>-->
        <div class="content_photo">
          <c-panel :list="data.list"/>
        </div>
      </div>

      <!--pullup slot { pullupStatus : default , up , down , loading } -->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
      <span class="pullup-arrow iconfont" v-show="status.pullupStatus !== 'loading'"
            :class="{'rotate': status.pullupStatus === 'down'}">&#xe7a8;</span>
        <span v-show="status.pullupStatus === 'loading'">
        <load-more tip="努力加载中" class="cc_loadmore"></load-more>
      </span>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {Tab, TabItem,Flexbox, FlexboxItem, Search, Swiper, SwiperItem, Scroller, LoadMore} from 'vux'
  import cPanel from './Panel'
  import ContentNav from './ContentNav'

  export default {
    components: {
      Tab, TabItem,
      Flexbox,
      FlexboxItem,
      Search,
      Swiper,
      SwiperItem,
      Scroller,
      LoadMore,
      cPanel,
      ContentNav,
    },
    activated () {
      this.$refs.scroller.reset()
    },
    data () {
      return {
        page: 1,
        status: {
          pullupStatus: 'default'
        },
        results: [],
        value: ''
      }
    },

    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
      },
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus');
        this.results = getResult(100)
      },
      onCancel () {
        console.log('on cancel')
      },
      pullup() {
        this.$store.dispatch('getListBy', ++this.page)
      }
    },
    computed: {
      data() {
        this.$nextTick(() => {
          this.status.pullupStatus = 'default'
          this.$refs.scroller.reset()
        })
        return this.$store.state.base_data
//        return {
//          'showbox': [
//            {'image': 'https://img1.360buyimg.com/da/jfs/t9658/50/2497799532/100899/dc9874fc/59f7f316N4a2ec114.jpg'},
//            {'image': 'https://m.360buyimg.com/mobilecms/s720x322_jfs/t7339/201/3658119282/143571/eef8b8e7/59f69d4bNbbc598e8.jpg!q70.jpg'},
//            {'image': 'https://img1.360buyimg.com/da/jfs/t10711/27/2299238356/87351/43136b5c/59f2f52bN41a490be.jpg'},
//            {'image': 'https://m.360buyimg.com/mobilecms/s720x322_jfs/t10960/73/2293607924/78443/e3aa7e5f/59f3720cNd8348186.jpg!q70.jpg'}
//          ],
//          'list': [
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t9694/307/2248495407/308972/9d9534bd/59f2d944N03746d4f.jpg!q70.jpg','title': '测试1测试测试1测试1试测测试1测试测试1测试1试测测试1测试测试1测试1试测试1测试1试测试1测试1', 'reqi': '121', 'tuijian': '123'},
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t5848/357/3826096314/779924/d163b5e6/59438e2eN872d6984.jpg!q70.jpg','title': '测试1', 'reqi': '121', 'tuijian': '123'},
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t5614/81/1288439314/111076/bcc26c9e/5925436dN2290cfaf.jpg!q70.jpg','title': '测试1', 'reqi': '121', 'tuijian': '123'},
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t9694/307/2248495407/308972/9d9534bd/59f2d944N03746d4f.jpg!q70.jpg','title': '测试1', 'reqi': '121', 'tuijian': '123'},
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t8752/104/1203359829/245167/811205fc/59b6410cNb8501517.jpg!q70.jpg','title': '测试1', 'reqi': '121', 'tuijian': '123'},
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t11143/87/579851484/139654/7243da21/59f3e6f5N8e594cb4.jpg!q70.jpg','title': '测试1', 'reqi': '121', 'tuijian': '123'},
//            {'image':'http://m.360buyimg.com//mobilecms/s276x276_jfs/t8761/52/241075157/231061/a934f821/59a3ca01Nc53707d5.jpg!q70.jpg','title': '测试1', 'reqi': '121', 'tuijian': '123'},
//          ]
//        }
      }
    },

  }

  function getResult(val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>

<style lang="less">
  @import "../style/mixin.less";

  .cc_tabs{
    padding-bottom:1px;
    .vux-tab{
      height:40px;
      .vux-tab-item{
        font-size: 13px;
        line-height: 40px;
      }
    }
  }

  .content_photo {
    background: #fff;
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
  .cc_loadmore {
    margin: 0 auto 5px !important;
    span {
      color: @color_desc;
    }
  }

  .rotate {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }

  .pullup-arrow {
    display: block;
    transition: all linear 0.2s;
    -webkit-transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
</style>

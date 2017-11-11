<template>

  <div>
    <scroll :upCallback="upCallback" :emptyDataBtnClick="btnClick" ref="mescroll" warpId="index_scroll" id="index_scroll">
      <flexbox :gutter="0" style="background-color: #EFEFF4;">
        <flexbox-item span="60">
          <img height="22" src="../../assets/logo-wenzi.png" style="margin: 6px 0 0 12px">
        </flexbox-item>
        <flexbox-item>
          <search @on-focus="onFocus"></search>
        </flexbox-item>
      </flexbox>

      <div class="type_tabs">
        <sticky :check-sticky-support="false" ref="sticky" class="sticky">
          <tab :line-width="2" active-color="#fe2a43" defaultColor="#2b333b">
            <tab-item selected @on-item-click="onItemClick">精选</tab-item>
            <tab-item @on-item-click="onItemClick">实用类</tab-item>
            <tab-item @on-item-click="onItemClick">有趣类</tab-item>
            <tab-item @on-item-click="onItemClick">冷门类</tab-item>
            <tab-item @on-item-click="onItemClick">黑科技</tab-item>
          </tab>
        </sticky>
      </div>

      <div>
        <swiper loop auto :aspect-ratio="350/900" dots-class="swiper_dots" :show-dots="true" dots-position="right">
          <swiper-item class="black" v-for="(img, index) in data.showbox" :key="index"
                       :style="{background:'url('+img.image+') center center / cover no-repeat'}">
          </swiper-item>
        </swiper>
        <panel :list="data.list"></panel>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem, Flexbox, FlexboxItem, Search, Swiper, SwiperItem, Sticky} from 'vux'
  import Panel from '../../components/common/Panel'
  import Scroll from '../../components/mescroll/Scroll'

  export default {
    components: {
      Scroll,
      Tab, TabItem,
      Flexbox,
      FlexboxItem,
      Search,
      Swiper,
      SwiperItem,
      Sticky,
      Panel,
    },
    data () {
      return {
        mescroll: null,
      }
    },
    methods: {
      onFocus () {
        this.$router.push('/search');
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      upCallback: function (page) {
        let params = {
          page: page.num,
          scb: (curPageData) => {
            this.$refs.mescroll.endSuccess(curPageData.length);
          },
          ecb: (err) => {
            this.$vux.toast.show({text: err, type: 'warn'})
            this.$refs.mescroll.endErr();
          }
        };
        this.$store.dispatch('getListBy', params)
      },
      btnClick() {
        alert("点击了去逛逛按钮");
      }
    },
    computed: {
      data() {
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

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";
  #index_scroll {
    padding: 0 0 52px 0;
  }
  .type_tabs {
    height: 40px;
    padding-bottom: 1px;
    .vux-tab {
      height: 40px;
      .vux-tab-item {
        font-size: 13px;
        line-height: 40px;
      }
    }
  }

  .swiper_dots {
    bottom: 5px !important;
    .vux-icon-dot {
      background-color: rgba(255, 255, 255, .4) !important;
      &.active {
        background-color: #ff0000 !important;
      }
    }
  }

</style>

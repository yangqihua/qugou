<template>

  <div>
    <flexbox :gutter="0" style="background-color: #EFEFF4;">
      <flexbox-item span="60">
        <img height="22" src="../../assets/logo-wenzi.png" style="margin: 6px 0 0 12px">
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


    <div class="cc_tabs">
      <tab :line-width="2" active-color="#fe2a43" defaultColor="#2b333b">
        <tab-item selected @on-item-click="onItemClick">精选</tab-item>
        <tab-item @on-item-click="onItemClick">实用类</tab-item>
        <tab-item @on-item-click="onItemClick">有趣类</tab-item>
        <tab-item @on-item-click="onItemClick">冷门类</tab-item>
        <tab-item @on-item-click="onItemClick">黑科技</tab-item>
      </tab>
    </div>

    <!--<scroller lock-x use-pullup-->
    <!--v-model="status"-->
    <!--@on-pullup-loading="pullup"-->
    <!--height="-138"-->
    <!--ref="scroller">-->


    <div>
      <swiper loop auto :aspect-ratio="350/900" dots-class="cc_dots" :show-dots="true" dots-position="center">
        <swiper-item class="black" v-for="(img, index) in data.showbox" :key="index"
                     :style="{background:'url('+img.image+') center center / cover no-repeat'}">
        </swiper-item>
      </swiper>
      <!--<scroll ref="scroll"-->
              <!--:data="data.list"-->
              <!--:pullUpLoad="true"-->
              <!--@pullingUp="pullup">-->
        <div class="content_photo mescroll" id="mescroll">
          <panel :list="data.list"></panel>
        </div>
      <!--</scroll>-->
    </div>

    <!--pullup slot { pullupStatus : default , up , down , loading } -->
    <!--<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">-->
    <!--<span class="pullup-arrow iconfont" v-show="status.pullupStatus !== 'loading'"-->
    <!--:class="{'rotate': status.pullupStatus === 'down'}">&#xe7a8;</span>-->
    <!--<span v-show="status.pullupStatus === 'loading'">-->
    <!--<load-more tip="努力加载中" class="cc_loadmore"></load-more>-->
    <!--</span>-->
    <!--</div>-->
    <!--</scroller>-->

  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem, Flexbox, FlexboxItem, Search, Swiper, SwiperItem, Scroller, LoadMore} from 'vux'
  import Panel from '../../components/common/Panel'
  import Scroll from '../../components/scroll/Scroll'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      Scroll,
      Tab, TabItem,
      Flexbox,
      FlexboxItem,
      Search,
      Swiper,
      SwiperItem,
      Scroller,
      LoadMore,
      Panel,
    },
    data () {
      return {
        pulldown: true,
        pull: null,
        page: 1,
        status: {
          pullupStatus: 'default'
        },
        results: [],
        value: '',
        mescroll: null,
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
      pullup(page) {
        console.log('page.num='+page.num+", page.size="+page.size)
        this.$store.dispatch('getListBy', page.num)
      }
    },
    mounted() {
      //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
      //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
      let self = this;
      self.mescroll = new MeScroll("mescroll", {
//        down:{use:false},
        up: {
          callback: self.pullup, //上拉回调
          //以下参数可删除,不配置
          //page:{size:8}, //可配置每页8条数据,默认10
          toTop:{ //配置回到顶部按钮
            src : "../res/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
            //offset : 1000
          },
          empty:{ //配置列表无任何数据的提示
            warpId:"dataList",
            icon : "../res/img/mescroll-empty.png" ,
            tip : "亲,暂无相关数据哦~" ,
            btntext : "去逛逛 >" ,
            btnClick : function() {
              alert("点击了去逛逛按钮");
            }
          },
          offset:200,
          htmlNodata:'<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
          scrollbar:{use:true,barClass : "mescroll-bar"},

        }
      });

      //初始化vue后,显示vue模板布局
//      document.getElementById("dataList").style.display="block";
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

<style lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

  .cc_tabs {
    padding-bottom: 1px;
    .vux-tab {
      height: 40px;
      .vux-tab-item {
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

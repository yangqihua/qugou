<template>

  <div>
    <scroll :upCallback="getData" :emptyDataBtnClick="btnClick" ref="mescroll" warpId="index_scroll"
            id="index_scroll">
      <flexbox :gutter="0" class="home_header">
        <flexbox-item span="60">
          <img height="22" src="../../assets/logo-wenzi.png" style="margin: 6px 0 0 12px">
        </flexbox-item>
        <flexbox-item>
          <search @result-click="resultClick"
                  @on-change="getResult"
                  v-model="searchValue"
                  position="fixed"
                  auto-scroll-to-top
                  @on-focus="onFocus"
                  @on-cancel="onCancel"
                  @on-submit="onSubmit"
                  placeholder="大家都在搜：黑科技">
            <search-content :searchValue="searchValue" :hotList="hotList" :historyList="historyList"></search-content>
          </search>
        </flexbox-item>
      </flexbox>


      <div v-show="!isSearch">
        <div class="type_tabs">
          <sticky :check-sticky-support="false" ref="sticky" class="sticky">
            <tab :line-width="2" active-color="#fe2a43" defaultColor="#2b333b">
              <tab-item selected @on-item-click="onTabItemClick">精选</tab-item>
              <tab-item @on-item-click="onTabItemClick">实用类</tab-item>
              <tab-item @on-item-click="onTabItemClick">有趣类</tab-item>
              <tab-item @on-item-click="onTabItemClick">冷门类</tab-item>
              <tab-item @on-item-click="onTabItemClick">黑科技</tab-item>
            </tab>
          </sticky>
        </div>

        <div>
          <swiper v-show="activeCategory==0" loop auto :aspect-ratio="350/900" dots-class="dots" :show-dots="true" dots-position="right">
            <swiper-item class="black" v-for="(img, index) in data.showbox" :key="index"
                         :style="{background:'url('+img.image+') center center / cover no-repeat'}">
            </swiper-item>
          </swiper>
          <panel :list="activeList"></panel>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {base_public_url} from '../../utils/url'
  import {Tab, TabItem, Flexbox, FlexboxItem, Search, Swiper, SwiperItem, Sticky} from 'vux'
  import Panel from '../../components/common/Panel'
  import Scroll from '../../components/mescroll/Scroll'
  import SearchContent from '../../components/search/SearchContent'

  export default {
    components: {Scroll, SearchContent, Tab, TabItem, Flexbox, FlexboxItem, Search, Swiper, SwiperItem, Sticky, Panel,},
    data () {
      return {
        isSearch: false,
        mescroll: null,
        results: [],
        searchValue: '',
        hotList: [
          {label: '黑科技', weight: 10},
          {label: '加湿器', weight: 9},
          {label: '搞怪', weight: 8},
          {label: '存钱罐', weight: 8},
          {label: '无人机', weight: 8},
          {label: '睡眠香水人机', weight: 8},
          {label: '睡眠香水', weight: 8},
        ],
        historyList: [
          {label: '黑科技', time: '09:23'},
          {label: '加湿器', time: '08:23'},
          {label: '搞怪', time: '08:20'},
          {label: '存钱罐', time: '08:10'},
          {label: '无人机', time: '08:01'}
        ],
        activeList: [],
        activeCategory: 0,
      }
    },
    methods: {
      onTabItemClick (index) {
        this.activeCategory = index;
        this.activeList = [];
        this.$refs.mescroll.resetUpScroll();
//        this.$refs.mescroll.triggerUpScroll();
//        console.log('on item click:', index)
      },
      getData(page){
        let params = {
          url: 'goods/homelist',
          params: {page: page.num, limit: page.size, category: this.activeCategory},
          scb: (data) => {
            this.$refs.mescroll.endSuccess(data.length);
            data.map((item) => {
              if (item['home_url'].hasOwnProperty('url')) {
                item['home_url'] = base_public_url + item['home_url']['url']
              }
            })
            this.activeList = this.activeList.concat(data)
          },
          ecb: (err) => {
            this.$refs.mescroll.endErr();
          }
        }
        this.$ajax(params)
      },
      setFocus () {
//        this.$router.push('/search');
        this.$refs.homeSearch.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? getResult(this.searchValue) : []
      },
      onSubmit () {
        this.$refs.homeSearch.setBlur()
      },
      onFocus () {
        console.log('on focus');
        this.isSearch = true
        this.results = getResult(100)
      },
      onCancel () {
        this.isSearch = false
//        this.$router.replace('/');
      },

      upCallback: function (page) {
        let params = {
          page: page.num,
          scb: (curPageData) => {
            this.$refs.mescroll.endSuccess(curPageData.length);
          },
          ecb: (err) => {
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
    created(){

    },
    watch: {
      isSearch(newVal, oldVal){
        if (newVal) {
          this.$refs.mescroll.deactivated();
        } else {
          this.$refs.mescroll.activated();
        }
      }
    }

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

<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/mixin.less";

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


</style>

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
              <tab-item @on-item-click="onTabItemClick">黑科技</tab-item>
              <tab-item @on-item-click="onTabItemClick">有意思</tab-item>
              <tab-item @on-item-click="onTabItemClick">萌萌哒</tab-item>
            </tab>
          </sticky>
        </div>

        <div>
          <swiper v-show="activeCategory==0" :list="ads" loop auto :aspect-ratio="300/500" dots-class="dots" :show-dots="true" dots-position="right">
            <!--<swiper-item class="black" v-for="(img, index) in ads" :key="index"-->
                         <!--:style="{background:'url('+img.img_url+') center center / cover no-repeat'}">-->
            <!--</swiper-item>-->
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
      },

      btnClick() {
        alert("点击了去逛逛按钮");
      }
    },
    computed: {
      ads() {
      	let ads = this.$store.state.ads;
        ads.map(item=>{
        	item.img = base_public_url+item.img;
        })
        return ads
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

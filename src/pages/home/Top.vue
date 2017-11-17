<template>
  <div>
    <scroll :upCallback="getData" :emptyDataBtnClick="btnClick" ref="mescroll" warpId="top_scroll"
            id="top_scroll">
      <x-header class="header" :left-options="{showBack: false}">
        {{title}}
        <i class="icon iconfont icon-icon" :class="{active:showAction}" slot="right"
           @click.stop.prevent="showAction=!showAction"></i>
      </x-header>
      <actionsheet v-model="showAction" :menus="ActionMenus" theme="android" @on-click-menu="clickAction">
      </actionsheet>

      <div class="top_list">
        <div class="top_item" v-for="(item, index) in data" :key="index"
             @click.prevent.stop="goDetails(item.goods_id)">

          <div class="top_item_img" :style="backgroundImg(item.home_url.url)"></div>

          <div class="top_item_info">
            <h4 class="ellipsis_text_2 title">{{item.name}}</h4>
            <div class="sub_info">
              <p class="top_item_info_price">￥{{item.price}}</p>
              <p class="top_item_info_like"><i class="icon iconfont icon-shouye112"></i>{{item.collection_num}}</p>
            </div>
          </div>
        </div>
      </div>

    </scroll>
  </div>
</template>

<script>
  import {base_public_url} from '../../utils/url'
  import {XHeader, Actionsheet} from 'vux'
  import Scroll from '../../components/mescroll/Scroll'
  export default {
    components: {XHeader, Actionsheet, Scroll},
    data () {
      return {
      	search:{
      		category:1,
          page:1,
          limit:1,
        },
        data:[],
        title: '综合榜单',
        showAction: false,
        activeAction: '1',
      }
    },
    methods: {
      getData(page){
      	this.search.page = page.num
      	this.search.limit = page.size
      	this.search.category = this.activeAction
        let params = {
          url: 'top/toplist',
          params: this.search,
          scb: (data) => {
            this.$refs.mescroll.endSuccess(data.length);
//            data.forEach((item) => {
//              if (item['data']['home_url'].hasOwnProperty('url')) {
//                item['home_url']= base_public_url + item['home_url']['url']
//              }
//            })
            this.data = this.data.concat(data)
          },
          ecb: (err) => {
            this.$refs.mescroll.endErr();
          }
        }
        this.$ajax(params)
      },
      backgroundImg(img){
        return {backgroundImage: 'url(' + base_public_url+img + ')'}
      },
      clickAction(menuKey, menuItem){
        let value = menuItem.value
      	if(this.activeAction==value){
      		return
        }
        this.title = value == '1' ? '综合榜单' : '本周榜单'
        this.activeAction = value
        this.data = [];
        this.$refs.mescroll.resetUpScroll();
      },
      goDetails(goods_id) {
        this.$router.push("/goods/"+goods_id)
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
        this.$store.dispatch('getWorks', params)
      },
      btnClick() {
        alert("点击了去逛逛按钮");
      }
    },
    computed: {
      ActionMenus(){
        let allTop = {label: '<span>综合榜单</span>', type: 'primary', value: '1'}
        let weekTop = {label: '<span>本周榜单</span>', type: 'primary', value: '2'}
        if (this.activeAction == '1') {
          allTop = {label: '<span style="color:red">综合榜单</span>', type: 'primary', value: '1'}
        } else {
          weekTop = {label: '<span style="color:red">本周榜单</span>', type: 'primary', value: '2'}
        }
        return [
          {label: '<p style="color:#b7bbbf;text-align: center">请选择</p>', type: 'info'},
          allTop, weekTop
        ]
      },
      content() {
        return this.$store.state.works_data
      }
    },

    created() {
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/mixin.less";

  #top_scroll {
    padding: 45px 0 52px 0;
    .header {
      .icon {
        padding: 8px 4px;
        font-size: 24px;
        color: @color_black_2;
        &.active {
          color: @color_red_2;
        }
      }
    }
  }

  .top_list {
    .top_item {
      margin: 10px;
      border: 1px solid @color_gray_2;
      border-radius: 4px;
      .top_item_img {
        width: 100%;
        height: 0;
        padding-bottom: 62%;
        overflow: hidden;
        background: no-repeat center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .top_item_info {
        margin-top: 6px;
        text-align: center;
        padding-right: 10px;

        .title {
          font-size: 14px;
          color: @color_black_2;
          font-weight: 400;
        }
        .sub_info {
          margin-top: 4px;
          display: flex;
          justify-content: center;
          .top_item_info_price {
            padding-right: 25px;
            color: @color_red_2;
          }
          .top_item_info_like {
            line-height: 25px;
            font-size: 14px;
            padding-left: 25px;
            color: @color_gray_3;
            .iconfont {
              font-size: 14px;
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div>
    <scroll :upCallback="upCallback" :emptyDataBtnClick="btnClick" ref="mescroll" warpId="top_scroll"
            id="top_scroll">
      <x-header class="header" :left-options="{showBack: false}">
        {{title}}
        <i class="icon iconfont icon-2" :class="{active:showAction}" slot="right"
           @click.stop.prevent="showAction=!showAction"></i>
      </x-header>
      <actionsheet v-model="showAction" :menus="ActionMenus" theme="android" @on-click-menu="clickAction">
      </actionsheet>

      <div class="top_list">
        <div class="top_item" v-for="(item, index) in content" :key="index"
             @click.prevent.stop="goDetails('work/ZMjQ3MjA5MzI=')">

          <div class="top_item_img">
            <img v-lazy="item.image" alt="缩略图" class="image">
          </div>

          <div class="top_item_info">
            <h4 class="ellipsis_text_2 title">{{item.title}}</h4>
            <div class="sub_info" style="display: flex;justify-content: center;">
              <p class="top_item_info_price">￥{{item.reqi}}</p>
              <p class="top_item_info_like"><i class="icon iconfont icon-shouye112"></i>{{item.tuijian}}</p>
            </div>
          </div>
        </div>
      </div>

    </scroll>
  </div>
</template>

<script>
  import {XHeader, Actionsheet} from 'vux'
  import Scroll from '../../components/mescroll/Scroll'
  export default {
    components: {XHeader, Actionsheet, Scroll},
    data () {
      return {
        title: '综合榜单',
        showAction: false,
        ActionMenus: [
          {label: '<p style="color:#b7bbbf">请选择</p>', type: 'info'},
          {label: '综合榜单', type: 'primary', value: '1'},
          {label: '本周榜单', type: 'primary', value: '2'},
        ],
      }
    },
    methods: {
      clickAction(menuKey, menuItem){
      	this.title = menuItem.label
        console.log(menuKey, menuItem)
      },
      goDetails(link) {
        this.$router.push(link)
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
      content() {
        return this.$store.state.works_data
      }
    },

    created() {
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

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
      border:1px solid @color_gray_2;
      border-radius: 4px;
      .top_item_img {
        width: 100%;
        vertical-align: top;
        .image {
          width: 100%;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
      .top_item_info {
        text-align: center;
        padding-right: 10px;

        .title {
          font-size: 14px;
          color: @color_black_2;
          font-weight: 400;
        }
        .sub_info{
          margin-top:6px ;
          .top_item_info_price {
            padding-right: 25px;
            color: @color_red_2;
          }
          .top_item_info_like{
            line-height: 25px;
            font-size: 14px;
            padding-left: 25px;
            color: @color_gray_3;
            .iconfont{
              font-size: 14px;
              margin-right: 2px;
            }
          }
        }


      }
    }
  }
</style>

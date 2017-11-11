<template>
  <div class="panel_wapper">
    <div class="panel_detail" v-for="(item, index) in list" :key="index">
      <div class="panel_detail_wrapper">
        <div class="panel_detail_image_wapper" @click.prevent.stop="goDetails(item.link)">
          <img
            v-lazy="item.image"
            alt="预览图"
            class="image"
            width="100%">
        </div>
        <div class="panel_detail_info">
          <div class="title ellipsis_text_1">{{item.title}}</div>
          <div class="desc ellipsis_text_2">{{item.title}}</div>
          <div class="share">
            <div class="price">￥{{item.reqi}}
            </div>
            <div class="collection">
              <i class="iconfont icon-shouye112"></i>{{item.tuijian}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    methods: {
      goDetails(link) {
        this.$router.push(link)
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

  .panel_wapper {
    padding: 10px;
    box-sizing: border-box;
    &:after {
      content: "";
      display: block;
      clear: both;
    }

    .panel_detail {
      /*background: #f9f8fb;*/
      position: relative;
      width: 50%;
      overflow: hidden;
      font-size: 0;
      float: left;
      /*padding-left: 12px;*/
      /*border: 1px solid #EFEFF4;*/
      padding-bottom: 8px;
      box-sizing: border-box;

      .panel_detail_wrapper {
        border: 1px solid @color_gray_2;
        border-radius: 3px;
        /*border-top-right-radius: 3px;*/
        /*box-shadow: 1px 1px 1px @color_gray_2;*/
      }

      &:nth-child(2n) {
        padding-left: 4px;
        /*border-left:4px solid #f9f8fb;*/
      }
      &:nth-child(2n+1) {
        padding-right: 4px;
        /*border-right:4px solid #f9f8fb;*/
      }

      &_image_wapper {
        width: 100%;
        background: @base_ground;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;

        .image {
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
          opacity: 0;
          transition: opacity .4s ease;
          &[lazy=loaded] {
            opacity: 1;
          }
        }
      }

      &_info {
        margin-top: 12px;
        .title {
          margin: 6px 4px 0 4px;
          color: @color_tit;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 400;
        }
        .desc {
          margin: 0 4px 0 4px;
          color: #999;
          font-size: 12px;
          line-height: 1.5;
          height: 34px;
          font-weight: 400;

        }
        .share {
          display: flex;
          justify-content: space-between;
          margin: 8px 4px 4px 4px;
          line-height: 14px;
          .price{
            font-size: 14px;
            color: @color_red_2;
          }
          .collection{
            i {
              font-size: 13px;
              margin-right: 2px;
            }
            font-size: 13px;
            color: @color_desc;
          }

        }
      }
    }
  }
</style>

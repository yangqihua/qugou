<template>
  <div class="cc_panel_wapper">
    <div class="cc_panel_detail" v-for="(item, index) in list" :key="index">
      <div style="background: #fff;border:1px solid #EFEFF4;border-top-left-radius:3px;border-top-right-radius:3px;box-shadow: 1px 1px 1px #EFEFF4;">
        <div class="cc_panel_detail_image_wapper" @click.prevent.stop="goDetails(item.link)">
          <img
            v-lazy="item.image"
            alt="预览图"
            class="image"
            width="250"
            height="188">
        </div>
        <div class="cc_panel_detail_info">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.title}}</div>
          <div class="share">
            <div>
              <i class="iconfont icon-icon1"></i> {{item.reqi}}
            </div>
            <div>
              <i class="iconfont icon-shouye111"></i> {{item.tuijian}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'list' ],
  methods: {
    goDetails(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="less">
  @import "../style/mixin.less";

  .cc_panel_wapper{
    /*margin-left: -12px;*/
    padding: 10px;
    background: #f9f8fb;
    box-sizing: border-box;
    &:after {
      content: "";
      display: block;
      clear: both;
    }

    .cc_panel_detail{
      background: #f9f8fb;
      position: relative;
      width: 50%;
      overflow: hidden;
      font-size: 0;
      float: left;
      /*padding-left: 12px;*/
      /*border: 1px solid #EFEFF4;*/
      padding-bottom: 8px;
      box-sizing: border-box;


      &:nth-child(2n) {
         padding-left: 4px;
         /*border-left:4px solid #f9f8fb;*/
      }
      &:nth-child(2n+1) {
         padding-right: 4px;
         /*border-right:4px solid #f9f8fb;*/
      }

      &_image_wapper {
        position: relative;
        /*margin-bottom: 5px;*/
        width: 100%;
        padding-top: (250/250)*100%;
        background: @base_ground;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;

        .image {
          position: absolute;
          left: 0;
          top: 0;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          opacity: 0;
          transition: opacity .4s ease;
          &[lazy=loaded] {
            opacity: 1;
          }
        }
      }

      &_info {
        .title {
          margin: 6px 4px 0 4px;

          display:block;
          overflow:hidden;
          word-break:keep-all;
          white-space:nowrap;
          text-overflow:ellipsis;

          color: @color_tit;
          font-size: 12px;
          line-height: 1.6;
          font-weight: 400;
        }
        .desc {
          margin: 0 4px 0 4px;

          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

          color: #999;
          font-size: 12px;
          line-height: 1.5;
          height: 34px;
          font-weight: 400;

        }
        .share {
          /*position: absolute;*/
          /*left: 12px;*/
          /*bottom: 12px;*/
          /*padding-right: 4px;*/
          display: flex;
          justify-content: space-between;
          margin: 6px 4px 4px 4px;
          color: @color_desc;
          font-size: 12px;
          line-height: 1;
          i {
            vertical-align: -2px;
          }
        }
      }
    }
  }
</style>

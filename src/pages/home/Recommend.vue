<template>
  <div>
    <scroll :upCallback="upCallback" :emptyDataBtnClick="btnClick" ref="mescroll" warpId="recommend_scroll"
            id="recommend_scroll">
      <x-header class="header" :left-options="{showBack: false}">每周推荐</x-header>
      <div class="recommend_list">
        <template v-for="(itemData, dataIndex) in content">
          <div class="recommend_time">{{itemData.time}}</div>
          <div class="recommend_data_item">
            <div class="recommend_item vux-1px-b" v-for="(item, itemIndex) in itemData.list" :key="itemIndex"
                 @click.prevent.stop="goDetails('work/ZMjQ3MjA5MzI=')">

              <div class="recommend_layer_info">
                <h4 class="ellipsis_text_2 title">{{item.title}}</h4>
                <p class="ellipsis_text_3 desc">{{item.desc}}</p>
              </div>

              <div class="recommend_layer_img">
                <img v-lazy="item.image" alt="缩略图" class="image">
              </div>
            </div>
          </div>
        </template>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import Scroll from '../../components/mescroll/Scroll'
  export default {
    components: {XHeader, Scroll},
    data () {
      return {
        page: 0,
      }
    },
    methods: {
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
        this.$store.dispatch('getArticles', params)
      },
      btnClick() {
        alert("点击了去逛逛按钮");
      }
    },
    computed: {
      content() {
        return this.$store.state.articles_data
      }
    },

    created() {
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

  #recommend_scroll {
    padding: 45px 0 52px 0;
  }

  .recommend_list {
    .recommend_time{
      border-radius: 4px;
      margin: 12px auto 2px auto;
      width: 60px;
      text-align: center;
      color: @color_white_10;
      background: #dadada;
      font-size: 13px;
      line-height: 24px;
    }
    .recommend_data_item {
      .recommend_item {
        display: flex;
        padding: 10px;

        .recommend_layer_img {
          flex: 140px 0 0;
          width: 120px;
          vertical-align: top;
          .image {
            border-radius: 3px;
          }
        }

        .recommend_layer_info {
          flex: 1;
          padding-right: 10px;
          height: 104px;
          overflow: hidden;

          .title {
            font-size: 16px;
            color: @color_tit;
            font-weight: 400;
            max-height: 50px;
            overflow: hidden;
          }
          .desc {
            font-size: 12px;
            color: @color_desc;
          }
        }
      }
    }
  }
</style>

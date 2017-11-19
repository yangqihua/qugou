<template>
  <div>
    <scroll :upCallback="getData" :emptyDataBtnClick="btnClick" ref="mescroll" warpId="recommend_scroll"
            id="recommend_scroll">
      <x-header class="header" :left-options="{showBack: false}">每周推荐</x-header>
      <div class="recommend_list">
        <template v-for="(itemData, dataIndex) in data">
          <div class="recommend_time">{{itemData.label}}</div>
          <div class="recommend_data_item">
            <div class="recommend_item vux-1px-b" v-for="(item, itemIndex) in itemData.data" :key="itemIndex"
                 @click.prevent.stop="goDetails(item.goods_id)">

              <div class="recommend_layer_info">
                <h4 class="ellipsis_text_2 title">{{item.name}}</h4>
                <p class="ellipsis_text_3 desc">{{item.recommend_desc}}</p>
              </div>

              <div class="recommend_layer_img">
                <img v-lazy="base_public_url+item.home_url.url" alt="缩略图" class="image">
              </div>
            </div>
          </div>
        </template>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {base_public_url} from '../../utils/url'
  import {XHeader} from 'vux'
  import Scroll from '../../components/mescroll/Scroll'
  export default {
    components: {XHeader, Scroll},
    data () {
      return {
        data: [],
        base_public_url: base_public_url,
      }
    },
    methods: {
      getData(page){
        let params = {
          url: 'recommend/weeklist',
          params: {week: page.num},
          scb: (data) => {
            this.$refs.mescroll.endSuccess(data.data.length);
            if (data.data.length > 0) {
              this.data = this.data.concat(data)
            }
          },
          ecb: (err) => {
            this.$refs.mescroll.endErr();
          }
        }
        this.$ajax(params)
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
        this.$store.dispatch('getArticles', params)
      },
      btnClick() {
        this.$router.push("/");
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
  @import "../../assets/less/mixin.less";

  #recommend_scroll {
    padding: 45px 0 52px 0;
  }

  .recommend_list {
    .recommend_time {
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

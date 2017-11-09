<template>
  <div>
    <x-header class="header" :left-options="{showBack: false}">每周推荐</x-header>
    <div class="recommend_list">
      <div class="recommend_layer vux-1px-b" v-for="(item, index) in content" :key="index"
           @click.prevent.stop="jmp(item.link)">

        <div class="recommend_layer_info">
          <h4 class="ellipsis_text_2 title">{{item.title}}</h4>
          <p class="ellipsis_text_3 desc">{{item.desc}}</p>
        </div>

        <div class="recommend_layer_img">
          <img v-lazy="item.image" alt="缩略图" class="image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default {
    components: {XHeader},
    created() {
      this.$store.dispatch('getArticles')
    },
    computed: {
      content() {
        return this.$store.state.articles_data
      }
    },
    methods: {
      jmp(link) {
        this.$router.push(link)
      }
    },
    data () {
      return {}
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

  .recommend_list {
    padding: 45px 0 52px 0;
    .recommend_layer {
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
</style>

<template>
  <div>
    <div class="article_list">
      <div class="article_layer vux-1px-b" v-for="(item, index) in content" :key="index"
           @click.prevent.stop="jmp(item.link)">

        <div class="article_layer_i_w">
          <h4 class="ellipsis_text_2 title" >{{item.title}}</h4>
          <p class="ellipsis_text_3 desc">{{item.desc}}</p>
        </div>

        <div class="article_layer_img_w">
          <img v-lazy="item.image" alt="缩略图" class="image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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

  .article_list {
    .article_layer {
      display: flex;
      padding: 10px;

      .article_layer_img_w {
        flex: 140px 0 0;
        width: 120px;
        vertical-align: top;
        .image {
          border-radius: 3px;
        }
      }

      .article_layer_i_w {
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

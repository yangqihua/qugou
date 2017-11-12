<template>
  <div class="nav">
    <ul>
      <router-link
        v-for="(li, index) in navlist"
        :to="li.hf"
        :key="index"
        :exact="li.exa"
        class="nav_item"
        tag="li"
        active-class="active">
        <i class="icon iconfont" :class="li.ic"></i>
        {{li.tit}}
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navlist: [
          {
            ic: 'icon-shouye111',
            hf: '/',
            tit: '首页',
            exa: true
          },
          {
            ic: 'icon-icon3',
            hf: 'recommend',
            tit: '每周推荐',
            exa: false
          },
          {
            ic: 'icon-shouye1126',
            hf: '/top',
            tit: '榜单',
            exa: false
          },
          {
            ic: 'icon-shouye114',
            hf: 'me',
            tit: '我的',
            exa: false
          }
        ]
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/less/mixin.less";

  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, .16);
    z-index: 9999;

    &_item {
      display: inline-block;
      width: 25%;
      text-align: center;
      font-size: 12px;
      color: @color_desc;
      padding-top: 3px;
      transition: all .3s ease;

      &.active {
        color: @color_active;
      }
      i {
        display: block;
        font-size: 24px;
        line-height: 1.2;
      }
    }
  }

</style>

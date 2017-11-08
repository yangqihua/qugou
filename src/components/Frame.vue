<template>
  <div id="frame">
    <transition name="move">
      <keep-alive>
        <router-view class="home_content"></router-view>
      </keep-alive>
    </transition>
    <v-nav></v-nav>
  </div>
</template>

<script>
  import vNav from './Nav.vue'

  export default {
    name: 'frame',
    components: {vNav}
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';

  .vux-1px-b:after {
    border-color: #f0f0f0;
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 0.2s ease-in-out;
  }

  .move-enter-active {
    transition-delay: 0.2s;
  }

  .move-enter,
  .move-leave-active {
    opacity: 0;
    /*transform: translateX(10px);*/
  }

  .home_content {
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
</style>

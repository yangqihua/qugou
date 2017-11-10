<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../../assets/vux_logo.png">
      <h1></h1>
    </div>
    <group style="margin-top: 50px;">
      <cell title="我的收藏" is-link @click.native.prevent="click('我的收藏')"></cell>
      <cell title="我要推荐" is-link @click.native.prevent="click('我要推荐')"></cell>
      <cell title="关于我们" is-link @click.native.prevent="click('关于我们')"></cell>
    </group>
  </div>
</template>

<script>
  import {Group, Cell} from 'vux'

  export default {
    components: {
      Group,
      Cell
    },
    methods:{
      click(cell){
    		alert('客官别急，还没做呢，点击了'+cell)
      }
    },
    mounted() {

    },
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .vux-demo {
    margin-top: 20px;
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>

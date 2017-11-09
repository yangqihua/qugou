<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  //创建vue对象
  export default {
    props: {
      title: {
        type: String,
        default: null
      },
      showBack: {
        type: Boolean,
        default: null
      },
    },
    data() {
      return {
      }
    },
    methods: {

    }
  };
</script>

<style lang="less" rel="stylesheet/less">
</style>

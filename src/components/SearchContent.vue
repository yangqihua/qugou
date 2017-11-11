<template>
    <div class="search_content">
      <div class="wel_label"><i class="icon iconfont icon-icon27"></i>大家都在搜</div>
      <ul class="wel_value">
        <li class="wel_value_item" v-for="(li, index) in navlist" :key="index">
          {{li.label}}
        </li>
      </ul>
    </div>
</template>

<script>
//  import Scroll from './mescroll/Scroll'
  export default {
//    components: {Scroll},
    data() {
      return {
        navlist: [
          {label: '黑科技', weight: 10},
          {label: '加湿器', weight: 9},
          {label: '搞怪', weight: 8},
          {label: '存钱罐', weight: 8},
          {label: '无人机', weight: 8},
          {label: '睡眠香水人机', weight: 8},
          {label: '睡眠香水', weight: 8},
        ]
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../style/mixin.less";

  .search_content {
    padding: 8px 12px 12px 12px;
    font-size: 13px;
    .wel_label {
      color: @color_gray_2_6;
      i {
        margin-right: 2px;
      }
    }
    .wel_value {
      margin-top: 4px;
      display: flex;
      flex-wrap: wrap;
      .wel_value_item {
        margin: 6px;
        list-style-type: none;
        padding: 5px 14px;
        background-color: @color_gray_1_6;
        color: @color_black_3;
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          background-color: @color_gray_1_5;
          color: @color_red_2
        }
      }
    }
  }

</style>

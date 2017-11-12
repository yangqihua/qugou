<template>
  <div class="search_content">
    <div v-if="searchValueEmpty">
      <div v-show="hotList.length">
        <div class="wel_label"><i class="icon iconfont icon-icon27"></i>大家都在搜</div>
        <ul class="wel_value">
          <li class="wel_value_item" v-for="(li, index) in hotList" :key="index"
              @click.stop.prevent="searchKey(li.label)">
            {{li.label}}
          </li>
        </ul>
      </div>

      <div v-show="historyList.length">
        <div class="part"></div>
        <group>
          <div slot="title" class="weui-cells__title search_value_title">
            <div><i class="icon iconfont icon-icon36 value_i"></i>我搜过的</div>
            <div><i class="icon iconfont icon-icon39" style="font-size: 18px;padding: 8px 4px 8px 8px;"
                    @click.stop.prevent="clearAllHistory"></i></div>
          </div>
          <cell v-for="(li, index) in historyList" :key="index">
            <i class="icon iconfont icon-shouye1143" style="padding: 8px 5px 8px 8px;"
               @click.stop.prevent="clearHistory(li.label)"></i>
            <div slot="title" style="color:#3b333b;font-size: 13px;" @click.stop.prevent="searchKey(li.label)"><i
              class="icon iconfont icon-icon1 value_i"></i>{{li.label}}
            </div>
          </cell>
        </group>
      </div>
    </div>
    <div v-else>
      <div class="search_result" @click.stop.prevent="searchKey(searchValue)"><i
        class="icon iconfont icon-icon1 value_i"></i>查找 “{{searchValue}}”
      </div>
    </div>
  </div>
</template>

<script>
  import {getViewportSize} from '../../utils/util'
  import {Group, Cell} from 'vux'
  export default {
    components: {Group, Cell},
    props: {
      searchValue: {
        type: String,
        default: ''
      },
      hotList: {
        type: Array,
        default: function () {
          return []
        }
      },
      historyList: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    data() {
      return {
      }
    },
    methods: {
      clearAllHistory(){
        alert('删除所有我搜过的');
      },
      clearHistory(lable){
        alert('删除' + lable);
      },
      searchKey(label){
        alert('搜索：' + label);
      }
    },
    computed: {
      searchValueEmpty(){
      	if(!this.searchValue){
          return true
        }
        let empty = !this.searchValue.trim();
      	return empty
      }
    },
    mounted(){
      let searchDom = document.querySelector('.search_content');
      if (searchDom) {
        searchDom.style.minHeight = getViewportSize().height - 44 + 'px';
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

  .search_content {
    font-size: 13px;
    .wel_label {
      margin: 8px 0 0 12px;
      color: @color_gray_2_6;
      i {
        margin-right: 2px;
      }
    }
    .wel_value {
      list-style-type: none;
      margin: 4px 6px 8px 6px;
      display: flex;
      flex-wrap: wrap;
      .wel_value_item {
        margin: 6px;
        padding: 5px 14px;
        background-color: @color_gray_1_6;
        color: @color_black_3;
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          background-color: @color_gray_1_5;
          color: @color_red_2
        }
      }
    }
    .search_result {
      color: #3b333b;
      font-size: 13px;
      padding: 8px 12px;
      &:after {
        position: absolute;
        left: 0;
        top: 37px;
        right: 0;
        content: '';
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .search_value_title {
      color: #9f9a9a;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between
    }
    .value_i {
      font-size: 15px;
      margin-right: 4px;
      color: @color_gray_2_6;
    }
  }

</style>

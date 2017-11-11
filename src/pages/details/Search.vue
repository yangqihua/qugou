<template>

  <div>
    <scroll :upCallback="upCallback" :emptyDataBtnClick="btnClick" :upAuto="false" ref="mescroll" warpId="search_scroll"
            id="search_scroll">
      <search
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="absolute"
        auto-scroll-to-top
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search"></search>

      <panel :list="data.list"></panel>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem, Flexbox, FlexboxItem, Search, Swiper, SwiperItem, Sticky} from 'vux'
  import Panel from '../../components/common/Panel'
  import Scroll from '../../components/mescroll/Scroll'

  export default {
    components: {
      Scroll,
      Tab, TabItem,
      Flexbox,
      FlexboxItem,
      Search,
      Swiper,
      SwiperItem,
      Sticky,
      Panel,
    },
    data () {
      return {
        upAuto: false,
        results: [],
        value: '',
        mescroll: null,

        offset: 0,
      }
    },
    mounted(){
//      setTimeout(() => {
        this.setFocus()
//      }, 30);
    },

    methods: {
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
      },
      onFocus () {
        console.log('on focus');
        this.results = getResult(100)
      },
      onCancel () {
        this.$router.replace('/');
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
        this.$store.dispatch('getSearchData', params)
      },
      btnClick() {
        alert("点击了去逛逛按钮");
      }
    },
    computed: {
      data() {
        return this.$store.state.search_data
      }
    },
  }

  function getResult(val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../style/mixin.less";

  #search_scroll {
  }

</style>

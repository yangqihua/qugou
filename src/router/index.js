import Vue from 'vue'
import Router from 'vue-router'
import Frame from '../components/Frame'
import Home from '../pages/home/Home.vue'
import GoodsDetail from '../pages/details/GoodsDetail'
import Recommend from '../pages/home/Recommend.vue'
import Top from '../pages/home/Top.vue'
import Me from '../pages/home/Me.vue'
import Search from '../pages/details/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [

    // 首页四个tab页面
    {
      path: '', component: Frame,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/recommend',
          name: 'Recommend',
          component: Recommend
        },
        {
          path: '/top',
          name: 'Top',
          component: Top
        },
        {
          path: '/me',
          name: 'Me',
          component: Me
        },
      ]
    },

    // 搜索
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    // 详情
    {
      path: '/goods/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '*',
      component: Home
    },





  ]
})

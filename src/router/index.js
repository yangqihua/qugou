import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Works from '@/components/Works'
import WorkDetail from '@/components/WorkDetail'
import Articles from '@/components/Articles'
import ArticleDetail from '@/components/ArticleDetail'
import User from '@/components/User'
import Search from '@/components/Search'

import Frame from '@/components/Frame'

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
          path: '/works',
          name: 'Works',
          component: Works
        },
        {
          path: '/articles',
          name: 'Articles',
          component: Articles
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
      ]
    },

    // 详情
    {
      path: '/work/:id',
      name: 'WorkDetail',
      component: WorkDetail
    },

    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },

    {
      path: '/search',
      name: 'Search',
      component: Search
    },


    {
      path: '*',
      component: Home
    }
  ]
})

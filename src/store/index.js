import Vue from 'vue'
import Vuex from 'vuex'
import NProgress from 'NProgress'
import 'NProgress/nprogress.css'
Vue.use(Vuex)
import http from '../utils/ajax'

import {
  jsonp as ajax,
  $dom,
  homelist,
  showbox,
  upBox,
  showloadin,
  hideloadin
} from '../utils/util'

import {
  io_base,
  io_home_list,
  io_works,
  io_articles
} from '../utils/url'


const state = {
  scrollTops: {},
  ads: [],

  search_data: {list: []},
  base_data: {list: []},
  works_data: [],
  articles_data: []
}

const mutations = {
  GET_SEARCH_DATA(state, payload) {
    state.search_data = Object.assign({}, state.search_data, payload)
  },
  GET_DATA(state, payload) {
    state.base_data = Object.assign({}, state.base_data, payload)
  },
  GET_WORKS(state, payload) {
    state.works_data = state.works_data.concat(payload)
  },
  GET_ARTICLES(state, payload) {
    state.articles_data = state.articles_data.concat(payload)
  },
  SET_EMPTY_DATA(state, payload) {
    state.base_data.list = [];
  },
  SET_SCROLL_TOP(state, payload) {
    for (let key in payload) {
      state.scrollTops[key] = payload[key];
    }
  },

  SET_ADS(state, payload) {
    payload.forEach(item => {
      let ad = {
        goods_id: item.goods_id,
        url: '/goods/'+item.goods_id,
        img: item.img_url,
        // fallbackImg: 'xx.jpg',
        title: item.desc
      }
      state.ads.push(ad)
    })
  },
}

const actions = {
  getAds({commit, state}){
    let params = {
      url: 'ads/homeads',
      scb: (data) => {
        hideloadin()
        commit('SET_ADS', data)
      },
      ecb: (err) => {
        hideloadin()
      }
    }
    http(params);
  },
  setScrollTop({commit, state}, param) {
    commit('SET_SCROLL_TOP', param);
  },
  setDataEmpty({commit, state}) {
    commit('SET_EMPTY_DATA');
  },
  getData({commit}) {
    // hideloadin();
    ajax(io_base).then(res => $dom(res.body)).then($ => {
      commit('GET_DATA', {
        // list: homelist($),
        list: [],
        showbox: showbox($)
      })
      hideloadin()
    })
  },
  getListBy({commit, state}, param = {}) {
    let page = param.page;
    let scb = param.scb;
    let ecb = param.ecb;
    ajax(io_home_list, {page: page}).then(res => $dom(res.body)).then($ => {
      let newData = homelist($);
      commit('GET_DATA', {list: state.base_data.list.concat(newData)})
      scb && scb(newData);
    }, err => {
      ecb && ecb(err);
    })
  },
  getSearchData({commit, state}, param = {}) {
    let page = param.page;
    let scb = param.scb;
    let ecb = param.ecb;
    ajax(io_home_list, {page: page}).then(res => $dom(res.body)).then($ => {
      let newData = homelist($);
      commit('GET_SEARCH_DATA', {list: state.search_data.list.concat(newData)})
      scb && scb(newData);
    }, err => {
      ecb && ecb(err);
    })
  },
  getWorks({commit}, param = {}) {
    let page = param.page;
    let scb = param.scb;
    let ecb = param.ecb;
    // NProgress.set(0.4)
    ajax(io_works, {page: page}).then(res => $dom(res.body)).then($ => {
      // NProgress.done()
      let newData = homelist($);
      console.log('newData:', newData);
      commit('GET_WORKS', newData)
      scb && scb(newData);
    }, err => {
      ecb && ecb(err);
    })
  },
  getArticles({commit}, param = {}) {
    let page = param.page;
    let scb = param.scb;
    let ecb = param.ecb;
    // NProgress.start()
    ajax(io_articles, {page: page}).then(res => $dom(res.body)).then($ => {
      // NProgress.done()
      let time = '11-0' + page
      if (page == 1) {
        time = '本周'
      } else if (page == 2) {
        time = '上周'
      }
      let newData = {time: time, list: upBox($)}
      commit('GET_ARTICLES', newData)
      scb && scb(newData);
    }, err => {
      ecb && ecb(err);
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

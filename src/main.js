import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import App from './components/App'
import router from './router'
import store from './store'
import './assets/less/index.less'
import ajax from './utils/ajax'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueLazyload);
FastClick.attach(document.body);

Vue.prototype.$ajax = ajax

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();
// });
// router.afterEach((to, from) => {
//   NProgress.done();
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

store.dispatch('getData')

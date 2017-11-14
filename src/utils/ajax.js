/**
 * Created by yangqihua on 2017/11/14.
 */
import Vue from 'vue';
import {AjaxPlugin} from 'vux'
import {base_api_url} from './url';
Vue.use(AjaxPlugin)

Vue.http.defaults.baseURL = base_api_url

const ajax = ({type = 'get', url, params = {}, scb, ecb}) => {
  if (type === 'get') {
    params = {params: params};
  }
  Vue.http[type](url, params).then((response) => {
    //要么就没有code，如果有code一定要等于200才算成功。
    if (response.data.hasOwnProperty('code')) {
      if (response.data.code === 200) {
        if (scb) {
          if (response.data.hasOwnProperty('data')) {
            scb(response.data.data);
          } else {
            scb(response.data);
          }
        }
      } else {
        if (ecb) {
            ecb(response.data);
        }
      }
    } else {  //没有code，也算成功
      if (scb) {
        scb(response.data);
      }
    }
  }, (err) => {
    if (ecb) {
      scb(err);
    }
  }).catch((err)=>{
    if (ecb) {
      scb(err);
    }
  })
}

export default ajax;

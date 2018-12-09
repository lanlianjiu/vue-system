import Vue from 'vue';
import Element from 'element-ui';
import scroll from 'vue-seamless-scroll';
//import Icon from 'vue-svg-icon/Icon.vue';
// 引入vue-awesome
// import Icon from 'vue-awesome/components/Icon';
// import 'vue-awesome/icons/index.js'
import '@/theme/element-#41B883/index.css';
import '@/assets/styl/index';
import '@/mock';

import App from '@/App';
import {
  router
} from '@/router';
import '@/router/routerControl';
import store from '@/store';
//import api from './utils/request/index';//请求封装版本二

Vue.component('icon', Icon);
//Vue.use(api);
Vue.use(scroll);
Vue.use(Element, {size: 'medium'});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
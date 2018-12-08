import Vue from 'vue'
import Element from 'element-ui'
import scroll from 'vue-seamless-scroll'
import Icon from 'vue-svg-icon/Icon.vue'
// 引入vue-awesome
import Icon2 from 'vue-awesome/components/Icon'
import '@/theme/element-#41B883/index.css'
import '@/assets/styl/index'
import '@/mock'

import App from '@/App'
import {
  router
} from '@/router'
import '@/router/routerControl'
import store from '@/store'

Vue.component('icon', Icon)

Vue.use(scroll)
Vue.use(Element, {
  size: 'medium',

})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
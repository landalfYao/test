// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import '../theme/index.css'
import VueResource from 'vue-resource'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: null,
    //yip:'http://192.168.43.168:8080/beauty/',
    yip:'https://www.medusachina.com/beauty/',
    tip:'https://www.medusachina.com/beauty/',
    ws:'wss://www.medusachina.com/beauty/',
    //yip:'http://192.168.5.69:8080/beauty/',
    //tip:'http://192.168.5.69:8080/beauty/'
  },
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
  },
  mounted: function () {
    this.routerBeforeEach();
  },
  store,
  render: h => h(App),
  router,
  template: '<App/>',
  components: {
    App
  },
  methods:{
    routerBeforeEach: function () {
      router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          // this route requires auth, check if logged in
          // if not, redirect to login page.
          if (store.state.user == null) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
            })
          } else {
            next()
          }
        } else {
          next() // 确保一定要调用 next()
        }
      })
    }
  }
})

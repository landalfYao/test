// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import Vuex from 'vuex'

Vue.use(Vuex)
import './assets/css/font-awesome.css'
import './assets/css/ionicons.css'
import './assets/css/perfect-scrollbar.css'
import './assets/css/rickshaw.min.css'
import './assets/css/starlight.css'


import './assets/js/bootstrap.js'
import './assets/js/jquery-ui'
//import './assets/js/perfect-scrollbar.jquery'
import './assets/js/jquery.sparkline.min'
// import './assets/js/rickshaw.min'
import './assets/js/chart'
import './assets/js/jquery.flot'
import './assets/js/jquery.flot.pie'
import './assets/js/jquery.flot.resize'
import './assets/js/jquery.flot.spline'
import './assets/js/starlight'
import './assets/js/resizesensor'

const store = new Vuex.Store({
  state: {
    ip: 'http://www.wojufuping.cn/shop/',
    wavip: "http://www.wojufuping.cn/",
    //ip:'http://192.168.5.69/shop/',
    appid: '5a430ce9ceb6b41dbd1fc041',
    isLogin: false,
    goodsParam: {
      id: null
    }
  },
  mutations: {

  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted: function () {
  },
  methods: {

  }
})

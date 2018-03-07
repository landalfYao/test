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

//Vue.prototype.mdsIp = 'http://192.168.1.104:8080/projectplatform/';
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false


const store = new Vuex.Store({
  state: {
      user:null
  },
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
  },
  store,
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
})


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (store.state.user == null) {
//       next({
//         path: '/Login',
//         query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component(CollapseTransition.name, CollapseTransition)

const store = new Vuex.Store({
  state: {
    user: null,
    ip:'https://www.tongzhuhe.com/elMall/',
    //ip:'http://192.168.43.168:8080/elMall/'
    //ip:'http://192.168.5.223:8080/'
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted: function () {
    this.routerBeforeEach();
  },
  methods:{
    routerBeforeEach: function () {
      router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          // this route requires auth, check if logged in
          // if not, redirect to login page.
          if (store.state.user == null) {
            next({
              path: '/ec_login',
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

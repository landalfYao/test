// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import Vuex from 'vuex'
import jquerySmoove from 'jquery-smoove'
import baguettebox from 'baguettebox.js'
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'


Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(jquerySmoove)
Vue.config.productionTip = false
Vue.component(CollapseTransition.name, CollapseTransition)

/**
 * type
 * 1:轮播图管理
 * 2：大图定制师
 * 3：小图定制师
 * 4:主题游
 * 5：客户评价
 * 6.旅游心得
 * 7.蜜月旅行
 * 8.新闻资讯
 * 9.旅游攻略
 * 10.职位
 */
const store = new Vuex.Store({
  state: {
    user: null,
    //ip:'https://www.tongzhuhe.com/elMall/',
    ip:'http://www.duyimemo.com/travel/',
    //ip:'http://192.168.5.223:8080/'
    getJQuery(){

    }
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
    //this.routerBeforeEach();
  },
  methods:{
    // routerBeforeEach: function () {
    //   router.beforeEach((to, from, next) => {
    //     if (to.matched.some(record => record.meta.requiresAuth)) {
    //       // this route requires auth, check if logged in
    //       // if not, redirect to login page.
    //       if (store.state.user == null) {
    //         next({
    //           path: '/ec_login',
    //           query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
    //         })
    //       } else {
    //         next()
    //       }
    //     } else {
    //       next() // 确保一定要调用 next()
    //     }
    //   })
    // }
  }
})

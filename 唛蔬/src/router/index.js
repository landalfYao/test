import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '../components/main'
import home from '../components/home'
import ms_product from '../components/ms_product'
import for_map from '../components/for_map'
import news from '../components/news'
import question from '../components/question'
import legal from '../components/legal'
import meth from '../components/meth'
import shipu from '../components/shipu'
import newsDetail from '../components/newsDetail'
import search from '../components/search'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'main', component: main , children:[
      { path: '/home', name: 'home', component: home },
      { path: '/ms_product', name: 'ms_product', component: ms_product },
      { path: '/for_map', name: 'for_map', component: for_map },
      { path: '/news', name: 'news', component: news },
      { path: '/question', name: 'question', component: question },
      { path: '/legal', name: 'legal', component: legal },
      { path: '/meth', name: 'meth', component: meth },
      { path: '/shipu', name: 'shipu', component: shipu },
      { path: '/newsDetail', name: 'newsDetail', component: newsDetail },
      { path: '/search', name: 'search', component: search },
    ]},

  ]
})

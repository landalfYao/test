import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '../components/main'
import home from '../components/home'
import shopList from '../components/shopList'
import shopAdd from '../components/shopAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children:[
        {path:'/home',name:'home',component:home},
        {path:'/shopList',name:'shopList',component:shopList},
        {path:'/shopAdd',name:'shopAdd',component:shopAdd},
      ]
    }
  ]
})

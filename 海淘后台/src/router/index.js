import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '../components/main'
import dashboard from '../components/dashboard'

import categoryList from '../components/category/category_list'

import goodsList from '../components/goods/goods_list'
import goodsAdd from '../components/goods/goods_add'
import goodsUpdate from '../components/goods/goods_update'

import orderList from '../components/order/order_list'

import carousel from '../components/carousel'

import login from '../components/login'

import user from '../components/user'

import notice from '../components/notice'

import textarea from '../components/textarea'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: login },
    {
      path: '/', name: 'sunwou', component: main,
      children: [
        { path: '/dashboard', name: '首页', component: dashboard },
        { path: '/category_list', name: '分类列表', component: categoryList },
        { path: '/goods_list', name: '商品列表', component: goodsList },
        { path: '/goods_add', name: '商品添加', component: goodsAdd },
        { path: '/goods_update', name: '商品修改', component: goodsUpdate },
        { path: '/order_list', name: '订单列表', component: orderList },
        { path: '/carousel', name: '轮播图', component: carousel },
        { path: '/user', name: '用户', component: user },
        { path: '/notice', name: '通知', component: notice },
        { path: '/textarea', name: 'textarea', component: textarea },
      ]
    },

  ]
})

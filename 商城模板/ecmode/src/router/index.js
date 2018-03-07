import Vue from 'vue'
import Router from 'vue-router'
/**
 * 电商模板模块
 */
import ecMain from '@/components/ecmode/main'
import ecLogin from '@/components/ecmode/login'
import ecRegister from '@/components/ecmode/register'
import ecOverview from '@/components/ecmode/overview'
//广告图管理
import ecCarousel from '../components/ecmode/carousel/carousel'
//分类
import ecCategory from '../components/ecmode/category/category'
import ecCategorySub from '../components/ecmode/category/sub'
import ecShopcate from '../components/ecmode/category/shopcate'
//商品
import ecGoodsAdd from '../components/ecmode/goods/add'
import ecGoodsUpdate from '../components/ecmode/goods/update'
import ecGoodsList from '../components/ecmode/goods/list'
import ecGoodsSpecification from '../components/ecmode/goods/specification'
import ecGoodsCasousel from '../components/ecmode/goods/casousal'
//物流模板
import ecLogisticCompany from '../components/ecmode/logistic/company'
import ecLogisticTemplate from '../components/ecmode/logistic/template'
//订单
import ecOrderList from '../components/ecmode/order/list'
import ecOrderLog from '../components/ecmode/order/log'
//店铺
import ecShopSetup from '../components/ecmode/shopSetup'
import ecStoreDecoration from '../components/ecmode/store/decoration'
import ecStoreList from '../components/ecmode/store/list'

Vue.use(Router)

export default new Router({
  routes: [
    //登录页面
    { path: '/ec_login', name: 'ecLogin', component: ecLogin },
    //注册页面
    { path: '/ec_register', name: 'ecRegister', component: ecRegister },
    //主界面
    { path: '/', name: 'ecMain', component: ecMain ,meta:{ requiresAuth:true },
      children:[
        //信息总览
        { path:'/ec_overview' , name:'ecOverview',component: ecOverview },
        //广告图
        { path:'/ec_carousel' , name:'ecCarousel',component: ecCarousel },
        //分类
        { path:'/ec_category' , name:'ecCategory',component: ecCategory },
        { path:'/ec_category_sub' , name:'ecCategorySub',component: ecCategorySub },
        { path:'/ec_shopcate' , name:'ecShopcate',component: ecShopcate },
        //商品
        { path:'/ec_goods_add' , name:'ecGoodsAdd',component: ecGoodsAdd },
        { path:'/ec_goods_update' , name:'ecGoodsUpdate',component: ecGoodsUpdate },
        { path:'/ec_goods_list' , name:'ecGoodsList',component: ecGoodsList },
        { path:'/ec_goods_specification' , name:'ecGoodsSpecification',component: ecGoodsSpecification },
        { path:'/ec_goods_casousel' , name:'ecGoodsCasousel',component: ecGoodsCasousel },
        //物流模板
        { path:'/ec_logistic_company',name:'ecLogisticCompany',component:ecLogisticCompany},
        { path:'/ec_logistic_template',name:'ecLogisticTemplate',component:ecLogisticTemplate},
        //订单管理
        { path:'/ec_order_list',name:'ecOrderList',component:ecOrderList},
        { path:'/ec_order_log',name:'ecOrderLog',component:ecOrderLog },
        //店铺
        { path:'/ec_shop_setup', name:'ecShopSetup',component:ecShopSetup},
        { path:'/ec_store_decoration', name:'ecStoreDecoration',component:ecStoreDecoration},
        { path:'/ec_store_list', name:'ecStoreList',component:ecStoreList}
      ]
    },
  ]
})

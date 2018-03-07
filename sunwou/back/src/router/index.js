import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import main from '../components/main'
import dashboard from '../components/dashboard'
import wxconfig from '../components/wxconfig'
import pageConfig from '../components/pageConfig'
//海报管理
import posterHome from '../components/poster/home'
import posterFind from '../components/poster/find'
//门店管理
import shoperManer from '../components/merchant/shoperManer'
import addShop from '../components/merchant/addShop'
import shopDetail from '../components/merchant/shopDetail'
import examineShop from '../components/merchant/examineShop'
//商品管理
import goodsManerge from '../components/goods/goodsManerge'
import goodsAdd from '../components/goods/goodsAdd'
import goodsUpdate from '../components/goods/goodsUpdate'
import specification from '../components/goods/specification'
import carsousal from '../components/goods/carousal'
import resever from '../components/merchant/resever'
//私人订制
import personalManerge from '../components/goods/personalManerge'
import personalAdd from '../components/goods/personalAdd'
import personalUpdate from '../components/goods/personalUpdate'
//物流管理
import logisticsCompany from '../components/logistics/company'
import logisticsTemplate from '../components/logistics/templateList'
//分类管理
import brand from '../components/category/brand'
import categoryManer from '../components/category/categoryManer'
import subCategoryManer from '../components/category/subCategoryManer'
import category from '../components/category/category'
//美妆师管理
import addBeautyTeacher from '../components/beauty/addBeautyTeacher'
import beautyList from '../components/beauty/beautyList'
import beautyItem from '../components/beauty/beautyItem'

//个人品牌包装
import categoryPersonal from '../components/personalVedio/category'
import vedioAdd from '../components/personalVedio/vedioAdd'
import vedioManage from '../components/personalVedio/vedioManage'
import vedioUpdate from '../components/personalVedio/vedioUpdate'

import config from '../components/config'

import activity from '../components/activity/activity'

import personal from '../components/car/personal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component: login
    },
    {
      path:'/',
      name:'main',
      component: main,
      meta:{
        requiresAuth:true
      },
      children:[
        { path:'/personal', name:'personal', component:personal },

        { path:'/activity', name:'activity', component:activity },
        { path:'/dashboard', name:'dashboard', component:dashboard },
        { path:'/wxconfig', name:'wxconfig', component: wxconfig },
        { path:'/pageConfig', name:'pageConfig', component:pageConfig },
        //个人品牌包装
        { path: '/categoryPersonal',name: 'categoryPersonal',component: categoryPersonal},
        { path: '/vedioAdd',name: 'vedioAdd',component: vedioAdd},
        { path: '/vedioUpdate',name: 'vedioUpdate',component: vedioUpdate},
        { path: '/vedioManage',name: 'vedioManage',component: vedioManage},
        //海报管理
        { path:'/posterHome', name:'posterHome' ,component: posterHome},
        { path:'/posterFind', name:'posterFind' ,component: posterFind},
        //商品管理
        { path:'/goodsManerge', name:'goodsManerge', component:goodsManerge },
        { path:'/goodsAdd', name:'goodsAdd', component:goodsAdd },
        { path:'/goodsUpdate', name:'goodsUpdate', component:goodsUpdate },
        { path:'/specification', name:'specification', component:specification },
        { path:'/carsousal', name:'carsousal', component:carsousal },
        { path:'/resever', name:'resever', component:resever },
        //私人订制管理
        { path:'/personalManerge', name:'personalManerge', component:personalManerge },
        { path:'/personalAdd', name:'personalAdd', component:personalAdd },
        { path:'/personalUpdate', name:'personalUpdate', component:personalUpdate },
        //门店管理
        { path:'/shoperManer', name:'shoperManer', component:shoperManer },
        { path:'/addShop', name:'addShop', component:addShop },
        { path:'/shopDetail', name:'shopDetail', component:shopDetail },
        { path:'/examineShop', name:'examineShop', component:examineShop},
        //物流管理
        { path:'/logisticsCompany', name:'logisticsCompany', component:logisticsCompany },
        { path:'/logisticsTemplate', name:'logisticsTemplate', component:logisticsTemplate },
        //分类管理
        { path:'/brand', name:'brand', component:brand },
        { path:'/categoryManer', name:'categoryManer', component:categoryManer },
        { path:'/category', name:'category', component:category },
        { path:'/subCategoryManer', name:'subCategoryManer', component:subCategoryManer },
        //美妆师管理
        { path:'/addBeautyTeacher',name:'addBeautyTeacher',component:addBeautyTeacher},
        { path:'/beautyList',name:'beautyList',component:beautyList},
        { path:'/beautyItem',name:'beautyItem',component:beautyItem},
        { path:'/config',name:'config',component:config}
      ]
    }
  ]
})

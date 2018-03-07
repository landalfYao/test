import Vue from 'vue'
import Router from 'vue-router'
/**
 * 后台页面
 */
import ecMain from '@/components/ecmode/main'
import ecLogin from '@/components/ecmode/login'
import ecCarousel from '../components/ecmode/content/carousel'
import ecMsgManger from '../components/ecmode/content/msgManger'
import ecMasterManer from '../components/ecmode/content/masterManer'
import ecThemeManger from '../components/ecmode/content/themeManger'
import ecAnli from '../components/ecmode/content/anli'
import ecExperience from '../components/ecmode/content/experience'
import ecHoneymooon from '../components/ecmode/content/honeymoon'
import ecIdea from '../components/ecmode/content/idea'
import ecNews from '../components/ecmode/content/news'
import ecToursim from '../components/ecmode/content/toursim'
import ecPing from '../components/ecmode/content/ping'

//前端页面
import meMain from '../components/memo/main'
import meHome from '../components/memo/content/home'
import meCostomerOrderTour from '../components/memo/content/costomer_order_tour'
import meTailor from '../components/memo/content/tailor'
import meThemeTraval from '../components/memo/content/theme_traval'
import meStoryComment from '../components/memo/content/story_comment'
import meHoneymoon from '../components/memo/content/honeymoon'
import meAboutus from '../components/memo/content/aboutus'
import meJoinus from '../components/memo/content/joinus'
import meToursim from '../components/memo/content/toursim'
import meKnowlege from '../components/memo/content/knowlege'
import meNews from '../components/memo/content/news'


Vue.use(Router)

export default new Router({
  routes: [
    //登录页面
    { path: '/ec_login', name: 'ecLogin', component: ecLogin },
    //主界面
    { path: '/ec_main', name: 'ecMain', component: ecMain ,meta:{ requiresAuth:true },
      children:[
        //信息总览
        { path:'/ec_carousel' , name:'ecCarousel',component: ecCarousel },
        { path:'/ec_msg_manger' , name:'ecMsgManger',component: ecMsgManger },
        { path:'/ec_master_maner' , name:'ecMasterManer',component: ecMasterManer },
        { path:'/ec_theme_manger' , name:'ecThemeManger',component: ecThemeManger },
        { path:'/ec_anli' , name:'ecAnli',component: ecAnli },
        { path:'/ec_experience' , name:'ecExperience',component: ecExperience },
        { path:'/ec_honeymooon' , name:'ecHoneymooon',component: ecHoneymooon },
        { path:'/ec_idea' , name:'ecIdea',component: ecIdea },
        { path:'/ec_news' , name:'ecNews',component: ecNews },
        { path:'/ec_toursim' , name:'ecToursim',component: ecToursim },
        { path:'/ec_ping' , name:'ecPing',component: ecPing },
      ]
    },
    { path:'/',name:'meMain',component:meMain,
      children:[
        { path:'/me_home' , name:'meHome',component: meHome },
        { path:'/costomer_order_tour' , name:'meCostomerOrderTour',component: meCostomerOrderTour },
        { path:'/me_tailor' , name:'meTailor',component: meTailor },
        { path:'/me_theme_traval' , name:'meThemeTraval',component: meThemeTraval },
        { path:'/me_story_comment' , name:'meStoryComment',component: meStoryComment },
        { path:'/me_honeymoon' , name:'meHoneymoon',component: meHoneymoon },
        { path:'/me_aboutus' , name:'meAboutus',component: meAboutus },
        { path:'/me_joinus' , name:'meJoinus',component: meJoinus },
        { path:'/me_toursim' , name:'meToursim',component: meToursim },
        { path:'/me_knowlege' , name:'meKnowlege',component: meKnowlege },
        { path:'/me_news' , name:'meNews',component: meNews },
      ]
    }
  ]
})

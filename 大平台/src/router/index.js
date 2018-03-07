import Vue from 'vue'
import Router from 'vue-router'

/**
 * user interface pages
 */
import uiMain from '../components/ui_page/ui_main'
import uiHome from '../components/ui_page/ui_home'
import uiLogin from '../components/ui_page/ui_login'

//小程序模板页
import uiTemplate from '../components/ui_page/program_template/ui-template'

//小程序功能与服务
import uiFunction from '../components/ui_page/program_function/ui_program_function'

//快速制作小程序
import uiProgramPanel from '../components/ui_page/ui_program_panel'

//控制台
import uiConsole from '../components/ui_page/console/ui_console'
import uiConsoleOverview from '../components/ui_page/console/ui_console_overview'
import uiConsoleMiniprogram from '../components/ui_page/console/ui_console_miniprogram'
import uiConsoleMiniprogramCreate from '../components/ui_page/console/ui_console_miniprogram_create'
import uiConsoleGallery from '../components/ui_page/console/ui_console_gallery'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/ui_login',name:'uiLogin',component:uiLogin},
    { path: '/', name: 'uiMain', component: uiMain ,children:[
      { path:'/ui_home',name:'uiHome',component: uiHome},
      { path:'/ui_template',name:'uiTemplate',component:uiTemplate},
      { path:'/ui_function',name:'uiFunction',component:uiFunction},
      { path:'/ui_console',name:'uiConsole',component: uiConsole,children:[
        {path:'/ui_console_overview',name:'uiConsoleOverview',component:uiConsoleOverview},
        {path:'/ui_console_miniprogram',name:'uiConsoleMiniprogram',component:uiConsoleMiniprogram},
        {path:'/ui_console_miniprogram_create',name:'uiConsoleMiniprogramCreate',component:uiConsoleMiniprogramCreate},
        {path:'/ui_console_gallery',name:'uiConsoleGallery',component:uiConsoleGallery}
      ]}
    ]},
    { path:'/ui_program_panel',name:'uiProgramPanel',component:uiProgramPanel},
  ]
})

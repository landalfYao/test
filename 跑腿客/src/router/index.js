import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '../components/main'
import distributorCity from '../components/distributor/city'
import distributorSchool from '../components/distributor/school'
import agentCity from '../components/agent/city'
import agentSchool from '../components/agent/school'
import agentSchoolList from '../components/agent/schoolList'
import agentCityList from '../components/agent/cityList'
import carousel from '../components/carousel'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'main', component: main,
      children:[
        { path:'distributor_city',name:'distributorCity',component:distributorCity},
        { path:'distributor_school',name:'distributorSchool',component:distributorSchool},
        { path:'agent_city',name:'agentCity',component:agentCity},
        { path:'agent_school',name:'agentSchool',component:agentSchool},
        { path:'agent_school_list',name:'agentSchoolList',component:agentSchoolList},
        { path:'agent_city_list',name:'agentCityList',component:agentCityList},
        { path:'carousel',name:'carousel',component:carousel}
      ]
    }
  ]
})

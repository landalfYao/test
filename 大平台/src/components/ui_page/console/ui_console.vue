<template>
  <transition name="fade" mode="out-in">
    <div class="panel-center">
      <div class="console-sidebar">
        <div class="sidebar-item" v-for="(item,index) in sidebarList" :key="index">
          <div class="title">
            <Icon :type="item.icon" size="20"></Icon>
            <div class="label">{{item.label}}</div>
          </div>
          <div  v-for="(li,lindex) in item.children" :key="lindex" class="sub-sidebar-item" :style="li.active ? 'background:#e1e1e1':''" @click="navigateTo(index,lindex)">
            <span>{{li.label}}</span>
          </div>
        </div>
      </div>
      <div class="console-body" id="consoleBody">
        <div class="cb-panel">
          <router-view></router-view>
        </div>

      </div>
    </div>
    
  </transition>
</template>
<style >
@import url('../../../assets/css/common.css');
@import url('../../../assets/css/ui_console.css');
</style>

<script>
export default {
  data () {
    return {
      sidebarList:[
        {icon:'stats-bars',label:'概览',children:[
          {label:'信息总览',path:'/ui_console_overview'}
        ]},
        {icon:'link',label:'小程序',children:[
          {label:'小程序信息',path:'/ui_console_miniprogram'},
          {label:'创建小程序',path:'/ui_console_miniprogram_create'}
        ]},
        {icon:'images',label:'文件库',children:[
          {label:'文件管理',path:'/ui_console_gallery'},
          {label:'空间管理',path:'/'}
        ]}
      ]
    }
  },
  mounted () {
    $("#consoleBody").css("width",window.innerWidth-200)
    this.initSidebarList();
    this.sidebarList[0].children[0].active = true;
    this.$router.push({path:'/ui_console_overview'})
  },
  methods: {
    initSidebarList(){
      for(var i in this.sidebarList){
        for(var j in this.sidebarList[i].children){
          this.sidebarList[i].children[j].active = false;
        }

      }
    },
    navigateTo(i,j){
      this.$router.push({path:this.sidebarList[i].children[j].path});
      this.initSidebarList();
      this.sidebarList[i].children[j].active = true;
    }
  }
}
</script>

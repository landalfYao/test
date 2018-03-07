<template>
  <div class="sw-container">
    <div class="sw-nav" id="nav">
      <div class="logo">持久美妆</div>
      <el-menu :default-active="activePath" class="el-menu-vertical-demo" :unique-opened="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :theme="'dark'" :router="true">
        <el-menu-item index="/dashboard">
          <i class="sw-icon- sw-icon-dvr " style="margin-right:15px;font-size:18px"></i>
          <span slot="title">信息总览</span>
        </el-menu-item>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="sw-icon- sw-icon-code" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">小程序管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="/wxconfig">小程序配置</el-menu-item>
            <el-menu-item index="/pageConfig">小程序制作</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-submenu index="2" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-format_paint" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">海报管理</span>
          </template>
          <el-menu-item-group>
            <!-- <el-menu-item index="/posterHome">小程序首页</el-menu-item> -->
            <el-menu-item index="/posterFind">发现页管理</el-menu-item>
            <el-menu-item index="/personal">个人品牌包装页轮播图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="sw-icon- sw-icon-grain" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-if="this.$store.state.user.commodityType == 1" index="/categoryManer">类目管理</el-menu-item>
            <el-menu-item v-if="this.$store.state.user.commodityType == 2" index="/category">类目管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="12" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-grain" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">个人品牌包装</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/categoryPersonal">类目管理</el-menu-item>
            <el-menu-item index="/vedioAdd">添加品牌包装</el-menu-item>
            <el-menu-item index="/vedioManage">品牌包装列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="sw-icon- sw-icon-shopping_cart" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goodsManerge">商品列表</el-menu-item>
            <el-menu-item index="/goodsAdd">添加商品信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="10"  v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-shopping_cart" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">私人订制管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/personalManerge">商品列表</el-menu-item>
            <el-menu-item index="/personalAdd">添加商品信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-store_mall_directory" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">门店管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/examineShop">门店列表</el-menu-item>
            <!-- <el-menu-item index="/shoperManer">门店列表</el-menu-item> -->
            <!-- <el-menu-item index="/addShop">添加门店信息</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-local_shipping" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">物流管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/logisticsCompany">物流公司</el-menu-item>
            <el-menu-item index="/logisticsTemplate">物流模板</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-person_pin" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">美妆师管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/beautyList">美妆师</el-menu-item>
            <!-- <el-menu-item index="/addBeautyTeacher">添加美妆师</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8" v-if="this.$store.state.user.commodityType == 2">
          <template slot="title">
            <i class="sw-icon- sw-icon-person_pin" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">预约管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/resever">预约列表</el-menu-item>
            <!-- <el-menu-item index="/addBeautyTeacher">添加美妆师</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="9" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-golf_course" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">活动管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/activity">活动管理</el-menu-item>
            <!-- <el-menu-item index="/addBeautyTeacher">添加美妆师</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8" v-if="this.$store.state.user.commodityType == 1">
          <template slot="title">
            <i class="sw-icon- sw-icon-settings" style="margin-right:15px;font-size:18px"></i>
            <span slot="title">入住设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/config">入住设置</el-menu-item>
            <!-- <el-menu-item index="/addBeautyTeacher">添加美妆师</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="sw-header" id="header">
      <div class="inline-block bar-btn" @click="setBarDispaly()">
        <i class="el-icon-menu"></i>
      </div>
      <audio id="chatAudio">
        <source src="/static/wav/8858.wav" type="audio/wav">
      </audio>
      <el-dropdown class="inline-block notice-btn">
        <span class="el-dropdown-link">
          <el-badge :value="0" class="item">
            <i class="el-icon-information font-18"></i>
          </el-badge>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="panel-between" style="width:200px">

            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="inline-block notice-btn">
        <span class="el-dropdown-link">
          <el-badge :value="0" class="item">
            <i class="el-icon-message font-18"></i>
          </el-badge>
        </span>
        <el-dropdown-menu slot="dropdown">

        </el-dropdown-menu>
      </el-dropdown>
      <div class="notice-btn inline-block">
        <el-input style="notice-btn" placeholder="搜索" icon="search" v-model="globalSearch">
        </el-input>
      </div>
      <div class="user-panel pull-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="/static/img/default/def_user.png" width="30" height="30">
            <span class="margin-left-10">{{title}}</span>
            <i class="el-icon-caret-bottom margin-left-5" style="font-size:12px"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" style="width:100%;height:100%" @click="outLogin()">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="sw-main" id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
@import url('/static/css/animate.min.css');
@import url('/static/css/main.css');
@import url('/static/css/phone.css');
@import url('/static/swicon/style.css');
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      globalSearch: '',
      id: '',
      activePath: '/dashboard',
      title:'admin'
    }
  },
  mounted: function() {
    if(this.$store.state.user == null){
      this.$router.push({name:'login'})
    }else{
      if(this.$store.state.user.realname){
      this.title = this.$store.state.user.realname
      }
      var that = this;
      // var websocket = new WebSocket('ws://192.168.1.114:8080/beauty/ws/socket?ID=laobi&client=web');
      // websocket.onmessage = function(evt) {
      //   $("#chatAudio")[0].play();
      //   that.$notify.info({
      //       title: '消息',
      //       message: evt,
      //       offset: 100
      //   });
      // };

      this.activePath = this.$route.path;
      if(this.$route.path == '/' || this.$route.path == ''){
        this.activePath = '/dashboard'
      }
      $("#nav").css({ height: window.innerHeight });
      $("#header").css({ width: window.innerWidth - 233 });
      $("#main").css({ height: window.innerHeight - 60, width: window.innerWidth - 233 })
      $(window).resize(function() {
        $("#nav").css({ height: window.innerHeight })
        $("#header").css({ width: window.innerWidth - 233 })
        $("#main").css({ height: window.innerHeight - 60, width: window.innerWidth - 233 })
      })
    }

  },
  methods: {
    outLogin: function () {
      this.$store.state.user = null;
      this.$router.push({name:'login'})
    },
    clickButton: function(val) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', val);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    setBarDispaly: function() {
      //this.isCollapse = !this.isCollapse
    }
  }
}
</script>


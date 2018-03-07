<template>
  <div>
    <el-container>
      <!-- 头部 start -->
      <el-header>
        <div class="flex-between">
          <div>
            <div class="logo"><span class="font-el">{{logoText}}</span></div>
            <div class="company"><span class="font-xs">{{companyText}}</span></div>
          </div>
          <el-dropdown>
            <div class="avatar-panel">
              <i class="el-icon-picture avatar"></i>
              <span>{{admin}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><el-button @click="loginOut()" type="text">退出登录</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>

      </el-header>
      <!-- 头部 end -->

      <el-container>
        <!-- 左侧菜单栏 start -->
        <el-aside width="220px">
          <el-menu :default-active="activePath" class="el-menu-vertical-demo"
            background-color="#434343" text-color="#fff" :router="true" :unique-opened="true"
            active-text-color="#409EFF">
            <div v-for="(item,index) in navList" v-bind:key="item.name">
              <el-menu-item v-if="item.path" :index="item.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
              <el-submenu v-if="!item.path" :index="item.name">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="(nav,nindex) in item.sub" v-bind:key="nav.path" :index="nav.path">{{nav.name}}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-aside>
        <!-- 左侧菜单栏 end -->

        <!-- main -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
@import url("/static/ecmode/style.css");
</style>

<script>
export default {
  data() {
    return {
      admin:'admin',
      activePath:'/ec_carousel',
      logoText:'SWMS',
      companyText:'',
      navList:[
        {name:'轮播图管理',path:'/ec_carousel'},
        {name:'用户定制信息',path:'/ec_msg_manger'},
        {name:'定制师管理',path:'/ec_master_maner'},
        {name:'主题游',path:'/ec_theme_manger'},
        {name:'案例故事',sub:[
          {name:'客户评价',path:'/ec_anli'},
          {name:'旅游心得',path:'/ec_experience'},
        ]},
        {name:'蜜月旅行',path:'/ec_honeymooon'},
        {name:'公司管理',path:'/ec_idea'},
        {name:'新闻资讯',path:'/ec_news'},
        {name:'旅游攻略',path:'/ec_toursim'},
        {name:'招聘职位',path:'/ec_ping'},
      ]
    };
  },
  mounted() {
    this.windowResize();

    $(".el-aside").css("height", window.innerHeight - 60);
    $(".el-main").css({"height":window.innerHeight-60,"overflow-y":"scroll"});
    this.activePath = this.$route.path;
      if(this.$route.path == '/ec_main' || this.$route.path == ''){
        this.activePath = '/ec_carousel';
        this.$router.push({path:'/ec_carousel'})
    }
    if(this.$store.state.user == '' || this.$store.state.user == null){
      this.$router.push({path:'/ec_login'});
    }
    // }else{
    //   this.admin = this.$store.state.user.adminName;
    //   if(this.$store.state.user.adminType == 2){
    //     this.navList[1].path = '/ec_shopcate';
    //   }
    //   if(this.$store.state.user.adminType == 1){
    //     this.navList[5].sub.push({name:'店铺列表',path:'/ec_store_list'});
    //   }
    // }

  },
  methods: {
    //高度自适应
    windowResize() {
      $(window).resize(function() {
        $(".el-aside").css("height", window.innerHeight - 60);
        $(".el-main").css("height",window.innerHeight-60);
      });
    },
    loginOut(){
      this.$store.state.user = null;
      this.$router.push({path:'/ec_login'})
    }
  }
};
</script>

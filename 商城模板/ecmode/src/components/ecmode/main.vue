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
            <el-menu-item index="/ec_overview">
              <i class="el-icon-menu"></i>
              <span slot="title">信息总览</span>
            </el-menu-item>
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
      activePath:'',
      logoText:'SWMS',
      companyText:'双沃科技',
      navList:[
        {name:'广告图管理',path:'/ec_carousel'},
        {name:'分类管理',path:'/ec_category'},
        {name:'物流模板管理',sub:[
          {name:'物流网点',path:'/ec_logistic_company'},
          {name:'物流模板',path:'/ec_logistic_template'}
        ]},
        {name:'商品管理',sub:[
          {name:'商品列表',path:'/ec_goods_list'},
          {name:'发布商品',path:'/ec_goods_add'},
        ]},
        {
          name:'订单管理',sub:[
            {name:'订单列表',path:'/ec_order_list'}
          ]
        },
        {name:'店铺管理',sub:[
          {name:'店铺基础设置',path:'/ec_shop_setup'},
          {name:'店铺装修',path:'/ec_store_decoration'}
        ]},

      ]
    };
  },
  mounted() {
    this.windowResize();

    $(".el-aside").css("height", window.innerHeight - 60);
    $(".el-main").css({"height":window.innerHeight-60,"overflow-y":"scroll"});
    this.activePath = this.$route.path;
      if(this.$route.path == '/' || this.$route.path == ''){
        this.activePath = '/ec_overview';
        this.$router.push({path:'/ec_overview'})
    }
    if(this.$store.state.user == '' || this.$store.state.user == null){
      this.$router.push({path:'/ec_login'});

    }else{
      this.admin = this.$store.state.user.adminName;
      if(this.$store.state.user.adminType == 2){
        this.navList[1].path = '/ec_shopcate';
      }
      if(this.$store.state.user.adminType == 1){
        this.navList[5].sub.push({name:'店铺列表',path:'/ec_store_list'});
      }
    }

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

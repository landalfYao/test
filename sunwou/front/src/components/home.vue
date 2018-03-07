<template>
  <div class="sunwo-container">
    <div class="carousel">
      <el-carousel trigger="click">
        <div class="sunwo-nav">
          <div class="sunwo-nav-cantainer">
            <div class="logo animated-fast fadeInDown">
              <img class="logo-img" src="/static/img/logo.png" width="40px">
              <span class="logo-txt">SUNWOU</span>
            </div>
            <ul class="nav-list animated-fast fadeInDown">
              <li v-for="(item,itemIndex) in navList" v-bind:key="itemIndex" v-bind:class="{'nav-list-active':item.active}">
                {{item.label}}
              </li>
            </ul>
            <div class="nav-meun-btn" @click="showNavList()">
              <i class="el-icon-menu"></i>
            </div>
          </div>
          <div class="nav-list-min">
            <dl>
              <dd v-for="(item,itemIndex) in navList" v-bind:key="itemIndex" v-bind:class="{'active':item.active}">
                {{item.label}}
              </dd>
            </dl>
          </div>
        </div>
        <el-carousel-item style="width:100%;height:100%;background:url(/static/img/c1.jpg) no-repeat center;background-attachment: fixed;background-size:auto 100%;display:flex;align-items:center">
          <div>
            <h1 class="animated fadeInUp">双沃网络科技有限公司</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item style="width:100%;height:100%;background:url(/static/img/c2.jpg) no-repeat center;background-attachment: fixed;background-size:auto 100%;display:flex;align-items:center">
        </el-carousel-item>

      </el-carousel>
      <div class="product-service">
        <div class="container service-container pros">
          <el-row>
            <el-col :span="24" :xs="24">
              <div class="title animated-fast fadeIn">产品与服务</div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px">
            <el-col :span="8" :xs="24">
              <div class="item animated-fast fadeInUp">
                <img src="/static/img/web.png" width="150" height="150">
                <div class="ftit">
                  <span>网站建设</span>
                </div>
                <div class="fcon">
                  <span>网页设计/服务器维护</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="item animated fadeInUp">
                <img src="/static/img/wx.png" width="150" height="150">
                <div class="ftit">
                  <span>小程序搭建</span>
                </div>
                <div class="fcon">
                  <span>微信小程序/支付宝小程序/微信H5页面</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="item animated-slow fadeInUp">
                <img src="/static/img/server.png" width="150" height="150">
                <div class="ftit">
                  <span>APP设计</span>
                </div>
                <div class="fcon">
                  <span>android开发</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="product-service service" style="min-height:700px">
        <div class="container service-container coms">
          <el-row>
            <el-col :span="24" :xs="24">
              <div class="title animated-fast fadeInUp" style="margin-top:100px">SUNWOU提供的专业服务</div>
            </el-col>
          </el-row>
          <el-row :gutter="60" style="margin-top:50px">
            <el-col :span="8" :xs="24" v-for="item in 6" v-bind:key="item" v-bind:class="['animated'+item, 'fadeInUp']" style="display:flex;justify-content: flex-start;margin-top:60px">
              <img src="/static/img/server.png" width="60" height="60">
              <div class="coms-content">
                <span class="tit">动态数据库</span><br>
                <span class="con">mongoB Dasdmasd s发大水是的dasd 官方高帅富第三方啊啊</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="product-service service" style="min-height:800px">
        <div class="container service-container anli">
          <el-row>
            <el-col :span="24" :xs="24">
              <div class="title animated-fast fadeInUp">客户案例</div>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-top:50px">
            <el-col :span="6" :xs="24" v-for="item in 8" v-bind:key="item" v-bind:class="['animated'+item, 'fadeInUp']" style="display:flex;justify-content: flex-start;margin-top:30px">
              <div class="anlis">
                <img src="/static/img/c1.jpg" width="100%" height="200px">
                <div>达咖</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('/static/css/animate.min.css');
@import url('/static/css/home.css');
</style>

<script>

export default {
  data() {
    return {
      carouselStyle: { height: window.innerHeight },
      navList: [
        { label: '首页', active: true },
        { label: '产品案例', active: false },
        { label: 'sunwou服务', active: false },
        { label: '关于我们', active: false }
      ]
    }
  },
  mounted: function() {
    const that = this;
    this.initWindowSize();
    $(".pros").hide();
    $(".coms").hide();
    $(".anli").hide();
    $(".nav-list-min").hide();
    window.onresize = function temp() {
      if (window.innerWidth < 800) {
        that.setCss('15px', '100%', '30px', '16px')
        $(".nav-meun-btn").show();
        $(".nav-list").hide();
      } else if (window.innerWidth > 800 && window.innerWidth < 1366) {
        that.setCss('15px 20px', '100%', '30px', '16px')
        $(".nav-meun-btn").hide();
        $(".nav-list").show();
        $(".nav-list-min").hide();
      } else {
        that.setCss('10px 20px', '80%', '40px', '18px')
        $(".nav-meun-btn").hide();
        $(".nav-list").show();
        $(".nav-list-min").hide();
      }
    };
    window.onscroll = function() {
      $(".nav-list-min").hide();
      $(".sunwo-nav").css({
        'color': '#262626',
        'background': ''
      });
      //console.log(window.scrollY)
      if (window.scrollY > 300) {
        $(".pros").show();
      }
      if (window.scrollY > $(".pros").height() + 600) {
        $(".coms").show();
      }
      if (window.scrollY > $(".pros").height() + $(".coms").height() + 800) {
        $(".anli").show();
      }
    }
  },
  methods: {
    showNavList: function() {
      if ($(".nav-list-min").css("display") == "none") {
        $(".nav-list-min").slideDown()
        $(".sunwo-nav").css({
          'color': '#ffffff',
          'background': '#262626'
        })
      } else {
        $(".nav-list-min").slideUp();
        $(".sunwo-nav").css({
          'color': '#262626',
          'background': ''
        })
      }
    },
    setCss: function(padding, width, logo, txt) {
      $(".sunwo-nav-cantainer").css({ width: width, padding: padding })
      $(".logo-img").css({ width: logo })
      $(".logo-txt").css({ 'font-size': txt })
    },
    initWindowSize: function() {
      if (window.innerWidth < 800) {
        this.setCss('15px', '100%', '30px', '16px')
        $(".nav-meun-btn").show();
        $(".nav-list").hide();
      } else if (window.innerWidth > 800 && window.innerWidth < 1366) {
        this.setCss('15px 20px', '100%', '30px', '18px')
        $(".nav-meun-btn").hide();
        $(".nav-list").show();
        $(".nav-list-min").hide();
      } else {
        this.setCss('10px 20px', '80%', '40px', '20px')
        $(".nav-meun-btn").hide();
        $(".nav-list").show();
        $(".nav-list-min").hide();
      }
    },

  }
}
</script>


<template>
  <div>
    <!-- ########## START: LEFT PANEL ########## -->


    <div class="sl-logo"><a href=""><i class="icon ion-android-star-outline"></i> SunWou</a></div>
    <div class="sl-sideleft">
      <div class="input-group input-group-search">
        <input type="search" name="search" class="form-control" placeholder="Search">
        <span class="input-group-btn">
          <button class="btn"><i class="fa fa-search"></i></button>
        </span><!-- input-group-btn -->
      </div><!-- input-group -->

      <label class="sidebar-label">Navigation</label>
      <div class="sl-sideleft-menu" id="navMenu">
        <div v-for="(item,index) in navList" :key="index">
          <a  href="#" v-bind:class="item.active ? item.class:' sl-menu-link'" @click="item.path ? navClick(index,-1):navClick(index,-2)">
            <div class="sl-menu-item">
              <i v-bind:class="'menu-item-icon tx-22 '+item.icon"></i>
              <span class="menu-item-label">{{item.name}}</span>
              <i v-if="!item.path" class="menu-item-arrow fa fa-angle-down"></i>
            </div><!-- menu-item -->
          </a><!-- sl-menu-link -->

          <ul v-if="!item.path" class="sl-menu-sub nav flex-column">
            <li class="nav-item" v-for="(li,jndex) in item.children" :key="jndex" @click="navClick(index,jndex)"><a href="#" v-bind:Class="li.class+' nav-link'">{{li.name}}</a></li>
          </ul>
        </div>

      </div><!-- sl-sideleft-menu -->

      <br>
    </div><!-- sl-sideleft -->
    <!-- ########## END: LEFT PANEL ########## -->

    <!-- ########## START: HEAD PANEL ########## -->
    <div class="sl-header">
      <div class="sl-header-left">
        <div class="navicon-left hidden-md-down"><a id="btnLeftMenu" href=""><i class="icon ion-navicon-round"></i></a></div>
        <div class="navicon-left hidden-lg-up"><a id="btnLeftMenuMobile" href=""><i class="icon ion-navicon-round"></i></a></div>
      </div><!-- sl-header-left -->
      <div class="sl-header-right">
        <nav class="nav">
          <div class="dropdown">
            <a href="" class="nav-link nav-link-profile" data-toggle="dropdown">
              <span class="logged-name">Jane<span class="hidden-md-down"> Doe</span></span>
              <!-- <img src="picture/img3.jpg" class="wd-32 rounded-circle" alt=""> -->
            </a>
            <div class="dropdown-menu dropdown-menu-header wd-200">
              <ul class="list-unstyled user-profile-nav">
                <li><a href=""><i class="icon ion-ios-person-outline"></i> Edit Profile</a></li>
                <li><a href=""><i class="icon ion-ios-gear-outline"></i> Settings</a></li>
                <li><a href=""><i class="icon ion-ios-download-outline"></i> Downloads</a></li>
                <li><a href=""><i class="icon ion-ios-star-outline"></i> Favorites</a></li>
                <li><a href=""><i class="icon ion-ios-folder-outline"></i> Collections</a></li>
                <li><a href=""><i class="icon ion-power"></i> Sign Out</a></li>
              </ul>
            </div><!-- dropdown-menu -->
          </div><!-- dropdown -->
        </nav>
        <div class="navicon-right">
          <a id="btnRightMenu" href="" class="pos-relative">
            <i class="icon ion-ios-bell-outline"></i>
            <!-- start: if statement -->
            <span class="square-8 bg-danger"></span>
            <!-- end: if statement -->
          </a>
        </div><!-- navicon-right -->
      </div><!-- sl-header-right -->
    </div><!-- sl-header -->
    <!-- ########## END: HEAD PANEL ########## -->
    <!-- ########## START: RIGHT PANEL ########## -->
    <div class="sl-sideright">
      <ul class="nav nav-tabs nav-fill sidebar-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" role="tab" href="#messages">Messages (2)</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" role="tab" href="#notifications">Notifications (8)</a>
        </li>
      </ul><!-- sidebar-tabs -->
      <!-- Tab panes -->
      <div class="tab-content">
      </div>
    </div>
    <!-- ########## END: RIGHT PANEL ########## -->

    <!-- ########## START: MAIN PANEL ########## -->
      <div class="sl-mainpanel">
        <nav class="breadcrumb sl-breadcrumb">
          <div >
            <a v-for="(item,index) in tabNav" :key="index" v-bind:class="index == tabNav.length-1 ? 'breadcrumb-item active':'breadcrumb-item'" href="#"  @click="index == 0 ? navClick(0,-1):tabClick(index)">{{index == 0 ? 'sunwou':item.name}}</a>
          </div>

        </nav>

        <div class="sl-pagebody">
          <router-view></router-view>
        </div>

      </div>
      <!-- ########## END: MAIN PANEL ########## -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { name: "首页", path: "/dashboard", icon: "icon ion-ios-home-outline" },
        { name: "轮播图管理", path: "/carousel", icon: "icon ion-grid" },
        {
          name: "类目管理",
          icon: "icon ion-navicon-round",
          path: "/category_list"
        },
        { name: "商品管理", icon: "icon ion-navicon-round", path: "/goods_list" },
        { name: "新增商品", path: "/goods_add", icon: "icon ion-plus-circled" },
        { name: "订单管理", icon: "icon ion-clipboard", path: "/order_list" },
        { name: "店员管理", icon: "icon ion-clipboard", path: "/user" },
        { name: "通知", icon: "icon ion-speakerphone", path: "/notice" },
        { name: "积分说明", icon: "icon ion-speakerphone", path: "/textarea" }
      ],
      tabNav: []
    };
  },
  mounted() {
    if (this.$store.state.isLogin == false) {
      this.$router.push({ path: "/login" });
    } else {
      this.initNavList(0, -1);
    }
    this.orderTS();
  },
  methods: {
    orderTS: function() {
      let that = this;
      $.ajax({
        type: "POST",
        url: that.$store.state.ip + "findorder",
        data: {
          appid: that.$store.state.appid,
          status: "2"
        },
        dataType: "JSON",
        success: function(res) {
          if (res.code == 1000) {
            if (res.body != undefined && res.body.length > 0) {
              var borswer = window.navigator.userAgent.toLowerCase();
              if (borswer.indexOf("ie") >= 0) {
                //IE内核浏览器
                var strEmbed =
                  '<embed name="embedPlay" src="' +
                  that.$store.state.wavip +
                  '/upload/order.wav" autostart="true" hidden="true" loop="false"></embed>';
                if ($("body").find("embed").length <= 0) {
                  $("body").append(strEmbed);
                }
                var embed = document.embedPlay;

                //浏览器不支持 audion，则使用 embed 播放
                embed.volume = 100;
                //embed.play();这个不需要
              } else {
                //非IE内核浏览器
                var strAudio =
                  "<audio id='audioPlay' src='" +
                  that.$store.state.ip +
                  "/upload/order.wav' hidden='true'></audio>";
                if ($("body").find("audio").length <= 0) {
                  $("body").append(strAudio);
                }
                var audio = document.getElementById("audioPlay");

                //浏览器支持 audion
                audio.play();
              }
            } else {
            }
          }
        }
      });
      var intervalId = setInterval(function() {
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "findorder",
          data: {
            appid: that.$store.state.appid,
            status: "2"
          },
          dataType: "JSON",
          success: function(res) {
            if (res.code == 1000) {
              if (res.body != undefined && res.body.length > 0) {
                var borswer = window.navigator.userAgent.toLowerCase();
                if (borswer.indexOf("ie") >= 0) {
                  //IE内核浏览器
                  var strEmbed =
                    '<embed name="embedPlay" src="' +
                    that.$store.state.wavip +
                    'upload/order.wav" autostart="true" hidden="true" loop="false"></embed>';
                  if ($("body").find("embed").length <= 0) {
                    $("body").append(strEmbed);
                  }
                  var embed = document.embedPlay;

                  //浏览器不支持 audion，则使用 embed 播放
                  embed.volume = 100;
                  //embed.play();这个不需要
                } else {
                  //非IE内核浏览器
                  var strAudio =
                    "<audio id='audioPlay' src='" +
                    that.$store.state.wavip +
                    "'upload/order.wav' hidden='true'></audio>";
                  if ($("body").find("audio").length <= 0) {
                    $("body").append(strAudio);
                  }
                  var audio = document.getElementById("audioPlay");

                  //浏览器支持 audion
                  audio.play();
                }
              } else {
              }
            }
          }
        });
      }, 600000);
    },
    //初始化左侧导航
    initNavList(index, sub) {
      for (var i in this.navList) {
        this.navList[i].class = "sl-menu-link";
        if (this.navList[i].path) {
          this.navList[i].active = false;
        } else {
          for (var j in this.navList[i].children) {
            this.navList[i].children[j].active = false;
            this.navList[i].children[j].class = "nav-link";
          }
        }
      }
      if (sub == -1) {
        this.navList[index].active = true;
        this.navList[index].class = "sl-menu-link active";
        this.$router.push({ path: this.navList[index].path });
      } else {
        this.navList[index].active = true;
        this.navList[index].class = "sl-menu-link active show-sub";
        this.navList[index].children[sub].class = "nav-link active";
        this.navList[index].children[sub].active = true;
        this.$router.push({ path: this.navList[index].children[sub].path });
      }
      this.tabNav = this.$route.matched;
    },
    //导航跳转
    navClick(index, jndex) {
      if (jndex == -1) {
        this.initNavList(index, -1);
        this.navList[index].class = "sl-menu-link active";
      } else if (jndex == -2) {
        this.initNavList(index, -1);
        this.navList[index].class = "sl-menu-link show-sub";
      } else {
        this.initNavList(index, jndex);
      }
    },
    tabClick(index) {}
  }
};
</script>

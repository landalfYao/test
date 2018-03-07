<template>
<transition name="el-fade-in-linear">
  <div class="ms_container">
    <div class="ms_container_pc">
      <!-- pc header start -->
      <div class="ms_header">
        <div class="ms_logo" @click="navTo('/home')"><img src="../assets/img/logo.png"></div>
        <div class="ms_notice">
          <div class="ms_title"><span>纯蔬菜提取的调味品</span></div>
          <div class="ms_link"><span @click="navTo('/home')">首页</span>&nbsp;&nbsp;|&nbsp;&nbsp;
          <span @click="navTo('/legal',{id:6})">联系我们</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="active" style="font-weight:bold" onClick="javascript:window.location.href='http://massel.com/international/'">访问我们的澳洲网站</span></div>
        </div>
        <div class="ms_cu_line"></div>
        <div class="ms_nav">
          <div  v-for="(item,index) in nav" :key="item.label" v-if="index > 1"  :class="item.plus ? ' ms_nav_item_plus':'ms_nav_item' " ><span @click="navTo(item.path,item.params)">{{item.label}}</span>
            <div class="bigit" v-if="item.sub" style="box-shadow:2px 2px 2px #a1a1a1">
              <div class="biitem" style="width:300px;text-align:left;padding-left:20px;line-height:40px" v-for="(li,lindex) in item.sub" :key="lindex"  @click="navTo(li.path,li.params)">-{{li.label}}</div>
            </div>
            <div class="bigit" v-if="item.dig && item.plus" style="width:880px;margin-left:-48px;box-shadow:2px 2px 2px #a1a1a1">
              <div class="pull-left" v-for="gi in item.dig" :key="gi.label">
                <div style="cursor: default;width:100px;text-align:center;line-height:40px;color:#444444;font-weight:bold;">{{gi.label}}</div>
                <div class="biitem" v-for="(li,lindex) in gi.sub" :key="lindex"  @click="navTo(li.path,li.params)">-{{li.label}}</div>
              </div>
            </div>
          </div>

          <div class="ms_nav_item KL" >
            <img src="../assets/img/search.png" width="16px" ><br>
            <div class="isOK"  style="width:200px;">
                <img src="../assets/img/jx.png" alt="" width="180px" style="position:relative;left:-60px;top:-10px">
                <input class="hjjj" v-model="searchString" type="text" placeholder="输入关键字" @keyup.enter="navSearch()" >
                <img src="../assets/img/sea.png" width="15px" alt="" style="position:relative;left:-65px;top:-60px" @click="navSearch()">
            <!-- <el-input  placeholder="输入关键字" v-model="searchString" @keyup.enter="navSearch()" class=" input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="navSearch()"></el-button>
            </el-input> -->
            </div>
          </div>

        </div>

      </div><!-- pc header end -->
      <!-- mobile header start -->
      <div class="ms_mobile_header navbar navbar-default ">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><img src="../assets/img/logo1.png" width="50"></a>
          </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li v-for="item in nav" :key="item.label" :class="item.plus ? 'dropdown':''">
                <a v-if="!item.plus" href="#" @click="navTo(item.path)">{{item.label}}</a>
                <a v-if="item.plus"  href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{item.label}} <span class="caret"></span></a>
                <ul v-if="item.plus" class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#">Separated link</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>

            </ul>
            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search">
              </div>
            </form>
          </div>
        </div>
      </div><!-- mobile header end -->
      <div class="ms_main">
        <router-view></router-view>
      </div>
    </div>
    <div class="ms_footer clearfix" style="clear:both">
      <img class="img_brand" src="../assets/img/brand.png" >
      <div class="bar_line"></div>
      <div class="foot_panel">
        <div class="pc_size">
          <a href="http://www.greenpalm.org/"><img class="foo_img" src="../assets/img/b1.png"></a>
          <img class="foo_img" style="margin-left:20px" src="../assets/img/b2.png">
          <a href="https://celiac.org/"><img class="foo_img" style="margin-left:20px" src="../assets/img/b3.png"></a>
          <img class="foo_img" style="margin-left:20px" src="../assets/img/b4.png">
          <div class="align_right">
            <div>想要联系或找不到我们的产品？</div>
            <div style="line-height:30px">告诉我们...<b>电子邮箱: </b><a class="dk"  href="mailto:massel_cn@126.com">massel_cn@126.com</a></div>
            <div><b>访问我们的<span class="dk" onClick="javascript:window.location.href='http://massel.com/international/'">澳大利亚</span>网站</b></div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="foot_bottom">
        <div class="pc_size">
          <div class="pull-left">©2012-2017 Massel | 纯蔬菜提取的调味品</div>
          <div class="pull-right panel-end">
            <div class="fb_item" @click="navTo('/legal',{id:8})">提示</div>
            <div class="fb_item" @click="navTo('/shipu',{id:8})">我们的食谱</div>
            <div class="fb_item" @click="navTo('/ms_product',nav[2].params)">我们的产品</div>
            <div class="fb_item" @click="navTo('/legal',{id:7})">法律声明</div>
            <div class="fb_item" @click="navTo('/legal',{id:6})">联系我们</div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>

    <div class="flexsfix">
      <div style="width:140px;float:left;height:1px">
        <div class="fun" v-show="showsao">
          <div style="width:85px;height:7px;border-radius:7px;margin:auto;margin-top:5px;background:#fff"></div>
          <div style="margin:auto;margin-top:5px;background:#fff;border-radius:5px;width:120px">
            <div style="text-align:center;font-size:12px;padding-top:5px;">打开微信<br>扫一扫关注我们</div>
            <img src="../assets/img/qr.png" alt="" width="120px" >
          </div>
          <div style="width:25px;height:25px;background:#ffffff;border-radius:25px;margin:auto;margin-top:5px"></div>
        </div>
      </div>
      <div style="width:54px;float:left">
        <div class="item" @mouseover="showsao = true" @mouseout="showsao = false"><img class="u1" src="../assets/img/sao.png" width="54px" height="54px" alt="">
          <img class="u2" src="../assets/img/sao1.png" width="54px" height="54px" alt=""></div>
        <div class="item" @click="fixTop()"><img  class="u1" src="../assets/img/top.png" width="54px" height="54px" alt="">
          <img class="u2" src="../assets/img/top1.png" width="54px" height="54px" alt=""></div>
      </div>

    </div>

    <div class="ms_mobile_footer" >
       <a href="http://www.greenpalm.org/"><img class="foo_img" src="../assets/img/b1.png"></a>
       <img class="foo_img" style="margin-left:20px" src="../assets/img/b2.png"><br>
       <a href="https://celiac.org/"><img class="foo_img"  src="../assets/img/b3.png"></a><br>
       <img class="foo_img" src="../assets/img/b4.png">
       <div class="">
            <div>想要联系或找不到我们的产品？</div>
            <div style="line-height:30px">告诉我们...<b>电子邮箱: </b><a style="color:#756953" href="mailto:hz_ast@163.com">hz_ast@163.com</a></div>
            <div><b>访问我们的<span style="color:#756953">澳大利亚</span>网站</b></div>
      </div>
      <div style="border-bottom:1px solid #888888;width:100%;margin-top:30px;margin-bottom:30px"></div>
      <div style="text-align:center">
        <div class="fb_item" @click="navTo('/legal',{id:8})">提示</div>
        <div class="fb_item" >我们的食谱</div>
        <div class="fb_item" @click="navTo('/ms_product',nav[2].params)">我们的产品</div>
        <div class="fb_item" @click="navTo('/legal',{id:7})">法律声明</div>
        <div class="fb_item" @click="navTo('/legal',{id:6})">联系我们</div>
      </div>
      <div style="margin-top:30px">©2012-2017 Massel | 纯蔬菜提取的调味品</div>
    </div>

  </div>
</transition>
</template>
<style>
@import url('../assets/css/main.css');
.flexsfix{
  width: 196px;
  position: fixed;
  top: 70%;
  left: 80%;
}
.fun{
  width: 140px;
  height: 210px;
  background: #e8dfcc;
  float: left;
  border-radius: 5px 0 5px 5px
}
.flexsfix  .item{
  background: #fff;
  cursor: pointer;
  float: left;
  border: 1px solid #e8dfcc
}
.flexsfix  .item > .u1{
  display: block;
}
.flexsfix  .item > .u2{
  display: none;
}
.flexsfix  .item:hover{
  background: #e8dfcc
}
.flexsfix  .item:hover > .u1{
  display: none;
}
.flexsfix  .item:hover > .u2{
  display: block;
}
.hjjj{
  width:135px;height:30px;position:relative;left:-69px;top:-60px;
  padding-left: 10px;
  border: 0;
  border-right:1px solid #cac6bf;
}
.hjjj:focus{
  outline: 0
}
.dk{
  color:#756953;
  cursor: pointer;
}
.dk:hover{
  color: #63b1e5
}
.KL{
  width: 100px;
  height: 45px;
}
.KL .isOK{
  display: none
}
.KL:hover .isOK{
  float: left;
  display: block;
}
</style>

<script>
export default {
  data(){
    return {
      showsao:false,
      searchString:'',
      ip:'http://www.tongzhuhe.com/FAV/',
      pcNavOverShow:false,
      nav:[{label:'首页',path:'/home',params:''},
        {label:'访问我们的澳洲网站',path:'/ms_product',params:''},
        {label:'唛蔬+',path:'/ms_product',plus:true,dig:[{label:'唛蔬产品',sub:[

        ]},{label:'膳食',sub:[

        ]}]},
        {label:'购买途径',path:'/for_map'},
      {label:'食谱',path:'/shipu',plus:true,sub:[
        {label:'唛蔬食谱',path:'/shipu'},
        {label:'美味提示',path:'/legal',params:{id:8}},
        {label:'网红视频',path:'/home'},
      ]},
      {label:'唛蔬新闻',path:'/news',params:{id:1},plus:true,sub:[{label:'唛蔬活动',path:'/news',params:{id:2}}]}
      ,{label:'问题解答',path:'/question'},
      {label:'企业合作',path:'/legal',params:{id:7},plus:true,sub:[
        {label:'法律声明',path:'/legal',params:{id:7}},
        {label:'联系我们',path:'/legal',params:{id:6}},
        {label:'品牌介绍',path:'/legal',params:{id:9}},
      ]}]
    }
  },

  mounted(){
    if(this.$route.fullPath=='/'){
      this.$router.push({path:'/home'});
    }

    this.getMsPro()
  },
  methods: {
    fixTop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

    },
    navSearch(){
      this.$router.push({path:'/search',query:{search:this.searchString}});
    },
    getMsPro(){
      var that = this;
      $.ajax({
        url:this.ip+'pageInfo/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          pageType:1
        },
        success(res){
          var li = res.object;
          for(var i in li){
            if(li[i].pageTitle == "唛蔬产品"){
              that.nav[2].params = {id:li[i].id}
            }else{
              if(li[i].pageTitle.indexOf('--p')<0){
                that.nav[2].dig[0].sub.push({label:li[i].pageTitle,path:'/ms_product',params:{id:li[i].id}})
              }

            }

          }

        }
      })
      $.ajax({
        url:this.ip+'pageInfo/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          pageType:2
        },
        success(res){
          var li = res.object;
          for(var i in li){
            that.nav[2].dig[1].sub.push({label:li[i].pageTitle,path:'/ms_product',params:{id:li[i].id}})
          }

        }
      })
    },
    navTo(path,params){
      this.$router.push({path:path,query:params})
    },
    navOutPc(plus){
      if(plus){
        this.pcNavOverShow = false;
      }
    },
    navOverPc(plus){
      if(plus){
        this.pcNavOverShow = true;
      }
    }
  }
}
</script>

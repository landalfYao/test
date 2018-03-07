<template>
  <div>
    <div class="container-fluid">
			<div class="row">
				<div id="header" class="col-lg-12 col-sm-12">
					<nav class="navbar nav-bar navbar-default navbar-fixed-top">
						<!-- Brand and toggle get grouped for better mobile display -->
						<div class="navbar-header col-lg-3">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              </button>
							<a class="navbar-brand" href="javascript:;" @click="changeNav(0)"><img src="/static/image/logo-nav.png" width="200"></a>
						</div>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse col-lg-9" id="bs-example-navbar-collapse-1">
							<ul class="nav navbar-nav">
								<li v-for="(item,index) in nav" v-bind:key="index"  v-bind:class="item.active ? 'active':''">
									<a href="#" @click="changeNav(index)"> {{item.label}} </a>
								</li>

							</ul>
						</div>
						<!-- Button trigger modal -->

						<button class="pull-right" type="button" @click="_open()">立即定制</button>
						<div class="pull-right">
							<img src="/static/image/tele.png" style="height: 30px;margin-right: 10px;">
						</div>
						<div class="pull-right">
							<a href="http://weibo.com/u/6177901024?refer_flag=1001030201_"><img src="/static/image/weibo.png" style="width: 30px;margin-right: 10px;"></a>
						</div>
						<div class="pull-right">
							<a href="javascript:;" @click="_wechat()"><img src="/static/image/weixin.png" style="width: 30px;margin-right: 10px;"></a>
						</div>
					</nav>
				</div>
			</div>
		</div>

    <router-view></router-view>

    <!--页尾-->
		<div class="container-fluid">
			<div class="row">
				<footer>
					<div class="col-lg-12 col-xs-12">
						<center><img src="/static/image/logo-footer.png" style="margin-bottom: 10px;"></center>
						<center>
							<a href="#" v-for="(item,index) in footer" v-bind:key="index" @click="changeFooter(index)">{{item.label}}</a>
						</center>
						<center>
							<p>
								Copyright © 2017 duyimemo.com 保留所有权利 浙ICP备17024553号 商务合作：010-58769331 独忆MEMO高端定制旅游<br>地址：浙江省宁波市鄞州区首南街道恒业大厦601室 *本网站部分图片来自网络，若作者看到，请尽快与独忆MEMO联系。
							</p>
						</center>
					</div>
					<div class="clearfix">
					</div>
				</footer>
			</div>
		</div>

    <!--返回顶部-->
		<div id="moquu_wxin" class="moquu_wxin">
			<a href="javascript:void(0)">
				<div class="moquu_wxinh"></div>
			</a>
		</div>
		<div id="moquu_wshare" class="moquu_wshare">
			<a href="javascript:void(0)">
				<div class="moquu_wshareh"></div>
			</a>
		</div>

    <el-dialog :width="qrwidth" title="微信二维码" :visible.sync="wxVisible" center>
      <img src="/static/image/about_erweima.png" width="100%">
    </el-dialog>
    <el-dialog :width="edwidth" title="报名" :visible.sync="dingVisble" center style="padding:0">

      <div class="container-fluid">
        <div class="row">

          <div class="col-lg-12 col-xs-12 bottom_form_container bottom_book" style="width: 100%;text-align:center">
            <div class="form_container contact-form">
              <h1>你只需要决定出发</h1>
              <p>- 剩下所有的一切，交给独忆MEMO就好 -</p>
              <form >
                <div class="row">
                  <input type="text" style="width:100%;" v-model="addData.name" placeholder="姓名">
                </div>
                <div class="row">

                  <input id="old_destination" type="text" v-model="addData.destination" class="old_destination" placeholder="海外目的地">
                  <input id="travel_days" class="travel_days" v-model="addData.day" type="text"  placeholder="天数">
                </div>
                <div class="row">
                  <input id="phone" class="phone_input" type="tel" v-model="addData.phone"   placeholder="手机" autocomplete="off">
                </div>
                <div class="row">
                  <textarea  id="comment" v-model="addData.remark" placeholder="备注内容"></textarea>
                </div>
                <div class="row submit">
                  <button  @click="submit()">提交</button>
                </div>
              </form>

            </div>

          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<style>
  @import url('http://duyimemo.com/template/default/css/css.css');
  @import url('/static/css/main2.css');
  @import url('/static/css/nav_footer.css');
  @import url('http://duyimemo.com/template/default/css/css.css');
</style>

<script>
export default {
  data(){
    return {
      addData:{
        name:'',
        phone:'',
        destination:'',
        day:'',
        remark:''
      },
      qrwidth:'30%',
      edwidth:'50%',
      dingVisble:false,
      wxVisible:false,
      nav:[
        {label:'首页',active:true,path:'/me_home'},
        {label:'定制旅行',active:false,path:'/costomer_order_tour'},
        {label:'定制师',active:false,path:'/me_tailor'},
        {label:'主题游',active:false,path:'/me_theme_traval'},
        {label:'案例故事',active:false,path:'/me_story_comment'},
        {label:'蜜月旅行',active:false,path:'/me_honeymoon'},
        {label:'关于我们',active:false,path:'/me_aboutus'},
      ],
      footer:[
        {label:'旅行攻略',path:'/me_toursim'},
        {label:'蜜月旅行',path:'/me_honeymoon'},
        {label:'旅行知识',path:'/me_knowlege'},
        {label:'新闻资讯',path:'/me_news'},
        {label:'加入我们',path:'/me_joinus'}
      ]
    }
  },
  mounted () {
    if(this.$route.path == '/'){
      this.$router.push({path:'/me_home'})
    }
    this.inintWindow();
  },
  methods:{
    submit(){
      var that = this;
      $.post(this.$store.state.ip+'reserve/add',this.addData,function(res){
        res = JSON.parse(res)
        that.dingVisble = false;
        if(res.code == 1000){
         that.$message({
                type: 'success',
                message: '信息已提交'
            });
        }else{
          that.$message({
                type: 'error',
                message: res.result
            });
        }
      })
    },
    inintWindow(){
      var that = this;
      //响应式宽度设置
      $(window).resize(function(){
        if(this.window.innerWidth <= 500){
          that.qrwidth = '100%';
          that.edwidth = '100%'
        }else if(this.window.innerWidth >500 && this.window.innerWidth <1000){
          that.qrwidth = '60%';
          that.edwidth = '100%'
        } else{
          that.qrwidth = '30%';
          that.edwidth = '50%'
        }
      })
    },
    initNav(){
      for(var i in this.nav){
        this.nav[i].active = false;
      }
    },
    changeNav(index){
      this.initNav();
      this.nav[index].active = true;
      this.$router.push({path:this.nav[index].path})
    },
    changeFooter(index){
      this.initNav();
      this.$router.push({path:this.footer[index].path});
    },
    _wechat(){
      this.wxVisible = true
    },
    _open(){
      this.dingVisble = true
    }
  }
}
</script>

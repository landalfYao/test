<template>
  <div>
    <div class="container-fluid banner_image banner-image" style="margin-top: 60px;">
			<img src="/static/image/knowledge_banner.png" style="width: 100%;">
		</div>

		<div class="container-fluid" style="padding: 40px 0;">
			<div class="row">
				<div class="col-lg-8 col-xs-12 list-l">

					<div class="col-lg-12" style="padding: 20px 0;" v-for="item in list" :key="item.sunwouId">
						<div class="col-lg-1"></div>
						<div class="col-lg-5">
							<a href="javascript:;"><img v-bind:src="ip+item.image" style="width: 100%;"></a>
						</div>
						<div class="col-lg-4 title-ts">
							<h5>{{item.title}}</h5>
							<p>
								{{item.text}}
							</p>
						</div>
					</div>


					<div class="story_page col-lg-12 col-xs-12">
						<div class="story_page col-lg-9 col-sm-10 col-xs-12">
								<el-pagination style="" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page.sync="pageModel.page" :page-size="pageModel.total" layout="prev, pager, next, jumper"
                  :total="pageModel.total">
                </el-pagination>
							</div>
					</div>
				</div>

				<div class="col-lg-3 col-xs-12 list-r">
					<div>
						<center>
							<img src="/static/image/banner_honeymoon.png" style="width: 100%;margin-bottom: 20px;">

						</center>
					</div>
					<form>
						<input type="search" placeholder="Search">
					</form>
					<hr>
					<p class="story_right_title">
						为您推荐
					</p>
					<div class="Message">
						<div id="news_scllo">
							<div id="news_scllo1">
								<ul>
									<a href="about_contact.html">
										<li>定制旅游不跟团，也不自助，设计好最符合您要求的行程线路。</li>
									</a>
									<a href="about_history.html">
										<li>一个人就可以成团，但是我们推荐4-8人成团</li>
									</a>
									<a href="about_idea.html">
										<li>不带你进坑人的购物店，行程可以根据您的要求自己定。</li>
									</a>
									<a href="javascript:;">
										<li>专业顾问和当地私导会根据行程推荐当地美食。</li>
									</a>
									<a href="javascript:;">
										<li>定制旅游不跟团，也不自助，设计好最符合您要求的行程线路。</li>
									</a>
									<a href="javascript:;">
										<li>定制旅游不跟团，也不自助</li>
									</a>
									<a href="javascript:;">
										<li>一个人就可以成团</li>
									</a>
									<a href="javascript:;">
										<li>行程可以根据您的要求自己定。</li>
									</a>
									<a href="javascript:;">
										<li>根据行程推荐当地美食。</li>
									</a>
									<a href="javascript:;">
										<li>设计好最符合您要求的行程线路。</li>
									</a>
								</ul>
							</div>
							<div id="news_scllo2" class="tagsContent">
							</div>
						</div>
					</div>
					<div class="wechat">
						<center>
							<p>
								*******************
							</p>
							<img src="/static/image/about_erweima.png" style="width: 40%;"></center>
					</div>
					<div class="clear">
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<style>
@import url('/static/css/main.css');
</style>
<script>
export default {
  data(){
    return {
      ip:'',
      pageModel:{
        page:1,
        size:8,
        total:0
      },
      list:[]
    }
  },
  mounted(){
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.initLun();
    this.ip = this.$store.state.ip;
    this.getList();
  },
  methods: {
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:9,
        page:this.pageModel.page,
        size:this.pageModel.size
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          that.pageModel.page = res.body.page;
          that.pageModel.total = res.body.total;
          that.list = res.body.content
        }
      })
    },
    handleSizeChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    initLun(){
      var speed = 120;
      var fgDemo = document.getElementById('news_scllo');
      var fgDemo1 = document.getElementById('news_scllo1');
      var fgDemo2 = document.getElementById('news_scllo2');
      fgDemo2.innerHTML = fgDemo1.innerHTML;

      function marquee1() {
        if(fgDemo.scrollTop >= fgDemo2.offsetHeight) {
          fgDemo.scrollTop -= fgDemo1.offsetHeight
        } else {
          fgDemo.scrollTop++
        }
      }
      var myMar1 = setInterval(marquee1, speed);
      fgDemo.onmouseover = function() {
        clearInterval(myMar1)
      }
      fgDemo.onmouseout = function() {
        myMar1 = setInterval(marquee1, speed)
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="container-fluid banner-image" style="margin-top: 60px;">
			<img src="/static/image/story_banner.jpg" style="width: 100%;">
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="mintop story_top" style="margin-top:100px">
					<center>
            <span><a href="javascript:;" v-bind:id="chanshow ? 'bread':''" @click="chanshow = true"> 客户评价</a></span>
						<span><a href="javascript:;" v-bind:id="chanshow ? '':'bread'" @click="chanshow = false">旅游心得</a></span>
          </center>
				</div>
			</div>
		</div>
    <div v-show="chanshow">
      <div class="container-fluid">
        <div class="row">
          <div class="tz-gallery">
            <div class="col-sm-6 col-md-4" v-for="item in list" :key="item.sunwouId">
              <div class="thumbnail">
                <a class="lightbox" href="#">
                  <img v-bind:src="ip+item.image" width="90%">
                </a>
                <div class="caption">
                  <h3>{{item.title}}</h3>
                  <p>{{item.text}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row" style="width:100%;text-align:center;padding:30px">
          <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="pageModel.page" :page-size="pageModel.total" layout="prev, pager, next, jumper"
            :total="pageModel.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-show="!chanshow">
      <div class="container-fluid">
        <div class="row">
          <div class="story_main col-lg-11 col-xs-12">
            <div class="story_left col-lg-8 col-xs-12">
              <div class="story_left_list" v-for="item in glist" :key="item.sunwouId">
                <a href="javascript:;"><img v-bind:src="ip+item.image"></a>
                <p>
                  <a href="javascript:;">{{item.title}}</a>
                </p>
                <br>
                <p class="text">
                  {{item.text}}
                </p>
                <p class="text">
                  {{item.createTime}}
                </p>
              </div>
              <div class="row" style="width:100%;text-align:left;padding:30px">
                <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page.sync="pageModel.page" :page-size="pageModel.total" layout="prev, pager, next, jumper"
                  :total="pageModel.total">
                </el-pagination>
              </div>
            </div>
            <div class="story_right col-lg-4 col-xs-12">
              <p class="story_right_title">
                发现世界的不同 寻找自己的旅程
              </p>
              <img src="/static/image/story_sq1.png"><br>
              <img src="/static/image/story_sq2.png"><br>
              <p class="story_right_question">
                Q1:什么是定制旅游？
              </p>
              <p class="story_right_answer">
                定制旅游不跟团，也不自助，我们的资深旅游定制师帮您设计好最符合您要求的行程线路。 到了国外有人全程陪同的自由行，高度自由却又省时省心。
              </p>
              <p class="story_right_question">
                Q2：我到了境外有人接吗？
              </p>
              <p class="story_right_answer">
                有，并且是绝对专业的地接 您从机场出来的瞬间就能看到我们的合作地接私导举着牌子在等您了。 而且是说中文的。
              </p>
              <p class="story_right_question">
                Q3：我到了境外有人接吗？
              </p>
              <p class="story_right_answer">
                有，并且是绝对专业的地接 您从机场出来的瞬间就能看到我们的合作地接私导举着牌子在等您了。 而且是说中文的。
              </p>
              <p class="story_right_question">
                Q4：那你们的产品几个人起卖？
              </p>
              <p class="story_right_answer">
                一个人就可以成团，但是我们推荐4-8人成团，性价比最高。
              </p>
              <p class="story_right_question">
                Q5：你们做公司客旅游吗？
              </p>
              <p class="story_right_answer">
                做的，很专业，不信你打电话过来我给你看案例。
              </p>
              <p class="story_right_question">
                Q6：你们和那些跟团游区别在哪里？
              </p>
              <p class="story_right_answer">
                我们不带你进坑人的购物店，行程可以根据您的要求自己定，比如您带10岁左右孩子去英国，那我们可能会给您安排哈利波特城堡，骑马等亲子项目
              </p>
              <p class="story_right_question">
                Q7：到了国外吃饭怎么解决？
              </p>
              <p class="story_right_answer">
                早餐一般在酒店享用自助餐，因为大家口味天差地别。中晚餐我们会推荐您自己选择，我们的专业顾问和当地私导会根据行程推荐当地美食.
              </p>
            </div>
            <div class="clear">
            </div>
				</div>
			</div>
		</div>
    </div>
  </div>
</template>
<style>
@import url('/static/css/thumbnail-gallery.css');
@import url('/static/css/baguetteBox.min.css');
@import url('/static/css/main.css');
</style>

<script>
export default {
  data(){
    return {
      chanshow:true,
      ip:'',
      list:[],
      glist:[],
      pageModel:{
        page:1,
        size:12,
        total:0
      }
    }
  },
  mounted(){
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.ip = this.$store.state.ip;
    this.getList();
    this.getGlist();
  },
  methods:{
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:5,
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
    getGlist(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:6,
        page:this.pageModel.page,
        size:this.pageModel.size
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          that.pageModel.page = res.body.page;
          that.pageModel.total = res.body.total;
          that.glist = res.body.content
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

  }
}
</script>

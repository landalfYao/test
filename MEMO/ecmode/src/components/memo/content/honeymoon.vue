<template>
  <div>
    <div class="container-fluid banner-image" style="margin-top: 60px;">
			<img src="/static/image/banner_honeymoon.png" style="width: 100%">
		</div>
		<div class="container-fluid content">
			<div class="row">
				<div class="col-lg-12">
					<div class="bre" data-move-x="-50px">
						<h2>走我们全世界度蜜月去！</h2>
					</div>
				</div>
			</div>
		</div>
    <div v-for="item in list" :key="item.sunwouId">
      <div class="container-fluid odd1-bg " v-if="item.text.image2" v-bind:style="'background-image: url('+ip+item.text.image2+'); background-size: cover;'">
        <div class="row">
          <div class="col-lg-6 col-xs-12 hm-txt1 bre" data-move-y="50px">
            <span>{{item.text.title}}</span>
            <h4>{{item.text.label}}</h4>
            <h5>{{item.text.subTitle}}</h5>
            <a href="javascript:;" class="btn btn-default btn-lg" role="button">蜜月景点</a>
            <img src="/static/image/Italy2.png" style="width: 100%;">
            <p>
              {{item.text.content}}
            </p>
          </div>
        </div>
      </div>
      <div class="container-fluid even2-bg " v-if="item.text.image2 == ''" v-bind:style="'background-image: url('+ip+item.text.image1+'); background-size: cover;'">
        <div class="row">
          <div class="col-lg-6 col-xs-12 hm-txt2 bre" data-move-y="-50px">
            <span>{{item.text.title}}</span>
            <h4>{{item.text.label}}</h4>
            <h5>{{item.text.subTitle}}</h5>
            <a href="javascript:;" class="btn btn-default btn-lg" role="button">蜜月景点</a>
            <p>
              {{item.text.content}}
            </p>
          </div>
        </div>
      </div>
    </div>

		<!-- <div class="container-fluid odd3-bg " style="background-image: url(/static/image/greece.png);
				background-size: cover;">
			<div class="row">
				<div class="col-lg-6 col-xs-12 hm-txt1 bre" data-move-x="-50px">
					<span>希腊·Greece</span>
					<h4>希腊梦幻之旅</h4>
					<h5>什么什么什么什么</h5>
					<a href="javascript:;" class="btn btn-default btn-lg" role="button">蜜月景点</a>
					<img src="/static/image/Italy2.png" style="width: 100%;">
					<p>
						希腊，一个什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么。
					</p>
				</div>
			</div>
		</div>
		<div class="container-fluid even4-bg " style="background-image: url(/static/image/france1.png);
				background-size: cover;">
			<div class="row">
				<div class="col-lg-6 col-xs-12 hm-txt2 bre" data-move-y="50px">
					<span>法国·France</span>
					<h4>什么什么什么什么什么</h4>
					<h5>什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么</h5>
					<a href="javascript:;" class="btn btn-default btn-lg" role="button">蜜月景点</a>
					<p>
						什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么。
					</p>
				</div>
			</div>
		</div>
		<div class="container-fluid odd5-bg " style="background-image: url(/static/image/france.png);
				background-size: cover;">
			<div class="row">
				<div class="col-lg-6 col-xs-12 hm-txt1 bre" data-move-y="-50px">
					<span>英国·England</span>
					<h4>英国复古之旅</h4>
					<h5>什么什么什么什么</h5>
					<a href="javascript:;" class="btn btn-default btn-lg" role="button">蜜月景点</a>
					<img src="/static/image/Italy2.png" style="width: 100%;">
					<p>
						英国，一个什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么。
					</p>
				</div>
			</div>
		</div>
		<div class="container-fluid even6-bg " style="background-image: url(/static/image/saipan1.png);
				background-size: cover;">
			<div class="row">
				<div class="col-lg-6 col-xs-12 hm-txt2 bre" data-move-y="50px">
					<span>塞班岛·Saipan</span>
					<h4>什么什么什么什么什么</h4>
					<h5>什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么</h5>
					<a href="javascript:;" class="btn btn-default btn-lg" role="button">蜜月景点</a>
					<p>
						什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么。
					</p>
				</div>
			</div>
		</div> -->
    <div style="padding:30px;width:100%;text-align:center">
      <el-pagination style="margin-top:30px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pageModel.page" :page-size="pageModel.total" layout="prev, pager, next, jumper"
        :total="pageModel.total">
    </el-pagination>
    </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      ip:'',
      pageModel:{
        page:1,
        size:6,
        total:0
      },
      list:[]
    }
  },
  mounted(){
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.ip = this.$store.state.ip;
    this.getList();
  },
  methods:{
    handleSizeChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:7,
        page:this.pageModel.page,
        size:this.pageModel.size
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          for(var i in res.body.content){
            res.body.content[i].text = JSON.parse(res.body.content[i].text);
          }
          that.pageModel.page = res.body.page;
          that.pageModel.total = res.body.total;
          that.list = res.body.content
        }
      })
    },
  }
}
</script>

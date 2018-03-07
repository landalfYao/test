<template>
  <div>
    <!--轮播图-->
		<div id="carousel-example-generic"  class="carousel slide banner-image" data-ride="carousel" style="margin-top: 60px;padding:0">
			<!-- Indicators -->
			<ol class="carousel-indicators">
				<li data-target="#carousel-example-generic" v-for="(item,index) in carousel" v-bind:key="item.sunwouId" :data-slide-to="index" v-bind:class="index == 0 ? 'active':''"></li>
			</ol>

			<!-- Wrapper for slides -->
			<div class="carousel-inner" role="listbox" style="padding:0">

				<div v-for="(item,index) in carousel" v-bind:key="item.sunwouId" v-bind:class="index == 0 ? 'item active':'item'" style="padding:0">
					<img v-bind:src="ip+item.image" @click="navToOther(index)" width="100%">
				</div>
				<span style="color: #FFFFFF;">.</span>
			</div>

			<!-- Controls -->
			<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>

    <!--中间内容-->
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12 content">
					<div class="col-lg-12 content1">
						<div class="bre col-lg-12" data-move-x="-50px">
							<h1><span>定制旅行的</span>优势</h1>
						</div>
						<div class="col-lg-12 col-xs-12 bre" data-move-y="-50px">
							<div class="col-lg-4 col-xs-4">
								<img src="/static/image/icon-1.png" style="width: 40%">
								<p>
									不想牺牲个性，但要省心？
								</p>
							</div>
							<div class="col-lg-4 col-xs-4">
								<img src="/static/image/icon-2.png" style="width: 40%">
								<p>
									想要行程自由，但要安全？
								</p>
							</div>
							<div class="col-lg-4 col-xs-4">
								<img src="/static/image/icon-3.png" style="width: 40%">
								<p>
									想要深入体验，更要价格合理？
								</p>
							</div>
						</div>

						<div class="bre col-lg-12" data-move-x="-50px">
							<h4>你想要的旅行，MEMO都会帮你实现</h4>
						</div>
						<div class="bre col-lg-12" data-move-y="50px">
							<router-link to="/costomer_order_tour"><a href="#" class="btn btn-default btn-lg" role="button">了解定制旅行</a></router-link>
						</div>
					</div>
					<div class="col-lg-12 content2">
						<div class="bre" data-move-x="-50px">
							<h3>看看他们的<span>旅行故事</span></h3>
						</div>
						<div class="bre" data-move-y="-50px">
							<p>
								人生终要有一场触及心灵的旅行。
							</p>
							<p>
								或许是为了看到不同的文化
							</p>
							<p>
								或许是为了激发自己的荷尔蒙
							</p>
							<p>
								或许是为了忘记自己是谁
							</p>
							<p>
								总之，我们找到了三个旅行的理由
							</p>
							<p>
								让我们来看看这些旅行者的故事
							</p>
						</div>
						<div class="bre" data-move-y="50px">
							<router-link to="/me_story_comment"><a href="#" class="btn btn-default btn-md" role="button">了解案例故事</a></router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
    <!--表单-->
		<div class="container-fluid form-bg2">
			<div class="row">
				<div class="col-lg-6 col-xs-12 ftxt">
					<p>
						<span>4年来,</span><br> 已有3685位客户选择独忆MEMO，
						<br> 好评率近
						<span>100%</span>。<br> 我们期待能为你，
						<br>
						<strong>定制一次有温度的旅行。</strong><br> _____________________
					</p>
				</div>

				<div class="col-lg-6 col-xs-12 fcont " style="padding: 100px 80px" >
					<div class="formtxt">
						<h1>你只需要决定出发</h1>
						<p>- 剩下所有的一切，交给独忆MEMO就好 -</p>
					</div>
					<form action="" method="post">
						<div class="form-group">
							<input type="text" class="form-control" v-model="addData.name" placeholder="姓名">
						</div>
						<div class="form-group">
							<input type="text" class="form-control" v-model="addData.phone" placeholder="手机号">
						</div>
						<div class="form-group">
							<input type="text" class="form-control" v-model="addData.destination" placeholder="目的地">
						</div>
						<div class="form-group">
							<input type="text" class="form-control" v-model="addData.day" placeholder="天数">
						</div>
						<div class="form-group">
								<textarea name="data[bznr]" class="form-control" v-model="addData.remark" placeholder="备注内容"></textarea>
							</div>
						<el-button  class="btn btn-warning center-block" :loading="loading" @click="submit()">提交</el-button>
					</form>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading:false,
      ip:'',
      addData:{
        name:'',
        phone:'',
        destination:'',
        day:'',
        remark:''
      },
      carousel:[]
    }
  },
  mounted(){
    this.ip = this.$store.state.ip;
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.getCarousel();

  },
  methods: {
    submit(){
      var that = this;
      this.loading = true;
      $.post(this.$store.state.ip+'reserve/add',this.addData,function(res){
        that.loading = false;
        res = JSON.parse(res)
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
    getCarousel(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:1,
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          that.carousel = res.body.content
        }
      })
    },
    navToOther(index){
      this.$router.push({path:this.carousel[index].path})
    }
  }
}
</script>

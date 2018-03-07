<template>
  <div>
    <div class="container-fluid" style="margin-top: 60px;">
			<img src="/static/image/banner_tailor.png" style="width: 100%">
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-8 col-xs-12 title bre" data-move-x="-50px">
					<h2>旅行定制师，让你的旅行更省心</h2>
					<p>
						提出你对出国旅行的期待和要求，</br>剩下的就交给我们吧。
					</p>
				</div>
				<div class="col-lg-4 col-xs-12 title-btn bre" data-move-y="50px">
					<a href="javascript:;" class="btn btn-default btn-lg" role="button">免费咨询</a>
				</div>

        <div v-for="item in blist" v-bind:key="item.sunwouId">
          <div class="bre" data-move-y="-50px">
            <img v-bind:src="ip+item.image" style="width: 100%">
          </div>
          <div class="col-lg-12 tailor-txt bre" data-move-y="50px">
            <h3>{{item.title}}</h3>
            <p>
              {{item.text}}
            </p>
            <center>
              <a href="javascript:;" class="btn btn-default btn-lg" role="button">了解他的故事</a>
            </center>
          </div>
        </div>


			</div>
		</div>

		<div class="tailors container">
			<!-- Team members structure start -->
			<div class="team-members row">

				<!-- effect-2 html -->
				<div class="single-member effect-2" v-for="item in slist" :key="item.sunwouId">
					<div class="member-image">
						<img v-bind:src="ip+item.image" alt="Member">
					</div>
					<div class="member-info">
						<h3>{{item.title}}</h3>
						<h5>ShowGilr</h5>
						<p>{{item.text}}</p>
						<div class="social-touch">
							<a class="fb-touch" href="javascript:;"></a>
							<a class="tweet-touch" href="javascript:;"></a>
							<a class="linkedin-touch" href="javascript:;"></a>
						</div>
					</div>
				</div>
				<!-- effect-2 html end -->


			</div>
			<!-- Team members structure start -->
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

				<div class="col-lg-6 col-xs-12 fcont bre" data-move-x="-50px">
					<div class="formtxt">
						<h1>你只需要决定出发</h1>
						<p>- 剩下所有的一切，交给独忆MEMO就好 -</p>
					</div>
					<form>
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
<style>
  @import url('/static/css/style.css');
</style>
<script>
export default {
  data(){
    return {
      blist:[],
      slist:[],
      ip:'',
      loading:false,
      addData:{
        name:'',
        phone:'',
        destination:'',
        day:'',
        remark:''
      },
    }
  },
  mounted(){
    this.ip = this.$store.state.ip;
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.getBigList();
    this.getSmallList();
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
    getBigList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:2,
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          that.blist = res.body.content
        }
      })
    },
    getSmallList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:3,
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          that.slist = res.body.content
        }
      })
    }
  }

}
</script>

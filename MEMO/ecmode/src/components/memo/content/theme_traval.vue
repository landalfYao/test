<template>
  <div>
    <div class="container-fluid banner-image" style="margin-top: 60px;">
			<img src="/static/image/banner_cosorder.png" style="width: 100%">
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12 content">
					<div class="col-lg-12 content1">
						<div class="bre icon_theme" data-move-x="-50px">
							<div class="col-lg-3 col-xs-3">
								<img src="/static/image/icon-4.png" style="width: 40%;" />
								<p>
									设计个性极光行程
								</p>
							</div>
							<div class="col-lg-3 col-xs-3">
								<img src="/static/image/icon-5.png" style="width: 40%;" />
								<p>
									预定特色极光体验
								</p>
							</div>
							<div class="col-lg-3 col-xs-3">
								<img src="/static/image/icon-6.png" style="width: 40%;" />
								<p>
									制定专属极光路书
								</p>
							</div>
							<div class="col-lg-3 col-xs-3">
								<img src="/static/image/icon-7.png" style="width: 40%;" />
								<p>
									7X24小时出行保障
								</p>
							</div>
						</div>
						<div class="bre" data-move-y="-50px" style="margin: 20% 0 5% 0;">
							<h2><!--<img src="image/icon_sm.png" style="width: 10%;padding-right: 20px;">-->观赏极光的<span>推荐时间</span></h2>
						</div>
						<div class="bre" data-move-y="50px">
							<p>极光可遇不可求，选对时间，可以更大效率邂逅极光</p>
						</div>
            <div class="time"></div>
						<div class="bre " data-move-x="-50px" v-for="item in list" :key="item.sunwouId">
							<img v-bind:src="ip+item.image" style="width: 100%">
						</div>
					</div>
				</div>
			</div>
		</div>

    <div style="width:100%;text-align:center;padding:30px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pageModel.page" :page-size="pageModel.size"
        layout="prev, pager, next, jumper"
        :total="pageModel.total">
      </el-pagination>
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

<script>
export default {
  data(){
    return {
      ip:'',
      list:[],
      pageModel:{
        page:1,
        size:3,
        total:0
      },
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
    this.getList();
  },
  methods: {
    submit(){
      this.loading = true;
      var that = this;
      $.post(this.$store.state.ip+'reserve/add',this.addData,function(res){
        that.loading = false;
        res = JSON.parse(res)
        if(res.code == 1000){
          that.addVisible = false
          that.$message({
                type: 'success',
                message:res.result
            });
          that.getList();
        }else{
          that.$message({
                type: 'error',
                message:res.result
            });
        }
      })
    },
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:4,
        page:this.pageModel.page,
        size:this.pageModel.size
      },function(res){
        res = JSON.parse(res);
        if(res.code == 1000){
          that.pageModel.page = res.body.page;
          that.pageModel.total = res.body.total;
          that.list = res.body.content
        }
      })
    },
    handleSizeChange(val) {
      document.body.scrollTop = 0;
      this.pageModel.page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      document.body.scrollTop = 0;
      this.pageModel.page = val;
      this.getList();
    },
  }
}
</script>


<template>
  <div>

      <div class="container-fluid banner-image" style="margin-top: 60px;">
				<img src="/static/image/banner_join.png" style="width: 100%;">
			</div>
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12 col-xs-12">
						<div style="width:100%;text-align:center;margin-top:30px">
							<video  controls="controls" autoplay="autoplay" id="vie" height="400px">

							</video>

						</div>
					</div>
					<div class="col-lg-lg-12 col-xs-12" style="text-align: center;">
						<h3>招聘职位</h3>
					</div>
					<div class="col-lg-3"></div>
					<div class="col-lg-3 col-xs-6 mdtxt" style="padding: 10px 10px 0 0;" v-for="item in list" :key="item.sunwouId">
						<img :src="ip+item.image" style="width: 100%;" />
						<p>{{item.title}}</p>
					</div>

					<div class="col-lg-3"></div>


				</div>
			</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg:'',
      ip:'',
      list:[]
    }
  },
  mounted(){
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.ip = this.$store.state.ip;
    this.getMsg();
    this.getPing();
  },
  methods: {
    getMsg(){
      var that = this;
      $.post(this.$store.state.ip+'companyconfig/find',{
      },function(res){
        res = JSON.parse(res)
        that.msg = that.ip+res.body.video;
        $("#vie").html('<source src="'+that.msg+'" type="video/mp4">')
      })
    },
    getPing(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:10,

      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){

          that.list = res.body.content
        }
      })
    }
  }
}
</script>

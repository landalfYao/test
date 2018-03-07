<template>
  <div>
    <div class="container-fluid banner_image banner-image" style="margin-top: 60px;">
			<img src="/static/image/knowledge_banner.png" style="width: 100%;">
		</div>

		<div class="container-fluid">
			<div class="row">
				<div class="mintop mintop2 col-lg-12 col-sm-12 col-xs-12">
					<center>
						<span><a href="knowledge.html" id="bread">攻略</a></span>
						<span><a href="javascript:;">基本用语</a></span>
						<span><a href="javascript:;">美食推荐</a></span>
						<span><a href="javascript:;">签证</a></span>
						<span><a href="javascript:;">术语</a></span>
						<span><a href="javascript:;">值得买</a></span>
					</center>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="mintop_t">
					旅游攻略|私人订制旅游攻略知识
				</div>
			</div>
		</div>

		<div class="zp-slide">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item style="text-align:center" >
          <img src="/static/image/gl_icon1.png" />
					<div style="width: 50%; padding: 30px;margin:auto ">
            出发前在国内兑换一些美元或当地货币，通常在中国银行，由于外币储备原因，建议和银行提前预约。
          </div>
        </el-carousel-item>
        <el-carousel-item style="text-align:center" >
          <img src="/static/image/gl_icon2.png" />
						<div style="width: 50%; padding: 30px;margin:auto">一般准备VISA和MASTER等国际信用卡和借记卡，在当地的ATM机上提取现金，请留意相关手续费以及币种间的转换费和汇率损失。另外，现在很多国家都支持银联卡取现，比如马来西亚、泰国、俄罗斯、土耳其等，部分银联机还提供中文界面，建议使用类似华夏银行等具有境外取现优惠政策的银行卡提取现金。</div>
        </el-carousel-item>
        <el-carousel-item style="text-align:center" >
          <img src="/static/image/gl_icon3.png" />
						<div style="width: 50%; padding: 30px;margin:auto">在出行前可以开通全球漫游服务，或者购买当地电话卡，还可以在各大网站租赁随身WIFI。</div>
        </el-carousel-item>
        <el-carousel-item style="text-align:center" >
          <img src="/static/image/gl_icon4.png" />
						<div style="width: 50%; padding: 30px;margin:auto">建议下载Google Map或Maps Me等境外导航软件，还有谷歌翻译器、有道翻译等翻译软件。</div>
        </el-carousel-item>
        <el-carousel-item style="text-align:center" >
          <img src="/static/image/gl_icon5.png" />
						<div style="width: 50%; padding: 30px;margin:auto">由于各个国家的电源插头不一样，在出行时需要准备一样万能转换插头，使自己的插头在全球不同的国家能互通使用。</div>
        </el-carousel-item>
      </el-carousel>

		</div>
  </div>
</template>
<style>
@import url('/static/css/main.css');
@import url('/static/css/CSSreset.min.css');
@import url('/static/css/als_demo.css');
@import url('/static/css/style2.css');
</style>

<script>
export default {
  mounted(){
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
  },
  methods: {

  }
}
</script>

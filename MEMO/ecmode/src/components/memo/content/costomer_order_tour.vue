<template>
  <div>
    <div class="container-fluid banner-image" style="margin-top: 60px;">
			<img src="/static/image/banner-theme.png" style="width: 100%;">
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12 col-xs-12 choice">
					<div class="col-lg-12 col-xs-12 bre" data-move-x="-50px">
						<center>
							<a href="javascript:; " class="btn btn-default btn-lg" role="button">定制旅行的意义</a>
							<a href="javascript:; " class="btn btn-default btn-lg" role="button">定制旅行的流程</a>
						</center>
					</div>
				</div>
				<div class="title-theme bre" data-move-x="-50px">
					<h2>旅行的意义</h2>
				</div>
				<div class="col-lg-4 col-xs-12 theme-txt bre" data-move-x="-50px">
					<center>
						<img src="/static/image/yy_icon1.png" style="width: 20%;margin: 30px 0;"><br>
						<span>“好的旅行如一场修炼”</span>
					</center>
					<p>
						我希望你把自己当做一个旅行者而并非游客，不再走马观花，浅尝辄止；我希望你只跟自己喜欢的人一起去旅行，不再跟着旅团大巴来去匆匆；我希望你，做一个心灵自由自在的人。不管是你已经去过无数次的新马泰日韩，还是闻所未闻的蛮荒地勘察加半岛；不管是你少年时代对极北之地的迷恋，还是垂暮之年去伊瓦苏瀑布边重温青春的约定；我们于古今，于文明，于天地，于自然中，发掘最新鲜的旅行主题，与你一起，诠释生活中各个阶段各种爱，无论是夫妻之爱，子女之爱，还是父母之爱，友朋之爱。
					</p>
				</div>
				<div class="col-lg-4 col-xs-12 theme-txt bre" data-move-y="50px">
					<center>
						<img src="/static/image/yy_icon2.png" style="width: 20%;margin: 30px 0;"><br>
						<span>“一方水土养一方人”</span>
					</center>
					<p>
						我想引导你与当地人交流，与偶遇的旅人交流，与同行的爱人、父母、子女交流，让你们在旅行的过程中，更深地认识彼此。一切感知到的外界之美，最终都将向内行走，直抵自己的心灵。在旅行中，我们最大的希望，就是让你与同行之人共同完成向内行走的美的觉知。

					</p>
				</div>
				<div class="col-lg-4 col-xs-12 theme-txt bre" data-move-y="-50px">
					<center>
						<img src="/static/image/yy_icon3.png" style="width: 20%;margin: 30px 0;"><br>
						<span>“一直往前走，有最美的感动”</span>
					</center>
					<p>
						渐行渐远，涉足过的地方越来越多，越来越不满足于好奇心的止渴。我们走得越远，对新的旅行就愈渴望。因为理想国的旅行，从来不是单纯一个目的地，而是对心灵深深的滋养，让生命经历一次又一次的盛放。让梦境融入现实，把时空变成记忆。成长、爱，与信仰，是我们与这个世界的关联。理想国邀请你与我们一起，精读这个世界，以成长、爱，与信仰之名。
					</p>
				</div>
			</div>
		</div>

  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
  }
}
</script>

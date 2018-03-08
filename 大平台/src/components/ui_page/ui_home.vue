<template>
  <transition name="fade" mode="out-in">
    <div>
      <Carousel autoplay v-model="carouselCurrent" loop :autoplay-speed="5000">
        <CarouselItem>
            <div class="carousel-item" style="background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520507814793&di=2d0d927e4b861907778907a06d2c141d&imgtype=0&src=http%3A%2F%2Fimgstore.cdn.sogou.com%2Fapp%2Fa%2F100540002%2F436432.jpg')"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="carousel-item" style="background-image:url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2298772128,3472767530&fm=27&gp=0.jpg')"></div>
        </CarouselItem>
      </Carousel>
      <div class="panel ui-home-function">
        <div class="title">小程序核心功能</div>
        <div class="width-1200 margin-center panel-around">
          <div v-show="tmp" class="icon-item" v-for="(item,index) in iconList" :key="index" @mouseover="changeIconSelect(index)">
            <div class="icon"><img :src="item.active ? item.selectedIcon : item.icon"  width="40px"></div>
            <div class="label" :style="item.active ? 'color:#0099ff':''">{{item.label}}</div>
          </div>
        </div>
        <div class="width-1200 margin-center">
          <div class="flag" ><img src="../../assets/img/down.png"></div>
        </div>
        <div class="show-function" style="overflow:hidden">
          <div v-show="tmp" class="animated fadeInUp panel-center" v-for="(item,index) in iconList" :key="index" v-if="index == iconListFlag">
            <div  >
              <img :src="iconList[index].image"  width="300px" style="margin-top:120px">
            </div>
            <div style="margin-left:300px;margin-top:120px">
              <div v-html="iconList[index].content" style="width:300px"></div>
            </div>
          </div>
        </div>

      </div>
      <div class="panel ui-home-function">
        <div class="title">各行各业的小程序模板</div>
        <div class="width-1200 margin-center panel-around" style="margin-top:30px">
          <div class="idu-item" v-for="(item,index) in industryList" :key="index" :style="'background-image:url('+item.url+')'">
            <div class="id-panel">
              <div class="title">{{item.title}}</div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import url('../../assets/css/ui_home.css');
@import url('../../assets/css/animate.css');
</style>
<script>
export default {
  data () {
    return {
      tmp:true,
      iconListFlag:0,
      carouselCurrent:0,
      iconList:[
        {icon:'/static/img/function/f1.png',selectedIcon:'/static/img/function/q1.png',label:'附近',image:'/static/img/function/wxpay.png',
          content:'<div style="width:300px"><div style="font-size:18px;color:#ffffff">附近的小程序</div></div>'},
        {icon:'/static/img/function/f2.png',selectedIcon:'/static/img/function/q2.png',label:'卡券',image:'/static/img/function/wxpays.png',content:'fgsfdsf'},
        {icon:'/static/img/function/f3.png',selectedIcon:'/static/img/function/q3.png',label:'扫码',image:'/static/img/function/wxpays.png',content:'dsfdsfsd'},
        {icon:'/static/img/function/f4.png',selectedIcon:'/static/img/function/q4.png',label:'支付',image:'/static/img/function/wxpays.png',content:'sdfdsfsd'},
        {icon:'/static/img/function/f5.png',selectedIcon:'/static/img/function/q5.png',label:'生物识别',image:'/static/img/function/wxpays.png',content:'sdfdsf'},
        {icon:'/static/img/function/f6.png',selectedIcon:'/static/img/function/q6.png',label:'数据分析',image:'/static/img/function/wxpays.png',content:'sdfsdfsdf'}
      ],
      industryList:[
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b2.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'},
        {url:'/static/img/other/b1.png',title:'O2O 电商',text:'线上运营、线下消费'}
      ]
    }
  },
  mounted () {
    this.initIconList();
    this.iconList[this.iconListFlag].active = true;
    $(".flag").animate({'margin-left':60});

  },
  methods: {
    /**初始化 功能 列表 */
    initIconList(){
      for(var i in this.iconList){
        this.iconList[i].active = false;
      }
    },
    /** mouseover 到 图标  改变事件 */
    changeIconSelect(index){
      //this.initIconList();
      this.iconList[this.iconListFlag].active = false;
      this.iconListFlag = index;
      this.iconList[index].active = true;
      $(".flag").animate({'margin-left':60+index*200});
      this.tmp = false;
      this.tmp = true
    }
  }
}
</script>

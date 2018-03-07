<template>
  <transition name="fade" mode="out-in">
    <div>
      <Carousel autoplay v-model="carouselCurrent" loop :autoplay-speed="5000">
        <CarouselItem>
            <div class="carousel-item" style="background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515013805461&di=0a2c35b70d8e4b0368d829dc4a596304&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2432960747%2C1825653824%26fm%3D214%26gp%3D0.jpg')"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="carousel-item" style="background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515013857167&di=4d67fd2064683f1e1b899652e1c403c5&imgtype=0&src=http%3A%2F%2Fattimg.dospy.com%2Fimg%2Fday_120314%2F20120314_fce44e003752b694be5dHqQsdkBQ1heK.jpg')"></div>
        </CarouselItem>
      </Carousel>
      <div class="panel ui-home-function">
        <div class="title">小程序核心功能</div>
        <div class="width-1200 margin-center panel-around">
          <div class="icon-item" v-for="(item,index) in iconList" :key="index" @mouseover="changeIconSelect(index)">
            <div class="icon"><img :src="item.active ? item.selectedIcon : item.icon" alt="" width="40px"></div>
            <div class="label" :style="item.active ? 'color:#0099ff':''">{{item.label}}</div>
          </div>
        </div>
        <div class="width-1200 margin-center">
          <div class="flag" ><img src="../../assets/img/down.png"></div>
        </div>
        <div class="show-function">
          
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
</style>
<script>
export default {
  data () {
    return {
      iconListFlag:0,
      carouselCurrent:0,
      iconList:[
        {icon:'/static/img/function/f1.png',selectedIcon:'/static/img/function/q1.png',label:'附近'},
        {icon:'/static/img/function/f2.png',selectedIcon:'/static/img/function/q2.png',label:'卡券'},
        {icon:'/static/img/function/f3.png',selectedIcon:'/static/img/function/q3.png',label:'扫码'},
        {icon:'/static/img/function/f4.png',selectedIcon:'/static/img/function/q4.png',label:'支付',image:'/static/img/function/wxpays.png',content:''},
        {icon:'/static/img/function/f5.png',selectedIcon:'/static/img/function/q5.png',label:'生物识别'},
        {icon:'/static/img/function/f6.png',selectedIcon:'/static/img/function/q6.png',label:'数据分析'}
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
    }
  }
}
</script>

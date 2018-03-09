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
              <div v-html="iconList[index].content" style="width:400px"></div>
            </div>
          </div>
        </div>

      </div>
      <div class="panel ui-home-function">
        <div class="title">各行各业的小程序模板</div>
        <div class="width-1200 margin-center panel-around item-center" style="margin-top:30px">
          <div class="idu-item" v-for="(item,index) in industryList" :key="index" :style="'background-image:url('+item.url+')'">
            <div class="id-panel">
              <div class="title">{{item.title}}</div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel ui-home-function">
        <div style="background:url(/static/img/bg2.jpg) ;background-position:center;background-size: cover;background-attachment:fixed;">
          <div class="show-function"  style="padding:50px;background-color:rgba(41,44,54,0.8)">
            <div class="title">小程序核心场景</div>
            <div class="width-1200 margin-center panel-around item-center" style="margin-top:30px;padding-top:30px">
              <div v-for="(item,index) in sceneList" :key="index" style="width:20%;text-align:center;padding:20px" >
                <div><img :src="item.url" width="40px" alt=""></div>
                <div class="font-white" style="font-size:16px;margin-top:5px">{{item.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel ui-home-function">
        <div class="title">热门小程序</div>
        <div class="width-1200 margin-center panel-around item-center" style="margin-top:30px">
          <div></div>
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
        {icon:'/static/img/function/f1.png',selectedIcon:'/static/img/function/q1.png',label:'附近',image:'/static/img/function/map.png',
          content:'<div style="width:400px"><div style="font-size:25px;color:#ffffff">附近的小程序</div><div style="font-size:16px;color:#e1e1e1;line-height:30px">帮助商户快速、低门槛地在指定地点展示小程序，以方便被周围的用户找到并使用。“附近的小程序”是一种典型的线下场景集合。你的附近，可能会出现：公众号关联的“门店小程序”和普通小程序。</div></div>'},
        {icon:'/static/img/function/f2.png',selectedIcon:'/static/img/function/q2.png',label:'卡券',image:'/static/img/function/bao.png',
          content:'<div style="width:400px"><div style="font-size:25px;color:#ffffff">微信卡包</div><div style="font-size:16px;color:#e1e1e1;line-height:30px">主要是增加了卡券使用的便捷和易用性,管理银行卡、优惠券等信息。将原来存在于各服务商公众号或服务号里面的优惠券、打折券等信息，从更加底层的公众号/服务号菜单中提取出来，集中在卡券菜单里显示</div></div>'},
        {icon:'/static/img/function/f3.png',selectedIcon:'/static/img/function/q3.png',label:'扫码',image:'/static/img/function/wxpays.png',content:'dsfdsfsd',
          content:'<div style="width:400px"><div style="font-size:25px;color:#ffffff">微信卡包</div><div style="font-size:16px;color:#e1e1e1;line-height:30px">通过微信扫描二维码跳转到了我指定的小程序页面,使小程序的线下使用更加灵活。</div></div>'},
        {icon:'/static/img/function/f4.png',selectedIcon:'/static/img/function/q4.png',label:'支付',image:'/static/img/function/wxpays.png',content:'sdfdsfsd'},
        {icon:'/static/img/function/f5.png',selectedIcon:'/static/img/function/q5.png',label:'生物识别',image:'/static/img/function/wxpays.png',content:'sdfdsf'},
        {icon:'/static/img/function/f6.png',selectedIcon:'/static/img/function/q6.png',label:'数据分析',image:'/static/img/function/wxpays.png',content:'sdfsdfsdf'}
      ],
      industryList:[
        {url:'/static/img/function/h1.png',title:'酒店民宿',text:'打通线上线下预约'},
        {url:'/static/img/function/h2.jpg',title:'堂食餐饮',text:'到店消费，智慧点餐'},
        {url:'/static/img/function/h3.jpg',title:'新闻论坛',text:'将资源聚合以全新的形式提供资讯服务'},
        {url:'/static/img/function/h4.jpg',title:'旅游',text:'为旅游行业客户提供高效的特色推荐功能'},
        {url:'/static/img/function/h5.jpg',title:'家居',text:'低成本助商家打造购物社交化平台'},
        {url:'/static/img/function/h6.jpg',title:'摄影',text:'线上运营、线下消费'},
        {url:'/static/img/function/h7.jpg',title:'同城',text:'租房、二手房、二手车、宠物等行业小程序'},
        {url:'/static/img/function/h8.jpg',title:'预约',text:'线上运营、线下消费'}
      ],
      sceneList:[
        {url:'/static/img/function/l1.png',title:'分享到群'},{url:'/static/img/function/l2.png',title:'线下扫码'},{url:'/static/img/function/l3.png',title:'微信搜索'},
        {url:'/static/img/function/l4.png',title:'聊天顶部'},{url:'/static/img/function/l5.png',title:'推荐给好友'},
        {url:'/static/img/function/l6.png',title:'附近的小程序'},{url:'/static/img/function/l7.png',title:'支付完成页'},{url:'/static/img/function/l8.png',title:'小程序列表'},
        {url:'/static/img/function/l9.png',title:'公众号主页'},{url:'/static/img/function/l10.png',title:'公众号文章'},
      ],

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

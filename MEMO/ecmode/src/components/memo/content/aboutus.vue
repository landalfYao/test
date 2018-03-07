<template>
  <div>
    <div class="container-fluid banner-image" style="margin-top: 60px;">
			<img src="/static/image/about_banner.png" style="width: 100%;">
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="mintop col-lg-12 col-sm-12 col-xs-12">
					<center>
						<span v-for="(item,index) in bar" v-bind:key="item.contact" @click="changeBar(index)">
              <a href="javascript:;" v-bind:id="item.active ? 'bread':''" v-bind:class="item.active ? 'active':''">{{item.label}}</a>
            </span>
					</center>
				</div>
			</div>
		</div>
    <div v-show="bar[0].active">
      <div class="container-fluid">
        <div class="row">
          <div class="mintop_t">
            公司历史
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-sm-3"></div>
          <div class="col-lg-9 col-sm-9">
            <div class="history">
              <center>
                <h2><span id="imgproduct1" @mouseover="showproductdiv(0)" v-bind:style="histroy[0].active ? 'display:none':'display:block'"><b>2015</b></span>
                <span id="showproduct1" class="other"  v-bind:style="histroy[0].active ? 'display:block':'display:none'" ><b class="nonce">2015</b></span>
                <span id="imgproduct2" @mouseover="showproductdiv(1)" v-bind:style="histroy[1].active ? 'display:none':'display:block'"><b>2016</b></span>
                <span id="showproduct2"  v-bind:style="histroy[1].active ? 'display:block':'display:none'"><b class="nonce">2016</b></span>
                <span id="imgproduct3" @mouseover="showproductdiv(2)" v-bind:style="histroy[2].active ? 'display:none':'display:block'"><b>2017</b></span>
                <span id="showproduct3" v-bind:style="histroy[2].active ? 'display:block':'display:none'" ><b class="nonce">2017</b></span>
              <div class="clear">
              </div>
            </h2></center>
              <div class="history_list" id="_i1" v-show="histroy[0].active">
                <p>
                  <img src="/static/image/about_2015.png">
                </p>
              </div>
              <div class="history_list" id="_i2" v-show="histroy[1].active">
                <p>
                  <img src="/static/image/about_2016.png">
                </p>
              </div>
              <div class="history_list" id="_i3" v-show="histroy[2].active">
                <p>
                  <img src="/static/image/about_2017.png">
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-show="bar[1].active">
      <div class="row">
				<div class="mintop_t">
					公司理念
				</div>
				<div id="idea" style="padding:30px"></div>
			</div>
    </div>
    <div v-show="bar[2].active">
      <div class="container-fluid">
        <div class="row">
          <div class="mintop_t">
            联系我们
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="text text_color">
            <p style="font-size:20px">
              签证 机票 酒店预订 定制行程
            </p>
            <p style="font-size:20px">
              1对1一站式服务 轻松出行
            </p>
            <br>
            <p>
              商务合作：*****
            </p>
            <p>
              邮箱：**********
            </p>
            <p>
              公司地址：浙江省宁波市鄞州区首南街道恒业大厦601室
            </p>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-1 col-sm-0 col-xs-0"></div>
          <div class="col-lg-10 col-sm-12 col-xs-12">
            <center>
              <div class="about_map" id="container" v-bind:style="mapStyle">
              </div>
            </center>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div id="contact" style="padding:30px"></div>
        </div>
      </div>
    </div>

  </div>
</template>
<style>
@import url('/static/css/main.css');
</style>

<script>
export default {
  data(){
    return {
      bar:[
        {name:'histroy',active:false,label:'公司历史'},
        {name:'dream',active:false,label:'公司理念'},
        {name:'contact',active:true,label:'联系我们'},
      ],
      histroy:[
        {url:'/static/image/about_2015.png',active:false},
        {url:'/static/image/about_2016.png',active:false},
        {url:'/static/image/about_2017.png',active:true},
      ],
      mapStyle:{
        height:400 +'px'
      },
      playnum:1,
      myplay:null,
      msg:{
        video:''
      },
      ip:''
    }
  },
  mounted () {
    document.body.scrollTop = 0;
    this.$store.state.getJQuery();
    this.initMap();
    this.getMsg();
  },
  methods: {
    getMsg(){
      var that = this;
      $.post(this.$store.state.ip+'companyconfig/find',{
      },function(res){
        res = JSON.parse(res);
        $("#idea").html(res.body.companyDescribe);
        $("#contact").html(res.body.concat);
        that.msg = res.body;
      })
    },
    changeBar(index){
      for(var i in this.bar){
        this.bar[i].active = false;
      }
      this.bar[index].active = true;
    },
    initMap(){

        var map = new BMap.Map("container"); //创建地图
        map.centerAndZoom(new BMap.Point(121.5569549693, 29.8100176535), 15); //初始化地图

        var point = new BMap.Point(121.5569549693, 29.8100176535);
        var marker = new BMap.Marker(point);
        var label = new BMap.Label('宁波-鄞州区首南街道恒业大厦601室', {
          "offset": new BMap.Size(9, -15)
        });
        marker.setLabel(label);
        map.addOverlay(marker);

        map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放
        map.enableKeyboard(); // 开启键盘控制
        map.enableContinuousZoom(); // 开启连续缩放效果
        map.enableInertialDragging(); // 开启惯性拖拽效果

        map.addControl(new BMap.NavigationControl()); //添加标准地图控件(左上角的放大缩小左右拖拽控件)
        map.addControl(new BMap.ScaleControl()); //添加比例尺控件(左下角显示的比例尺控件)
        map.addControl(new BMap.OverviewMapControl()); // 缩略图控件
        map.addControl(new BMap.MapTypeControl());

        var city = new BMap.LocalSearch(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        }); //地图显示到查询结果处
        /*var  city= new BMap.LocalSearch(map, {

            renderOptions: {map: map, panel: "r_result"}

            }); */ // 初始化带选择的下拉框的地图



        map.addEventListener("click", function(e) { //单击地图，形成折线覆盖物
          newpoint = new BMap.Point(e.point.lng, e.point.lat);
          //    if(points[points.length].lng==points[points.length-1].lng){alert(111);}
          points.push(newpoint); //将新增的点放到数组中
          polyline.setPath(points); //设置折线的点数组
          map.addOverlay(polyline); //将折线添加到地图上
          document.getElementById("info").innerHTML += "new BMap.Point(" + e.point.lng + "," + e.point.lat + "),</br>"; //输出数组里的经纬度

        });
    },
    showproductdiv(id){
      for(var i in this.histroy){
        this.histroy[i].active = false;
      }
      this.histroy[id].active = true;
    },



  }

}
</script>


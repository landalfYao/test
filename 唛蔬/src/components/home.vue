<template>
  <transition name="el-fade-in-linear">
    <div>
      <div class="home-pc">
        <div class="panel-between">

          <div class="width-250">
            <div class="font-20">近期视频</div>
            <img style="margin-top:15px;cursor:pointer" src="../assets/img/temp/sp.png" width="250px" height="200px" @click="diasp = true">
            <div class="ell-250" @click="nvTo('https://v.qq.com/x/page/s05491c99dm.html')">
              唛蔬MASSEL进入中国市场总裁推介
              唛蔬MASSEL进入中国市场总裁推介
            </div>
            <div class="more" @click="nvTo('https://v.qq.com/x/page/s05491c99dm.html')">更多</div>
          </div>

          <div class="width-360">
            <el-carousel ref="ecar" :interval="5000" arrow="never" style="width:360px;height:360px" trigger="click" :autoplay="true" indicator-position="outside" @change="carOnChange">
              <el-carousel-item v-for="(li,index) in car" :key="index" style="width:360px;height:360px">
                <img :src="ip+li.imagePath" width="360px" height="360px"  @click="navTo('/ms_product',li.pageId)">
              </el-carousel-item>
            </el-carousel>
            <div class="car-tit panel-between item-center" style="padding-top:0;margin-top:0;width:360px;height:140px">
                  <img src="../assets/img/fa.png" alt="" height="35px" width="35px" style="cursor:pointer" @click="prev()">
                  <div>
                    <div class="tit" style="cursor:pointer;font-size:32px" @click="navTo('/ms_product',car[current].pageId)" >{{car[current].pageTitle}}</div>
                    <div class="txt" style="cursor:pointer;font-size:16px" @click="navTo('/ms_product',car[current].pageId)" >{{car[current].miniTitle}}</div>
                  </div>
                  <img src="../assets/img/ra.png" alt="" height="35px" width="35px" style="cursor:pointer" @click="next()">
            </div>
          </div>

          <div class="width-250">
            <div class="font-20">最新新闻</div>
            <div  :style="'margin-top:15px;width:250px;height:80px;background-image:url('+ip+news[0].coverPath+');background-size:cover;background-position:center'" @click="navTo('/newsDetail',news[0].id)"></div>
            <div class="ell-250" @click="navTo('/newsDetail',news[0].id)">
              {{news[0].miniTitle}}
            </div>
            <div class="more" @click="navTo('/newsDetail',news[0].id)">更多</div>
            <div @click="navTo('/newsDetail',news[1].id)" :style="'margin-top:15px;width:250px;height:80px;background-image:url('+ip+news[1].coverPath+');background-size:cover;background-position:center'"></div>
            <div @click="navTo('/newsDetail',news[1].id)" class="ell-250" >
              {{news[1].miniTitle}}
            </div>
            <div class="more" @click="navTo('/newsDetail',news[1].id)">更多</div>
          </div>
        </div>
        <div class="panel-between">
          <div class="g_item" v-for="(item,index) in pro" :key="index" v-if="index < 3" @click="navTo('/ms_product',item.id)">
            <div class="bgcover" :style="'background-image:url('+ip+item.coverPath+');'"></div>
            <div class="tit">{{item.pageTitle}}</div>
          </div>

        </div>
        <div class="panel-between item-center" style="width:100%;text-align:center;padding-bottom:20px">
          <div style="width:370px ;border-bottom:1px solid #dfd4b8"></div>
          <div style="font-size:30px;color:#64b1e9">美味食谱</div>
          <div style="width:370px ;border-bottom:1px solid #dfd4b8"></div>
        </div>
        <div class="panel-between warp">
          <div class="g_item" v-for="(item,index) in sp" :key="index" v-if="index < 6" @click="navTo('/ms_product',item.id)">
            <div class="bgcover" :style="'background-image:url('+ip+item.coverPath+');'"></div>
            <div class="tit">{{item.pageTitle}}</div>
          </div>

        </div>
        <div class="panel-between item-center" style="width:100%;text-align:center;padding-bottom:20px">
          <div style="width:370px ;border-bottom:1px solid #dfd4b8"></div>
          <div style="font-size:30px;color:#64b1e9">新闻活动</div>
          <div style="width:370px ;border-bottom:1px solid #dfd4b8"></div>
        </div>
        <div class="panel-between">
          <div class="g_item" v-for="(item,index) in hd" :key="index" v-if="index < 3" @click="navTo('/ms_product',item.id)">
            <div class="bg-cover" :style="'background-image:url('+ip+item.coverPath+');'"></div>
            <div class="tit">{{item.pageTitle}}</div>
          </div>

        </div>
      </div>
      <div class="home-mobile">
        <el-carousel :interval="5000" arrow="always" style="width:100%;height:auto;margin-bottom:15px">
              <el-carousel-item v-for="item in 4" :key="item" style="width:100%;height:auto">
                <img src="../assets/img/temp/lc.png" width="100%" >
              </el-carousel-item>
        </el-carousel>

        <div style="padding:15px 30px">
          <div style="font-size:20px;margin-bottom:15px">最新新闻</div>
          <div style="margin-bottom:15px">
            <div  :style="'margin-top:15px;width:100%;height:120px;background-image:url('+ip+news[0].coverPath+');background-size:cover;background-position:center'" @click="navTo('/newsDetail',news[0].id)"></div>
            <div class="ell-250" @click="navTo('/newsDetail',news[0].id)">
              {{news[0].miniTitle}}
            </div>
          </div>
          <div style="margin-bottom:15px">
            <div  :style="'margin-top:15px;width:100%;height:120px;background-image:url('+ip+news[1].coverPath+');background-size:cover;background-position:center'" @click="navTo('/newsDetail',news[1].id)"></div>

            <div class="ell-250" @click="navTo('/newsDetail',news[1].id)">
              {{news[1].miniTitle}}
            </div>
          </div>
        </div>
        <div style="color:#64b1e5;font-size:30px;text-align:center">美味食谱</div>
        <div style="padding:15px 30px">
          <div class="mog-item">
            <img src="../assets/img/temp/g1.png" width="100%">
            <div class="tit">某某产品</div>
          </div>

          <div class="mog-item">
            <img src="../assets/img/temp/g1.png" width="100%">
            <div class="tit">某某产品</div>
          </div>

          <div class="mog-item">
            <img src="../assets/img/temp/g1.png" width="100%">
            <div class="tit">某某产品</div>
          </div>
        </div>
      </div>
      <div class="model-video" v-show="diasp">
        <div style="width:960px;margin:auto;background:#ffffff;height:500px;">
          <object data="http://cache.tv.qq.com/qqplayerout.swf?vid=s05491c99dm" type="application/x-shockwave-flash" style="width:960px;height:500px">
            <param name="movie" value="http://cache.tv.qq.com/qqplayerout.swf?vid=s05491c99dm" />
            <embed src="http://cache.tv.qq.com/qqplayerout.swf?vid=s05491c99dm" />
          </object>
          <img src="../assets/img/close.png" width="30px" alt="" style="position:relative;top:-530px;left:960px;cursor:pointer" @click="diasp = false">
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
@import url("../assets/css/main.css");
.model-video{
  padding-top:100px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
}
</style>
<script>
export default {
  data () {
    return {
      diasp:false,
      ip:'http://www.tongzhuhe.com/FAV/',
      pro:[],
      car:[],
      news:[],
      sp:[],
      hd:[],
      current:0
    }
  },
  mounted(){
    this.getPro();
  },
  methods: {
    carOnChange(e){
      this.current = e
    },
    prev(){
      this.$refs.ecar.prev();
    },
    next(){
      this.$refs.ecar.next();
    },
    nvTo(path){
      window.location.href=path
    },
    navTo(path,id){
      this.$router.push({path:path,query:{id:id}})
    },
    getPro(){
      var that = this;
      $.ajax({
        url:this.ip+'pageInfo/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          pageType:1
        },
        success(res){
          var li = []
          for(var i in res.object){
            if(res.object[i].pageTitle.indexOf('--p')<0){
              li.push(res.object[i]);
            }
          }
          that.pro = li;
        }
      })
      $.ajax({
        url:this.ip+'carousel/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          carouselType:1
        },
        success(res){
          that.car = res.object;
        }
      })
      $.ajax({
        url:this.ip+'pageInfo/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          pageType:3
        },
        success(res){
          that.news = res.object
        }
      })
      $.ajax({
          url:this.ip+'pageInfo/finds',
          method:'POST',
          dataType:'JSON',
          data:{
            pageType:4
          },
          success(res){
            that.sp = res.object;
          }
        })
        $.ajax({
          url:this.ip+'pageInfo/finds',
          method:'POST',
          dataType:'JSON',
          data:{
            pageType:5
          },
          success(res){
            that.hd = res.object;
          }
        })
    }
  }
}
</script>

<template>
  <transition name="el-fade-in-linear">
    <div>
      <div style="font-size:30px;color:#64b1e9">{{pageTitles}}</div>
      <div style="margin-top:15px">{{pageSub}}</div>
      <el-carousel trigger="click" height="400px" style="margin-top:15px">
        <el-carousel-item v-for="(item,index) in car" :key="index">
          <img :src="ip+item.imagePath" alt="" width="960px" height="400x" @click="navTo(item.pageId)">
        </el-carousel-item>
      </el-carousel>

      <div class="" >
        <div class="text-lefts" >
          <div class="yitem" v-for="(item,index) in list1" :key="index">
            <div class="panel-start item-center">
              <div style="font-size:25px;color:#64b1e9;cursor:pointer" @click="navTo(item.id)">{{item.pageTitle}}</div>
              <img src="../assets/img/ra.png" alt="" @click="navTo(item.id)">
            </div>
            <div class="panel-start" style="margin-top:15px">
              <div :style="'width:235px;height:155px;background:url('+ip+item.coverPath+');background-size:cover;background-position:center;cursor:pointer'" @click="navTo(item.id)"></div>
              <div style="width:325pxheight:155px;margin-left:10px">
                <div style="color:#978f7d;;cursor:pointer" @click="navTo(item.id)">{{item.pageTitle}}</div>
                <div class="yuih" style="cursor:pointer" @click="navTo(item.id)"> {{item.miniTitle}} </div>
                <div style="margin-top:35px;color:#978f7d">{{item.createTime}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-rights">
          <div style="font-size:20px">最新消息</div>
          <img :src="ip+list2[0].coverPath" style="margin-top:20px;cursor:pointer" width="100%" @click="navTo(list2[0].id)">
          <div class="els" style="margin-top:20px" @click="navTo(list2[0].id)">
            {{list2[0].miniTitle}}
          </div>
          <div class="els" style="margin-top:20px" @click="navTo(list2[1].id)">
            {{list2[1].miniTitle}}
          </div>
        </div>
      </div>

      <div style="clear:both"></div>
    </div>
  </transition>
</template>
<style>
@import url('../assets/css/main.css');
.yitem{
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #c3c3c3
}
.yuih{
  width:325px;
  font-size: 16px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  cursor: pointer;
  margin-top: 10px
}
</style>
<script>
export default {
  data () {
    return {
      ip:'http://www.tongzhuhe.com/FAV/',
      car:[],
      list1:[],
      list2:[],
      pageTitles:'',
      pageSub:'',
    }
  },
  watch: {
    $route(){
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      this.getData();
    }
  },
  mounted(){
     document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    this.getData();
  },
  methods:{
    navTo(id){
      this.$router.push({path:'/newsDetail',query:{id:id}})
    },
    getData(){
      var ct = 2;
      var id = 3;
      if(this.$route.query.id == 1){
        this.pageTitles = '新闻动态';
        this.pageSub = '所有最新动态';
        ct = 2
        id = 3
      }else{
        this.pageTitles = '活动';
        this.pageSub = '所有最新活动';
        ct = 3
        id = 5
      }
      var that = this;
      $.ajax({
        url:this.ip+'carousel/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          carouselType:id,
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
          if(that.$route.query.id ==1){
            that.list1 = res.object
          }else{
            that.list2 = res.object
          }

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
          if(that.$route.query.id ==1){
            that.list2 = res.object
          }else{
            that.list1 = res.object
          }
        }
      })
    }
  }

}
</script>

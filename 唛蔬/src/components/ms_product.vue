<template>
  <transition name="el-fade-in-linear">
    <div>
      <img v-show="isn" :src="ip+showData.coverPath" style="width:100%" >
      <div class="" >
        <div class="text-lefts" >
          <div style="font-size:30px;color:#64b1e9">{{showData.pageTitle}}</div>
          <p v-html="showData.imageText" style="padding-left:20px;margin-top:20px"></p>
        </div>
        <div class="text-rights">
          <div style="font-size:20px">最新消息</div>
          <img :src="ip+list[0].coverPath" style="margin-top:20px;cursor:pointer" width="100%" @click="navTo(list[0].id)">
          <div class="els" style="margin-top:20px" @click="navTo(list[0].id)">
            {{list[0].miniTitle}}
          </div>
          <div class="els" style="margin-top:20px" @click="navTo(hd[0].id)">
            {{hd[0].miniTitle}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
@import url('../assets/css/main.css');
</style>
<script>
export default {
  data () {
    return {
      ip:'http://www.tongzhuhe.com/FAV/',
      list:[],
      hd:[],
      isn:true,
      showData:{
        coverPath:'',
        pageTitle:'',
        imageText:''
      },
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
      var that = this;
      $.ajax({
        url:this.ip+'pageInfo/find',
        method:'POST',
        dataType:'JSON',
        data:{
          pageType:1,
          id:this.$route.query.id
        },
        success(res){
          if(res.object.pageTitle.indexOf('--p')>0){
            res.object.pageTitle = res.object.pageTitle.replace('--p','')
          }
          if(res.object.pageTitle.indexOf('-n')>0){
            res.object.pageTitle = res.object.pageTitle.replace('-n','')
            that.isn =false
          }

          that.showData = res.object;
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
          that.list = res.object
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
          that.hd = res.object
        }
      })
    }
  }

}
</script>

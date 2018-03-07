<template>
  <transition name="el-fade-in-linear">
    <div>
      <img :src="ip+showData.coverPath" style="width:100%" >
      <div class="" >
        <div class="text-lefts" >
          <div style="font-size:30px;color:#64b1e9">{{showData.pageTitle}}</div>
          <p v-html="showData.imageText" style="padding-left:20px;margin-top:20px"></p>
        </div>
        <div class="text-rights">
          <div style="font-size:20px">最新消息</div>
          <img src="../assets/img/temp/sp.png" style="margin-top:20px" width="100%">
          <div class="ell-250" >
            唛蔬MASSEL进入中国市场总裁推介
            唛蔬MASSEL进入中国市场总裁推介
          </div>
          <div class="ell-250" style="margin-top:20px" >
            唛蔬MASSEL进入中国市场总裁推介
            唛蔬MASSEL进入中国市场总裁推介
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
    this.getData();
  },
  methods:{
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
          that.showData = res.object;
        }
      })
    }
  }

}
</script>

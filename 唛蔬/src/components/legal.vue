<template>
  <transition name="el-fade-in-linear">
    <div>
      <img v-show="show" :src="ip+showData.coverPath" style="width:100%" >
      <div class="" >
        <div style="width:100%" >
          <div style="margin-top:15px;font-size:30px;color:#64b1e9">{{showData.pageTitle}}</div>
          <p v-html="showData.imageText" style="padding-left:20px;margin-top:20px"></p>
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
      show:false
    }
  },
  watch: {
    $route(){

      this.getData();
    }
  },
  mounted(){

    this.getData();
  },
  methods:{
    getData(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
      if(this.$route.query.id == 6 || this.$route.query.id == 9 ){
        this.show = true
      }else if(this.$route.query.id == 7|| this.$route.query.id == 8){
        this.show = false
      }
      var that = this;
      $.ajax({
        url:this.ip+'pageInfo/findOR',
        method:'POST',
        dataType:'JSON',
        data:{
          pageType:this.$route.query.id
        },
        success(res){
          that.showData = res.object;
        }
      })
    }
  }

}
</script>

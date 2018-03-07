<template>
  <div>
      <div class="panel-center" style="width:100%;position:fixed;top:0;left:0">
          <div class="ditem" @click="navTo('home')"><i class="el-icon-goods"></i> 首页</div>
          <div class="ditem"><i class="el-icon-info"></i> 用户</div>
          <div class="ditem"><i class="el-icon-edit-outline"></i> 订单</div>
      </div>
      <div style="height:30px"></div>
      <div>
          <router-view></router-view>
      </div>
  </div>
</template>
<style>
.ditem{
    font-size: 14px;
    width: 33.33%;
    text-align: center;
    line-height: 30px
}
</style>
<script>
export default {
  data(){
      return {

      }
  },
  mounted(){
      sessionStorage.API = 'http://192.168.0.104:8080/sunhope/'
  },
  methods:{
      navTo(path){
        this.$router.push({path:path})
      }
  }
}
</script>


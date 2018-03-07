<template>
  <div>
      <div class="diopp">
          <div class="dit">
              <div class="num">0</div>
              <div class="text">订单</div>
          </div>
          <div class="dit">
              <div class="num">0</div>
              <div class="text">待付款</div>
          </div>
          <div class="dit">
              <div class="num">0</div>
              <div class="text">代发货</div>
          </div>
          <div class="dit">
              <div class="num">0</div>
              <div class="text">出售中</div>
          </div>
          <div class="dit">
              <div class="num">0</div>
              <div class="text">预约</div>
          </div>
          <div class="dit">
              <div class="num">0.00</div>
              <div class="text">成交额</div>
          </div>
      </div>
      <div class="diopp" style="margin-top:30px">
          <div class="dit" @click="navTo('shopList')">
              <div  class="icon">LS</div>
              <div class="text">商品列表</div>
          </div>
          <div class="dit" @click="navTo('shopAdd')">
              <div  class="icon" style="background:#FF6633">AS</div>
              <div class="text">添加商品</div>
          </div>
          <div class="dit">
              <div  class="icon" style="background:#33CC99">LY</div>
              <div class="text">预约列表</div>
          </div>
          <div class="dit">
              <div class="icon" style="background:#339999">AY</div>
              <div class="text">添加预约</div>
          </div>
      </div>
  </div>
</template>
<style>
.diopp{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.dit{
    width: 33.33%;
    text-align: center;
    margin-top: 10px
}
.dit>.num{
    font-size: 16px;
    color: #888888;
    line-height: 25px
}
.dit>.text{
    font-size: 12px;
    color: #444444
}
.dit>.icon{
width:40px;height:40px;background:#ff9900;border-radius:5px;margin:auto;margin-bottom:5px;
color: #ffffff;display: flex;justify-content: center;align-items: center
}
</style>
<script>
export default {
  data(){
      return {

      }
  },
  mounted(){

  },
  methods:{
      navTo(path){
        this.$router.push({path:path})
      }
  }
}
</script>
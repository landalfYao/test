<template>
  <transition name="fade" mode="out-in">
    <div style="padding-bottom:50px" >
      <div class="ui-template-bg bg-function" >
        <div class="back-bg" >
          <div class="width-900 margin-center">
            <div class="title">功能与服务</div>
            <div class="ui-template-form-search">
              <input type="text" class="ui-template-input-search" placeholder="输入功能名称、行业名称搜索">
              <div class="ui-template-btn-search" style="padding-top:5px"><Icon type="ios-search" size="25"  color="#ffffff"></Icon></div>
            </div>
          </div>
        </div>
      </div>

      <div class="width-1200 margin-center ui-function-panel ">
        <div class="ui-template-filter-panel">

        </div>
        <Spin >
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        </Spin>
        <div class="ui-function-item" v-for="item in 18" :key="item">
          <div class="panel-between">
            <div class="panel-start item-center" style="width:210px">
              <img src="/static/img/function/wxpay.png" width="40px" height="40px" alt="">
              <div class="ui-function-item-title">
                <div class="title ell-1">微信支付</div>
                <div class="txt ell-1" style="width:210px" title="所有行业均">所有行业均可爱上看到了三，大街上电话卡接单方开始。啊实打实大声道</div>
              </div>
            </div>
            <div style="width:100px;">
              <div class="panel-end item-center">
                <div class="font-danger font-16">￥999/月</div>
                <img style="cursor:pointer" src="../../../assets/img/addtocart.png" width="25px" height="25px" alt="" title="添加到功能箱">
              </div>
            </div>
          </div>
          <div style="border-bottom:1px #e1e1e1 dashed;width:310px;height:1px;margin:10px 0;margin-left:50px"></div>
          <div class="panel-between">
            <div style="width:310px" class="ell-1" title="唤起微信支付">唤起微信支付 支付成功提醒 唤起微信支付 支付成功提醒 唤起微信支付 支付成功提醒</div>
            <div class="font-primary tit1">详情</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
<script>
export default {
  data(){
    return {
      list:[

      ]
    }
  },

}
</script>

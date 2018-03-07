<template>
  <transition name="fade" mode="out-in">
    <div class="ui-login-container height-all">
      <div class="height-all ui-login-panel">
        <div class="ui-login-header">
          <div class="ui-logo"><img src="../../assets/img/logo.png" alt=""></div>
          <div class="pointer font-white">首页</div>
        </div>
        <div class="width-1200 margin-center panel-center">
          <div>
            <h1 class="font-white " style="margin-top:150px">小程序功能组件随意拼凑</h1>
            <p class="font-white" style="font-size:18px ;line-height:30px">
              10倍性能提升，多场景规格族，最优性价比<br>
              2666MT/s AVX 512 450万pps<br>
              同配置价格最高下降48%，5年3折</p>
          </div>
          <div class="login-panel">
            <div class="title">登录Login</div>
            <div class="form-con">
              <Icon class="icon" type="android-phone-portrait" size="18"></Icon>
              <input class="fm" type="text" placeholder="输入11位手机号">
            </div>
            <div class="form-con">
              <Icon class="icon" type="ios-unlocked" size="18"></Icon>
              <input class="fm" type="password" placeholder="输入密码">
            </div>
            <div class="login-btn">登 录</div>
            <div class="panel-between" style="margin-top:20px">
              <div class="font-primary pointer fp-over">免费注册</div>
              <div class="font-primary pointer fp-over">忘记密码?</div>
            </div>
          </div>
        </div>
        <div class="login-footer" ></div>
      </div>
    </div>
  </transition>
</template>
<style>
@import url('../../assets/css/common.css');
@import url('../../assets/css/ui_master.css');
</style>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
    this.initWindow();
  },
  methods:{
    initWindow(){
      $('.height-all').css({height: 'auto'})
      $(window).resize(function() {
        $('.height-all').css({height:'auto'})
      });
    }
  }
}
</script>

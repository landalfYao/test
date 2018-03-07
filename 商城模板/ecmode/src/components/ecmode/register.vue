<template>
<transition name="el-fade-in-linear">
  <div class="login-panel">
    <div class="lpanel">
      <div class="panell" style="width:700px">
        <div class="title ">SunWou MS</div>
        <div class="login-text font-lg">注册 Register</div>
        <hr style="margin-top:10px">
        <div>基础信息</div>
        <el-input style="margin-top:15px" placeholder="请输入用户名" v-model="registData.adminName">
          <template slot="prepend">
            <div style="width:80px">用户名</div>
          </template>
        </el-input>
        <el-input style="margin-top:20px" placeholder="请输入密码" type="password" v-model="registData.adminPassword">
          <template slot="prepend">
            <div style="width:80px">密码</div>
          </template>
        </el-input>
        <el-input style="margin-top:20px" @input="rePwd" placeholder="请输入密码" type="password" v-model="adminPwd">
          <template slot="prepend">
            <div style="width:80px">确认密码</div>
          </template>
        </el-input>
        <el-alert v-show="isPwd" title="密码不一致" type="error"> </el-alert>
        <el-input style="margin-top:20px" placeholder="手机号" type="number" v-model="registData.adminPhone">
          <template slot="prepend">
            <div style="width:80px">手机号</div>
          </template>
        </el-input>
        <el-input style="margin-top:20px" placeholder="店铺名称"  v-model="registData.storeName">
          <template slot="prepend">
            <div style="width:80px">店铺名称</div>
          </template>
        </el-input>
        <el-input style="margin-top:20px" placeholder="3-5位英文字母"  v-model="registData.storeKey">
          <template slot="prepend">
            <div style="width:80px">订单标识</div>
          </template>
        </el-input>
        <hr style="margin-top:20px">
        <div>微信小程序及商户号信息</div>
        <el-input style="margin-top:15px" placeholder="微信小程序AppID" v-model="registData.appId">
          <template slot="prepend">
            <div style="width:80px">AppID</div>
          </template>
        </el-input>
        <el-input style="margin-top:15px" placeholder="微信小程序AppSecret" v-model="registData.appSecret">
          <template slot="prepend">
            <div style="width:80px">AppSecret</div>
          </template>
        </el-input>
        <el-input style="margin-top:15px" placeholder="微信商户号" v-model="registData.mchId">
          <template slot="prepend">
            <div style="width:80px">商户号</div>
          </template>
        </el-input>
        <el-input style="margin-top:15px" placeholder="微信商户号秘钥" v-model="registData.mchSecret">
          <template slot="prepend">
            <div style="width:80px">商户秘钥</div>
          </template>
        </el-input>
        <el-button-group style="margin-top:20px;float:right">
          <el-button type="info" @click="back()">返回登录</el-button>
          <el-button type="primary" :loading="loginLoading" @click="doLogin()">立即注册</el-button>
        </el-button-group>
        <div style="clear:both"></div>
      </div>
      <div class="team">双沃科技技术团队<br>sunwou.com</div>
    </div>
  </div>
</transition>
</template>

<style>
@import url('/static/ecmode/style.css');
@import url('/static/ecmode/login.css');
</style>

<script>
export default {
  data(){
    return {
      loginLoading:false,
      registData:{
        adminName:'',
        adminPassword:'',
        adminPhone:'',
        appId:'',
        mchId:'',
        storeImage:'/update/asdasd.png',
        storeName:'',
        appSecret:'',
        mchSecret:'',
        adminType:2,
        storeKey:''
      },
      repwd:'',
      isPwd:false,
      adminPwd:'',
    }
  },
  mounted(){
    $('.login-panel').css("height",window.innerHeight);
     $('.lpanel').css("overflow-y","scroll");
    $('.lpanel').css("height",window.innerHeight-100);
  },
  methods: {
    rePwd(e){
      if(this.registData.adminPassword == e){
        this.isPwd = false;
      }else{
        this.isPwd = true;
      }
    },
    back(){
      this.$router.go(-1);
    },
    doLogin(){
      this.loginLoading = true;
      const that = this;
      if(this.registData.adminPassword == this.adminPwd){
        $.ajax({
          url:this.$store.state.ip + 'store/info/add',
          dataType:'JSON',
          method:'POST',
          data:this.registData,
          success:function(res){
            that.isPwd=false;
            if(res.code == 1000){
              that.$message.success('注册成功');
              that.back();
            }else{
              that.$message.success('注册失败');

            }
          }
        })
      }else{
        this.isPwd = true;
      }

    }
  }
}
</script>


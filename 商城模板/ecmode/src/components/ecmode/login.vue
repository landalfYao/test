<template>
<transition name="el-fade-in-linear">
  <div class="login-panel">
    <div class="lpanel">
      <div class="panell">
        <div class="title ">SunWou MS</div>
        <div class="login-text font-lg">登录 Login</div>
        <el-input style="margin-top:15px" placeholder="请输入用户名" v-model="adminName">
          <template slot="prepend">用户</template>
        </el-input>
        <el-input style="margin-top:20px" placeholder="请输入密码" type="password" v-model="adminPwd">
          <template slot="prepend">密码</template>
        </el-input>
        <el-button-group style="margin-top:20px;float:right">
          <el-button type="info" @click="navToRegister">注册店铺</el-button>
          <el-button type="primary" :loading="loginLoading" @click="doLogin()">登录</el-button>
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
      adminName:'',
      adminPwd:'',
    }
  },
  mounted(){
    $('.login-panel').css("height",window.innerHeight);
     $('.lpanel').css("height",window.innerHeight-100);
  },
  methods: {
    doLogin(){
      this.loginLoading = true;
      const that = this;
      $.ajax({
        url:this.$store.state.ip + 'admin/info/login',
        dataType:'JSON',
        method:'POST',
        data:{
          adminName: this.adminName,
          adminPassword: this.adminPwd
        },
        success:function(res){
          that.loginLoading = false;
          if(res.code == 1000){
            that.$store.state.user = res.body;
            that.$router.push({path:'/'});
          }else{
            that.$message.error(res.result);
          }
        }
      })
    },
    navToRegister(){
      this.$router.push({path:'/ec_register'})
    }
  }
}
</script>


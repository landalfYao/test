<template>
<transition name="el-fade-in-linear">
  <div class="login-panel">
    <div class="lpanel">
      <div class="panell">
        <div class="title ">蜗居富平后台管理</div>
        <div class="login-text font-lg">登录 Login</div>
        <el-input style="margin-top:15px" placeholder="请输入用户名" v-model="adminName">
          <template slot="prepend">用户</template>
        </el-input>
        <el-input style="margin-top:20px" placeholder="请输入密码" type="password" v-model="adminPwd">
          <template slot="prepend">密码</template>
        </el-input>
        <el-button-group style="margin-top:20px;float:right">
          <!-- <el-button type="info" @click="navToRegister">注册店铺</el-button> -->
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
body {
  margin: 0;
}
.login-panel {
  background: #888;
  background-size: cover;
  width: 100%;
}
.lpanel {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  padding-top: 100px;
}
.panell {
  width: 300px;
  background: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 10px;
  margin: auto;
}
.title {
  margin: auto;
  font-weight: bold;
  font-size: 25px;
  color: #415472;
}
.login-text {
  margin-top: 10px;
  color: #415472;
  font-weight: bold;
}
.team {
  margin: auto;
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 100px;
}
</style>

<script>
export default {
  data() {
    return {
      loginLoading: false,
      adminName: "",
      adminPwd: ""
    };
  },
  mounted() {
    $(".login-panel").css("height", window.innerHeight);
    $(".lpanel").css("height", window.innerHeight - 100);
  },
  methods: {
    doLogin() {
      const that = this;
      if (this.adminName == "haitao" && this.adminPwd == "haitao123") {
        this.$store.state.isLogin = true;
        this.$router.push({ path: "/" });
      } else {
        this.$message({
          type: "error",
          message: "用户名或密码错误"
        });
      }
    }
  }
};
</script>


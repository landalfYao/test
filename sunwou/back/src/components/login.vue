<template>
  <div class="cons">
    <div class="pen-title">
      <h1>持久美妆 后台 管理系统</h1>
      <span>tech
        <i class='fa fa-code'></i> by
        <a >medusa</a>
      </span>
    </div>
    <div class="rerun">
      <a >管理员</a>
    </div>
    <div class="container">
      <div class="card"></div>
      <div class="card">
        <h1 class="title">Login</h1>
        <form>
          <div class="input-container">
            <input type="text" v-model="adminName" required="required" />
            <label for="#{label}">AdminName</label>
            <div class="bar"></div>
          </div>
          <div class="input-container">
            <input type="password" v-model="adminPwd" required="required" />
            <label for="#{label}">Password</label>
            <div class="bar"></div>
          </div>
          <div class="button-container">
            <button @click="loginIn">
              <span>Go</span>
            </button>
          </div>
        </form>
      </div>
      <div class="card alt">
        <div class="toggle "></div>
        <h1 class="title">用户登录
          <div class="close"></div>
        </h1>
        <form>
          <div class="input-container">
            <img v-bind:src="qrcode" width="100%" height="100%">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
@import url('/static/css/main.css');
@import url('/static/css/login.css');
@import url('/static/swicon/style.css');
</style>

<script>
export default {
  data() {
    return {
      adminName:'',
      adminPwd:'',
      qrcode:'',
    }
  },
  mounted() {
    var that = this
    $('.toggle').on('click', function() {
      $('.container').stop().addClass('active');
    });

    $('.close').on('click', function() {
      $('.container').stop().removeClass('active');
    });
    $(".cons").css({
      width: '100%',
      height: innerHeight,
      background: '#f3f3f3'
    });
    var websocket = new WebSocket(this.$store.state.ws+'ws/socket?ID=laobi&client=web');
    websocket.onopen = function(){
      websocket.send(JSON.stringify({protocol:9991}));
    };
    websocket.onmessage = function(evt) {
      console.log(evt)
      if(evt.data.indexOf('data:image') == -1){
        if(JSON.parse(evt.data).code == 1000){
          that.$store.state.user = JSON.parse(evt.data).body;
          that.$store.state.user.storeId = that.$store.state.user.id;
          that.$store.state.user.commodityType = 2;
          that.$router.push({path:'/'});
        }else{
          that.$message.error(res.result);
        }
      }else{
        that.qrcode = evt.data;
      }
    };
  },
  methods: {
    loginIn: function(){
      var that = this;
      $.post(this.$store.state.yip+'admin/info/login',{
          adminName: this.adminName,
          adminPassword: this.adminPwd
        },function(res){
          if(res.code == 1000){
            that.$store.state.user = res.body;
            that.$store.state.user.commodityType = 1;
            that.$router.push({path:'/'});
          }else{
            that.$message.error(res.result);
          }
        })
    }
  }
}
</script>

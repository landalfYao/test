<template>
  <div class="animated fadeInUp" style="padding:30px;">
    <div style="background:#fff;border-radius:10px;">
      <div  v-bind:style="'background:url('+ip+msg.backImage+') no-repeat center;border-radius:10px 10px 0 0 ;'">
        <div style="padding:15px;padding-bottom:0;cursor:pointer" @click="routerBack" ><i class="sw-icon- sw-icon-reply "></i> 返回</div>
        <div class="mzsItemPanel">
          <el-upload class="avatar-uploade" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="msg.avatarUrl" :src="msg.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="margin-left:20px">
            <div class="itemitem">
              <div style="width:70px">昵称</div>
              <div style="width:100px">{{msg.nickName}}</div>
            </div>
            <div class="itemitem">
              <div style="width:70px">区域</div>
              <div style="width:100px">{{msg.area}}</div>
            </div>
            <div class="itemitem">
              <div style="width:70px">手机号</div>
              <div style="width:100px">{{msg.phone}}</div>
            </div>
          </div>
          <div style="margin-left:50px">
            <div class="itemitem">
              <div style="width:90px">粉丝</div>
              <div style="width:100px">{{msg.follow}}</div>
            </div>
            <div class="itemitem">
              <div style="width:90px">美妆师认证</div>
              <div style="width:100px">{{msg.authentication}}</div>
            </div>
            <div class="itemitem">
                <el-button type="text"><i class="sw-icon- sw-icon-mode_edit "></i> 修改</el-button>
                <el-upload  style="height:15px;margin-left:20px;margin-top:5px"  action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button size="small" type="text">更换背景</el-button>
                </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div style="padding:30px;padding-top:0">
        <el-tabs v-model="activeName">
          <el-tab-pane label="作品展示" name="first">
            <div class="">
              <el-checkbox v-model="checkedAll" style="margin-right:15px">全选</el-checkbox>
              <el-button :plain="true" type="danger" size="small">批量删除</el-button>
              <el-upload class="upload-demo" style="float:right" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="small" type="primary">上传作品</el-button>
              </el-upload>
            </div>
            <hr>
            <div class="tabsp">
              <div class="item" v-for="(item,index) in msg.ownProduct" v-bind:key="index">
                <div v-bind:style="'background:url('+item.url+');background-color:#f3f3f3;width:200px;height:200px;background-size:cover;border-radius:5px'">
                  <el-checkbox v-model="item.active"></el-checkbox>
                  <div style="width:200px;height:180px" @click="previewImg(index)"></div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人品牌画册" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-show="carShow" class="animated-fast zoomIn tfix">
      <div>
        <el-carousel :autoplay="false" :initial-index="findex" trigger="click" height="100%" v-bind:style="'height:'+height+'px;width:'+width+'px'">
          <el-carousel-item v-for="(item,index) in msg.ownProduct" :key="index">
            <span style="color:#fff;position:absolute;right:15px;top:15px;font-size:25px;cursor:pointer" class="el-icon-close" @click="closePreview"></span>
            <div class="ghjk">
              <img v-bind:src="item.url" width="80%">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<style>
  .ghjk {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92%;
  }

  .avatar-uploade .el-upload {
    border: 6px solid #ffffff;
    border-radius: 100px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  .avatar-uploade .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .itemitem {
    display: flex;
    justify-content: flex-start;
    line-height: 25px
  }

  .flex-start {
    display: flex;
    justify-content: flex-start;
  }

  .tabsp {
    display: flex;
    justify-content: flex-start;
    flex-flow: wrap
  }

  .tabsp .item {
    padding: 10px
  }

  .tfix {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000000;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>

<script>
export default {
  data() {
    return {
      ip:this.$store.state.tip,
      carShow: false,
      findex: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      checkedAll: false,
      activeName: 'first',
      msg: {},
    }
  },
  mounted: function() {
    $('.tfix').eq(0).css({ width: window.innerWidth, height: window.innerHeight })
    this.getMessage();
  },
  methods: {
    //美妆师信息
    getMessage: function () {
      var that = this;
      $.ajax({
        url:that.$store.state.tip+'userinfodesignimage/wx/detail',
        dataType:'JSON',
        method:'POST',
        data:{
          designId:that.$route.params.id
        },
        success: function(res) {
          that.msg = res.body[0];
        }
      })
    },
    routerBack: function() {
      this.$router.go(-1)
    },
    previewImg: function(index) {
      this.findex = index;
      this.carShow = true;
    },
    closePreview: function() {
      this.carShow = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

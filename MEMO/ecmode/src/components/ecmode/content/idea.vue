<template>
  <transition name="el-fade-in-linear">
    <div class="panel" style="padding:30px">
      <h3>公司简介</h3>
      <div id="editor"> </div>
      <hr>
      <h3>联系我们</h3>
      <div id="ed"></div>
      <hr>
      <h3>公司历史</h3>
      <div id="his"></div>
      <hr>
      <h3>视频</h3>
      <el-upload class="upload-demo" :data="{label:'video'}"  drag action="http://tzhop.free.ngrok.cc/" multiple :http-request="fileUpload">
          <i v-if="msg.video == ''" class="el-icon-upload"></i>
          <video autoplay="autoplay" controls="controls" v-if="msg.video != ''"  width="100%">
            <source v-bind:src="ip+msg.video" type="video/mp4" />
          </video>
          <div v-if="msg.video == ''" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button id="submit">保存</el-button>
    </div>
  </transition>
</template>

<script>
import edit from "wangeditor";
export default {
  data () {
    return {
      msg:{
        video:''
      },
      ip:''
    }
  },
  mounted () {
    this.ip = this.$store.state.ip;
    this.getMsg();
  },
  methods:{
    getMsg(){
      var that = this;
      $.post(this.$store.state.ip+'companyconfig/find',{
        type:2,
      },function(res){
        res = JSON.parse(res)
        that.msg = res.body;
        that.editorUpload();
      })
    },
    //富文本编辑器
    editorUpload: function() {
      var that = this;
      var editor = new edit("#editor");
      //图片路径配置
      editor.customConfig.uploadImgServer =
        that.$store.state.ip + "file/up";
      //图片限制大小 1MB
      editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024;
      //图片数量设置
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.customUploadImg = function(files, insert) {
        var formData = new FormData();
        formData.append("file", files[0]);
        formData.append("type", 1);
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "file/up",
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            res = JSON.parse(res)
            if (res.code == 1000) {
              insert(that.$store.state.ip + res.body);
              that.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              that.$message({
                type: "error",
                message: res.result
              });
            }
          }
        });
      };
      editor.create();
      editor.txt.html(that.msg.companyDescribe);

      var ed  = new edit("#ed");
      //图片路径配置
      ed.customConfig.uploadImgServer =
        that.$store.state.ip + "file/up";
      ed.customConfig.uploadImgMaxSize = 1 * 1024 * 1024;
      ed.customConfig.uploadImgMaxLength = 1;
      ed.customConfig.customUploadImg = function(files, insert) {
        var formData = new FormData();
        formData.append("file", files[0]);
        formData.append("type", 1);
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "file/up",
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            res = JSON.parse(res)
            if (res.code == 1000) {
              insert(that.$store.state.ip + res.body);
              that.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              that.$message({
                type: "error",
                message: res.result
              });
            }
          }
        });
      };
      ed.create();
      ed.txt.html(that.msg.concat);

      var his  = new edit("#his");
      //图片路径配置
      his.customConfig.uploadImgServer =
        that.$store.state.ip + "file/up";
      his.customConfig.uploadImgMaxSize = 1 * 1024 * 1024;
      his.customConfig.uploadImgMaxLength = 1;
      his.customConfig.customUploadImg = function(files, insert) {
        var formData = new FormData();
        formData.append("file", files[0]);
        formData.append("type", 1);
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "file/up",
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            res = JSON.parse(res)
            if (res.code == 1000) {
              insert(that.$store.state.ip + res.body);
              that.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              that.$message({
                type: "error",
                message: res.result
              });
            }
          }
        });
      };
      his.create();
      his.txt.html(that.msg.companyHistory);


      $("#submit").click(function() {
        that.msg.companyDescribe = editor.txt.html();
        that.msg.concat = ed.txt.html();
        that.msg.companyHistory = his.txt.html();
        $.post(that.$store.state.ip+'companyconfig/update',that.msg,function(res){
          res = JSON.parse(res)
          if (res.code == 1000) {
              that.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              that.$message({
                type: "error",
                message: res.result
              });
            }
        })

      });
    },
    fileUpload(e){
      var that = this;
      var formData = new FormData();
      formData.append('file',e.file);
      $.ajax({
        type: 'POST',
        url: this.$store.state.ip+'file/up',
        data: formData,
        processData: false,
        contentType: false,
        success:function (res){
          res = JSON.parse(res);
          if(res.code == 1000){
            that.msg[e.data.label] = res.body;
            that.$message({
                type: 'success',
                message: res.result
            });
          }else{
            that.$message({
                type: 'error',
                message:res.result
            });
          }
        }
      });
    }
  }
}
</script>

<template>
  <div>
    <div class="form">
        <div class="text">商品名称</div>
        <el-input v-model="formData.name"></el-input>
    </div>
    <div class="form"> 
        <div class="text">简述</div>
        <el-input v-model="formData.subname"></el-input>
    </div>
    <div class="form">
        <div class="text">初始价格</div>
        <el-input v-model="formData.price" ></el-input>
    </div> 
    <div class="form">
        <div class="text">折扣</div>
        <el-input v-model="formData.discount" ></el-input>
    </div> 
    <div class="form">
        <el-checkbox-group v-model="checkList">
            <el-checkbox label="上线" v-model="formData.online" ></el-checkbox>
            <el-checkbox label="开启折扣" v-model="formData.isdiscount"></el-checkbox>
        </el-checkbox-group>
    </div>
    <div :class="formData.gallery.length > 0 ? 'form panel-around':'form' ">
        <div >
            <a class="addshop" @click="dialogVisible = true">
                <div style="width:80px;height:80px;line-height:80px;text-align:center">+</div>
            </a>
            <div style="font-size:12px">添加图片或视频</div>
        </div>
        <div v-for="(item,index) in formData.gallerys" :key="index" class="phok" :style="'background-image:url('+item.path+')'">
            <div class="panel-around">
                <div v-if="index != 0" style="width:50%;line-height:30px;text-align:center;color:#ffffff;font-size:10px;background:rgba(0,0,0,0.4)" @click="prePho(index)">左移</div>
                <div v-if="index != formData.gallerys.length-1" style="width:50%;line-height:30px;text-align:center;color:#ffffff;font-size:10px;background:rgba(0,0,0,0.4)" @click="nextPho(index)">右移</div>
            </div>
            <div style="width:100%;line-height:30px;text-align:center;color:#ffffff;font-size:10px;margin-top:20px;background:rgba(0,0,0,0.4)" @click="delPho(index)">删除</div>
        </div>

    </div>
    <div class="form">
        <div id="editor" style="width:100%">
        </div>
    </div>
    <div class="form">
        <el-button type="primary" id="submitCreate">提交保存</el-button>
    </div>

    <el-dialog title="添加图片或视频" :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
        <div class="form" style="padding:5px 0">
            <el-select v-model="galleryTypeValue" placeholder="请选择">
                <el-option v-for="item in galleryType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div> 
        <div class="form" style="padding:5px 0">
            <div class="text">网络链接</div>
            <el-input v-model="galleryPath"></el-input>
        </div>
        <div class="form" style="padding:5px 0" v-if="galleryTypeValue == 1">
            <img v-if="galleryPath != ''" :src="galleryPath" alt="" width="100%" height="100%">
            <a class="addshop" href="javascript:;">
                <div  style="width:80px;height:80px;line-height:80px;text-align:center">+</div>
                
                <input class="inpuf" style="height:80px" type="file" id="file" @change="fileInput(1,'galleryPath')">
            </a>
            <div style="font-size:12px">添加图片</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="galleryAdd()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style>
.phok{
    width: 80px;
    height: 80px;
    border-radius: 5px;
}
.form{
    padding: 5px 15px;
}
.panel-around{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap
}
.form>.text{
    font-size: 14px
}
.inpuf{
    width: 80px;
    height: 80px;
    position: relative;
    top: -80px;
    opacity: 0;
}
.addshop{
    display: block;
    width: 80px;
    height: 80px;
    border: 2px dotted #888888;
    border-radius: 5px;
    line-height: 80px;
    font-size: 25px;
    color: #888888;
    text-align: center;
    overflow: hidden;
    text-decoration: none
}
.addshop:hover{
    text-decoration: none
}
</style>

<script>
import edit from "wangeditor";
export default {
  data(){
      return {
          galleryPath:'',
          galleryTypeValue:1,
          galleryType:[
              {value:1,label:'图片'},{value:0,label:'视频'}
          ],
          dialogVisible:false,
          checkList:[
              "上线"
          ],
          formData:{
            name:'',
            subname:"",
            price:0,
            discount:1,
            online:true,
            isdiscount:false,
            gallerys:[],
            gallery:'',
            contents:''
          }
      }
  },
  mounted(){
      this.editorUpload();
  },
  methods:{
      //富文本编辑器
    editorUpload: function() {
      var that = this;
      var editor = new edit("#editor");
      //图片路径配置
      editor.customConfig.uploadImgServer =
        sessionStorage.API + "file/upload";
      //图片限制大小 1MB
      editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024;
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'image',  // 插入图片
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
    ]
      //图片数量设置
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.customUploadImg = function(files, insert) {
        var formData = new FormData();
        formData.append("file", files[0]);
        formData.append("type", 1);
        $.ajax({
          type: "POST",
          url: sessionStorage.API + "file/upload",
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            if (res.code == 1000) {
              insert(sessionStorage.API + res.result);
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
      editor.txt.html();
      $("#submitCreate").click(function() {
        that.formData.contents = editor.txt.html();
        that.formData.gallery = JSON.stringify(that.formData.gallerys);
        that.formData.online = true ? 1:0;
        that.formData.isdiscount = true ? 1:0;
        $.post(sessionStorage.API + "goods/info/add",that.formData,function(res){
            if(res.code == 1000){
                that.$message({
                    type: "success",
                    message: "添加成功"
                });
                that.$router.push({path:'shopList'})
            }
        })
        
       
      });
    },
    prePho(index){
        var path = this.formData.gallerys[index].path;
        var ty = this.formData.gallerys[index].type;
        this.formData.gallerys[index].path = this.formData.gallerys[index-1].path;
        this.formData.gallerys[index].type = this.formData.gallerys[index-1].type;
        this.formData.gallerys[index-1].path = path;
        this.formData.gallerys[index-1].type = ty
    },
    nextPho(index){
        var path = this.formData.gallerys[index].path;
        var ty = this.formData.gallerys[index].type;
        this.formData.gallerys[index].path = this.formData.gallerys[index+1].path;
        this.formData.gallerys[index].type = this.formData.gallerys[index+1].type;
        this.formData.gallerys[index+1].path = path;
        this.formData.gallerys[index+1].type = ty
    },
    delPho(index){
        this.formData.gallerys.splice(index,1)
    },
    handleClose() {
        this.dialogVisible = false;
    },
    fileInput(type,name){
        var that = this;
        var formData = new FormData();
        formData.append("file", document.getElementById("file").files[0]);
        formData.append("type", type);
        $.ajax({
          type: "POST",
          url: sessionStorage.API + "file/upload",
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            if (res.code == 1000) {
              that['galleryPath'] = sessionStorage.API + res.result;
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

    },
    galleryAdd(){
        this.dialogVisible = false;
        this.formData.gallerys.push({path:this.galleryPath,type:this.galleryTypeValue})
    }
  }
}
</script>

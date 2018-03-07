<template>
  <div style="padding:20px;background:#fff;border-radius:15px">
    <el-form :model="commodity"   label-width="100px" class="demo-ruleForm">

      <el-form-item label="商品名称" required>
        <el-input type="text" v-model="commodity.commodityName" placeholder="商品名称 / 0-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="商品简介" required>
        <el-input type="textarea" :rows="2" placeholder="商品简介" v-model="commodity.commodityRemark"></el-input>
      </el-form-item>
      <el-form-item label="初始价格" required>
        <el-col :span="10">
          <el-input placeholder="输入一个初始价格" v-model="commodity.commodityPrice"></el-input>
        </el-col>
        <el-col class="line" :span="3"  style="text-align:right;padding-right:10px;font-weight:bold">折扣</el-col>
        <el-col :span="11">
          <el-input placeholder="输入商品折扣" v-model="commodity.commodityDiscount"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="商品主图" required>
        <a class="photoUpload" href="javascript:;">
          <span v-if="commodity.imagePath == ''">+</span>
          <div v-if="commodity.imagePath != ''" v-bind:style="'width:150px;height:150px;background:url('+ip+commodity.imagePath+');background-size:cover;border-radius:10px'"></div>
          <input type="file" id="goodsMain" @change="fileUploads('goodsMain')">
        </a>
      </el-form-item>
      <el-form-item label="商品参数" required>
        <el-button @click="dialogVisible = true">添加参数</el-button>
        <el-table :data="commodityTemp" border style="width: 100%;margin-top:15px" max-height="250">
          <el-table-column prop="label" label="标签" ></el-table-column>
          <el-table-column prop="value" label="内容" ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template scope="scope">
              <el-button  type="text" size="small" @click="updateCan(scope.$index)"> 修改 </el-button>
              <el-button  type="text" size="small" @click="deleteCan(scope.$index)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品设置" >
          <el-checkbox label="上线" name="type" v-model="isOnline"></el-checkbox>
          <el-checkbox label="开启折扣" name="type" v-model="isDiscount"></el-checkbox>
      </el-form-item>

      <el-form-item label="图文详情" >
        <div id="editor">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" id="submitCreate" :loading="isCreate">立即创建</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="参数信息"  :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <div >
        <span >标签</span>
        <el-input style="margin-bottom:20px" type="text" v-model="canLabel" placeholder="标签"></el-input>
        <span style="margin-top:20px">内容</span>
        <el-input type="text" v-model="canValue" placeholder="内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="inputCan()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
@import url('/static/css/main.css');
</style>
<script>
import edit from 'wangeditor'
export default {
  data() {
    return {
      isCreate:false,
      canLabel:'',
      canValue:'',
      dialogVisible:false,
      ip: '',
      select1: '',
      select2: '',
      dialogImageUrl: '',
      dialogVisible: false,
      categoryOne: [],
      categoryTwo: [],
      props: {
        label: 'categoryOneName',
        value: 'categoryOneId',
        children: 'categoryTwo'
      },
      isUpdate:-1,
      commodityTemp: [],
      isDiscount:false,
      isOnline:false,
      isActivity:false,
      commodity: {
        commodityName: '',
        categoryTwoId: 0,
        commodityPrice: 0.00,
        imagePath: '',
        knowMore: '<p>请编辑您的内容...</p>',
        commodityRemark: '',
        commodityDiscount: 1,
        commodityValues: '',
        isDiscount: 0,
        storeId: 0
      }
    };
  },
  mounted() {
    this.commodity.storeId = this.$store.state.user.storeId;
    this.ip = this.$store.state.yip;
    if(this.$store.state.user.commodityType == 1){
      this.getCategoryOne();
    }else{
      this.getCategory();
    }
    this.editorUpload();
  },
  methods: {
    getCategory(){
      var that = this;
      $.post(this.$store.state.yip + 'commodity/category/getTwos', {
        pageIndex:1,
        pageSize:100,
        categoryOneId:this.$store.state.user.storeId,
        searchString:'',
        type: 1,
        categoryTwoType:this.$store.state.user.commodityType
      }, function(res) {
        that.categoryTwo = res.body.modelData;
      })
    },
    //修改参数
    updateCan: function (index) {
      this.dialogVisible = true;
      this.isUpdate = index;
      this.canLabel = this.commodityTemp[index].label;
      this.canValue = this.commodityTemp[index].value;
    },
    //删除参数
    deleteCan: function (index) {
      this.commodityTemp.splice(index,1);
      this.$message({
                type: 'success',
                message: '删除成功'
              });
    },
    //添加参数
    inputCan: function () {
      if(this.canLabel != '' && this.canValue != ''){
        if(this.isUpdate == -1){
          this.commodityTemp.push({label:this.canLabel,value:this.canValue})
          this.canLabel = '';
          this.canValue = '';
          this.dialogVisible = false;
          this.$message({
                  type: 'success',
                  message: '添加成功'
                });
          this.isUpdate = -1;
        }else{
          this.commodityTemp[this.isUpdate].label = this.canLabel;
          this.commodityTemp[this.isUpdate].value = this.canValue;
          this.canLabel = '';
          this.canValue = '';
          this.dialogVisible = false;
          this.$message({
                  type: 'success',
                  message: '修改成功'
                });
          this.isUpdate = -1;
        }
      }else{
        this.$message({
                type: 'warring',
                message: '2个都不能不填哦'
              });
      }
    },
    handleClose: function () {
      this.dialogVisible = false;
    },
    //富文本编辑器
    editorUpload: function() {
      var that = this;
      var editor = new edit('#editor');
      //图片路径配置
      editor.customConfig.uploadImgServer = that.$store.state.yip + 'file/upload';
      //图片限制大小 1MB
      editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024;
      //图片数量设置
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.customUploadImg = function(files, insert) {
        var formData = new FormData();
        formData.append('file', files[0]);
        formData.append('type', 1);
        $.ajax({
          type: 'POST',
          url: that.$store.state.yip + 'file/upload',
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            if (res.code == 1000) {
              insert(that.$store.state.yip + res.result)
              that.$message({
                type: 'success',
                message: '上传成功'
              });
            } else {
              that.$message({
                type: 'error',
                message: res.result
              });
            }
          }
        });

      }
      editor.create();
      editor.txt.html(this.commodity.knowMore);
      $("#submitCreate").click(function(){
        that.isCreate = true;
        var commodity = that.commodity;
        if(that.isDiscount){
          commodity.isDiscount = 1;
        }else{
          commodity.isDiscount = 0;
        }
        if(that.isOnline){
          commodity.isSales = 1;
        }else{
          commodity.isSales = 0;
        }
        if(that.isActivity){
          commodity.isActivity = 1;
        }else{
          commodity.isActivity = 0;
        }
        commodity.commodityValues = JSON.stringify(that.commodityTemp);
        commodity.knowMore = editor.txt.html();
        commodity.commodityType = that.$store.state.user.commodityType;
        console.log(commodity);
        $.post(that.$store.state.yip + 'commodity/info/add',commodity,function (res) {
          that.isCreate = false;
          if(res.code == 1000){
            that.$message({
                type: 'success',
                message: res.result
              });
            that.$router.push({name:'personalManerge'})
          }else{
            that.$message({
                type: 'warring',
                message: res.result
              });
          }
        })
      })
    },

    //图片上传
    fileUploads: function(id) {
      var that = this;
      var formData = new FormData();
      formData.append('file', $("#" + id)[0].files[0]);
      formData.append('type', 1);
      $.ajax({
        type: 'POST',
        url: this.$store.state.yip + 'file/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.code == 1000) {
            if (id == 'goodsUpload') {

            }
            if (id == 'goodsMain') {
              that.commodity.imagePath = res.result;
            }
            that.$message({
              type: 'success',
              message: '上传成功'
            });
          } else {
            that.$message({
              type: 'error',
              message: res.result
            });
          }
        }
      });
    },
    //一级分类
    getCategoryOne: function() {
      var that = this;
      $.post(this.$store.state.yip + 'commodity/category/getOnes', {
        pageIndex: 1,
        pageSize: 100,
        storeId: this.$store.state.user.storeId,
        searchString: ''
      }, function(res) {
        that.categoryOne = res.body.modelData
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    categoryOneChange(val) {
      var that = this;
      $.post(this.$store.state.yip + 'commodity/category/getTwos', {
        pageIndex: 1,
        pageSize: 100,
        storeId: this.$store.state.user.storeId,
        searchString: '',
        categoryOneId:val,
        type: 1,
        categoryTwoType:this.$store.state.user.commodityType
      }, function(res) {
        that.categoryTwo = res.body.modelData;
      })
    }
  }
}
</script>

<template>
<transition name="el-fade-in-linear">
  <div style="padding:20px;background:#fff;border-radius:15px">
    <el-form :model="commodity"   label-width="100px" class="demo-ruleForm">
      <el-form-item label="所属分类" required v-if="this.$store.state.user.adminType == 1">
        <el-select v-model="select1" placeholder="一级类目" @change="categoryOneChange">
          <el-option v-for="item in categoryOne" :key="item.categoryOneId" :label="item.categoryOneName" :value="item.categoryOneId">
          </el-option>
        </el-select>
        <el-select v-model="commodity.categoryTwoId" placeholder="二级类目" v-if="categoryTwo.length > 0">
          <el-option v-for="item in categoryTwo" :key="item.categoryTwoId" :label="item.categoryTwoName" :value="item.categoryTwoId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分类" required v-if="this.$store.state.user.adminType == 2">
        <el-select v-model="commodity.categoryTwoId" placeholder="二级类目" v-if="categoryTwo.length > 0">
          <el-option v-for="item in categoryTwo" :key="item.categoryTwoId" :label="item.categoryTwoName" :value="item.categoryTwoId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" required>
        <el-input type="text" v-model="commodity.commodityName" placeholder="商品名称 / 0-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="商品简介" required>
        <el-input type="textarea" :rows="2" placeholder="商品简介" v-model="commodity.commodityRemark"></el-input>
      </el-form-item>
      <el-form-item label="初始价格" required>
        <el-col :span="10">
          <el-input placeholder="输入一个初始价格" v-model="commodity.commodityPrice"></el-input>
          <span style="color:#aaaaaa">初始价格仅做为展示价格</span>
        </el-col>
        <el-col class="line" :span="3"  style="text-align:right;padding-right:10px;font-weight:bold">折扣</el-col>
        <el-col :span="11">
          <el-input placeholder="输入商品折扣"  v-model="commodity.commodityDiscount" @input="disconutInput"></el-input>
          <span style="color:#aaaaaa">请输入小于1的折扣值</span>
        </el-col>
      </el-form-item>

      <el-form-item label="商品主图" required>

        <el-upload class="upload-demo" :data="{type:1,label:'imagePath'}" :multiple="false" drag action="http://10.151.11.161:8080/elMall/file/upload" :http-request="fileUpload" :before-upload="beforeAvatarUpload">
            <i v-if="commodity.imagePath == ''" class="el-icon-upload"></i>
            <img v-if="commodity.imagePath != ''" v-bind:src="ip+commodity.imagePath" width="100%">
            <div v-if="commodity.imagePath == ''" class="el-upload__text">将文件拖到此处，或<em>点击上传</em>,最佳比例1:1</div>
          </el-upload>
      </el-form-item>
      <el-form-item label="商品参数" required>
        <el-button @click="dialogVisible = true">添加参数</el-button>
        <el-table :data="commodityTemp" border style="width: 100%;margin-top:15px" max-height="250">
          <el-table-column prop="label" label="标签" ></el-table-column>
          <el-table-column prop="value" label="内容" ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
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
</transition>
</template>
<style>
.upload-demo{

  width: 180px;
}
.el-upload-dragger{
width: 180px;
}
</style>

<script>
import edit from "wangeditor";
export default {
  data() {
    return {
      isCreate: false,
      canLabel: "",
      canValue: "",
      dialogVisible: false,
      ip: "",
      select1: "",
      select2: "",
      dialogImageUrl: "",
      dialogVisible: false,
      categoryOne: [],
      categoryTwo: [],
      props: {
        label: "categoryOneName",
        value: "categoryOneId",
        children: "categoryTwo"
      },
      isUpdate: -1,
      commodityTemp: [],
      isDiscount: false,
      isOnline: false,
      isActivity: false,
      commodity: {
        commodityName: "",
        categoryTwoId: 0,
        commodityPrice: 0.0,
        imagePath: "",
        knowMore: "<p>请编辑您的内容...</p>",
        commodityRemark: "",
        commodityDiscount: 1,
        commodityValues: "",
        isDiscount: 0,
        storeId: 0
      }
    };
  },
  mounted() {
    this.commodity.storeId = this.$store.state.user.storeId;
    this.ip = this.$store.state.ip;
    if (this.$store.state.user.adminType == 1) {
      this.getCategoryOne();
    } else {
      this.getCategory();
    }
    this.editorUpload();
  },
  methods: {
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 300k!');
        }
        return isJPG && isLt2M;
    },
    disconutInput(e){
      if(e > 1){
        this.$message({
          type: "info",
          message: "请输入小于1的折扣值"
        });
        this.commodity.commodityDiscount = 1;
      }else{
        this.commodity.commodityDiscount = e;
      }
    },
    getCategory() {
      var that = this;
      $.post(
        this.$store.state.ip + "commodity/category/getTwos",
        {
          pageIndex: 1,
          pageSize: 100,
          categoryOneId: this.$store.state.user.storeId,
          searchString: "",
          type: 1,
          categoryTwoType: this.$store.state.user.adminType
        },
        function(res) {
          that.categoryTwo = res.body.modelData;
        }
      );
    },
    //修改参数
    updateCan: function(index) {
      this.dialogVisible = true;
      this.isUpdate = index;
      this.canLabel = this.commodityTemp[index].label;
      this.canValue = this.commodityTemp[index].value;
    },
    //删除参数
    deleteCan: function(index) {
      this.commodityTemp.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    //添加参数
    inputCan: function() {
      if (this.canLabel != "" && this.canValue != "") {
        if (this.isUpdate == -1) {
          this.commodityTemp.push({
            label: this.canLabel,
            value: this.canValue
          });
          this.canLabel = "";
          this.canValue = "";
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.isUpdate = -1;
        } else {
          this.commodityTemp[this.isUpdate].label = this.canLabel;
          this.commodityTemp[this.isUpdate].value = this.canValue;
          this.canLabel = "";
          this.canValue = "";
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.isUpdate = -1;
        }
      } else {
        this.$message({
          type: "warring",
          message: "2个都不能不填哦"
        });
      }
    },
    handleClose: function() {
      this.dialogVisible = false;
    },
    //富文本编辑器
    editorUpload: function() {
      var that = this;
      var editor = new edit("#editor");
      //图片路径配置
      editor.customConfig.uploadImgServer =
        that.$store.state.ip + "file/upload";
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
          url: that.$store.state.ip + "file/upload",
          data: formData,
          processData: false,
          contentType: false,
          success: function(res) {
            if (res.code == 1000) {
              insert(that.$store.state.ip + res.result);
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
      editor.txt.html(this.commodity.knowMore);
      $("#submitCreate").click(function() {
        if (that.commodity.categoryTwoId == 0) {
          that.$message({
            type: "error",
            message: "分类不能为0哦"
          });
        } else if(that.commodity.commodityDiscount > 1){
          that.$message({
            type: "info",
            message: "请输入小于1的折扣值"
          });
        }
        else {
          that.isCreate = true;
          var commodity = that.commodity;
          if (that.isDiscount) {
            commodity.isDiscount = 1;
          } else {
            commodity.isDiscount = 0;
          }
          if (that.isOnline) {
            commodity.isSales = 1;
          } else {
            commodity.isSales = 0;
          }
          if (that.isActivity) {
            commodity.isActivity = 1;
          } else {
            commodity.isActivity = 0;
          }
          commodity.commodityValues = JSON.stringify(that.commodityTemp);
          commodity.knowMore = editor.txt.html();
          commodity.commodityType = that.$store.state.user.type;
          console.log(commodity);
          $.post(
            that.$store.state.ip + "commodity/info/add",
            commodity,
            function(res) {
              that.isCreate = false;
              if (res.code == 1000) {
                that.$message({
                  type: "success",
                  message: res.result
                });
                that.$router.push({ name: "ecGoodsList" });
              } else {
                that.$message({
                  type: "warring",
                  message: res.result
                });
              }
            }
          );
        }
      });
    },

    //图片上传
    fileUpload(e) {
      var that = this;
      var formData = new FormData();
      formData.append("file", e.file);
      formData.append("type", e.data.type);
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "file/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.code == 1000) {
            that.commodity[e.data.label] = res.result;
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
    //一级分类
    getCategoryOne: function() {
      var that = this;
      $.post(
        this.$store.state.ip + "commodity/category/getOnes",
        {
          pageIndex: 1,
          pageSize: 100,
          storeId: this.$store.state.user.storeId,
          searchString: ""
        },
        function(res) {
          that.categoryOne = res.body.modelData;
        }
      );
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
      $.post(
        this.$store.state.ip + "commodity/category/getTwos",
        {
          pageIndex: 1,
          pageSize: 100,
          storeId: this.$store.state.user.storeId,
          searchString: "",
          categoryOneId: val,
          type: 1,
          categoryTwoType: this.$store.state.user.type
        },
        function(res) {
          that.categoryTwo = res.body.modelData;
        }
      );
    }
  }
};
</script>

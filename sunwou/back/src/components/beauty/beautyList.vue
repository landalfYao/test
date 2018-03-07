<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>美妆师管理</span>
      </div>
      <div>
        <span style="color:#888888">此页为一级类目编辑。</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-select v-model="shopType" placeholder="二级类目" @change="typeChange()">
          <el-option v-for="item in shopTypeValue" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <!-- <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加类目</el-button> -->
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="realname" label="姓名">
          <template scope="scope">
            <div>
              <img v-bind:src="ip+scope.row.iconUrl" height="30px">
              <span style="margin-left:15px">{{scope.row.realname}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="serverPhone" label="服务电话" sortable>
        </el-table-column>
        <el-table-column prop="serverCity" label="所在城市" sortable>
        </el-table-column>
        <el-table-column prop="serverAddress2" label="地址">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.createtime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template scope="scope">
            <el-button type="text" size="small" @click="updateRow(scope.row.id)">个人画册</el-button>
            <el-button type="text" size="small" @click="updateSimpleRow(scope.row.id)">个人视频</el-button>
            <el-button style="height:100%;width:100%" type="text" size="small" @click="luntype=2,id = scope.row.userInfoId,designId=scope.row.id,addDia = true">添加到个人品牌包装页轮播图</el-button>
            <el-button style="height:100%;width:100%" type="text" size="small" @click="luntype=3,id = scope.row.userInfoId,designId=scope.row.id,addDia = true">添加到私人订制页轮播图</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right;margin-top:20px"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageModel.pageIndex"
       :page-sizes="pageSlist" :page-size="pageModel.pageSize" layout="total, sizes, prev, pager, next, jumper"
       :total="pageModel.recordCount">
      </el-pagination>
      <div class="clearfix"></div>
    </div>
    <el-dialog title="修改信息" :visible.sync="addCompanyDialog" size="small" :before-close="handleClose">
      <el-form :label-position="'left'" :model="company" :rules="companyRules" ref="company" label-width="0" class="demo-ruleForm">

        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>视频</strong>
            </span>
            <input type="file" id="audio" @change="fileUpload('audio',3)" >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addCompanyDialog = false,company={}">取消</el-button>
              <el-button type="primary" @click="addCompanyDialog = false,submitAudio()">确认提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="个人画册" :visible.sync="addDialog" size="small" :before-close="handleClose">
      <div v-for="(item,index) in pictrues" v-bind:key="item" style="display:inline-block;padding:10px">
            <img v-bind:src="ip + item" width="150px" height="150px">
            <div style="width:150px;cursor:pointer;line-height:30px;text-align:center" @click="delPic(index)">删除</div>
      </div>
      <el-form :label-position="'left'" :model="company"  ref="company" label-width="0" class="demo-ruleForm">

        <el-row :gutter="30">
          <el-col :span="10">

            <span style="line-height:30px">
              <strong>图片</strong>
            </span>
            <input type="file" id="filesd" @change="fileUpload('filesd',1)" >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addDialog = false,company={}">取消</el-button>
              <el-button type="primary" @click="addDialog = false,submitPictrue()">确认提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

<el-dialog title="添加到轮播图" :visible.sync="addDia" size="small" :before-close="handleClose">
      <el-form :label-position="'left'"  label-width="0" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>图片</strong>
            </span>
            <input type="file" id="lunpath" @change="fileUp('lunpath')" >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addDia = false">取消</el-button>
              <el-button type="primary" @click="addDia = false,submitLun()">确认提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
.panel {
  padding: 30px;
  padding-top: 0px;
  border-radius: 10px
}
</style>

<script>
export default {
  data() {
    return {
      luntype:2,
      shopTypeValue:[{label:'普通美妆师',value:2},{label:'大咖美妆师',value:4}],
      shopType:2,
      ip:this.$store.state.yip,
      fip:this.$store.state.yip + 'file/upload',
      nowSortNumber:1,
      storeId:1,
      id:0,
      company: {
        categoryOneName: '',
        subName: '',
        imagePath:'',
        iconPath:'',
        storeId:1,
        audio:'',
        filesd:'',
        lunpath:'',
      },
      addDia:false,
      pictrues:[],
      designId:1,
      companyRules: {},
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
      sortDialogVisible:false,
      addCompanyDialog: false,
      addDialog: false,
      search: '',
      list:[],
      multipleSelection: [],
      designType:2
    }
  },
  mounted: function () {
    this.getCategory();
  },
  methods: {
    submitLun(){
      var that = this;
      $.post(this.$store.state.yip+'carousel/info/add',{
        carouselType:this.luntype,
        carouselPath:'/pages/MZteacher/teachmain/teachmain?designId='+this.designId+'&userInfoId='+this.id,
        imagePath:this.company.lunpath,
        shopId:1,
      },function(res){
        if(res.code == 1000){
          that.$message({
              type: 'success',
              message: '添加成功'
            });
        }else{
          that.$message({
              type: 'error',
              message: '添加失败'
            });
        }
      })
    },
    typeChange(){
      this.getCategory();
    },
    delPic(index){
      this.pictrues.splice(index,1)
    },
    submitPictrue(){
      var that = this;
      var pic = '';
      console.log(this.pictrues)
      for(var item in this.pictrues){
        pic += this.pictrues[item]+',';
      }
      $.post(this.$store.state.yip+'userinfodesignimage/wx/update',{
        designId:this.designId,
        pictrue:pic
      },function(res){
        if(res.code == 1000){

          that.$message({
                type: 'success',
                message: '上传成功'
            });

        }else{
          that.$message({
                type: 'error',
                message: '上传失败'
            });
        }
      })
    },
    submitAudio(){
      var that = this;
      $.post(this.$store.state.yip+'userinfodesignimage/wx/update',{
        designId:this.designId,
        video:this.company.audio
      },function(res){
        if(res.code == 1000){
          that.$message({
                type: 'success',
                message: '上传成功'
            });

        }else{
          that.$message({
                type: 'error',
                message: '上传失败'
            });
        }
      })
    },
    //排序
    makeSort:function (id,sortNumber,num) {
      console.log(id,sortNumber)
      var that = this;
      $.post(this.$store.state.yip+'commodity/category/sortOne',{
        categoryOneId:id,
        sortNumber:sortNumber+num
      },function(rda){
        $.post(that.$store.state.yip+'commodity/category/sortOne',{
            categoryOneId:id+num,
            sortNumber:sortNumber
          },function(res){
            if(res.code == 1000){
              that.$message({
                    type: 'success',
                    message: res.result
                  });
                that.getCategory()
            }else{
              that.$message({
                    type: 'warring',
                    message: res.result
                  });
            }

          })

      })

    },
    //上传图片
    fileUp(name){
      var that = this;
      var formData = new FormData();
      formData.append('file',$("#"+name)[0].files[0]);
      formData.append('type',1);
      $.ajax({
        type: 'POST',
        url: this.$store.state.yip+'file/upload',
        data: formData,
        processData: false,
        contentType: false,
        success:function (res){
          if(res.code == 1000){
            that.company[name] = res.result;
            that.$message({
                type: 'success',
                message: '上传成功'
            });
          }else{
            that.$message({
                type: 'error',
                message:res.result
            });
          }
        }
      });
    },
    //上传图片
    fileUpload(name,num){
      var that = this;
      var formData = new FormData();
      formData.append('file',$("#"+name)[0].files[0]);
      formData.append('type',num);
      $.ajax({
        type: 'POST',
        url: this.$store.state.yip+'file/upload',
        data: formData,
        processData: false,
        contentType: false,
        success:function (res){
          if(res.code == 1000){
            if(num == 1){
              that.pictrues.push(res.result);
            }else{
              that.company[name] = res.result;
            }
            that.$message({
                  type: 'success',
                  message: '上传成功'
              });

          }else{
            that.$message({
                type: 'error',
                message:res.result
            });
          }
        }
      });
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    //获取类目
    getCategory:function () {
      var that = this;
      $.ajax({
        url: this.$store.state.yip+'userinfodesign/findbytype',
        dataType: 'JSON',
        method: 'POST',
        data:{
          type:that.shopType
        },
        success: function(res) {
          that.list = res.body;
        }
      })

    },
    closeSortDialogVisible: function () {
      this.sortDialogVisible = false;
    },
    //查看修改
    updateSimpleRow: function (id){
      this.designId = id;
      this.addCompanyDialog = true
    },
    updateRow: function (id){
      this.designId = id;
      this.addDialog = true;
      var that = this;
      $.ajax({
        type: 'POST',
        url: this.$store.state.yip+'userinfodesignimage/wx/detail',
        dataType:'JSON',
        data: {
          designId:this.designId,
        },
        success:function (res){
          if(res.body[0].pictrue){
            that.pictrues = res.body[0].pictrue.split(',');
            that.pictrues.pop();
          }
        }
      });
    },
    initMultiSelection: function () {
      var list = []
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].categoryOneId);
      }
      return list;
    },
    //取消选择
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    //批量删除
    multiDelete: function () {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.get(that.$store.state.yip+'commodity/category/deleteOnes?categoryOneIds='+that.initMultiSelection(),function(res){
            if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getCategory();
            }else{
              that.$message({
                type: 'warning',
                message: res.result
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //删除一行
    deleteSimpleRow: function (id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(that.$store.state.yip+'commodity/category/deleteOnes',{
            categoryOneIds:id
          },function(res){
            if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getCategory();
            }else{
              that.$message({
                type: 'warning',
                message: res.result
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //添加/修改公司信息
    submitCompany: function (e) {
      var that = this;
      var intfa = 'addOne';
      if(that.company.categoryOneId){
        intfa = 'updateOne';
      }
      $.post(this.$store.state.yip+'commodity/category/'+intfa,this.company,function(res){
        if(res.code == 1000){
            var msg = '分类信息添加成功';
            if(that.company.categoryOneId){
              msg = '分类信息修改成功';
            }
            that.$message({
              message: msg,
              type: 'success'
            });
            that.addCompanyDialog = false;
            that.getCategory();
        }else{
          that.$message({
              message: res.result,
              type: 'success'
          });
        }
        that.company = {
              categoryOneName: '',
              subName: '',
              imagePath:'',
              iconPath:'',
              storeId:that.storeId
            };
      })
    },
    //关闭添加公司信息 模态框
    handleClose: function() {
      this.company = {};
      this.addCompanyDialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    searchInput: function(e) {
      this.search = e;
      this.getCategory();
    },
    handleSizeChange: function(e) {
      console.log(e)
    },
    handleCurrentChange: function(e) {
      this.pageModel.pageIndex = e;
      this.getCategory();
    },
    currentPage4: function(e) {
      console.log(e)
    }
  }
}
</script>


<template>
<transition name="el-fade-in-linear">
  <div class="panel">
    <div style="padding:30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ec_overview' }" class="font-md">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ec_category' }" class="font-md">分类管理</el-breadcrumb-item>
        <el-breadcrumb-item class="font-lg">子分类管理--{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="font-md color-def" style="margin-top:10px">平台商城子分类</div>
      <hr style="border:2px solid #CCCCCC;margin-top:20px">
      <!-- 操作按钮 start -->
      <div style="margin-top:20px">
        <el-button-group class="pull-left">
          <el-button type="danger" icon="el-icon-delete" @click="multiDelete()" plain>批量删除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" plain>新增类目</el-button>
        </el-button-group>
        <el-input style="width:250px" class="pull-right" @input="searchInput" placeholder="输入关键字" v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="clearfix"></div>
      </div>
      <!-- 操作按钮 end -->


      <!-- 表格 start -->
      <el-table  ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="categoryTwoName" label="分类名称" sortable> </el-table-column>
        <el-table-column prop="subName" label="分类描述" sortable> </el-table-column>
        <el-table-column label="ICON">
          <template slot-scope="scope">
            <img v-bind:src="ip+scope.row.iconPath" width="50px">
          </template>
        </el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img v-bind:src="ip+scope.row.imagePath" height="50px">
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group >
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="small"
                type="danger"
                @click="deleteSimpleRow(scope.row.categoryTwoId)" >删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 end -->

      <el-pagination style="float:right;margin-top:20px"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageModel.pageIndex"
       :page-sizes="pageSlist" :page-size="pageModel.pageSize" layout="total, sizes, prev, pager, next, jumper"
       :total="pageModel.recordCount"></el-pagination>
      <div class="clearfix"></div>

    </div>

    <el-dialog title="分类信息" :visible.sync="dialogVisible" >
      <el-form :model="addData">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="addData.categoryTwoName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" :label-width="formLabelWidth">
          <el-input v-model="addData.subName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="ICON上传" :label-width="formLabelWidth">
          <el-upload class="upload-demo" :data="{type:1,label:'iconPath'}" :multiple="false" drag action="http://10.151.11.161:8080/elMall/file/upload" :http-request="fileUpload">
            <i v-if="addData.iconPath == ''" class="el-icon-upload"></i>
            <img v-if="addData.iconPath != ''" v-bind:src="ip+addData.iconPath" width="100px">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面上传" :label-width="formLabelWidth">
          <el-upload class="upload-demo" :data="{type:1,label:'imagePath'}" :multiple="false" drag action="http://10.151.11.161:8080/elMall/file/upload" :http-request="fileUpload">
            <i v-if="addData.imagePath == ''" class="el-icon-upload"></i>
            <img v-if="addData.imagePath != ''" v-bind:src="ip+addData.imagePath" width="100%">
            <div v-if="addData.imagePath == ''" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,subLoading = false">取 消</el-button>
        <el-button type="primary" :loading="subLoading" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</transition>
</template>

<script>
export default {
  data(){
    return {
      subLoading:false,
      storeId:1,
      ip:'',
      formLabelWidth: '120px',
      dialogVisible:false,
      search: '',
      multipleSelection:[],
      addData:{
        categoryOneId:'',
        categoryTwoName: '',
        subName: '',
        imagePath:'',
        iconPath:'',
        storeId:1
      },
      list:[],
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
      title:'',
    }
  },
  mounted () {
    this.ip = this.$store.state.ip;
    this.storeId = this.$store.state.user.storeId;
    this.addData.storeId = this.$store.state.user.storeId;
    this.addData.categoryOneId = this.$route.params.row.categoryOneId;
    this.title = this.$route.params.row.categoryOneName;
    this.getList();
  },
  methods: {

    //搜索
    searchInput(e){
      this.search = e;
      this.getList();
    },
    //批量删除
    multiDelete: function () {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.get(that.$store.state.ip+'commodity/category/deleteTwos?categoryTwoIds='+that.initMultiSelection(),function(res){
            if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getList();
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
      var that = this;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.get(that.$store.state.ip+'commodity/category/deleteTwos?categoryTwoIds='+id,function(res){
            if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getList();
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
    //修改
    handleEdit(index,row){
      this.addData = row;
      this.dialogVisible = true
    },
    //上传图片
    fileUpload(e){
      var that = this;
      var formData = new FormData();
      formData.append('file',e.file);
      formData.append('type',e.data.type);
      $.ajax({
        type: 'POST',
        url: this.$store.state.ip+'file/upload',
        data: formData,
        processData: false,
        contentType: false,
        success:function (res){
          if(res.code == 1000){
            that.addData[e.data.label] = res.result;
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
    //初始化全选
    initMultiSelection: function () {
      var list = []
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].categoryTwoId);
      }
      return list;
    },
    //添加/修改信息
    submit: function (e) {
      this.subLoading = true;
      var that = this;
      var intfa = 'addTwo';
      if(that.addData.categoryTwoId){
        intfa = 'updateTwo';
      }
      $.post(this.$store.state.ip+'commodity/category/'+intfa,this.addData,function(res){
        that.subLoading = false;
        if(res.code == 1000){

            that.$message({
              message: res.result,
              type: 'success'
            });
            that.dialogVisible = false;
            that.getList();
        }else{
          that.$message({
              message: res.result,
              type: 'success'
          });
        }
        that.addData = {
              categoryTwoName: '',
              subName: '',
              imagePath:'',
              iconPath:'',
              storeId:that.storeId,
              categoryOneId:that.$route.params.row.categoryOneId
            };
      })
    },
    //获取列表
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'commodity/category/getTwos',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        storeId:this.storeId,
        searchString:this.search,
        type: 1,
        categoryOneId:this.$route.params.row.categoryOneId
      },function(res){
        that.pageModel = res.body.pageModel;
        that.list = res.body.modelData
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange: function(e) {
      this.pageModel.pageSize = e;
      this.getList();
    },
    handleCurrentChange: function(e) {
      this.pageModel.pageIndex = e;
      this.getList();
    },
  }
}
</script>


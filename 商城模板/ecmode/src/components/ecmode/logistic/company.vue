<template>
<transition name="el-fade-in-linear">
  <div class="panel">
    <div style="padding:30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ec_overview' }" class="font-md">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="font-lg">物流公司网点管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="font-md color-def" style="margin-top:10px">物流公司网点管理</div>
      <hr style="border:2px solid #CCCCCC;margin-top:20px">
      <!-- 操作按钮 start -->
      <div style="margin-top:20px">
        <el-button-group class="pull-left">
          <el-button type="danger" icon="el-icon-delete" @click="multiDelete()" plain>批量删除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" plain>新增物流网点</el-button>
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
        <el-table-column prop="companyCode" label="快递公司编码" sortable>
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称" sortable>
        </el-table-column>
        <el-table-column prop="companyPrincipal" label="联系人" sortable>
        </el-table-column>
        <el-table-column prop="companyPhone" label="联系电话" sortable>
        </el-table-column>
        <el-table-column prop="companyAddress" label="公司地址"  sortable>
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteSimpleRow(scope.row.companyId)">删除</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
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

    <el-dialog title="物流公司网点信息" :visible.sync="dialogVisible" >
      <el-form :model="addData">
        <el-form-item label="快递公司编码" :label-width="formLabelWidth">
          <el-input v-model="addData.companyCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="物流网点名称" :label-width="formLabelWidth">
          <el-input v-model="addData.companyName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="addData.companyPrincipal" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="addData.companyPhone" type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="物流网点地址" :label-width="formLabelWidth">
          <el-input v-model="addData.companyAddress" auto-complete="off"></el-input>
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
        companyCode:'',
        companyName: '',
        companyPhone: '',
        companyAddress:'',
        companyPrincipal:'',
        storeId:null,
        storeType:null
      },
      list:[],
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
    }
  },
  mounted () {
    this.ip = this.$store.state.ip;
    this.storeId = this.$store.state.user.storeId;
    this.addData.storeId = this.$store.state.user.storeId;
    this.addData.storeType = this.$store.state.user.adminType;
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
          $.get(that.$store.state.ip+'logistics/company/deletes?companyIds='+that.initMultiSelection(),function(res){
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
          $.get(that.$store.state.ip+'logistics/company/deletes?companyIds='+id,function(res){
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
        list.push(this.multipleSelection[item].companyId);
      }
      return list;
    },
    //添加/修改信息
    submit: function (e) {
      this.subLoading = true;
      var that = this;
      var intfa = 'add';
      if(that.addData.companyId){
        intfa = 'update';
      }
      $.post(this.$store.state.ip+'logistics/company/'+intfa,this.addData,function(res){
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
              companyCode:'',
              companyName: '',
              companyPhone: '',
              companyAddress:'',
              companyPrincipal:'',
              storeId:that.$store.state.user.storeId,
              storeType:that.$store.state.user.adminType
            };
      })
    },
    //获取列表
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'logistics/company/finds',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        storeId:this.$store.state.user.storeId,
        searchString:this.search,
        storeType:this.$store.state.user.adminType
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


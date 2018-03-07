<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>物流公司信息</span>
      </div>
      <div>
        <span style="color:#888888">用户需要根据物流公司获门店内物流价格表填写</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加物流公司</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
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
          <template scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="deleteSimpleRow(scope.row.companyId)">删除</el-button>
            <el-button type="text" size="small" @click="updateSimpleRow(scope.row,scope.$index)">修改</el-button>
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
    <el-dialog title="物流信息" :visible.sync="addCompanyDialog" size="tiny" :before-close="handleClose">
      <el-form :label-position="'left'" :model="company"  ref="company" label-width="80px" class="demo-ruleForm">
        <el-form-item label="物流公司">
          <el-input v-model="company.companyName"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="company.companyPrincipal"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="number" v-model="company.companyPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="company.companyAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addCompanyDialog = false,company={}">取消</el-button>
          <el-button type="primary" @click="submitCompany()">确认提交</el-button>
        </el-form-item>
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
      company: {
        companyName: '',
        companyPhone: '',
        companyAddress:'',
        companyPrincipal:'',
        storeId:null,
        storeType:null
      },
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
      currentPage: 1,
      addCompanyDialog: false,
      search: '',
      list:[],
      multipleSelection: []
    }
  },
  mounted: function (){
    this.company.storeId = this.$store.state.user.storeId;
    this.company.storeType = this.$store.state.user.commodityType;
    this.getCompay();
  },
  methods: {
    getCompay: function () {
      var that = this;
      $.post(this.$store.state.yip+'logistics/company/finds',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        storeId:this.$store.state.user.storeId,
        searchString:this.search,
        storeType:this.$store.state.user.commodityType
      },function(res){
        that.pageModel = res.body.pageModel;
        that.list = res.body.modelData
      })
    },
    //修改一行
    updateSimpleRow: function (row,index){
      this.company = row;
      this.addCompanyDialog = true;
    },
    initMultiSelection: function () {
      var list = []
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].companyId);
      }
      return list;
    },
    //批量删除
    multiDelete: function () {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.get(that.$store.state.yip+'logistics/company/deletes?companyIds='+that.initMultiSelection(),function(res){
            if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getCompay();
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
    deleteSimpleRow: function (id) {
      var that = this;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.get(that.$store.state.yip+'logistics/company/deletes?companyIds='+id,function(res){
            if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getCompay();
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
      var intfa = 'add';
      if(that.company.companyId){
        intfa = 'update';
      }
      $.post(this.$store.state.yip+'logistics/company/'+intfa,this.company,function(res){
        if(res.code == 1000){
            var msg = '分类信息添加成功';
            if(that.company.companyId){
              msg = '分类信息修改成功';
            }
            that.$message({
              message: msg,
              type: 'success'
            });
            that.addCompanyDialog = false;
            that.getCompay();
        }else{
          that.$message({
              message: res.result,
              type: 'success'
          });
        }
        that.company = {
              companyName: '',
              companyPhone: '',
              companyAddress:'',
              companyPrincipal:'',
              storeId:that.$store.state.user.storeId,
              storeType:that.$store.state.user.commodityType
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
      this.getCompay();
    },
    handleSizeChange: function(e) {
      this.pageModel.pageSize = e;
      this.getCompay();
    },
    handleCurrentChange: function(e) {
      this.pageModel.pageIndex = e;
      this.getCompay();
    },
    currentPage4: function(e) {
      console.log(e)
    }
  }
}
</script>


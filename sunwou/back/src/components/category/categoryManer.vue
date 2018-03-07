<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>类目管理</span>
      </div>
      <div>
        <span style="color:#888888">此页为一级类目编辑。</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加类目</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="sortNumber" label="序号" width="65">
        </el-table-column>
        <el-table-column prop="categoryOneName" label="类目名称" sortable>
        </el-table-column>
        <el-table-column prop="subName" label="类目子名称" sortable>
        </el-table-column>
        <el-table-column prop="address" label="封面预览">
          <template scope="scope">
            <div style="padding:5px 0"><img v-bind:src="ip+scope.row.imagePath" height="50px"></div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="ICON预览">
          <template scope="scope">
            <div style="padding:5px 0"><img v-bind:src="ip+scope.row.iconPath" height="50px"></div>
          </template>
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.createTime.substring(0,scope.row.createTime.length-2) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template scope="scope">
            <el-button type="text" size="small" @click="redirctToSubCategoryManer(scope.row)">子类目</el-button>
            <el-button type="text" size="small" @click="updateSimpleRow(scope.row,scope.$index)">修改</el-button>
            <el-dropdown style="margin-left:5px;" trigger="click" slot="dropdown" :hide-on-click="false" >
              <el-button type="text" size="small" class="el-dropdown-link">
                更多
              </el-button>
              <el-dropdown-menu  >
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" v-if="scope.$index > 0 && pageModel.pageIndex == 1" @click="makeSort(scope.row.categoryOneId,scope.row.sortNumber,-1)">上移</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" @click="makeSort(scope.row.categoryOneId,scope.row.sortNumber,1)">下移</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" v-if="scope.$index > 1 && pageModel.pageIndex == 1">置顶</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" @click="deleteSimpleRow(scope.row.categoryOneId)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
    <el-dialog title="一级类目" :visible.sync="addCompanyDialog" size="small" :before-close="handleClose">
      <el-form :label-position="'left'" :model="company" :rules="companyRules" ref="company" label-width="0" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>分类名称</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.categoryOneName" placeholder="分类名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>分类子名称</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.subName" placeholder="分类子名称"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>分类封面图片</strong>
            </span>
            <input type="file" id="imagePath" @change="fileUpload('imagePath')">

          </el-col>
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>封面ICON</strong>
            </span>
            <input type="file" id="iconPath" @change="fileUpload('iconPath')" >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addCompanyDialog = false,company={}">取消</el-button>
              <el-button type="primary" @click="submitCompany('company')">确认提交</el-button>
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
      ip:this.$store.state.yip,
      fip:this.$store.state.yip + 'file/upload',
      nowSortNumber:1,
      storeId:1,
      company: {
        categoryOneName: '',
        subName: '',
        imagePath:'',
        iconPath:'',
        storeId:1
      },
      companyRules: { },
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
      sortDialogVisible:false,
      addCompanyDialog: false,
      search: '',
      list:[],
      multipleSelection: []
    }
  },
  mounted: function () {
    this.getCategory();
  },
  methods: {
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
    fileUpload(name){
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
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    //获取类目
    getCategory:function () {
      var that = this;
      $.post(this.$store.state.yip+'commodity/category/getOnes',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        storeId:this.$store.state.user.storeId,
        searchString:this.search
      },function(res){
        that.pageModel = res.body.pageModel;
        that.list = res.body.modelData
      })
    },
    //跳转到子类目管理界面
    redirctToSubCategoryManer: function (row) {
      this.$router.push({name: 'subCategoryManer', params: {row: row}});
    },
    closeSortDialogVisible: function () {
      this.sortDialogVisible = false;
    },
    //修改一行
    updateSimpleRow: function (row,index){
      this.company = row;
      this.addCompanyDialog = true;
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
      var that = this;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.get(that.$store.state.yip+'commodity/category/deleteOnes?categoryOneIds='+id,function(res){
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
      this.pageModel.pageSize = e;
      this.getCategory();
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


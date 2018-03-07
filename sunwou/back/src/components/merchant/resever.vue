<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span><span style="cursor:pointer" @click="goback">活动管理</span> </span>
      </div>
      <div>
        <span style="color:#888888"></span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" sortable>
        </el-table-column>
        <el-table-column prop="goods.commodityName" label="商品名称">
        </el-table-column>
        <el-table-column prop="goods.commodityPrice" label="商品价格">
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.time }}</template>
        </el-table-column>

      </el-table>

      <div class="clearfix"></div>
    </div>

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
        categoryTwoType:2,
        categoryTwoName: '',
        subName: '',
        imagePath:'',
        iconPath:'',
        categoryOneId:null
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
    this.company.categoryOneId = this.$store.state.user.storeId;
    this.getCategory();
  },
  methods: {
    goback: function () {
      this.$router.go(-1)
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
      $.ajax({
        url:this.$store.state.yip+'/userinfoshop/wx/myresever',
        data:{
          shopId:this.$store.state.user.storeId,
        },
        dataType:'JSON',
        method:'POST',
        success:function(res){
          for(var item in res.body){
            res.body[item].goods = JSON.parse(res.body[item].goods);
          }

          that.list = res.body;
        }
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
      var list = [];
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].categoryTwoId);
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
          $.get(that.$store.state.yip+'commodity/category/deleteTwos?categoryTwoIds='+that.initMultiSelection(),function(res){
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
          $.get(that.$store.state.yip+'commodity/category/deleteTwos?categoryTwoIds='+id,function(res){
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
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    //添加/修改公司信息
    submitCompany: function (e) {
      var that = this;
      var intfa = 'addTwo';
      if(that.company.categoryTwoId){
        intfa = 'updateTwo';
      }
      $.post(this.$store.state.yip+'commodity/category/'+intfa,this.company,function(res){
        if(res.code == 1000){
            var msg = '分类信息添加成功';
            if(that.company.categoryTwoId){
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
            categoryTwoType:2,
            categoryTwoName: '',
            subName: '',
            imagePath:'',
            iconPath:'',
            categoryOneId:that.$store.state.user.storeId
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


<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>门店审核</span>
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
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="shopname" label="店铺名称" width="65">
        </el-table-column>
        <el-table-column prop="barcodeUrl" label="店铺二维码">
          <template scope="scope">
            <img v-bind:src="ip+scope.row.barcodeUrl" width:50px>
          </template>
        </el-table-column>
        <el-table-column prop="realname" label="姓名" sortable>
        </el-table-column>
        <el-table-column prop="serverPhone" label="电话">
        </el-table-column>
        <el-table-column prop="serverCity" label="区域">
        </el-table-column>
        <el-table-column prop="serverAddress2" label="详细地址">
        </el-table-column>
        <el-table-column  prop="createtime" sortable label="创建时间" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template scope="scope">
            <el-button type="text" size="small" @click="examinePass(scope.row.userInfoId,3)">通过</el-button>
            <el-button type="text" size="small" @click="sortDialogVisible = true,id=scope.row.userInfoId,types = 4">不通过</el-button>
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

    <el-dialog title="不通过理由" :visible.sync="sortDialogVisible" size="tiny" :before-close="closeSortDialogVisible">
      <span>填写理由 ： </span>
      <el-input v-model="content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sortDialogVisible = false,examinePass(id,types,content)">保 存</el-button>
      </span>
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
      content:'',
      id:'',
      types:0,
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
      shopTypeValue:[{label:'普通美妆师',value:2},{label:'达咖美妆师',value:4}],
      shopType:2,
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
    this.getShopList();
  },
  methods: {
    submitLun(){
      var that = this;
      $.post(this.$store.state.yip+'carousel/info/add',{
        carouselType:2,
        carouselPath:'/pages/mall/productMain/productMain?id='+this.id,
        imagePath:this.activity.lunpath,
        shopId:1,
        commodityId:this.id
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
      this.getShopList();
    },
    //排序
    makeSort:function (id,sortNumber,num) {
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
    getShopList:function () {
      var that = this;
      $.ajax({
        url:this.$store.state.tip+'userinfoshop/findbytype',
        method:'POST',
        dataType:'JSON',
        data:{type:this.shopType},
        success: function(res){
          that.list = res.body
        }
      })
    },
    examinePass: function (id,types,content) {
      var that = this;
      var data = {
        userInfoId:id,
        type:types
      }
      if(typeof content != "undefind"){
        data.content = content
      }
      $.ajax({
        url:this.$store.state.tip+'userinfoshop/exam',
        method:'POST',
        dataType:'JSON',
        data:data,
        success: function(res){
          if(res.code == 1000){
            that.$message({
                type: 'success',
                message: res.result
              });
            that.getShopList();
          }else{
            that.$message({
                type: 'error',
                message: res.result
              });
          }
        }
      })
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

<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span style="cursor:pointer" @click="goBack()">平台商品信息</span> <span>/ {{title}}</span>
      </div>
      <div>
        <span style="color:#888888">此页为一级类目编辑。</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加规格</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="sortNumber" label="序号" width="65">
        </el-table-column>
        <el-table-column prop="specificationName" label="规格名称" sortable>
        </el-table-column>
        <el-table-column prop="specificationPrice" label="价格" sortable>
        </el-table-column>
        <el-table-column prop="artistPrice" label="美妆师价格" sortable>
        </el-table-column>
        <el-table-column prop="activityPrice" label="活动价格" sortable>
        </el-table-column>
        <el-table-column label="图片">
          <template scope="scope">
            <div style="padding:5px 0"><img v-bind:src="ip+scope.row.imagePath" height="50px"></div>
          </template>
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.createTime.substring(0,scope.row.createTime.length-2) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template scope="scope">
            <el-button type="text" size="small" @click="updateSimpleRow(scope.row,scope.$index)">修改</el-button>
            <el-button type="text" size="small" @click="deleteSimpleRow(scope.row.specificationId)">删除</el-button>
            <!-- <el-dropdown style="margin-left:5px;" trigger="click" slot="dropdown" :hide-on-click="false" >
              <el-button type="text" size="small" class="el-dropdown-link">
                更多
              </el-button>
              <el-dropdown-menu  >
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" v-if="scope.$index > 0 && pageModel.pageIndex == 1" @click="makeSort(scope.row.specificationId,scope.row.sortNumber,-1)">上移</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" @click="makeSort(scope.row.specificationId,scope.row.sortNumber,1)">下移</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" v-if="scope.$index > 1 && pageModel.pageIndex == 1">置顶</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:100%;" type="text" size="small" @click="deleteSimpleRow(scope.row.specificationId)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
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
    <el-dialog title="规格信息" :visible.sync="addCompanyDialog" size="small" :before-close="handleClose">
      <el-form :label-position="'left'" :model="company" :rules="companyRules" ref="company" label-width="0" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>规格名称</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.specificationName" placeholder="规格名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>价格</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.specificationPrice" type="number" placeholder="价格"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>活动价格</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.activityPrice" type="number" placeholder="规格名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>美妆师价格</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.artistPrice" type="number" placeholder="价格"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>图片</strong>
            </span>
            <input type="file" id="imagePath" @change="fileUpload('imagePath')">
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
      title:'',
      ip:this.$store.state.yip,
      fip:this.$store.state.yip + 'file/upload',
      nowSortNumber:1,
      storeId:1,
      company: {
        specificationName: '',
        specificationPrice: '',
        imagePath:'',
        commodityId:null,
        activityPrice:'',
        artistPrice:''
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
    this.company.commodityId = this.$route.params.id;
    this.title = this.$route.params.name;
    this.getCategory();
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    //排序
    makeSort:function (id,sortNumber,num) {
      var that = this;
      $.post(this.$store.state.yip+'commodity/specification/sort',{
        categoryOneId:id,
        sortNumber:sortNumber+num
      },function(rda){
        $.post(that.$store.state.yip+'commodity/specification/sort',{
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
      $.post(this.$store.state.yip+'commodity/specification/finds',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        commodityId:this.$route.params.id,
        searchString:this.search
      },function(res){
        that.pageModel = res.body.pageModel;
        that.list = res.body.modelData
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
        list.push(this.multipleSelection[item].specificationId);
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
          $.get(that.$store.state.yip+'commodity/specification/deletes?specificationIds='+that.initMultiSelection(),function(res){
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
          $.get(that.$store.state.yip+'commodity/specification/deletes?specificationIds='+id,function(res){
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
      var intfa = 'add';
      if(that.company.specificationId){
        intfa = 'update';
      }
      $.post(this.$store.state.yip+'commodity/specification/'+intfa,this.company,function(res){
        if(res.code == 1000){
            var msg = '规格添加成功';
            if(that.company.categoryOneId){
              msg = '规格修改成功';
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
              specificationName: '',
              specificationPrice: '',
              imagePath:'',
              commodityId:that.$route.params.id,
              activityPrice:'',
              artistPrice:''
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


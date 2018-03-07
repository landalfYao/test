<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span><span style="cursor:pointer" @click="goback">轮播图管理</span> </span>
      </div>
      <div>
        <span style="color:#888888">。</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加轮播图</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="跳转页" sortable>
        </el-table-column>
        <el-table-column prop="carouselType" label="轮播图所在页"  :filters="[{ text: '首页', value: 1 }, { text: '个人品牌包装页', value: 2 },{ text: '私人订制页', value: 3 }]" :filter-method="filterSale"
          filter-placement="bottom-end">
          <template scope="scope">
            <span>{{scope.row.carouselType == 1 ? '首页':''}}{{scope.row.carouselType == 2 ? '个人品牌包装页':''}}{{scope.row.carouselType == 3 ? '私人订制页':''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="封面预览">
          <template scope="scope">
            <div style="padding:5px 0"><img v-bind:src="ip+scope.row.imagePath" height="50px"></div>
          </template>
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.createTime.substring(0,scope.row.createTime.length-2) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template scope="scope">
            <el-button style="width:100%;height:100%"  type="text" size="small" @click="deleteSimpleRow(scope.row.carouselId)">删除</el-button>
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
  <el-dialog title="轮播图" :visible.sync="addCompanyDialog" size="small" :before-close="handleClose">
      <el-form :label-position="'left'" :model="company" :rules="companyRules" ref="company" label-width="0" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>轮播图所在页面</strong>
            </span>
            <el-form-item>
              <el-select v-model="select1" placeholder="轮播图所在页面"  @change="categoryTwoChange">
                <el-option v-for="item in lunSel" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>跳转页面</strong>
            </span>
            <el-form-item>
              <el-select v-model="select2" placeholder="跳转页面"  @change="categoryTwoChange">
                <el-option v-for="item in lunNav" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>轮播图图片</strong>
            </span>
            <input type="file" id="imagePath" @change="fileUpload('imagePath')">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addCompanyDialog = false,company={}">取消</el-button>
              <el-button type="primary" @click="addCompanyDialog = false,submitLun()">确认提交</el-button>
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
      lunSel:[{label:'个人品牌包装页',value:2},{label:'私人订制页',value:3}],
      select1:2,
      lunNav:[{label:'线下品牌店列表',value:'/pages/belowLineShop/belowLineShop'},
        {label:'优惠活动列表',value:'/pages/discountActive/discountActive'},
        {label:'私人订制模块',value:'/pages/personalTailor/personalTailor'},
        {label:'热搜美妆名师页',value:'/pages/MZteacher/MZteacher'},
        {label:'知名美妆师列表',value:'/pages/MZteacher/teacherList/teacherList?flagDesign=2'},
        {label:'美妆大咖列表',value:'/pages/MZteacher/teacherList/teacherList?flagDesign=4'}],
      select2:'/pages/belowLineShop/belowLineShop',
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
    submitLun(){
      var that = this;
      $.post(this.$store.state.yip+'carousel/info/add',{
        carouselType:this.select1,
        carouselPath:this.select2,
        imagePath:this.company.imagePath,
        shopId:1,
      },function(res){
        if(res.code == 1000){
          that.$message({
              type: 'success',
              message: '添加成功'
            });
            that.getCategory();
        }else{
          that.$message({
              type: 'error',
              message: '添加失败'
            });
        }
      })
    },
    goback: function () {
      this.$router.go(-1)
    },
    filterSale(value, row) {
        return row.carouselType === value;
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
      $.post(this.$store.state.yip+'carousel/info/finds',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        shopId:this.$store.state.user.storeId,
        searchString:this.search,
      },function(res){
        for(var item in res.body.modelData){

          if(res.body.modelData[item].carouselPath.indexOf('MZteacher') != -1){
            res.body.modelData[item].name = '美妆师列表页链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('teachmain') != -1){
            res.body.modelData[item].name = '美妆师链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('belowLineShop') != -1){
            res.body.modelData[item].name = '线下品牌店列表页链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('belowLineShopMain') != -1){
            res.body.modelData[item].name = '线下品牌店链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('productMain') != -1){
            res.body.modelData[item].name = '商品链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('discountActive') != -1){
            res.body.modelData[item].name = '优惠活动页链接'
          }

          if(res.body.modelData[item].carouselPath.indexOf('personalTailor') != -1){
            res.body.modelData[item].name = '私人订制页链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('teacherList?flagDesign=2') != -1){
            res.body.modelData[item].name = '知名美妆师页链接'
          }
          if(res.body.modelData[item].carouselPath.indexOf('teacherList?flagDesign=4') != -1){
            res.body.modelData[item].name = '美妆大咖页链接'
          }
        }
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
      var list = [];
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].carouselId);
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
          $.get(that.$store.state.yip+'carousel/info/deletes?carouselIds='+that.initMultiSelection(),function(res){
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
          $.get(that.$store.state.yip+'carousel/info/deletes?carouselIds='+id,function(res){
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


<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>平台商品信息</span>
      </div>
      <div>
        <span style="color:#888888">请根据真是情况填写</span>
      </div>

      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button :plain="true" type="primary" @click="setMulSales(1)">批量上线</el-button>
        <el-button :plain="true" type="primary" @click="setMulSales(0)">批量下线</el-button>
        <el-button :plain="true" type="primary" @click="setMulCounts(1)">批量开启折扣</el-button>
        <el-button :plain="true" type="primary" @click="setMulCounts(0)">批量关闭折扣</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>

      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @expand="doExpand" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="主图" width="65">
          <template scope="scope">
            <img v-bind:src="ip+scope.row.imagePath" height="35px">
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称">
        </el-table-column>
        <el-table-column  label="初始单价">
          <template scope="scope">
            <span>{{scope.row.commodityPrice}} 元</span>
          </template>
        </el-table-column>
        <el-table-column  label="折扣">
          <template scope="scope">
            <span>{{scope.row.commodityDiscount}} 折</span>
          </template>
        </el-table-column>
        <el-table-column prop="isDiscount" label="折扣状态"  :filters="[{ text: '开启', value: 1 }, { text: '关闭', value: 0 }]" :filter-method="filterDiscount"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.isDiscount === 1 ? 'success' : 'danger'" close-transition>{{scope.row.isDiscount == 1 ? '开启':'关闭'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isActivity" label="活动价状态"  :filters="[{ text: '开启', value: 1 }, { text: '关闭', value: 0 }]" :filter-method="filterDiscount"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.isActivity === 1 ? 'success' : 'danger'" close-transition>{{scope.row.isActivity == 1 ? '开启':'关闭'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isSales" label="在售状态"  :filters="[{ text: '上线', value: 1 }, { text: '下线', value: 0 }]" :filter-method="filterSale"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.isSales === 1 ? 'success' : 'danger'" close-transition>{{scope.row.isSales == 1 ? '上线':'下线'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.createTime.substring(0,scope.row.createTime.length-2) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="updateSimpleRow(scope.row.commodityId)">修改</el-button>
            <el-dropdown style="margin-left:5px">
              <el-button type="text" size="small" class="el-dropdown-link">
                更多
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" v-if="scope.row.isSales == 1" @click="setSales(scope.row.commodityId,0)">下线</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" v-if="scope.row.isSales == 0" @click="setSales(scope.row.commodityId,1)">上线</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" v-if="scope.row.isDiscount == 1" @click="setCounts(scope.row.commodityId,0)">关闭折扣</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" v-if="scope.row.isDiscount == 0" @click="setCounts(scope.row.commodityId,1)">开启折扣</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" v-if="scope.row.isActivity == 0 && scope.row.commodityType==1"  @click="setActivity(scope.row.commodityId)">添加到活动版块</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" @click="setCasousal(scope.row.commodityId,scope.row.commodityName)">广告图编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" @click="setSpecification(scope.row.commodityId,scope.row.commodityName)">规格编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="height:100%;width:100%" type="text" size="small" @click="deleteSimpleRow(scope.row.commodityId)">删除</el-button>
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
    <el-dialog title="添加到活动版块" :visible.sync="addDialog" size="tiny" :before-close="handleClose">
      <el-form :label-position="'left'"  ref="company" label-width="100" class="demo-ruleForm">
        <el-form-item label="活动名称">
          <el-input v-model="activity.activityName"></el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="activity.activityContent"></el-input>
        </el-form-item>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-checkbox label="开启折扣" name="type" v-model="isActivity"></el-checkbox>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>图片</strong>
            </span>
            <input type="file" id="filesd" @change="fileUpload('filesd')" >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addDialog = false,company={}">取消</el-button>
              <el-button type="primary" @click="addDialog = false,submitAct()">确认提交</el-button>
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

.el-upload--picture {
  overflow: hidden;
  width: 88px;
  height: 36px;
}
</style>

<script>
export default {
  data() {
    return {
      activity:{
        activityName:'',
        activityContent:'',
        isActivity:null,
        commodityId:null,
        imagePath:''
      },
      isActivity:true,
      addDialog:false,
      select1: '',
      select2: '',
      ip:this.$store.state.yip,
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },

      categoryOne: [],
      categoryTwo: [],
      pageSlist:[10,20,50,100],
      categoryTwoId:null,
      search: '',
      list:[],
      multipleSelection: []
    }
  },
  mounted: function (){
    this.getShopList();
    this.getCategoryOne();
  },
  methods: {
    delActivity(){
      var that = this;
      $.get(this.$store.state.yip+'activity/info/deletes?isSales='+num+'&commodityIds='+id,function(res){
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
      })
    },
    submitAct(){
      var that = this;
      if(this.isActivity){
        this.activity.isActivity = 1;
      }else{
        this.activity.isActivity = 0;
      }
      $.post(this.$store.state.yip+'activity/info/add',this.activity,function(res){
        if(res.code == 1000){
          that.$message({
              type: 'success',
              message: '添加成功'
            });
          that.getShopList();
        }else{
          that.$message({
              type: 'error',
              message: '添加失败'
            });
        }
      })
    },
    fileUpload: function(id) {
      var that = this;
      var formData = new FormData();
      formData.append('file', $("#" + id)[0].files[0]);
      formData.append('type', 1);
      $.ajax({
        type: 'POST',
        url: this.$store.state.yip + 'file/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.code == 1000) {

            that.activity.imagePath = res.result;

            that.$message({
              type: 'success',
              message: '上传成功'
            });
          } else {
            that.$message({
              type: 'error',
              message: res.result
            });
          }
        }
      });
    },
    //关闭添加公司信息 模态框
    handleClose: function() {
      this.company = {};
      this.addCompanyDialog = false
    },
    setActivity: function (id) {
      this.activity.commodityId = id;
      this.addDialog = true;
    },
    //添加轮播图
    setCasousal: function (id,name) {
      this.$router.push({name:'carsousal',params:{id:id,name:name}})
    },
    setSpecification: function (id,name) {
      this.$router.push({name:'specification',params:{id:id,name:name}})
    },
    doExpand(row, expanded){
      console.log(row, expanded)
    },
    categoryTwoChange(val) {
      this.categoryTwoId = val;
      this.getShopList();
    },
    categoryOneChange(val) {
      if(val == null){
        this.categoryTwo = [];
        this.categoryTwoId = null;
        this.getShopList();
      }else{
        var that = this;
        $.post(this.$store.state.yip + 'commodity/category/getTwos', {
          pageIndex: 1,
          pageSize: 100,
          storeId: this.$store.state.user.storeId,
          searchString: '',
          categoryOneId: val,
          type: 1,
          categoryTwoType :that.$store.state.user.commodityType
        }, function(res) {
          that.categoryTwo = [];
          that.categoryTwo.push({categoryTwoId:null,categoryTwoName:'全部'});
          for(var item in res.body.modelData){
              that.categoryTwo.push(res.body.modelData[item]);
          }
        })
      }
    },
    getCategoryOne: function() {
      var that = this;
      $.post(this.$store.state.yip + 'commodity/category/getOnes', {
        pageIndex: 1,
        pageSize: 100,
        storeId: this.$store.state.user.storeId,
        searchString: ''
      }, function(res) {
        that.categoryOne = [];
        that.categoryOne.push({categoryOneId:null,categoryOneName:'全部'});
        for(var item in res.body.modelData){
            that.categoryOne.push(res.body.modelData[item]);
        }
      })
    },
    filterSale(value, row) {
        return row.isSales === value;
    },
    filterDiscount(value, row) {
        return row.isDiscount === value;
    },
    closeSortDialogVisible: function () {
      this.sortDialogVisible = false;
    },
    //获取商品
    getShopList: function () {
      var that = this;
      $.post(this.$store.state.yip+'commodity/info/finds',{
        pageIndex: this.pageModel.pageIndex,
        pageSize:  this.pageModel.pageSize,
        storeId: this.$store.state.user.storeId,
        categoryTwoId: 0,
        searchString: this.search,
        commodityType :that.$store.state.user.commodityType
      },function(res){
        that.pageModel = res.body.pageModel;
        that.list = res.body.modelData;
      })
    },
    //移除上传的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览上传的图片
    handlePreview(file) {
      console.log(this.company.logo);

    },
    initMultiSelection: function () {
      var list = []
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].commodityId);
      }
      return list;
    },
    //修改一行
    updateSimpleRow: function(id) {
      this.$router.push({name:'personalUpdate',params:{id:id}})
    },
    //设置单个上下线
    setCounts: function (id,num) {
      var that = this;
      $.get(this.$store.state.yip+'commodity/info/discounts?isDiscount='+num+'&commodityIds='+id,function(res){
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
      })
    },
    //批量设置上下线
    setMulCounts: function (num) {
      var that = this;
      this.$confirm('此操作将批量设置折扣状态信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.get(this.$store.state.yip+'commodity/info/discounts?isDiscount='+num+'&commodityIds='+that.initMultiSelection(),function(res){
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
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //设置单个上下线
    setSales: function (id,num) {
      var that = this;
      $.get(this.$store.state.yip+'commodity/info/sales?isSales='+num+'&commodityIds='+id,function(res){
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
      })
    },
    //批量设置上下线
    setMulSales: function (num) {
      var that = this;
      this.$confirm('此操作将批量设置上下线该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.get(this.$store.state.yip+'commodity/info/sales?isSales='+num+'&commodityIds='+that.initMultiSelection(),function(res){
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
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //批量删除
    multiDelete: function() {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.get(this.$store.state.yip+'commodity/info/deletes?commodityIds='+that.initMultiSelection(),function(res){
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
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //删除一行
    deleteSimpleRow: function(id) {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.get(this.$store.state.yip+'commodity/info/deletes?commodityIds='+id,function(res){
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
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    searchInput: function(e) {
      this.search = e;
      this.getShopList();
    },
    handleSizeChange: function(e) {
      this.pageModel.pageSize = e;
      this.getShopList();
    },
    handleCurrentChange: function(e) {
      this.pageModel.pageIndex = e;
      this.getShopList();
    },
    currentPage4: function(e) {
      console.log(e)
    }
  }
}
</script>


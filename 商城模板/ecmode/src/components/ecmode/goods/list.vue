<template>
<transition name="el-zoom-in-bottom">
  <div class="panel">
    <div style="padding:30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ec_overview' }" class="font-md">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="font-lg">商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="font-md color-def" style="margin-top:10px">平台商城商品列表</div>
      <hr style="border:2px solid #CCCCCC;margin-top:20px">
      <!-- 操作按钮 start -->
      <div style="margin-top:20px">
        <el-button-group class="pull-left">
          <el-button type="danger" icon="el-icon-delete" @click="multiDelete()" plain>批量删除</el-button>
          <el-button :plain="true" type="primary" @click="setMulSales(1)">批量上线</el-button>
          <el-button :plain="true" type="primary" @click="setMulSales(0)">批量下线</el-button>
          <el-button :plain="true" type="primary" @click="setMulCounts(1)">批量开启折扣</el-button>
          <el-button :plain="true" type="primary" @click="setMulCounts(0)">批量关闭折扣</el-button>
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
        <el-table-column label="主图" width="65">
          <template slot-scope="scope">
            <img v-bind:src="ip+scope.row.imagePath" height="35px">
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称">
        </el-table-column>
        <el-table-column  label="初始单价">
          <template slot-scope="scope">
            <span>{{scope.row.commodityPrice}} 元</span>
          </template>
        </el-table-column>
        <el-table-column  label="折扣">
          <template slot-scope="scope">
            <span>{{scope.row.commodityDiscount*10}} 折</span>
          </template>
        </el-table-column>
        <el-table-column prop="isDiscount" label="折扣状态"  :filters="[{ text: '开启', value: 1 }, { text: '关闭', value: 0 }]" :filter-method="filterDiscount"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDiscount === 1 ? 'success' : 'danger'" close-transition>{{scope.row.isDiscount == 1 ? '开启':'关闭'}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="isActivity" label="活动价状态"  :filters="[{ text: '开启', value: 1 }, { text: '关闭', value: 0 }]" :filter-method="filterDiscount"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isActivity === 1 ? 'success' : 'danger'" close-transition>{{scope.row.isActivity == 1 ? '开启':'关闭'}}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="isSales" label="在售状态"  :filters="[{ text: '上线', value: 1 }, { text: '下线', value: 0 }]" :filter-method="filterSale"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isSales === 1 ? 'success' : 'danger'" close-transition>{{scope.row.isSales == 1 ? '上线':'下线'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="编辑" width="120">
          <template slot-scope="scope">
          <el-button-group >
              <el-button  type="default" size="small" @click="setCasousal(scope.row.commodityId,scope.row.commodityName)">轮播图编辑</el-button>
              <el-button  type="default" size="small" @click="setSpecification(scope.row.commodityId,scope.row.commodityName)">规格编辑</el-button>
              <el-button  type="default" size="small" @click="addCarousel(scope.row.commodityId)">添加到广告图</el-button>
              <el-button type="info" size="small" @click="updateSimpleRow(scope.row.commodityId)">修改</el-button>
          </el-button-group>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group >
              <el-button  type="default" size="small" v-if="scope.row.isSales == 1" @click="setSales(scope.row.commodityId,0)">下线</el-button>
              <el-button  type="default" size="small" v-if="scope.row.isSales == 0" @click="setSales(scope.row.commodityId,1)">上线</el-button>
              <el-button  type="default" size="small" v-if="scope.row.isDiscount == 1" @click="setCounts(scope.row.commodityId,0)">关闭折扣</el-button>
              <el-button  type="default" size="small" v-if="scope.row.isDiscount == 0" @click="setCounts(scope.row.commodityId,1)">开启折扣</el-button>

              <el-button size="small" type="danger" @click="deleteSimpleRow(scope.row.commodityId)" >删除</el-button>
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
    <el-dialog title="广告图信息" :visible.sync="dialogVisible" >
      <el-form :model="addData">

        <el-form-item label="广告图上传" :label-width="formLabelWidth">
          <el-upload class="upload-demo" :data="{type:1,label:'imagePath'}" :multiple="false" drag action="http://10.151.11.161:8080/elMall/file/upload" :http-request="fileUpload" :before-upload="beforeAvatarUpload">
            <i v-if="addData.imagePath == ''" class="el-icon-upload"></i>
            <img v-if="addData.imagePath != ''" v-bind:src="ip+addData.imagePath" width="100%">
            <div v-if="addData.imagePath == ''" class="el-upload__text">将文件拖到此处，或<em>点击上传</em>，限制大小300kb</div>
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
      formLabelWidth:'120px',
      subLoading:false,
      storeId:1,
      ip:'',
      search: '',
      dialogVisible:false,
      multipleSelection:[],
      addData:{
        carouselPath: '/pages/goods/goods?id=',
        carouselType: 1,
        imagePath:'',
        commodityId:null,
        storeId:null
      },
      list:[],
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
      commodityType:1
    }
  },
  mounted () {
    this.ip = this.$store.state.ip;
    this.storeId = this.$store.state.user.storeId;
    this.addData.storeId = this.$store.state.user.storeId;
    this.commodityType = 1;
    this.getList();
  },
  methods: {
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 300k!');
        }
        return isJPG && isLt2M;
    },
    //添加/修改信息
    submit: function (e) {
      this.subLoading = true;
      var that = this;
      var intfa = 'add';
      if(that.addData.carouselId){
        intfa = 'update';
      }
      $.post(this.$store.state.ip+'carousel/info/'+intfa,this.addData,function(res){
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
              carouselPath: '/pages/goods/goods?id=',
              carouselType: that.$store.state.user.storeId,
              imagePath:'',
              commodityId:null
            };
      })
    },
    addCarousel(id){
      this.dialogVisible = true;
      this.addData.commodityId = id;
      this.addData.carouselPath += id;
    },
    //修改商品
    updateSimpleRow: function(id) {
      this.$router.push({name:'ecGoodsUpdate',params:{id:id}})
    },
    //添加轮播图
    setCasousal: function (id,name) {
      this.$router.push({name:'ecGoodsCasousel',params:{id:id,name:name}})
    },
    //添加规格
    setSpecification: function (id,name) {
      this.$router.push({name:'ecGoodsSpecification',params:{id:id,name:name}})
    },
    filterSale(value, row) {
        return row.isSales === value;
    },
    filterDiscount(value, row) {
        return row.isDiscount === value;
    },
    //搜索
    searchInput(e){
      this.search = e;
      this.getList();
    },
        //设置单个上下线
    setCounts: function (id,num) {
      var that = this;
      $.get(this.$store.state.ip+'commodity/info/discounts?isDiscount='+num+'&commodityIds='+id,function(res){
        if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getList();
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
        $.get(this.$store.state.ip+'commodity/info/discounts?isDiscount='+num+'&commodityIds='+that.initMultiSelection(),function(res){
          if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getList();
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
      $.get(this.$store.state.ip+'commodity/info/sales?isSales='+num+'&commodityIds='+id,function(res){
        if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getList();
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
        $.get(this.$store.state.ip+'commodity/info/sales?isSales='+num+'&commodityIds='+that.initMultiSelection(),function(res){
          if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getList();
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
        $.get(this.$store.state.ip+'commodity/info/deletes?commodityIds='+that.initMultiSelection(),function(res){
          if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getList();
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
        $.get(this.$store.state.ip+'commodity/info/deletes?commodityIds='+id,function(res){
          if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getList();
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
        list.push(this.multipleSelection[item].categoryOneId);
      }
      return list;
    },

    //获取列表
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'commodity/info/finds',{
        pageIndex: this.pageModel.pageIndex,
        pageSize:  this.pageModel.pageSize,
        storeId: this.$store.state.user.storeId,
        categoryTwoId: this.categoryTwoId,
        searchString: this.search,
        commodityType :this.commodityType
      },function(res){
        that.pageModel = res.body.pageModel;
        var list = [];
        for(var item in res.body.modelData){
          if(res.body.modelData[item].categoryTwoId != 0){
            list.push(res.body.modelData[item]);
          }
        }
        that.list = list;
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


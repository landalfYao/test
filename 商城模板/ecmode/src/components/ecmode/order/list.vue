<template>
<transition name="el-fade-in-linear">
  <div class="panel">
    <div style="padding:30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ec_overview' }" class="font-md">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="font-lg">订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="font-md color-def" style="margin-top:10px">店铺订单管理</div>
      <hr style="border:2px solid #CCCCCC;margin-top:20px">
      <!-- 操作按钮 start -->
      <div style="margin-top:20px">
        <el-button-group class="pull-left">
          <!-- <el-button type="danger" icon="el-icon-delete" @click="multiDelete()" plain>批量删除</el-button> -->
          <!-- <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true,payManual.type = 2" plain>批量标记为已付款</el-button> -->
        </el-button-group>
        <el-input style="width:250px" class="pull-right" @input="searchInput" placeholder="输入完整订单号" v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="clearfix"></div>
      </div>
      <!-- 操作按钮 end -->


      <!-- 表格 start -->
      <el-table  ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <table class="ist">
              <thead><tr><th>商品图片</th><th>商品名称</th><th>规格</th><th>数量</th><th>合计价格</th></tr></thead>
              <tbody>
                <tr v-for="item in scope.row.orderItems" v-bind:key="item.itemId">
                  <td><img v-bind:src="ip+item.imagePath" width="50px"></td>
                  <td>{{item.commodityName}}</td>
                  <td>{{item.specificationName}}</td>
                  <td>{{item.itemCount}}</td>
                  <td>{{item.itemPrice}}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </el-table-column>
        <el-table-column prop="orderInfo.orderTag" label="订单编号" sortable> </el-table-column>
        <el-table-column prop="orderInfo.wxAddressInfo.userName" label="收件人" sortable> </el-table-column>
        <el-table-column prop="orderInfo.wxAddressInfo.telNumber" label="联系电话" sortable> </el-table-column>
        <el-table-column prop="orderInfo.addressInfo"  label="收货地址">
        </el-table-column>
        <el-table-column prop="orderInfo.orderRemark"  label="备注信息">
        </el-table-column>
        <el-table-column prop="orderInfo.mailPrice" label="含运费" sortable> </el-table-column>
        <el-table-column prop="orderInfo.payPrice" label="合计支付" sortable> </el-table-column>
        <el-table-column prop="orderInfo.orderType" label="订单状态"  :filters="[{ text: '未付款', value: 1 }, { text: '已付款', value: 2 }, { text: '已发货', value: 3 }, { text: '已完成', value: 4 }]" :filter-method="filterDiscount"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <div>{{scope.row.orderInfo.orderType == 1 ? "未付款":""}}{{scope.row.orderInfo.orderType == 2 ? "已付款":""}}{{scope.row.orderInfo.orderType == 3 ? "已发货":""}}{{scope.row.orderInfo.orderType == 4 ? "已完成":""}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group >
              <el-button size="small" @click="dialogVisible = true,payManual.type = 1,payManual.id = scope.row.orderInfo.orderId"  v-if="scope.row.orderInfo.orderType == 1">标记为已付款</el-button>
              <el-button size="small" @click="sendLogis.orderId=scope.row.orderInfo.orderId,sendLogis.logisticsId = scope.row.orderInfo.logisticsId,visible = true" v-if="scope.row.orderInfo.orderType == 2">发货</el-button>
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

    <el-dialog title="校验密码" :visible.sync="dialogVisible" >
      <el-form :model="addData">
        <el-form-item label="输入密码" :label-width="formLabelWidth">
          <el-input v-model="addData.adminPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,subLoading = false">取 消</el-button>
        <el-button type="primary" :loading="subLoading" @click="payManuals()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="单号" :visible.sync="visible" >
      <el-form :model="sendLogis">
        <el-form-item label="物流单号" :label-width="formLabelWidth">
          <el-input v-model="sendLogis.logisticsTag" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false,subLoading = false">取 消</el-button>
        <el-button type="primary" :loading="subLoading" @click="sendGoods()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</transition>
</template>
<style>
.ist{
  width: 100%;

}
</style>

<script>
export default {
  data(){
    return {
      subLoading:false,
      storeId:1,
      ip:'',
      formLabelWidth: '120px',
      dialogVisible:false,
      visible:false,
      search: '',
      multipleSelection:[],
      sendLogis:{
        orderId:'',
        logisticsId:'',
        logisticsTag:''
      },
      addData:{
        adminPassword: '',
      },
      orderType:0,
      list:[],
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      pageSlist:[10,20,50,100],
      payManual:{
        id:null,
        type:2
      }
    }
  },
  mounted () {
    this.ip = this.$store.state.ip;
    this.storeId = this.$store.state.user.storeId;
    this.addData.storeId = this.$store.state.user.storeId;
    this.getList();
  },
  methods: {
    //发货
    sendGoods(){
      var that = this;
      that.subLoading = true;
      $.post(that.$store.state.ip+'logistics/info/reply',this.sendLogis,function(res){
        that.subLoading = false;
        that.visible = false;
        if(res.code == 1000){
              that.$message({
                type: 'success',
                message: res.result
              });
              that.getList();
              that.sendLogis={
                logisticsId:'',
                logisticsTag:''
              }
            }else{
              that.$message({
                type: 'warning',
                message: res.result
              });
            }
      })
    },
    //标记为已付款
    payManuals(){
      var that = this;
      that.subLoading = true;
      $.post(that.$store.state.ip+'order/info/payManual',{
        orderIds:this.payManual.id,
        adminName:this.$store.state.user.adminName,
        adminPassword:this.addData.adminPassword
      },function(res){
        that.subLoading = false;
        that.dialogVisible = false;
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
    },
    filterDiscount(value, row) {
        return row.orderInfo.orderType === value;
    },
    //跳转到子类目管理界面
    redirctToSubCategoryManer: function (row) {
      this.$router.push({name: 'ecCategorySub', params: {row: row}});
    },
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
          $.get(that.$store.state.ip+'commodity/category/deleteOnes?categoryOneIds='+that.initMultiSelection(),function(res){
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
          $.get(that.$store.state.ip+'commodity/category/deleteOnes?categoryOneIds='+id,function(res){
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
        list.push(this.multipleSelection[item].orderInfo.orderId);
      }
      return list;
    },
    //添加/修改信息
    submit: function (e) {
      this.subLoading = true;
      var that = this;
      var intfa = 'addOne';
      if(that.addData.categoryOneId){
        intfa = 'updateOne';
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
              categoryOneName: '',

              storeId:that.storeId
            };
      })
    },
    //获取列表
    getList(){
      var that = this;
      var data = {
        isDelete:0,
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        storeId:this.storeId,
      }
      if(this.orderType > 0){
        data.orderType = this.orderType;
      }
      if(this.search != ''){
        data.orderTag = this.search;
      }
      $.post(this.$store.state.ip+'order/info/finds',data,function(res){
        for(var i in res.body.modelData){
          if(res.body.modelData[i].orderInfo.wxAddressInfo !=null){
            var address = JSON.parse(res.body.modelData[i].orderInfo.wxAddressInfo);
            res.body.modelData[i].orderInfo.wxAddressInfo = JSON.parse(res.body.modelData[i].orderInfo.wxAddressInfo);
            res.body.modelData[i].orderInfo.addressInfo = address.provinceName + address.cityName+address.countyName+address.detailInfo;
          }
        }
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


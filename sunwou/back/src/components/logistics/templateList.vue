<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>物流模板信息</span>
      </div>
      <div>
        <span style="color:#888888">用户需要根据物流公司获门店内物流价格表填写</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加物流模板</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称" :filters="com" :filter-method="filterDiscount" filter-placement="bottom-end">
          <template scope="scope">
            <span>{{scope.row.companyName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryArea" label="送货地区" >
        </el-table-column>
        <el-table-column prop="freeWeight" label="首重(kg)">
        </el-table-column>
        <el-table-column prop="minPrice" label="首重价格(元)">
        </el-table-column>
        <el-table-column prop="beyondWeight" label="续重(kg)">
        </el-table-column>
        <el-table-column prop="beyondPrice" label="续重价格(元)">
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.createTime.substring(0,scope.row.createTime.length-2) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="deleteSimpleRow(scope.row.modelId)">删除</el-button>
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
    <el-dialog title="物流信息" :visible.sync="addCompanyDialog" size="small" :before-close="handleClose">
      <el-form :label-position="'right'" :model="company"  ref="company" label-width="110px" class="demo-ruleForm">
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="物流公司">
              <el-select v-model="company.companyId" filterable placeholder="请选择">
                <el-option v-for="item in companyList" :key="item.companyId" :label="item.companyName" :value="item.companyId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地区">
              <el-select v-model="company.deliveryArea" filterable placeholder="请选择">
                <el-option v-for="item in area" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首重(kg)">
              <el-input type="number" v-model="company.freeWeight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首重价格(元)">
              <el-input type="number" v-model="company.minPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="续重(kg)">
              <el-input type="number" v-model="company.beyondWeight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="续重价格(元)">
              <el-input type="number" v-model="company.beyondPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item style="float:right">
            <el-button @click="addCompanyDialog = false,company={}">取消</el-button>
            <el-button type="primary" @click="submitCompany('company')">确认提交</el-button>
          </el-form-item>
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
      area: [
        '北京市' ,'天津市', '上海市', '重庆市','黑龙江省', '吉林省', '辽宁省' ,'山东省' ,'山西省' ,'陕西省', '甘肃省' ,'青海省', '四川省', '湖北省', '湖南省' ,'河北省' ,'河南省' ,'安徽省', '江苏省' ,'云南省', '广东省', '福建省' ,'江西省' , '贵州省', '浙江省' ,'台湾省' ,'海南省'
      ],
      com:[],
      companyList: [],
      company: {
        companyId: null,
        deliveryArea: '',
        freeWeight: '',
        minPrice: '',
        beyondWeight: '',
        beyondPrice: '',
         storeId:this.$store.state.user.storeId,
         storeType:this.$store.state.user.commodityType
      },
      pageSlist:[10,20,50,100],
      pageModel:{
        pageIndex:1,
        pageSize:10,
        recordCount:0,
        totalSize:1
      },
      addCompanyDialog: false,
      search: '',
      list: [],
      multipleSelection: []
    }
  },
  mounted:function(){
    this.getCompany();
    this.getCompanyTempale();
  },
  methods: {
    filterDiscount(value, row) {
      return row.companyName == value;
    },
    getCompany(){
      var that = this;
      $.post(this.$store.state.yip+'logistics/company/finds',{
        pageIndex:1,
        pageSize:100,
        storeId:this.$store.state.user.storeId,
        searchString:'',
        storeType:this.$store.state.user.commodityType
      },function(res){
        that.pageModel = res.body.pageModel;
        that.companyList = res.body.modelData;
        for(var item in res.body.modelData){
          that.com.push({text:res.body.modelData[item].companyName,value:res.body.modelData[item].companyName})
        }
      })
    },
    getCompanyTempale(){
      var that = this;
      $.post(this.$store.state.yip+'logistics/model/finds',{
        pageIndex:this.pageModel.pageIndex,
        pageSize:this.pageModel.pageSize,
        storeId:this.$store.state.user.storeId,
        searchString:this.search,
        companyId:null,
        storeType:this.$store.state.user.commodityType
      },function(res){
        that.pageModel = res.body.pageModel;
        that.list = res.body.modelData
      })
    },
    //修改一行
    updateSimpleRow: function(row, index) {
      this.company = row;
      this.addCompanyDialog = true;
    },
    //批量删除
    multiDelete: function () {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.get(this.$store.state.yip+'logistics/model/deletes?modelIds='+that.initMultiSelection(),function(res){
          if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getCompanyTempale();
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
    initMultiSelection: function () {
      var list = []
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].commodityId);
      }
      return list;
    },
    //删除一行
    deleteSimpleRow: function(id) {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.get(this.$store.state.yip+'logistics/model/deletes?modelIds='+id,function(res){
          if(res.code == 1000){
            that.$message({
              type: 'success',
              message: res.result
            });
            that.getCompanyTempale();
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
    //添加/修改公司信息
    submitCompany: function(e) {
      var that = this;
      var intfa = 'add';
      if(that.company.modelId){
        intfa = 'update';
      }
      $.post(this.$store.state.yip+'logistics/model/'+intfa,this.company,function(res){
        if(res.code == 1000){
            var msg = '分类信息添加成功';
            if(that.company.modelId){
              msg = '分类信息修改成功';
            }
            that.$message({
              message: msg,
              type: 'success'
            });
            that.addCompanyDialog = false;
            that.getCompanyTempale();
        }else{
          that.$message({
              message: res.result,
              type: 'success'
          });
        }
        that.company = {
              companyId: null,
              deliveryArea: '',
              freeWeight: '',
              minPrice: '',
              beyondWeight: '',
              beyondPrice: '',
              storeId:this.$store.state.user.storeId,
              storeType:this.$store.state.user.commodityType
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
      this.getCompanyTempale();
    },
    handleSizeChange: function(e) {
      this.pageModel.pageSize = e;
      this.getCompanyTempale();
    },
    handleCurrentChange: function(e) {
      this.pageModel.pageIndex = e;
      this.getCompanyTempale();
    },
    currentPage4: function(e) {
      console.log(e)
    }
  }
}
</script>


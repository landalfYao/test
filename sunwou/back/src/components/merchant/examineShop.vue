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
        <el-table-column prop="grade" label="评分" width="65">
        </el-table-column>
        <el-table-column prop="barcodeUrl" label="店铺二维码">
          <template scope="scope">
            <img v-bind:src="ip+scope.row.barcodeUrl" height="50px">
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
            <el-button v-if="shopType == 2" type="text" size="small" @click="examinePass(scope.row.userInfoId,3)">通过</el-button>
            <el-button v-if="shopType == 2"  type="text" size="small" @click="sortDialogVisible = true,id=scope.row.userInfoId,types = 4">不通过</el-button>
            <el-button v-if="shopType == 3"  type="text" size="small" @click="id = scope.row.userInfoId,grade = scope.row.grade,sortDialog =true">修改评分</el-button>
            <el-button v-if="shopType == 3" style="height:100%;width:100%" type="text" size="small" @click="luntype=2,id = scope.row.id,addDia = true">添加到个人品牌包装页轮播图</el-button>
            <el-button v-if="shopType == 3" style="height:100%;width:100%" type="text" size="small" @click="luntype=3,id = scope.row.id,addDia = true">添加到私人订制页轮播图</el-button>
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

    <el-dialog title="修改评分" :visible.sync="sortDialog" size="tiny" :before-close="closeSortDialogVisible">
      <span>最高评分为5</span>
      <el-input type="number" v-model="grade"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortDialog = false">取 消</el-button>
        <el-button type="primary" @click="sortDialog = false,wee()">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="不通过理由" :visible.sync="sortDialogVisible" size="tiny" :before-close="closeSortDialogVisible">
      <span>填写理由 ： </span>
      <el-input v-model="content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sortDialogVisible = false,examinePass(id,types,content)">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加到轮播图" :visible.sync="addDia" size="small" :before-close="handleClose">
      <el-form :label-position="'left'"  label-width="0" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>图片</strong>
            </span>
            <input type="file" id="lunpath" @change="fileUpload('lunpath')" >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addDia = false">取消</el-button>
              <el-button type="primary" @click="addDia = false,submitLun()">确认提交</el-button>
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
      addDia:false,
      sortDialog:false,
      grade:5,
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
        storeId:1,
        lunpath:''
      },
      luntype:2,
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
      multipleSelection: [],
      shopTypeValue:[{label:'待审核',value:2},{label:'已通过',value:3},{label:'未通过',value:4}],
      shopType:3
    }
  },
  mounted: function () {
    this.getShopList();
  },
  methods: {
    submitLun(){
      var that = this;
      $.post(this.$store.state.yip+'carousel/info/add',{
        carouselType:this.luntype,
        carouselPath:'/pages/belowLineShop/belowLineShopMain/belowLineShopMain?id='+this.id,
        imagePath:this.company.lunpath,
        shopId:1,
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
    wee(){
      var that = this;
      $.ajax({
        url:this.$store.state.tip+'userinfoshop/grade',
        method:'POST',
        dataType:'JSON',
        data:{id:this.id,grade:this.grade},
        success: function(res){
          if(res.code == 1000){
            that.$message({
                type: 'success',
                message: res.result
              });
            that.getShopList()
          }else{
            that.$message({
                type: 'error',
                message: res.result
              });
          }
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

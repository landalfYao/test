<template>
<transition name="el-fade-in-linear">
  <div>
    <div class="card pd-20 pd-sm-40">
          <h6 class="card-body-title">商品列表</h6>
          <p class="mg-b-20 mg-sm-b-30">Using the most basic table markup.</p>

          <!-- ####### 按钮 搜索 start####### -->
          <div style="display:flex;justify-content:space-between;width:100%;padding-bottom:20px">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-danger pd-x-25" @click="doDelete()">批量下架</button>
            </div>
            <div class="input-group" style="max-width:220px">
              <span class="input-group-addon"><i class="icon ion-search tx-16 lh-0 op-6"></i></span>
              <input type="text" class="form-control" placeholder="Search..." id="searchInput" @input="doSearch()">
            </div>
          </div>
          <!-- ####### 按钮 搜索 end####### -->
          <div class="table-responsive">
            <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="categoryId" label="所属分类" :filters="category" :filter-method="filterCategory" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <span v-for="item in category" :key="item.value" v-if="item.value == scope.row.categoryId">{{item.text}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="商品名称"> </el-table-column>
              <el-table-column prop="remark.des" label="描述"> </el-table-column>
              <el-table-column label="商品主图" >
                <template slot-scope="scope">
                  <img :src="scope.row.image[0]" width="50px">
                </template>
              </el-table-column>
              <el-table-column label="折扣">
                <template slot-scope="scope">
                  {{scope.row.discount < 1 ? (scope.row.discount*10)+'折':'不打折'}}
                </template>
              </el-table-column>
              <el-table-column prop="sales" label="虚拟销量"> </el-table-column>
              <el-table-column prop="showPrice" label="价格"></el-table-column>
              <el-table-column prop="remark.shopName" label="店铺名称"> </el-table-column>
              <el-table-column prop="remark.shopTel" label="店铺电话"> </el-table-column>
              <el-table-column prop="remark.isDelete" label="在售状态" :filters="[{ text: '下架', value: true }, { text: '上架', value: false }]"
      :filter-method="filterTagOnline" filter-placement="bottom-end"> 
                <template slot-scope="scope" >
                   <el-tag :type="scope.row.isDelete ? 'danger' : 'success'" close-transition>{{scope.row.isDelete ? '下架':'上架'}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="showFlag" label="首页推荐" :filters="[{ text: '推荐', value: true }, { text: '不推荐', value: false }]"
      :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope" >
                   <el-tag :type="scope.row.showFlag ? 'success' : 'danger'" close-transition>{{scope.row.showFlag ? '推荐':'不推荐'}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-dropdown size="small"  type="primary" trigger="click">
                    <el-button type="primary" size="mini">
                      编辑<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><el-button type="text" style="width:100px" @click="gotoUpdate(scope.row.sunwouId)">查看修改</el-button></el-dropdown-item>
                      <el-dropdown-item><el-button type="text" style="width:100px" @click="addToNome(scope.row.sunwouId,scope.row.showFlag)">{{scope.row.showFlag ? '从首页移除':'推荐到首页'}}</el-button></el-dropdown-item>
                      <el-dropdown-item><el-button type="text" style="width:100px" @click="sortToTop(scope.row.sunwouId)">置顶</el-button></el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.isDelete"><el-button type="text" style="width:100px;color:red" @click="delStr = scope.row.sunwouId,doUpon()">上架</el-button></el-dropdown-item>
                      <el-dropdown-item v-if="!scope.row.isDelete"><el-button type="text" style="width:100px;color:red" @click="delStr = scope.row.sunwouId,doDelete()">下架</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="float:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageModel.page" :page-sizes="[10, 20, 50, 100]" :page-size="pageModel.size"
              layout="total, sizes, prev, pager, next, jumper" :total="pageModel.total">
            </el-pagination>
            <div style="clear:both"></div>
          </div>
        </div><!-- card -->
  </div>
</transition>
</template>
<script>
export default {
  data () {
    return {
      category:[

      ],
      pageModel:{
        page:1,
        size:10,
        total:0
      },
      search:'',
      list:[],
      multipleSelection: [],
      delStr:''
    }
  },
  mounted(){

    this.getCate();
  },
  methods: {
    getCate(){
      var that = this;
      $.ajax({
          type: "POST",
          url: that.$store.state.ip + "categoryfind",
          data: {
            appid:this.$store.state.appid
          },
          dataType:'JSON',
          success: function(res) {
            if (res.code == 1000) {
              for(var j in res.body){
                if(j<3){
                  that.category.push({text:'自营-'+res.body[j].name,value: parseInt(j)+1})
                }else{
                  that.category.push({text:'非自营-'+res.body[j].name,value: parseInt(j)+1})
                }

              }
              console.log(that.category)
            }
            that.getList();
          }
        });
    },
    filterTagOnline(value, row){
      return row.isDelete == value;
    },
    filterTag(value, row) {
        return row.showFlag == value;
      },
    doUpon(){
      var that = this;
      $.ajax({
        type: "POST",
          url: that.$store.state.ip + "commodityupdate",
          data: {
            sunwouId:id,
            isDelete:false,
          },
          dataType:'JSON',
          success: function(res) {
            if(res.code == 1000){
               that.$message({
                type: "success",
                message: 'ok'
               });
               that.getList();
            }
          }
      })
    },
    addToNome(id,fa){
      var that = this;
      $.ajax({
        type: "POST",
          url: that.$store.state.ip + "commodityupdate",
          data: {
            sunwouId:id,
            showFlag:!fa,
          },
          dataType:'JSON',
          success: function(res) {
            if(res.code == 1000){
               that.$message({
                type: "success",
                message: 'ok'
               });
               that.getList();
            }
          }
      })
    },
    handleSizeChange(val) {
        this.pageModel.size = val;
        this.getList();
    },
    handleCurrentChange(val) {
        this.pageModel.page = val;
        this.getList();
    },
    doSearch(){
      console.log($("#searchInput").val())
      this.search = $("#searchInput").val();
      this.getList()
    },
    gotoUpdate(id){
      this.$store.state.goodsParam.id = id;
      this.$router.push({path:'/goods_update'});
    },
    //置顶
    sortToTop(id){
      var that = this;
      $.ajax({
        type: "POST",
        url: that.$store.state.ip + "commoditysort",
        dataType:'JSON',
        data:{commodityId:id,type:1},
        success(res){
          if(res.code==1000){
                that.getList();
                that.$message({
                  type: 'success',
                  message: res.result
                });
          }else{
            that.$message({
                  type: 'error',
                  message: res.result
                });
          }
        }
      })
    },
    doDelete(){
      var that = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            type: "POST",
            url: that.$store.state.ip + "commodityremove",
            dataType:'JSON',
            data:{commodityIds:that.delStr},
            success(res){
              if(res.code==1000){
                that.getList();
                that.$message({
                  type: 'success',
                  message: res.result
                });
              }
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });

    },
    filterCategory(value, row) {
      console.log(row.categoryId == value)
        return row.categoryId == value;
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        this.delStr = '';
        for(var i in val){
          this.delStr += val[i].sunwouId;
        }
    },
    getList(){
      var that = this;
      $.ajax({
          type: "POST",
          url: that.$store.state.ip + "findcommodity",
          data: {
            appid:this.$store.state.appid,
            page:this.pageModel.page,
            size:this.pageModel.size,
            name:this.search
          },
          dataType:'JSON',
          success: function(res) {
            if (res.code == 1000) {
              for(var i in res.body){
                var maxPrice = 0;
                var minPrice = 0;
                var showPrice = '';
                for(var j in res.body[i].attribute){
                  minPrice = res.body[i].attribute[0].price;
                  if(res.body[i].attribute[j].price > maxPrice){
                    maxPrice = res.body[i].attribute[j].price;
                  }
                  if(res.body[i].attribute[j].price < minPrice){
                    minPrice = res.body[i].attribute[j].price;
                  }
                }
                if(maxPrice == minPrice){
                  showPrice = maxPrice;
                }else{
                  showPrice = minPrice+'~'+maxPrice;
                }
                res.body[i].showPrice = showPrice;
                res.body[i].remark = JSON.parse(res.body[i].remark);

                  res.body[i].image = JSON.parse(res.body[i].image);


              }
              that.pageModel.total = res.total;
              that.list = res.body;
            }
          }
        });
    }
  }
}
</script>

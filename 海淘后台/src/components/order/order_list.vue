<template>
<transition name="el-fade-in-linear">
  <div>
    <div class="card pd-20 pd-sm-40">
          <h6 class="card-body-title">订单列表</h6>
          <p class="mg-b-20 mg-sm-b-30">Using the most basic table markup.</p>

          <!-- ####### 按钮 搜索 start####### -->
          <div style="display:flex;justify-content:space-between;width:100%;padding-bottom:20px">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-danger pd-x-25" @click="centerDialogVisible=true,ispi=true">批量修改状态</button>
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
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <table class="table mg-b-0">
                    <thead>
                      <tr>
                        <th>图片</th><th>名称</th><th>数量</th><th>单价</th><th>总重量</th><th>合计</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in scope.row.orderCommodity" :key="item.sunwouId">
                        <td><img :src="item.commodityImage" width="50px"></td>
                        <td>{{item.commodityName}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.commodityPrice}}</td>
                        <td>{{item.totalWeight}}</td>
                        <td>{{item.totalPrice}}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="sunwouId" label="订单编号"> </el-table-column>
              <el-table-column prop="concatPeople" label="收货人"> </el-table-column>
              <el-table-column prop="concatPhone" label="联系电话"> </el-table-column>
              <el-table-column label="收货地址">
                <template slot-scope="scope">
                  {{scope.row.addressProvince+scope.row.addressCity+scope.row.addressArea+scope.row.addressDetail}}
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"> </el-table-column>
              <el-table-column prop="totalWeight" label="总重量（kg）"> </el-table-column>
              <el-table-column prop="totalCommodity" label="商品合计"> </el-table-column>
              <el-table-column prop="total" label="总计"> </el-table-column>
              <el-table-column prop="status" label="订单状态" :filters="[{text: '待付款', value: '1'}, {text: '待发货', value: '2'}, {text: '待收货', value: '3'}, {text: '已完成', value: '4'}]"
      :filter-method="filterHandler">
                <template slot-scope="scope">
                  <span>{{scope.row.status == 1 ?'待付款':''}}</span>
                  <span>{{scope.row.status == 2 ?'待发货':''}}</span>
                  <span>{{scope.row.status == 3 ?'待收货':''}}</span>
                  <span>{{scope.row.status == 4 ?'已完成':''}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">

                  <el-dropdown size="small"  type="primary" trigger="click">
                    <el-button type="primary" size="mini">
                      编辑<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><el-button type="text" style="width:100px" @click="centerDialogVisible=true,ispi=false,sunwouId=scope.row.sunwouId,nowstate=scope.row.status" >更改状态</el-button></el-dropdown-item>

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
        <el-dialog title="更改状态" :visible.sync="centerDialogVisible" width="30%" center>
          <el-select v-model="nowstate" placeholder="请选择">
            <el-option
              v-for="item in state" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitStatus()">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</transition>
</template>
<script>
export default {
  data() {
    return {
      ispi:false,
      nowstate: "1",
      sunwouId: "",
      centerDialogVisible: false,
      state: [
        { label: "待付款", value: "1" },
        { label: "待发货", value: "2" },
        { label: "待收货", value: "3" },
        { label: "成功确认", value: "4" }
      ],
      category: [
        { text: "自营-聚划算", value: 1 },
        { text: "自营-婚庆用品", value: 2 },
        { text: "自营-礼品套餐", value: 3 },
        { text: "代理-孕婴用品", value: 4 },
        { text: "代理-服装鞋帽", value: 5 },
        { text: "代理-婚庆用品", value: 6 },
        { text: "代理-数码电脑", value: 7 },
        { text: "代理-手机配件", value: 8 },
        { text: "代理-家用电器", value: 9 },
        { text: "代理-彩妆美容", value: 10 },
        { text: "代理-其他", value: 11 }
      ],
      pageModel: {
        page: 1,
        size: 10,
        total: 0
      },
      search: "",
      list: [],
      multipleSelection: [],
      delStr: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    filterHandler(value,row){
      return row.status == value;
    },
    submitStatus() {
      var that = this;
      if(this.ispi){
        for(var i in this.multipleSelection){
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "orderupdatestatus",
          dataType: "JSON",
          data: {
            orderId: this.multipleSelection[i].sunwouId,
            status: this.nowstate
          },
          success(res) {
            if (res.code == 1000) {
              that.centerDialogVisible = false;
              that.getList();
              that.$message({
                type: "success",
                message: res.result
              });
            }
          }
        });

      }
      }else{
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "orderupdatestatus",
          dataType: "JSON",
          data: {
            orderId: this.sunwouId,
            status: this.nowstate
          },
          success(res) {
            if (res.code == 1000) {
              that.centerDialogVisible = false;
              that.getList();
              that.$message({
                type: "success",
                message: res.result
              });
            }
          }
        });
      }


    },
    handleSizeChange(val) {
      this.pageModel.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    doSearch() {
      this.search = $("#searchInput").val();
      this.getList();
    },
    //置顶
    sortToTop(id) {
      var that = this;
      $.ajax({
        type: "POST",
        url: that.$store.state.ip + "sort",
        dataType: "JSON",
        data: { commodityId: id, type: 1 },
        success(res) {
          if (res.code == 1000) {
            that.getList();
            that.$message({
              type: "success",
              message: res.result
            });
          } else {
            that.$message({
              type: "error",
              message: res.result
            });
          }
        }
      });
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        this.delStr = '';
        for(var i in val){
          this.delStr += val[i].sunwouId;
        }
    },
    doDelete() {
      var that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $.ajax({
            type: "POST",
            url: that.$store.state.ip + "commodityremove",
            dataType: "JSON",
            data: { commodityIds: that.delStr },
            success(res) {
              if (res.code == 1000) {
                that.getList();
                that.$message({
                  type: "success",
                  message: res.result
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    filterCategory(value, row) {
      return row.categoryId === value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delStr = "";
      for (var i in val) {
        this.delStr += val[i].sunwouId;
      }
    },
    getList() {
      var that = this;
      $.ajax({
        type: "POST",
        url: that.$store.state.ip + "findorder",
        data: {
          appid: that.$store.state.appid,
          page: this.pageModel.page,
          size: this.pageModel.size
        },
        dataType: "JSON",
        success: function(res) {
          if (res.code == 1000) {
            that.pageModel.total = res.total;
            that.list = res.body;
          }
        }
      });
    }
  }
};
</script>

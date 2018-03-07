<template>
<transition name="el-fade-in-linear">
  <div>
    <div class="card pd-20 pd-sm-40">
          <h6 class="card-body-title">通知</h6>

         
          <div class="table-responsive">
            <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">

              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="image" label="通知">
              </el-table-column>
              <el-table-column prop="lastUpdateTime" label="时间"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                 <el-button type="primary"  @click="dialogVisible = true,sunwouId= scope.row.sunwouId,data.image = scope.row.image">修改</el-button>
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
        <el-dialog title="通知" :visible.sync="centerDialogVisible" width="30%" center>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入通知内容" v-model="data.image">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImage()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="通知" :visible.sync="dialogVisible" width="30%" center>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入通知内容" v-model="data.image">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateImage()">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</transition>
</template>
<style>

</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      centerDialogVisible: false,
      pageModel: {
        page: 1,
        size: 10,
        total: 0
      },
      sunwouId: "",
      data: {
        image: "",
        appid: "",
        type: 3
      },
      search: "",
      list: [],
      multipleSelection: [],
      delStr: ""
    };
  },
  mounted() {
    this.data.appid = this.$store.state.appid;
    this.getList();
  },
  methods: {
    updateImage() {
      var that = this;
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "imageandtextupdate",
        data: { sunwouId: this.sunwouId, image: this.data.image },
        dataType: "JSON",
        success(res) {
          if (res.code == 1000) {
            that.dialogVisible = false;
            that.getList();
            that.$message({
              type: "success",
              message: "保存成功"
            });
          }
        }
      });
    },
    submitImage() {
      var that = this;
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "imageandtextadd",
        data: this.data,
        dataType: "JSON",
        success(res) {
          if (res.code == 1000) {
            that.centerDialogVisible = false;
            that.getList();
            that.$message({
              type: "success",
              message: "保存成功"
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
        url: that.$store.state.ip + "findimageandtext",
        data: {
          appid: that.$store.state.appid,
          type: 3,
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

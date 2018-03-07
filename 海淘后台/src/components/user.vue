<template>
<transition name="el-fade-in-linear">
  <div>
    <div class="card pd-20 pd-sm-40">
          <h6 class="card-body-title">轮播图列表</h6>
          <p class="mg-b-20 mg-sm-b-30">Using the most basic table markup.</p>

          <!-- ####### 按钮 搜索 start####### -->
          <div style="display:flex;justify-content:space-between;width:100%;padding-bottom:20px">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info pd-x-25" @click="centerDialogVisible = true,data.image = ''">添加轮播图</button>
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


              <el-table-column prop="image.name" label="姓名"> </el-table-column>
              <el-table-column prop="image.gender" label="性别"> </el-table-column>
              <el-table-column prop="image.phone" label="手机"> </el-table-column>

            </el-table>
            <el-pagination style="float:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageModel.page" :page-sizes="[10, 20, 50, 100]" :page-size="pageModel.size"
              layout="total, sizes, prev, pager, next, jumper" :total="pageModel.total">
            </el-pagination>
            <div style="clear:both"></div>
          </div>
        </div><!-- card -->
        <el-dialog title="轮播图" :visible.sync="centerDialogVisible" width="30%" center>
          <a href="javascript:;" class="carbtn">
            <span  v-if="data.image == ''">+</span>
            <img :src="data.image" v-if="data.image != ''" width="100%">
            <input type="file" id="file" @change="fileUpload()" style="z-index:10000">
          </a>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImage()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="修改轮播图" :visible.sync="dialogVisible" width="30%" center>
          <a href="javascript:;" class="carbtn">
            <span  v-if="data.image == ''">+</span>
            <img :src="data.image" v-if="data.image != ''" width="100%">
            <input type="file" id="files" @change="filesUpload()" style="z-index:10000">
          </a>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateImage()">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</transition>
</template>
<style>
.carbtn {
  display: block;
  width: 375px;
  height: 200px;
  border: #aaa 1px dotted;
  border-radius: 5px;
  overflow: hidden;
  line-height: 200px;
  text-align: center;
  font-size: 50px;
}
.carbtn input {
  display: block;
  width: 375px;
  height: 200px;
  position: relative;
  top: -200px;
  opacity: 0;
}
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
        type: 1
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
          }
        }
      });
    },
    fileUpload() {
      var that = this;
      var formData = new FormData();

      formData.append("file", document.getElementById("file").files[0]);

      formData.append("type", 1);
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "file/up",
        data: formData,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.code == 1000) {
            that.data.image = that.$store.state.ip + res.body;

            that.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            that.$message({
              type: "error",
              message: res.result
            });
          }
        },
        fail(e) {
          console.log(e);
        }
      });
    },
    filesUpload() {
      var that = this;
      var formData = new FormData();

      formData.append("file", document.getElementById("files").files[0]);

      formData.append("type", 1);
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "file/up",
        data: formData,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.code == 1000) {
            that.data.image = that.$store.state.ip + res.body;

            that.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            that.$message({
              type: "error",
              message: res.result
            });
          }
        },
        fail(e) {
          console.log(e);
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
    doDelete(id) {
      var that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $.ajax({
            type: "POST",
            url: this.$store.state.ip + "imageandtextupdate",
            data: { sunwouId: id, isDelete: true },
            dataType: "JSON",
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
        url: that.$store.state.ip + "findimageandtext",
        data: {
          appid: that.$store.state.appid,
          type: 2,
          page: this.pageModel.page,
          size: this.pageModel.size
        },
        dataType: "JSON",
        success: function(res) {
          if (res.code == 1000) {
            that.pageModel.total = res.total;
            for (var i in res.body) {
              res.body[i].image = JSON.parse(res.body[i].image);
            }
            that.list = res.body;
          }
        }
      });
    }
  }
};
</script>

<template>
<transition name="el-fade-in-linear">
  <div>
    <div class="card pd-20 pd-sm-40">
          <el-button type="primary" style="width:100px" @click="centerDialogVisible = true">添加</el-button>
          <el-table ref="multipleTable" :data="data.image.list" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="value" label="积分值" > </el-table-column>
            <el-table-column prop="label" label="说明" > </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-dropdown size="small"  type="primary" trigger="click">
                    <el-button type="primary" size="mini">
                      编辑<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><el-button type="text" style="width:100px" @click="enterDialogVisible = true, sun.label = scope.row.label,sun.value = scope.row.value ,snum = scope.$index ">修改</el-button></el-dropdown-item>
                      <el-dropdown-item><el-button type="text" style="width:100px;color:red" @click="dels(scope)">删除</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
            </el-table-column>
          </el-table>
          <el-dialog title="信息添加" :visible.sync="centerDialogVisible" width="30%" center>
            <span>积分值</span>
            <el-input v-model="sun.value"></el-input>
            <span>积分说明</span>
            <el-input v-model="sun.label" type="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submits()">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="信息修改" :visible.sync="enterDialogVisible" width="30%" center>
            <span>积分值</span>
            <el-input v-model="sun.value"></el-input>
            <span>积分说明</span>
            <el-input v-model="sun.label" type="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="enterDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updates()">确 定</el-button>
            </span>
          </el-dialog>
          <el-button type="primary" @click="submitImage()" style="width:150px;margin-top:15px">保 存</el-button>
        </div><!-- card -->

  </div>
</transition>
</template>
<style>

</style>

<script>
export default {
  data() {
    return {
      snum:0,
      centerDialogVisible: false,
      enterDialogVisible: false,
      pageModel: {
        page: 1,
        size: 10,
        total: 0
      },
      sunwouId: "",
      sun:{
        label:'',
        value:''
      },
      data: {
        sunwouId:'',
        image: {
          text:'asdsadasdas',
          list:[]
        },
        appid: "",
        type: 4
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
    updates(){
      this.data.image.list[this.snum].label = this.sun.label;
      this.data.image.list[this.snum].value = this.sun.value;
      this.enterDialogVisible =false;
    },
    dels(scope){
      this.data.image.list.splice(scope.$index,1)
    },
    submits(){
      this.data.image.list.push({label:this.sun.label,value:this.sun.value});
      this.centerDialogVisible =false;
      console.log(this.data.image.list)
    },
    submitImage() {
      var that = this;
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "imageandtextupdate",
        data: {
          appid: this.$store.state.appid,
          sunwouId: this.data.sunwouId,
          type:4,
          image:JSON.stringify(this.data.image)
        },
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
          type: 4,
          page: this.pageModel.page,
          size: this.pageModel.size
        },
        dataType: "JSON",
        success: function(res) {
          if (res.code == 1000) {
            that.pageModel.total = res.total;
            that.list = res.body;
            that.data.image = JSON.parse(res.body[0].image)
            that.data.sunwouId = res.body[0].sunwouId
          }
        }
      });
    }
  }
};
</script>

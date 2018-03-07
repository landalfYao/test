<template>
  <transition name="el-fade-in-linear">
    <div class="panel" style="padding:30px">
      <el-button-group>
        <el-button type="danger" plain @click="multiDelete()">批量删除</el-button>
      </el-button-group>

      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name"  label="姓名"> </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="destination" label="目的地"></el-table-column>
        <el-table-column prop="day" label="天数"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="danger" size="mini" plain @click="deleteSimpleRow(scope.row.sunwouId)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right;margin-top:30px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pageModel.page" :page-size="pageModel.total" layout="prev, pager, next, jumper"
        :total="pageModel.total">
      </el-pagination>
      <div class="clearfix"></div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      pageModel:{
        page:1,
        size:10,
        total:0
      },
      list:[]
    }
  },
  mounted(){
    this.getList();
  },
  methods: {
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'reserve/find',{
        page:this.pageModel.page,
        size:this.pageModel.size
      },function(res){
        res = JSON.parse(res)
          that.pageModel.page = res.body.page;
          that.pageModel.total = res.body.total;
          that.list = res.body.cotent;
      })
    },
    handleSizeChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageModel.page = val;
      this.getList();
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //初始化全选
    initMultiSelection: function () {
      var list = []
      for(var item in this.multipleSelection){
        list.push(this.multipleSelection[item].sunwouId);
      }
      return list;
    },
    //批量删除
    multiDelete: function () {
      var that = this;
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(that.$store.state.ip+'reserve/delete?sunwouId='+that.initMultiSelection(),function(res){
            res = JSON.parse(res)
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
          $.post(that.$store.state.ip+'reserve/delete?sunwouId='+id,function(res){
            res = JSON.parse(res)
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
  }
}
</script>

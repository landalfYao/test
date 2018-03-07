<template>
  <transition name="el-fade-in-linear">

    <div class="panel" style="padding:30px">

      <el-button-group>
        <el-button type="danger" plain @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" plain @click="addVisible = true">添加心得</el-button>
      </el-button-group>

      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="text" label="评价"></el-table-column>
        <el-table-column  label="图片">
          <template slot-scope="scope">
            <img v-bind:src="ip+scope.row.image" height="50px">
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" size="mini" plain @click="updateVisible = true,addData = scope.row">修改</el-button>
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
      <el-dialog title="新增评价" :visible.sync="addVisible"  center width="50%">
        <span>标题</span><br>
        <el-input  v-model="addData.title"></el-input>
        <el-upload class="upload-demo" :data="{label:'image'}"  drag action="http://tzhop.free.ngrok.cc/" multiple :http-request="fileUpload">
          <i v-if="addData.image == ''" class="el-icon-upload"></i>
            <img v-if="addData.image != ''" v-bind:src="ip+addData.image" width="100%">
            <div v-if="addData.image == ''" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <span>定制师描述</span><br>
        <el-input type="textarea" v-model="addData.text"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false,loading=false">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="submit()">确 定</el-button>
        </span>
      </el-dialog>


      <el-dialog title="修改评价" :visible.sync="updateVisible"  center width="50%">
        <span>标题</span><br>
        <el-input  v-model="addData.title"></el-input>
        <el-upload class="upload-demo" :data="{label:'image'}"  drag action="http://tzhop.free.ngrok.cc/" multiple :http-request="fileUpload">
          <i v-if="addData.image == ''" class="el-icon-upload"></i>
            <img v-if="addData.image != ''" v-bind:src="ip+addData.image" width="100%">
            <div v-if="addData.image == ''" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <span>定制师描述</span><br>
        <el-input type="textarea" v-model="addData.text"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false,loading=false">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="submit()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </transition>
</template>
<style>
  .el-upload{
    height: 180px;
    overflow: hidden;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<script>
export default {
  data(){
    return {
      loading:false,
      ip:'',
      addData:{
        image:'',
        text:'',
        title:'',
        type:6
      },
      list:[],
      updateVisible:false,
      addVisible:false,
      multipleSelection:[],

      pageModel:{
        page:1,
        size:10,
        total:0
      }
    }
  },
  mounted(){
    this.ip = this.$store.state.ip;
    this.getList();
  },
  methods:{
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:6,
        page:this.pageModel.page,
        size:this.pageModel.size
      },function(res){
        res = JSON.parse(res)
        if(res.code == 1000){
          that.pageModel.page = res.body.page;
          that.pageModel.total = res.body.total;
          that.list = res.body.content
        }
      })
    },
    update(){
      this.loading = true;
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/update',this.addData,function(res){
        that.loading = false;
        res = JSON.parse(res)
        if(res.code == 1000){
          that.updateVisible = false
          that.$message({
                type: 'success',
                message:res.result
            });
          that.getList();
        }else{
          that.$message({
                type: 'error',
                message:res.result
            });
        }
      })
    },
    submit(){
      this.loading = true;
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/add',this.addData,function(res){
        that.loading = false;
        res = JSON.parse(res)
        if(res.code == 1000){
          that.addVisible = false
          that.$message({
                type: 'success',
                message:res.result
            });
          that.getList();
        }else{
          that.$message({
                type: 'error',
                message:res.result
            });
        }
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
          $.post(that.$store.state.ip+'imageandtext/delete?sunwouId='+that.initMultiSelection(),function(res){
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
          $.post(that.$store.state.ip+'imageandtext/delete?sunwouId='+id,function(res){
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
    fileUpload(e){
      var that = this;
      var formData = new FormData();
      formData.append('file',e.file);
      $.ajax({
        type: 'POST',
        url: this.$store.state.ip+'file/up',
        data: formData,
        processData: false,
        contentType: false,
        success:function (res){
          res = JSON.parse(res);
          if(res.code == 1000){
            that.addData[e.data.label] = res.body;
            that.$message({
                type: 'success',
                message: res.result
            });
          }else{
            that.$message({
                type: 'error',
                message:res.result
            });
          }
        }
      });
    }
  }
}
</script>

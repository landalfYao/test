<template>
  <transition name="el-fade-in-linear">
    <div class="panel" style="padding:30px">
      <el-button-group>
        <el-button type="danger" plain @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" plain @click="addVisible = true">添加定制师</el-button>
        <el-select v-model="masValue" placeholder="请选择" @change="changeType()">
          <el-option v-for="item in masType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-button-group>

      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <p>{{scope.row.text}}</p>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img v-bind:src="ip+scope.row.image" alt="" height="50px">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
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

      <el-dialog title="新增定制师" :visible.sync="addVisible"  center width="30%">
        <span>选择定制师显示类型</span><br>
        <el-select v-model="addData.type" placeholder="请选择">
          <el-option v-for="item in masType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select><br>
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


      <el-dialog title="修改定制师" :visible.sync="updateVisible"  center width="30%">
        <span>选择定制师显示类型</span><br>
        <el-select v-model="addData.type" placeholder="请选择">
          <el-option v-for="item in masType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
          <el-button @click="updateVisible = false,loading=false">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="update()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      ip:'',
      masValue:2,
      selValue:2,
      masType:[
        {label:'大图定制师',value:2},
        {label:'小图定制师',value:3}
      ],
      addData:{
        image:'',
        title:'',
        text:'',
        type:'',
        label:''
      },
      loading:false,
      addVisible:false,
      updateVisible:false,
      list:[],
      pageModel:{
        page:1,
        size:10
      }
    }
  },
  mounted () {
    this.ip = this.$store.state.ip;
    this.getList();
  },
  methods: {
    changeType(){
      this.getList();
    },
    getList(){
      var that = this;
      $.post(this.$store.state.ip+'imageandtext/findbytype',{
        type:this.masValue,
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
      if(this.selValue == 3){
        var ltemp = {};
        ltemp.label = addData.label;
        ltemp.text = addData.text;
        this.addData.text = JSON.stringify(ltemp);
      }
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


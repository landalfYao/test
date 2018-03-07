<template>
  <div>
    <div class="animated fadeInUp panel">
      <div style="padding-top:15px;font-size:18px">
        <span>品牌分类信息</span>
      </div>
      <div>
        <span style="color:#888888">请根据真是情况填写</span>
      </div>
      <hr>
      <div style="padding-bottom:15px">
        <el-button :plain="true" type="danger" icon="delete" @click="multiDelete()">批量删除</el-button>
        <el-button type="primary" icon="plus" @click="addCompanyDialog = true">添加品牌信息</el-button>
        <el-input style="float:right;width:200px" placeholder="搜索相关内容" icon="search" v-model="search" @input="searchInput">
        </el-input>
      </div>
      <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template scope="props">
            <el-row :gutter="30">
              <el-col :span="6">
                <img v-bind:src="props.row.cover" width="100%"><br>
                <span>
                  <strong>品牌封面</strong>
                </span>
              </el-col>
              <el-col :span="18">
                <span>
                  <strong>品牌logo：</strong>
                </span>
                <img v-bind:src="props.row.logo" width="40px" height="40px">
                <p>
                  <span>
                    <strong>品牌介绍：</strong>
                  </span><br> {{props.row.describe}}
                </p>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="sortNumber" label="序号" width="65">
        </el-table-column>
        <el-table-column prop="name" label="品牌名称">
        </el-table-column>
        <el-table-column prop="enname" label="英文名称">
        </el-table-column>
        <el-table-column prop="contry" label="所属国家">
        </el-table-column>
        <el-table-column sortable label="创建时间" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="updateSimpleRow(scope.row,scope.$index)">修改</el-button>
            <el-dropdown style="margin-left:5px">
              <el-button type="text" size="small" class="el-dropdown-link">
                更多
              </el-button>
              <el-dropdown-menu slot="dropdown" split-button="true">
                <el-dropdown-item>
                  <el-button type="text" size="small">上移</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small">下移</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small" @click="sortDialogVisible = true">输入序号</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small" @click="deleteSimpleRow(scope.row.id,scope.$index)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
      <div class="clearfix"></div>
    </div>
    <el-dialog title="品牌信息" :visible.sync="addCompanyDialog" size="small" :before-close="handleClose">
      <el-form :label-position="'left'" :model="company" :rules="companyRules" ref="company" label-width="0" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>品牌名称</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.name" placeholder="品牌名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>英文名称</strong>
            </span>
            <el-form-item>
              <el-input v-model="company.enname" placeholder="英文名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span style="line-height:30px">
              <strong>所属国家</strong>
            </span>
            <el-form-item>
              <el-select v-model="company.contry" filterable placeholder="请选择">
                <el-option v-for="item in contry" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>品牌封面图片</strong>
            </span>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="company.cover" list-type="picture">
              <el-button size="middle" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="10">
            <span style="line-height:30px">
              <strong>品牌LOGO图片</strong>
            </span>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="company.logo" list-type="picture">
              <el-button size="middle" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top:20px;margin-bottom:20px">
          <el-col :span="24">
            <span style="line-height:30px">
              <strong>品牌描述</strong>
            </span>
            <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 8}" placeholder="请描述品牌" v-model="company.describe">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="float:right">
              <el-button @click="addCompanyDialog = false,company={}">取消</el-button>
              <el-button type="primary" @click="submitCompany('company')">确认提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="修改序号" :visible.sync="sortDialogVisible" size="tiny" :before-close="closeSortDialogVisible">
      <span>选择序号 ： </span>
      <el-select v-model="nowSortNumber" placeholder="请选择">
        <el-option v-for="item in tableData3" :key="item.sortNumber" :label="item.sortNumber" :value="item.sortNumber">
          <span style="float: left">{{ item.sortNumber }}</span>
          <span style="float: right;  font-size: 13px">{{ item.name }}</span>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sortDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.panel {
  padding: 30px;
  padding-top: 0px;
  border-radius: 10px
}

.el-upload--picture {
  overflow: hidden;
  width: 88px;
  height: 36px;
}
</style>

<script>
export default {
  data() {
    return {
      nowSortNumber: 1,
      contry: [
        { id: 1, name: '中国' },
        { id: 2, name: '美国' },
        { id: 3, name: '英国' },
        { id: 4, name: '德国' }
      ],
      company: {
        sortNumber: '',
        name: '',
        enname: '',
        contry: '',
        describe: '',
        logo: [],
        cover: []
      },
      companyRules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入公司电话', trigger: 'blur' },
          { min: 8, max: 11, message: '长度为8到11个数字', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' },
          { min: 8, max: 50, message: '长度为8到50个字符', trigger: 'blur' }
        ],
      },
      currentPage: 1,
      sortDialogVisible: false,
      addCompanyDialog: false,
      search: '',
      tableData3: [{
        id: 1,
        sortNumber: 1,
        date: '2016-05-03',
        name: '耐克',
        enname: 'nike',
        contry: '美国',
        describe: '啊实打实法大师傅豆腐干地方撒给对方广东佛山给电饭锅地方给电饭锅',
        logo: ['/static/img/logo.png'],
        cover: ['/static/img/c1.jpg']
      }, {
        id: 1,
        sortNumber: 2,
        date: '2016-05-03',
        name: '耐克',
        enname: 'nike',
        contry: '美国',
        describe: '啊实打实法大师傅豆腐干地方撒给对方广东佛山给电饭锅地方给电饭锅',
        logo: '/static/img/logo.png',
        cover: '/static/img/c1.jpg'
      }],
      multipleSelection: []
    }
  },
  methods: {
    closeSortDialogVisible: function () {
      this.sortDialogVisible = false;
    },
    //移除上传的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览上传的图片
    handlePreview(file) {
      console.log(this.company.logo);

    },
    //修改一行
    updateSimpleRow: function(row, index) {
      this.company = row;
      this.addCompanyDialog = true;
    },
    //批量删除
    multiDelete: function() {
      this.$confirm('此操作将批量删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //删除一行
    deleteSimpleRow: function(id, index) {
      console.log(id, index);
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //添加/修改公司信息
    submitCompany: function(e) {
      var that = this;
      this.$refs[e].validate((valid) => {
        if (valid) {
          var msg = '公司信息添加成功';
          if (that.company.id) {
            msg = '公司信息修改成功'
          }
          that.$message({
            message: msg,
            type: 'success'
          });
          that.company = {};
          that.addCompanyDialog = false;
        } else {
          that.company = {};
          return false;
        }

      });
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
      console.log(e)
    },
    handleSizeChange: function(e) {
      console.log(e)
    },
    handleCurrentChange: function(e) {
      console.log(e)
    },
    currentPage4: function(e) {
      console.log(e)
    }
  }
}
</script>


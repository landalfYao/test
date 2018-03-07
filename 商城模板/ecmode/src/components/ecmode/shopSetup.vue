<template>
  <transition name="el-fade-in-linear">
  <div class="panel">
    <div style="padding:30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ec_overview' }" class="font-md">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="font-lg">店铺管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div style="height:50px"></div> -->
      <el-tabs :tab-position="'top'" style="margin-top:30px">
        <el-tab-pane label="店铺设置">
          <el-form label-width="150px">
            <el-form-item label="店铺名称">
              <el-input v-model="store.storeName" style="width:250px"></el-input>
            </el-form-item>
            <hr>
            <el-form-item label="包邮价">
              <el-input v-model="store.minMailPrice" style="width:250px"></el-input><br>
              <span style="color:#aaa">满足此价格可享包邮</span>
            </el-form-item>
            <el-form-item label="包邮重量（g）">
              <el-input v-model="store.maxWeight" style="width:250px"></el-input><br>
              <span style="color:#aaa">小于此重量可享包邮</span>
            </el-form-item>
            <el-form-item label="超出重量最高减免">
              <el-input v-model="store.lessMailPrice" style="width:250px"></el-input><br>
              <span style="color:#aaa">大于上述重量可享邮费减免</span>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateStore()">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="微信端设置">

        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <el-form :model="pwdReset" status-icon :rules="reset" ref="pwdReset" label-width="120px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="age">
              <el-input type="password" v-model="pwdReset.oldpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="pwdReset.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="pwdReset.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('pwdReset')">提交</el-button>
              <el-button @click="resetForm('pwdReset')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data(){
    var checkAge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pwdReset.checkPass !== '') {
            this.$refs.pwdReset.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pwdReset.checkPass !== '') {
            this.$refs.pwdReset.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdReset.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        store:null,
        pwdReset: {
          pass: '',
          checkPass: '',
          oldpass: ''
        },
        reset: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
    }
  },
  mounted () {
    this.getStore();
  },
  methods: {
    updateStore(){
      var that = this;
      $.post(this.$store.state.ip+'store/info/update',this.store,function(res){
        if(res.code == 1000){
          that.$message({
                type: 'success',
                message: '保存成功'
            });
        }else{
          that.$message({
                type: 'error',
                message: '保存失败'
            });
        }
      })
    },
    getStore(){
      var that = this;
      $.post(this.$store.state.ip+'store/info/find',{
        storeId:this.$store.state.user.storeId
      },function(res){
        that.store = res.body;
      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

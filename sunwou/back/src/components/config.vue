<template>
  <el-form ref="form" :model="form" label-width="200px">
    <el-form-item label="成为美装师价格">
      <el-input type="number" v-model="form.designPrice"></el-input>
    </el-form-item>
    <el-form-item label="美妆师时间限制（月）">
      <el-input type="number"  v-model="form.designTime"></el-input>
    </el-form-item>
    <el-form-item label="加V价格">
      <el-input type="number" v-model="form.designVPrice"></el-input>
    </el-form-item>
    <el-form-item label="加V时间限制（月）">
      <el-input type="number" v-model="form.designVTime"></el-input>
    </el-form-item>
    <el-form-item label="入住店铺价格">
      <el-input type="number" v-model="form.shopPrice"></el-input>
    </el-form-item>
    <el-form-item label="店铺时间限制">
      <el-input type="number" v-model="form.shopTime"></el-input>
    </el-form-item>

    <el-form-item label="美妆师功能描述">
      <el-input type="textarea" v-model="form.designDiscribe"></el-input>
    </el-form-item>
    <el-form-item label="店铺功能描述">
      <el-input type="textarea" v-model="form.shopDiscribe"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  export default {
    data() {
      return {
        form: {
          designPrice:0,
          designTime:0,
          designVPrice:0,
          designVTime:0,
          shopPrice:0,
          shopTime:0,
          designDiscribe:'',
          shopDiscribe:''
        }
      }
    },
    mounted(){
      this.get();
    },
    methods: {
      get(){
        var that = this;
        $.ajax({
          url:this.$store.state.yip+'userconfig/wx/find',
          dataType:'JSON',
          method:'POST',
          success:function (res){
              that.form = res.body;
          }
        })
      },
      onSubmit() {
        var that = this;
        $.ajax({
          url:this.$store.state.yip+'userconfig/update',
          dataType:'JSON',
          method:'POST',
          data:this.form,
          success:function (res){
            if(res == 1){
              that.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          }
        })
      }
    }
  }
</script>

<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">创建小程序</div>
      </div>
      <div class="ui-console-step">
        <el-steps :active="stepActive" finish-status="success">
          <el-step title="基础信息 1"></el-step>
          <el-step title="选择一个模板 2"></el-step>
          <el-step title="勾选服务项 3"></el-step>
        </el-steps>
      </div>
      <div v-show="stepActive == 0">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
              <FormItem label="小程序名称" prop="name">
                  <Input v-model="formValidate.name" placeholder="小程序名称" size="large" style="width:500px"/>
              </FormItem>
              <FormItem label="AppID" prop="appid">
                  <Input v-model="formValidate.appid" placeholder="AppID" size="large" style="width:500px"/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Poptip confirm title="微信小程序的唯一标识。查看详细操作？" placement="right" trigger="hover" ok-text="确定" cancel-text="取消" @on-ok="confirmAppID" @on-cancel="cancelAppID">
                    <Icon type="help" style="cursor:pointer" color="#0099FF"></Icon>
                  </Poptip>
              </FormItem>
              <FormItem label="AppSecret" prop="appSecret">
                  <Input v-model="formValidate.appSecret" placeholder="AppSecret" size="large" style="width:500px"/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Poptip confirm title="微信小程序的唯一标识。查看详细操作？" placement="right" trigger="hover" ok-text="确定" cancel-text="取消" @on-ok="confirmAppID" @on-cancel="cancelAppID">
                    <Icon type="help" style="cursor:pointer" color="#0099FF"></Icon>
                  </Poptip>
              </FormItem>
              <FormItem>
                  <Button type="primary">下一步</Button>
              </FormItem>
            </Form>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {
                    name: '',
                    appid: '',
                    appSecret: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请填写小程序名称', trigger: 'blur' }
                    ],
                    appid: [
                        { required: true, message: '请填写AppID', trigger: 'blur' },
                    ],
                    appSecret: [
                        { required: true, message: '请填写AppSecret', trigger: 'blur' }
                    ],
                    
                },
      stepActive:0
    }
  },
  methods:{
    confirmAppID(){

    },
    cancelAppID(){

    }
  }
}
</script>


<template>
  <transition name="fade" mode="out-in" appear>
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem>校园列表</BreadcrumbItem>
      </Breadcrumb>
      <ButtonGroup style="margin-top:20px">
        <Button type="primary" @click="addModal = true"><Icon type="ios-checkmark-empty"></Icon>添加校园</Button>
      </ButtonGroup>
      <Collapse v-model="panelValue" style="margin-top:20px">
        <Panel name="1">
            宁波大红鹰学院
            <p slot="content">
              <Button  @click="updateModal = true" type="info" size="small">修改校园</Button>
              <Button  type="error" size="small">删除校园</Button>
              <Button type="primary" size="small">添加楼层</Button>
              <Button type="primary" size="small">添加派件</Button>
              <br>
              <span style="line-height:40px">楼层 ----------</span><br>
              <Tag  type="dot" closable color="blue">南1</Tag><Tag  type="dot" closable color="blue">南2</Tag>
              <br>
              <span style="line-height:40px">派件大小及价格 ----------</span><br>
              <Tag  type="dot" closable color="green">小件 2元</Tag>
            </p>
        </Panel>
      </Collapse>
      <Modal v-model="addModal" title="添加校园" @on-ok="submitAdd" @on-cancel="addModal = false">
        <p><Input v-model="schoolName" placeholder="输入校园名称"></Input></p>
      </Modal>
      <Modal
        v-model="updateModal"
        title="修改校园"
        @on-ok="submitUpdate"
        @on-cancel="updateModal = false">
        <p><Input v-model="schoolName" placeholder="输入校园名称"></Input></p>
      </Modal>
    </div>
  </transition>
</template>
<script >
export default {
  data () {
    return {
      addModal:false,
      updateModal:false,
      panelValue:'1',
      schoolName:''
    }
  },
  mounted () {

  },
  methods:{
    //提交添加
    submitAdd(){

    },
    //提交修改
    submitUpdate(){

    }
  }
}
</script>


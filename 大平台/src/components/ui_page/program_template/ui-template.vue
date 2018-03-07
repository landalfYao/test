<template>
  <transition name="fade" mode="out-in">
    <div style="padding-bottom:50px">
      <div class="ui-template-bg bg-template">
        <div class="back-bg">
          <div class="width-900 margin-center">
            <div class="title">小程序精品模板</div>
            <div class="ui-template-form-search">
              <input type="text" class="ui-template-input-search" placeholder="输入模板名称、行业名称风格搜索">
              <div class="ui-template-btn-search" style="padding-top:5px"><Icon type="ios-search" size="25"  color="#ffffff"></Icon></div>
            </div>
          </div>
        </div>
      </div>
      <div class="width-1200 margin-center ui-template-show-panel">
        <div class="ui-template-filter-panel">

        </div>
        <div class="ui-template-item" v-for="item in 24" :key="item">
          <div class="ui-bg" style="background-image:url('/static/img/other/b1.png');">
            <div class="ui-label ell-1" title="外卖 / 餐饮 / ">外卖 / 餐饮 / </div>
          </div>
          <div class="ui-con">
            <div class="panel-between title item-center">
              <div class="tit ell-1">反倒是发sadasdasdasds</div>
              <div class="font-danger tit1 ">免费</div>
            </div>

            <div class="panel-between tit">
              <div class="font-error tit1">立即使用</div>
              <div class="font-primary tit2">查看</div>
            </div>
          </div>
        </div>
        <div class="width-1200">
          <el-pagination style="float:right;margin-top:50px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper" :total="400">
          </el-pagination>
          <div class="clearfix"></div>
        </div>

      </div>

    </div>
  </transition>
</template>

<script>
export default {
  data(){
    return {
      currentPage:1
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

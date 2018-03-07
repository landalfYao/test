<template>
<transition name="el-fade-in-linear">
  <div>
    <div class="card pd-20 pd-sm-40">
          <h6 class="card-body-title">销量列表</h6>
          <p class="mg-b-20 mg-sm-b-30">Using the most basic table markup.</p>

          <!-- ####### 按钮 搜索 start####### -->
          <div style="display:flex;justify-content:space-between;width:100%;padding-bottom:20px">

          </div>
          <!-- ####### 按钮 搜索 end####### -->
          <div class="table-responsive">
            <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%">

              <el-table-column prop="_id" label="商品名"> </el-table-column>
              <el-table-column prop="value.number" label="销量"> </el-table-column>

            </el-table>

            <div style="clear:both"></div>
          </div>
        </div><!-- card -->

  </div>
</transition>
</template>
<script>
export default {
  data () {
    return {
      list:[]
    }
  },
  mounted(){
    this.getInfo();
  },
  methods: {
    getInfo(){
      var that = this;
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "commoditystatictics",
        data: this.data,
        dataType:'JSON',
        success(res){
          that.list = res
        }
      })
    }
  }
}
</script>


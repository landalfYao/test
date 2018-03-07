<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">小程序信息</div>
      </div>
      <div class="panel-between">
        <div class="panel-start">
          <button class="ui-btn ui-btn-default" > <Icon type="ios-pause" color="#FF3333"></Icon>&nbsp;&nbsp;批量停止服务</button>
          <button class="ui-btn ui-btn-default"><Icon type="ios-play" color="#00CC66"></Icon>&nbsp;&nbsp;批量开启服务</button>
        </div>
        <div class="panel-end">
          <input type="text" class="search-input" placeholder="搜索">
          <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-search" color="#0099ff"></Icon>&nbsp;&nbsp;</button>
        </div>
      </div>
      <el-table style="margin-top:15px;width: 100%" :data="tableData">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称" > </el-table-column>
        <el-table-column prop="appid" label="appId" width="180"> </el-table-column>
        <el-table-column prop="swKey" label="key" width="180"> </el-table-column>
        <el-table-column prop="status" label="状态" :filters="[{ text: '运行中', value: 1 }, { text: '已停止', value: 0 }]"
          :filter-method="filterTagStatus" filter-placement="bottom-end">
          <template slot-scope="scope">
            <Icon type="ionic" :color="scope.row.status === 0 ?'#FF3333':'#00CC66'"></Icon>
            {{scope.row.status === 0 ? '已停止':'运行中'}}
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="到期时间" width="180"> </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-dropdown size="mini" split-button type="default" trigger="click">
              管理
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>续费</el-dropdown-item>
                <el-dropdown-item>更改设置</el-dropdown-item>
                <el-dropdown-item>停止服务</el-dropdown-item>
                <el-dropdown-item>开启服务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right;margin-top:30px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100"
        layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
      <div class="clearfix"></div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      currentPage:1,
      tableData:[
        {appid:'nsjkdflsksfopkgsdfd',deadline:'2019-12-05 17:00:31',name:'达咖',swKey:'swrp-jadkld5dsfsdf5fsd',status:1},
        {appid:'nsjkdflsksfopkgsdfd',deadline:'2019-12-05 17:00:31',name:'德清旅行',swKey:'swrp-jadkld5dsfsdf5fsd',status:0}
      ]
    }
  },
  methods:{
    filterTagStatus(value, row){
      return row.status === value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

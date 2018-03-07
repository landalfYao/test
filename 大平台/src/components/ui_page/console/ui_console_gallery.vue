<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">文件库管理</div>
      </div>
      <div class="panel-between">
        <div class="panel-start">
          <button class="ui-btn ui-btn-default"><Icon type="trash-a" color="#FF3333"></Icon>&nbsp;&nbsp;批量删除</button>
          <button class="ui-btn ui-btn-default" @click="categoryModal = true"><Icon type="plus-circled" color="#0099ff" ></Icon>&nbsp;&nbsp;添加分类</button>
          <button class="ui-btn ui-btn-default"><Icon type="ios-download" color="#0099ff"></Icon>&nbsp;&nbsp;移动到分类</button>
          <button class="ui-btn ui-btn-default"><Icon type="upload" color="#0099ff"></Icon>&nbsp;&nbsp;上传文件</button>
          <button class="ui-btn ui-btn-default"><Icon type="ios-cloud-download" color="#0099ff"></Icon>&nbsp;&nbsp;下载文件</button>
        </div>
        <div class="panel-end">
          <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-circle-filled"></Icon>&nbsp;&nbsp;按大小排序</button>
          <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-clock"></Icon>&nbsp;&nbsp;按时间排序</button>
          <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="android-sync"></Icon>&nbsp;&nbsp;刷新</button>
        </div>
      </div>
      <div class="gallery-panel">
        <el-checkbox v-model="checkedAll" style="float:left">全选</el-checkbox>
        <el-dropdown trigger="hover" style="margin-left:20px">
          <span class="el-dropdown-link">
            {{categoryTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" style="margin-left:20px" >
          <span class="el-dropdown-link">
            {{formatTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item ><div style="width:150px" @click="changeFormatTitle('全部格式')">全部格式</div></el-dropdown-item>
            <el-dropdown-item v-for="item in formats" :key="item"  ><div style="width:150px" @click="changeFormatTitle(item)">{{item}}</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div style="float:right;font-size:14px;" class="font-primary">2.2G/5G</div>
        <div class="clearfix"></div>
      </div>
      <div class="gallery-list">
        <div class="gallery-item" v-for="item in 18" :key="item">
          <div class="gallery-bg" style="background:url('/static/img/other/b1.png')">
            <el-checkbox class="checkbox" v-model="checkedAll"></el-checkbox>
            <div class="gallery-content">
              <div class="panel-between">
                <div class="font-white">PNG</div>
                <div class="font-white">1.2M</div>
              </div>
              <div class="do-look panel-between " style="margin-top:2px">
                <div class="ui-link-default">查看</div>
                <div class="ui-link-default">复制图片链接</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gallery-panel">
        <el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
        <div class="clearfix"></div>
      </div>
      <Modal v-model="categoryModal" title="添加分类" width="300" ok-text="确定" cancel-text="取消">
        <p><Input v-model="categoryContent" size="large" placeholder="请输入分类名称" /></p>
      </Modal>
    </div>
    
  </transition>
</template>

<script>
export default {
  data () {
    return {
      categoryContent:'',
      categoryTitle:'全部',
      categoryModal:false,
      formatTitle:'全部格式',
      formats:['PNG','JPG/JPEG','GIF','MP3','MP4','AVI','RMVB','doc/docx','pptx','xlsx','txt'],
      checkedAll:false,
      currentPage:1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeFormatTitle(val){
      this.formatTitle = val
    }
  }
}
</script>

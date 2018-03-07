<template>
  <transition name="el-fade-in-linear">
    <div>
      <div style="font-size:30px;color:#64b1e9">购买途径</div>
      <div style="color:#857c68;margin-top:30px">寻找附近可买到唛蔬的商店</div>
      <div style="line-height:25px">
        使用商店定位工具寻找您附近可买到唛蔬调味品的超市或商店。<br>
如果您在附近的商店发现没有唛蔬产品，敬请提示商店经理安排进货时购进唛蔬调味品。
      </div>
      <div style="font-size:18px;margin-top:30px">查找附近的地点</div>
      <el-autocomplete style="margin-top:30px;width:100%"
        popper-class="my-autocomplete"
        v-model="searchString" :fetch-suggestions="querySearch"
        placeholder="请输入店名"  @select="handleSelect">
        <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
        <template slot-scope="props">
          <div class="name">{{ props.item.storeName }}</div>
          <span class="addr">{{ props.item.storeAddress }}</span>
        </template>
      </el-autocomplete>
      <iframe :src="activeUrl"
      frameborder="0" style="margin-top:30px;width:100%;height:500px"></iframe>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
      return {
        ip:'http://www.tongzhuhe.com/FAV/',
        list: [],
        searchString: '',
        activeUrl:''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var list = this.list;
        var results = queryString ? list.filter(this.createFilter(queryString)) : list;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (list) => {
          return (list.storeName.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      loadAll() {
        var obj = null;
        var that = this;
        $.ajax({
          url: this.ip + 'store/finds',
          method:'POST',
          async: false,
          data:{},
          dataType:'JSON',
          success(res){
            obj = res.object
            that.activeUrl = 'http://api.map.baidu.com/marker?location='+res.object[0].pointY+','+res.object[0].pointX+'&title='+res.object[0].storeName+'&content='+res.object[0].storeAddress+'&output=html'
          }
        })
        return obj
      },
      handleSelect(item) {
        this.searchString = item.storeName
        this.activeUrl = 'http://api.map.baidu.com/marker?location='+item.pointY+','+item.pointX+'&title='+item.storeName+'&content='+item.storeAddress+'&output=html'
      },
      handleIconClick(ev) {
        console.log(222);
        console.log(ev);
      }
    },
    mounted() {
      this.list = this.loadAll();
    }
}
</script>

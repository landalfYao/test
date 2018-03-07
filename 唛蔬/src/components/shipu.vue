<template>
  <transition name="el-fade-in-linear">
    <div>
      <div style="font-size:30px;color:#64b1e9">美食食谱</div>
      <div style="color:#857c68;margin-top:20px"><span style="cursor:pointer" @click="navTo('/ms_product','5a3cdff7e4b0fc4f455f9852')">唛蔬食谱</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="cursor:pointer" @click="navTo('/legal',8)">美味提示</span></div>
      <div style="line-height:25px;margin-top:20px">
        正在找营养健康的美味菜谱么？那您就来对地方了。用100%不含麸质的唛蔬汤料和调味料烹饪菜肴，就是为您日常烹调增加健康美味。我们的产品仅采用最好的植物基素食原料，保障汤料不含脂肪、不含胆固醇、不含乳糖、低钠、犹太净食Kosher认证，且不含防腐剂。选用我们唛蔬厨房新鲜推介，兼顾口感和饮食健康的菜谱，您的家庭菜单定能达到新高度。请您详细查阅我们的菜谱，并品味唛蔬的不同！
      </div>

      <div class="panel-center" style="border-top:2px solid #e8dfcc;border-bottom:2px solid #e8dfcc;width:100%;margin-top:30px">
        <div  v-for="(item,index) in cate" :key="index" @click="changeCate(item.id)" :class="item.id == cid ? 'iyhm iact':'iyhm'">{{item.categoryName}}</div>
      </div>
      <div style="margin-top:20px;width:250px;float:right" class="panel-center">
        <input v-model="searchString" class="fggg" style="line-height:25px;width:175px;padding-left:5px" type="text" @keyup.enter="searchDo()" placeholder="输入关键字">
        <button class="bttt" @click="searchDo()">搜索</button>
      </div>
      <!-- <el-input  placeholder="输入关键字" v-model="searchString" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchDo()"></el-button>
      </el-input> -->
      <div style="clear:both"></div>
      <div style="height:20px;width:100%"></div>
      <div class="panel-between warp">
          <div class="g_item gitemb" v-for="(item,index) in list" :key="index"  @click="navTo('/ms_product',item.id)" v-if="index < amThen">
            <div class="bg-cover" :style="'background-image:url('+ip+item.coverPath+');'"></div>
            <div class="tit">{{item.pageTitle}}</div>
            <div class="ell-2" style="font-size:14px;color:#333333">{{item.miniTitle}}</div>
          </div>
      </div>
      <div class="panel-center item-center" style="padding-top:50px;">
        <div style="font-size:18px;color:#746952;cursor:pointer" @click="amThen = 100">{{list.length > 6 || amThen == 6 ? '加载更多食谱':'没有更多了'}}</div>
        <img src="../assets/img/qss.png" alt="">
      </div>
    </div>
  </transition>
</template>
<style>
.bttt{
  margin-left: 15px;
  width:60px;
  color: #525252;
  background: #d1d1d1;
  border: 0;
  line-height: 27px;
}
.bttt:hover{
  color: #fff;
  background: #525252
}
.fggg:focus{
  outline: 0
}
.panel-center{
  display: flex;
  justify-content: center;
}
.iyhm{
  padding: 0px 30px;
  line-height: 40px;
  cursor: pointer;
}
.iact{
  color: #978f7d
}
.iyhm:hover{
  color: #978f7d
}
.iyhm:active{
  color: #978f7d
}
</style>

<script>
export default {
  data() {
      return {
        amThen:6,
        ip:'http://www.tongzhuhe.com/FAV/',
        cate: [],
        list:[],
        searchString: '',
        activeUrl:'',
        cid:''
      };
    },
    methods: {
      navTo(path,id){
        this.$router.push({path:path,query:{id:id}})
      },
      searchDo(){
        this.getList('',this.searchString)
      },
      changeCate(id){
        this.cid = id;
        this.getList(id,'')
      },
      getCategory(){
        var that = this;
        $.ajax({
          url:this.ip+'category/finds',
          method:'POST',
          dataType:'JSON',
          success(res){
            that.cate = res.object;
            that.getList('','')
          }
        })
      },
      getList(id,pageTitle){
        var that = this;
        var data = {};
        if(id == '' || id == null){
          data.pageType = 4
        }else{
          data.categoryId = id
        }
        if(pageTitle != null && pageTitle != ''){
          data.pageTitle = pageTitle
        }
        $.ajax({
          url:this.ip+'pageInfo/finds',
          method:'POST',
          dataType:'JSON',
          data:data,
          success(res){
            that.list = res.object;
          }
        })
      }
    },
    mounted() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.getCategory()
    }
}
</script>

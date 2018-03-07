<template>
  <transition name="el-fade-in-linear">
    <div>
      <div style="font-size:30px;color:#64b1e9">{{list.length > 0 ? '搜索到'+list.length+'条与‘'+searchString+'’相关的记录':'未搜索到与‘'+searchString+'’相关的记录'}}</div>


      <div class="sitem" v-for="(item,index) in list" :key="index">
        <div :style="'float:left;width:150px;height:80px;background:url('+ip+item.coverPath+');background-size:cover;background-position:center'" @click="navTo(item.pageType,item.id)"></div>
        <div :style="'margin-left:10px;float:left;width:700px'">
          <div  class="fgh" @click="navTo(item.pageType,item.id)">{{item.pageTitle}}</div>
          <div class="ssd" @click="navTo(item.pageType,item.id)">{{item.miniTitle}}</div>
          <div style="font-size:14px;color:#888">{{item.createTime}}</div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </transition>
</template>
<style>
@import url('../assets/css/main.css');
.sitem{
margin-top:30px;padding-bottom:15px;border-bottom:1px #e1e1e1 solid;clear:both;height:100px
}
.ssd{
  width: 100%;
  margin-top:15px;
  font-size: 16px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  cursor: pointer;
}
.ssd:hover{
  color: #888
}
.fgh{
color:#64b1e9;font-size:20px;cursor: pointer;
}
.fgh:hover{
  color: #6dbbff
}
</style>
<script>
export default {
  data () {
    return {
      ip:'http://www.tongzhuhe.com/FAV/',
      list:[],
      pageTitles:'',
      pageSub:'',
      searchString:''
    }
  },
  watch: {
    $route(){
       document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      this.getData();
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    navTo(ptype,id){
      var path = '/ms_product'
      if(ptype == 1 || ptype == 2 || ptype == 4){
        path = '/ms_product'
      }else if(ptype == 3 || ptype == 5){
        path = '/news'
      }else if(ptype == 7){
        path = "/legal"
        id=7
      }else if (ptype == 6){
        path = "/legal"
        id=6
      }else if(ptype == 9){
        path = "/legal"
        id=9
      }else if(ptype == 8){
        path = "/legal"
        id=8
      }
      this.$router.push({path:path,query:{id:id}})
    },
    getData(){
      var that = this;
      this.searchString = this.$route.query.search
      $.ajax({
        url:this.ip+'pageInfo/finds',
        method:'POST',
        dataType:'JSON',
        data:{
          pageTitle:this.$route.query.search,
        },
        success(res){
          that.list = res.object;
        }
      })

    }
  }

}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="ui-container">
      <div class="ui-header">
        <div class="ui-logo"><img src="../../assets/img/logo.png" alt=""></div>
        <div class="ui-nav-master">
          <div class="ui-nav-master-item" v-for="(item,index) in uiNavList" :key="index" v-if="index < 4" @click="navigateTo(index,item.path,{},{},item.target)">
            <span :class="item.active ? 'active':''">{{item.label}}</span>
          </div>
        </div>
        <div class="ui-nav-user">
            <img class="avatar" src="../../assets/img/logo.png" alt="">
            <div class="ell-1 nick-name">nickName</div>
        </div>
        <div class="ui-nav-auxiliary">
          <div class="ui-nav-auxiliary-item"  v-for="(item,index) in uiNavList" :key="index" v-if="index >= 4" @click="navigateTo(index,item.path,{},{},item.target)">
            <span :class="item.active ? 'active':''">{{item.label}}</span>
          </div>
        </div>
      </div>
      <div class="ui-body">
        <router-view></router-view>
      </div>
      <div class="ui-footer">
        <div class="ui-footer-nav">
          <div class="ui-footer-nav-item" v-for="(item,index) in uiFooterNav" :key="index">
            <div class="title">{{item.label}}</div>
            <div class="children" v-for="(li,lindex) in item.children" :key="lindex">
              <span>{{li.label}}</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="about">
          <div class="qr-show">
            <div class="title">官方微信</div>
            <img class="qr-pic" src="../../assets/img/qr_wx.jpg" width="80px">
          </div>
          <div class="qr-show">
            <div class="title">官方微博</div>
            <img class="qr-pic" src="../../assets/img/qr_wx.jpg" width="80px">
          </div>
          <div class="qr-show">
            <div class="title">友情链接</div>
            <div class="interlink">
              <div class="interlink-item" v-for="(item,index) in interlink" :key="index"><span>{{item.label}}</span></div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="record-number">杭州双沃网络科技有限公司©2017 双沃科技 浙ICP备16110707号-1</div>
      </div>
    </div>
  </transition>
</template>

<style>
@import url('../../assets/css/common.css');
@import url('../../assets/css/ui_master.css');
</style>

<script>
export default {
  data () {
    return {
      uiNavList:[
        {label:'首页',path:'/ui_home',active:true,target:'_blank'},
        {label:'小程序模板',path:'/ui_template'},
        {label:'功能与服务',path:'/ui_function'},
        {label:'站内素材',path:'/'},
        {label:'问题反馈',path:'/'},
        {label:'控制台',path:'/ui_console',target:'_blank'}
      ],
      uiFooterNav:[
        {label:'产品中心',children:[
          {label:'微信小程序'}
        ]},
        {label:'诚意合作',children:[
          {label:'商务合作'},{label:'区域代理'}
        ]},
        {label:'热门活动',children:[
          {label:'微信活动'},{label:'区域代理'}
        ]},
        {label:'关注我们',children:[
          {label:'关于我们'},{label:'媒体报导'},{label:'帮助中心'}
        ]},
        {label:'联系我们',children:[
          {label:'咨询电话: 400-888-5555'},
          {label:'周一至周五 9:00~17:30'},
          {label:'公司地址：浙江省德清县科技新城'}
        ]}
      ],
      interlink:[
        {label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'}
        ,{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},
        {label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'},{label:'智能电视',path:'http://www.7po.com/'}
      ]
    }
  },
  mounted(){
    this.$router.push({path:'/ui_home'})
  },
  methods: {
    initUiNavList(){
      for(var i in this.uiNavList){
        this.uiNavList[i].active = false;
      }
    },
    navigateTo(index,path,query,params,target){
      this.initUiNavList();
      if(index == -1){

      }else{
        this.uiNavList[index].active = true;
      }
      this.$router.push({path:path,query:query,params:params,target:target});
    }
  }
}
</script>

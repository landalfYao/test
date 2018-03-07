<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
            </div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="ios-paper"></Icon>
                    Item 4
                </MenuItem>
            </div>
        </Menu>
        <Menu mode="horizontal" active-name="1">
            <div class="layout-assistant">
                <MenuItem name="1">首页</MenuItem>
                <MenuItem name="2">数据总览</MenuItem>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <Col span="5">
                    <Menu :active-name="'/distributor_city'" width="auto" :open-names="['1']" @on-select="navItemClick" accordion >
                        <Submenu  v-for="(item,index) in navItem" :key="index" :name="index">
                            <template slot="title">
                                <Icon :type="item.icon"></Icon>
                                {{item.label}}
                            </template>
                            <MenuItem  v-for="(ul,uindex) in item.sub" :key="uindex" :name="ul.path">{{ul.label}}</MenuItem>
                        </Submenu>

                    </Menu>
                </Col>
                <Col span="19">
                    <div class="layout-content-main">
                      <router-view></router-view>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="layout-copy">
            2017 &copy; sunwou
        </div>
    </div>
</template>
<script>
    export default {
      data () {
        return {
          navItem:[
            {icon:'ios-ionic-outline',label:'配送员管理',sub:[
              {label:'城市配送员',path:'/distributor_city'},{label:'校园配送员',path:'/distributor_school'}
            ]},
            {icon:'ios-analytics-outline',label:'代理管理',sub:[
              {label:'城市代理',path:'/agent_city'},{label:'校园代理',path:'/agent_school'}
            ]},
            {icon:'ios-photos',label:'广告图管理',sub:[
              {label:'广告图列表',path:'/carousel'}
            ]},
            {icon:'social-reddit-outline',label:'服务费管理',sub:[
              {label:'校园费用列表',path:'/agent_school_list'},
              {label:'城市费用列表',path:'/agent_city_list'}
            ]},
            {icon:'android-checkbox-outline',label:'订单管理',sub:[
              {label:'订单列表',path:'q6'}
            ]}
          ]
        }
      },
      mounted(){
        this.$router.push({path:'/distributor_city'})
      },
      methods: {
        navItemClick(path){
          this.$router.push({path:path})
        }
      }
    }
</script>

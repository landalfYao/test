<template>
  <div>
    <div>
      <sw-phone></sw-phone>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneConfig: {
        theme: '#fe4070',
        frontColor: '#ffffff',
        projectName: '持久美妆',
        selectedTextColor: '#1864a0',
        defaultTextColor: '#707070',
        showBottomNav: true,
        updateLog: '还未进行修改',
        page1: {
          active: true,
          show: true,
          text: '首页',
          icon: '/static/img/default/wxhomed.png',
          selectedIcon: '/static/img/default/wxhomes.png',
          titleBar: {
            text: 'default',
            color: 'default',
            background: 'default'
          },
          contentList: [
          ],
        },
        page2: {
          active: false,
          show: true,
          text: '商城',
          icon: '/static/img/default/wxshopd.png',
          selectedIcon: '/static/img/default/wxshops.png',
          titleBar: {
            text: 'default',
            color: 'default',
            background: 'default'
          }
        },
        page3: {
          active: false,
          show: true,
          text: '发现',
          icon: '/static/img/default/wxfindd.png',
          selectedIcon: '/static/img/default/wxfinds.png',
          titleBar: {
            text: 'default',
            color: 'default',
            background: 'default'
          }
        },
        page4: {
          active: false,
          show: true,
          text: '课程',
          icon: '/static/img/default/wxschoold.png',
          selectedIcon: '/static/img/default/wxschools.png',
          titleBar: {
            text: 'default',
            color: 'default',
            background: 'default'
          }
        },
        page5: {
          active: false,
          show: true,
          text: '我的',
          icon: '/static/img/default/wxuserd.png',
          selectedIcon: '/static/img/default/wxusers.png',
          titleBar: {
            text: 'default',
            color: 'default',
            background: 'default'
          }
        }
      },
    }
  }
}
</script>

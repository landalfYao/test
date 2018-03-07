<template >
  <div>
    <el-dialog title="组件库" :visible.sync="addComponentDialogVisible">

      <div slot="footer" class="dialog-footer">
        <el-button @click="addComponentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComponentDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pull-left animated fadeInLeft">
      <div class="phone ">
        <div class="phone-header">
          <div class="t1"></div>
          <div class="t2"></div>
        </div>
        <div class="phone-main" id="phoneMain">
          <div class="titleBar" id="titleBar"></div>
          <div class="wxmain" id="wxmain">
          </div>
          <div class="main-footer" id="mainFooter" style="padding-top: 5px;"></div>
        </div>
        <div class="phone-footer">
          <el-tooltip class="item" effect="dark" content="添加组件" placement="bottom">
            <div class="phone-btn" @click="addComponentDialogVisible = true"></div>
          </el-tooltip>
        </div>
      </div>
      <div style="width:100%;text-align:center;margin-top:10px;">点击手机Home健，添加组件。</div>
    </div>
    <div class="config-panel-group animated fadeInRight">
      <el-tabs type="border-card">
        <el-tab-pane label="全局配置">
          <el-form ref="form" label-width="100px">
            <el-form-item label="小程序名称">
              <el-input v-model="phoneConfig.projectName" style="width:200px" @input="setProjectNameInput" @blur="setProjectNameBlur" @focus="setProjectNameFocus"></el-input><br>
              <p style="color:#888;font-size:12px;width:300px;line-height:15px;margin-top:5px">该名称为全局小程序名称，在其他页面不设置标题栏名称时，默认为该名称。</p>
            </el-form-item>
            <el-form-item label="主题色">
              <span>背景色: </span>
              <el-color-picker v-model="phoneConfig.theme" @change="setTheme"></el-color-picker>
              <span> 前景色: </span>
              <el-color-picker v-model="phoneConfig.frontColor" @change="setFrontColor"></el-color-picker>
              <p style="color:#888;font-size:12px;width:300px;line-height:15px;margin-top:5px;">该主题色为全局小程序主题色，在其他页面不设置主题色时，默认为该主题色。</p>
            </el-form-item>
            <el-form-item label="图标颜色">
              <span>默认状态: </span>
              <el-color-picker v-model="phoneConfig.defaultTextColor" @change="setDefaultIconColor"></el-color-picker>
              <span> 选中状态: </span>
              <el-color-picker v-model="phoneConfig.selectedTextColor" @change="setSelectedIconColor"></el-color-picker>
              <p style="color:#888;font-size:12px;width:300px;line-height:15px;margin-top:5px;">如要统一图标和字体颜色，请将图标根据此颜色设计。</p>
            </el-form-item>

            <el-form-item label="页面配置">
              <table class="icon-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>底部文字</th>
                    <th>底部图标</th>
                    <th>页面状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>page1</td>
                    <td>
                      <span>
                        <el-input v-model="phoneConfig.page1.text" @input="page1TextInput" style="width:80px;text-align:center"></el-input>
                      </span>
                    </td>
                    <td>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page1IconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page1.icon" :src="phoneConfig.page1.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page1SelIconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page1.selectedIcon" :src="phoneConfig.page1.selectedIcon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                    <td>
                      <el-switch v-model="phoneConfig.page1.show" on-color="#13ce66" off-color="#ff4949" @change="changePageStatus(1)" disabled></el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td>page2</td>
                    <td>
                      <span>
                        <el-input v-model="phoneConfig.page2.text" @input="page2TextInput" style="width:80px;text-align:center"></el-input>
                      </span>
                    </td>
                    <td>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page2IconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page2.icon" :src="phoneConfig.page2.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page2SelIconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page2.selectedIcon" :src="phoneConfig.page2.selectedIcon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                    <td>
                      <el-switch v-model="phoneConfig.page2.show" on-color="#13ce66" off-color="#ff4949" @change="changePageStatus(2)"></el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td>page3</td>
                    <td>
                      <span>
                        <el-input v-model="phoneConfig.page3.text" @input="page3TextInput" style="width:80px;text-align:center"></el-input>
                      </span>
                    </td>
                    <td>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page3IconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page3.icon" :src="phoneConfig.page3.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page3SelIconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page3.selectedIcon" :src="phoneConfig.page3.selectedIcon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                    <td>
                      <el-switch v-model="phoneConfig.page3.show" on-color="#13ce66" off-color="#ff4949" @change="changePageStatus(3)"></el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td>page4</td>
                    <td>
                      <span>
                        <el-input v-model="phoneConfig.page4.text" @input="page4TextInput" style="width:80px;text-align:center"></el-input>
                      </span>
                    </td>
                    <td>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page4IconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page4.icon" :src="phoneConfig.page4.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page4SelIconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page4.selectedIcon" :src="phoneConfig.page4.selectedIcon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                    <td>
                      <el-switch v-model="phoneConfig.page4.show" on-color="#13ce66" off-color="#ff4949" @change="changePageStatus(4)"></el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td>page5</td>
                    <td>
                      <span>
                        <el-input v-model="phoneConfig.page5.text" @input="page5TextInput" style="width:80px;text-align:center"></el-input>
                      </span>
                    </td>
                    <td>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page5IconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page5.icon" :src="phoneConfig.page5.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="page5SelIconSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="phoneConfig.page5.selectedIcon" :src="phoneConfig.page5.selectedIcon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                    <td>
                      <el-switch v-model="phoneConfig.page5.show" on-color="#13ce66" off-color="#ff4949" @change="changePageStatus(5)"></el-switch>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
            <el-form-item label="底部图标">
              <div>
                <p style="line-height:20px">
                  <span style="color:#888;font-size:12px;">(左边为默认状态时的图标，右边为选中时的图标，点击图标即可更换图标)</span>
                </p>
              </div>
              <div style="display:flex;justify-content: flex-start;">
                <img src="/static/img/default/notice_icon.png" width="200px" height="200px">
                <div style="margin-left:20px;width:40%">
                  <p style="line-height:20px">图标设计时，请参照此规范<br>画布大小与图片大小的比例为3:2即可,居中排列;为更好的体现用户体验，请将图片大小控制在30kb以内。 </p>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="页面状态">
              <p style="color:#888;font-size:12px;line-height:15px;margin-top:5px">页面状态请谨慎调整,为安全起见page1页面状态操作已移除,如要获取更多操作权限，请联系开发人员</p>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="page1">
          <el-form ref="form" label-width="100px">
            <el-form-item label="标题栏名称">
              <el-input v-model="phoneConfig.page1.titleBar.text" style="width:200px" @input="setPage1TitleTextInput"></el-input><br>
              <p style="color:#888;font-size:12px;width:300px;line-height:15px;margin-top:5px">该名称为本页面标题栏名称,填写为‘default’标题栏名称自动默认为小程序名称</p>
            </el-form-item>
            <el-form-item label="标题栏颜色">
              <span>背景色: </span>
              <el-color-picker v-model="phoneConfig.page1.titleBar.background" @change="setPage1TitleBackground"></el-color-picker>
              <span> 前景色: </span>
              <el-color-picker v-model="phoneConfig.page1.titleBar.color" @change="setPage1TitleColor"></el-color-picker>
              <p style="color:#888;font-size:12px;width:300px;line-height:15px;margin-top:5px;">该主题色为本页主题色，清空颜色时，自动默认为全局主题色。</p>
            </el-form-item>
          </el-form>
          <div id="page1Content">
          </div>
        </el-tab-pane>
        <el-tab-pane label="page2">page2</el-tab-pane>
        <el-tab-pane label="page3">page3</el-tab-pane>
        <el-tab-pane label="page4">page4</el-tab-pane>
        <el-tab-pane label="page5">page5</el-tab-pane>
        <el-tab-pane label="提交修改">
          <div class="update-log">
            <div>
              <span>修改日志</span>
            </div>
            <div class="update-log-panel" id="logPanel"></div>

            <p style="margin-top:10px;width:100%;color:#888;text-align:center">
              注意: 为更好的保证小程序运行，请不要频繁的提交修改。建议修改次数，每天2次。
            </p>
            <div style="margin-top:10px;width:100%;text-align:center">
              <el-button type="primary" size="large" @click="submitConfig(1)">提交修改</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>

</style>

<script>




export default {
  data() {
    return {
      addComponentDialogVisible: false,
      assembly: [
        {
          id: 1, name: 'searchBarClassic',
          unique: 'search',
          describe: '可修改颜色、搜索文字、导航信息的显示。',
          config: {
            hasLocation: true,
            show: true,
            barColor: 'default',
            placeholder: '搜索...'
          },
          buildConfig: {
            name:'经典搜索框',
            hasLocation: '是否带导航',
            show: '是否显示组件',
            barColor: '导航栏主题色',
            placeholder: '搜索默认文字',
            build: ['hasLocation', 'show', 'barColor', 'placeholder']
          },
          showPanel: function() {
            var html = '<div style="width:270px;padding:5px 10px;background:#d1d1d1"><div style="line-height:30px;text-align:center;background:#ffffff">搜索</div></div>';
            return html;
          },
          buildUpdatePanel: function(name, config, theme) {
            var hasLocation = '';
            var show = '';
            if (config.hasLocation) { hasLocation = 'checked'; }
            if (config.show) { show = 'checked' }
            var html = '<div style="width:100%;background:#f3f3f3;display:block;height:auto;border-top:10px solid #ffffff">' +
              '<div style="width:100%;padding:15px;display:flex;justify-content: space-between;">' +
              '<div><span>' + name + '</span></div>' +
              '<div class="doEdit"></div>' +
              '</div>' +
              '<div style="width:100%;padding:15px;padding-top:0">' +
              '<div style="display:inline-block"><span>搜索提示文字:</span><input id="search_placeholder" style="width:150px" class="form-control" value="' + config.placeholder + '"></div>' +
              '<div style="display:inline-block;margin-left:20px"><input type="checkbox" id="search_hasLocation" ' + hasLocation + ' > 显示导航信息</div>' +
              '<div style="display:inline-block;margin-left:20px"><input type="checkbox" id="search_show" ' + show + '> 显示搜索组件</div>' +
              '<div style="width:150px;margin-top:10px"><span>搜索框颜色:</span><select id="search_barColor" class="form-control" id=""><option value="default">默认</option><option value="theme">主题</option></select></div>' +
              '</div>';
            '</div>';
            return html;
          },
          updatePanel: function() {
            var config = {};
            config.placeholder = document.getElementById("search_placeholder").value;
            config.hasLocation = document.getElementById("search_hasLocation").checked;
            config.show = document.getElementById("search_show").checked;
            config.barColor = document.getElementById("search_barColor").value;
            return config;
          },
          content: function(config, theme) {
            var hasLocation = 'none';
            var show = 'none';
            var barColor = '#ffffff';
            var searchBarColor = '#d1d1d1'
            var locationColor = '#262626';
            var placeholder = config.placeholder;
            var width = '100%';
            if (config.show) {
              show = 'block';
            }
            if (config.hasLocation) {
              hasLocation = 'block';
              width: '267px';

            }
            if (config.barColor == 'theme') {
              barColor = theme;
              searchBarColor = theme;
              locationColor = '#fff';
            }
            var html = '<div style="display:' + show + '">' +
              '<div style="background: #f1f1f1; width: 100%; display: flex; justify-content: space-between">' +
              '<div style="font-size:12px;height: 40px; line-height: 40px; padding: 0 15px; width: 80px; background:' + barColor + ';color:' + locationColor + ';display:' + hasLocation + '">杭州' +
              '<i class="el-icon-caret-bottom" style="font-size:6px"></i>' +
              '</div>' +
              '<div style="width:' + width + ';padding: 5px 10px;background:' + searchBarColor + '">' +
              '<div style="width: 100%; padding: 0 30px; line-height: 30px; background: #fff; border-radius: 5px; text-align: center">' +
              '<span>' + placeholder + '</span>' +
              '</div></div></div></div>';
            return html;
          }
        },
        {
          id: 2, name: 'carsouelClassic',
          config: {
            show: true,
            height: '150px',
            width: '100%',
            imgUrl: [
              {url:'/static/img/c1.jpg',link:''}, {url:'/static/img/c2.jpg',link:''}
            ]
          },
          buildConfig: {
            name:'经典轮播图',
            show: '是否显示组件',
            height: '组件高度',
            width: '组件宽度',
            imgUrl: '图片列表',
            build: ['show', 'height', 'width', 'imgUrl']
          },
          showPanel: function() {

          },
          buildUpdatePanel: function(name, config, theme) {
            var html = '<div style="width:100%;background:#f3f3f3;display:block;height:auto;border-top:10px solid #ffffff">' +
              '<div style="width:100%;padding:15px;display:flex;justify-content: space-between;">' +
              '<div><span>' + name + '</span></div>' +
              '<div class="doEdit"></div>' +
              '</div>' +
              '<div style="width:100%;padding:15px;padding-top:0">' +
              '</div>';
            return html;
          },
          content: function(config, theme) {
            var html = '<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">' +
              '<ol class="carousel-indicators">';

            for (var i = 0; i < config.imgUrl.length; i++) {
              if (i == 0) {
                html += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>';
              } else {
                html += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>'
              }
            }
            html += '</ol><div class="carousel-inner" role="listbox">';
            for (var i = 0; i < config.imgUrl.length; i++) {
              if (i == 0) {
                html += '<div class="item active">' +
                  '<img src="' + config.imgUrl[i].url + '" style="width:' + config.width + ';height:' + config.height + '" >' +
                  '<div class="carousel-caption">' +
                  '</div>' +
                  '</div>';
              } else {
                html += '<div class="item">' +
                  '<img src="' + config.imgUrl[i].url + '" style="width:' + config.width + ';height:' + config.height + '">' +
                  '<div class="carousel-caption">' +
                  '</div>' +
                  '</div>';
              }
            }
            html += '</div></div>';
            return html;
          }
        }
      ],
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
          },
          contentList: [
          ],
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
          },
          contentList: [
          ],
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
          },
          contentList: [
          ],
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
          },
          contentList: [
          ],
        }
      },
      inputTemp: '',
      fullscreenLoading: false
    }
  },
  mounted: function() {
    var that = this;
    $("#logPanel").html(this.phoneConfig.updateLog);
    this.setTitleBar();
    this.phoneConfig.page1.contentList.push(this.assembly[0]);
    this.phoneConfig.page1.contentList.push(this.assembly[1]);
    this.setBottomBar();
    this.buildMain();
    this.ininComponentPanel();
  },
  methods: {
    //提交配置
    submitConfig: function() {
      this.$http.post('http://192.168.1.114:8080/beauty/phoneconfig/config.do', { config: JSON.stringify(this.phoneConfig) }, { emulateJSON: true }).then(function(response) {
        console.log(response)
      })
    },
    // 初始化组件面板
    ininComponentPanel: function() {
      var that = this;
      for (var i = 1; i <= 5; i++) {
        for(var j=0;j<this.phoneConfig["page"+i].contentList.length;j++){
          $("#component"+i+"Delete" + j).click(function(e) {
            var index = e.currentTarget.id.substring(e.currentTarget.id.length - 1, e.currentTarget.id.length);
            var page = e.currentTarget.id.substring(9,10);
            that.$confirm('确定要删除此组件？')
              .then(function() {
                that.phoneConfig["page"+page].contentList.splice(index, 1);
                that.buildMain();
                that.ininComponentPanel();
              })
              .catch(_ => { });
          });
          $("#component"+i+"MoveUp" + j).click(function(e) {
            var page = e.currentTarget.id.substring(9,10);
            var index = parseInt(e.currentTarget.id.substring(e.currentTarget.id.length - 1, e.currentTarget.id.length));
            var temp = that.phoneConfig["page"+page].contentList[index];
            that.phoneConfig["page"+page].contentList[index] = that.phoneConfig["page"+page].contentList[index - 1];
            that.phoneConfig["page"+page].contentList[index - 1] = temp;
            that.buildMain();
            that.ininComponentPanel();
          });
          $("#component"+i+"MoveDown" + j).click(function(e) {
            var page = e.currentTarget.id.substring(9,10);
            var index = parseInt(e.currentTarget.id.substring(e.currentTarget.id.length - 1, e.currentTarget.id.length));
            var temp = that.phoneConfig["page"+page].contentList[index];
            that.phoneConfig["page"+page].contentList[index] = that.phoneConfig["page"+page].contentList[index + 1];
            that.phoneConfig["page"+page].contentList[index + 1] = temp;
            that.buildMain();
            that.ininComponentPanel();
          });
          $("#component"+i+"Update" + j).click(function(e) {
            var index = parseInt(e.currentTarget.id.substring(e.currentTarget.id.length - 1, e.currentTarget.id.length));
            that.phoneConfig["page"+i].contentList[index].config = that.phoneConfig["page"+i].contentList[index].updatePanel();
            that.buildMain();
            that.ininComponentPanel();
          });
        }

      }
    },
    //修改标题栏背前景色
    setPage1TitleColor: function(res) {
      var log = '<br>' + this.getNow() + '  修改page1标题栏前景色，修改为‘' + res + '’';
      this.phoneConfig.page1.titleBar.color = res;
      if (res == null) {
        this.phoneConfig.page1.titleBar.color = this.phoneConfig.frontColor
      }
      this.setLog(log);
      this.setTitleBar();
    },
    //修改标题栏背景色
    setPage1TitleBackground: function(res) {
      var log = '<br>' + this.getNow() + '  修改page1标题栏背景色，修改为‘' + res + '’';
      this.phoneConfig.page1.titleBar.background = res;
      if (res == null) {
        this.phoneConfig.page1.titleBar.background = this.phoneConfig.theme
      }
      this.setLog(log);
      this.setTitleBar();
    },
    //修改标题栏文字
    setPage1TitleTextInput: function(res) {
      var log = '<br>' + this.getNow() + '  修改page1标题栏文字，修改为‘' + res + '’';
      this.phoneConfig.page1.titleBar.text = res;
      this.setLog(log);
      this.setTitleBar();
    },
    //修改底部图标颜色 选中时
    setSelectedIconColor: function(res) {
      var log = '<br>' + this.getNow() + '  修改选中时底部图标颜色，修改为‘' + res + '’';
      this.phoneConfig.frontColor = res;
      this.setLog(log);
      this.setBottomBar();
    },
    //修改底部图标颜色 默认时
    setDefaultIconColor: function(res) {
      var log = '<br>' + this.getNow() + '  修改默认时底部图标颜色，修改为‘' + res + '’';
      this.phoneConfig.frontColor = res;
      this.setLog(log);
      this.setBottomBar();
    },
    //修改底部图标文字
    page1TextInput: function(res) {
      var log = '<br>' + this.getNow() + ' 尝试修改page1底部图标文字,修改为‘' + res + '’';
      this.phoneConfig.page1.text = res;
      this.setLog(log);
      this.setBottomBar();
    },
    page2TextInput: function(res) {
      var log = '<br>' + this.getNow() + ' 尝试修改page1底部图标文字,修改为‘' + res + '’';
      this.phoneConfig.page2.text = res;
      this.setLog(log);
      this.setBottomBar();
    },
    page3TextInput: function(res) {
      var log = '<br>' + this.getNow() + ' 尝试修改page1底部图标文字,修改为‘' + res + '’';
      this.phoneConfig.page3.text = res;
      this.setLog(log);
      this.setBottomBar();
    },
    page4TextInput: function(res) {
      var log = '<br>' + this.getNow() + ' 尝试修改page1底部图标文字,修改为‘' + res + '’';
      this.phoneConfig.page4.text = res;
      this.setLog(log);
      this.setBottomBar();
    },
    page5TextInput: function(res) {
      var log = '<br>' + this.getNow() + ' 尝试修改page1底部图标文字,修改为‘' + res + '’';
      this.phoneConfig.page5.text = res;
      this.setLog(log);
      this.setBottomBar();
    },
    //设置主题前景色
    setFrontColor: function(res) {
      var log = '<br>' + this.getNow() + '  尝试修改小程序主题前景色，修改为‘' + res + '’';
      this.phoneConfig.frontColor = res;
      this.setLog(log);
      this.setTitleBar();
    },
    //设置主题
    setTheme: function(res) {
      var log = '<br>' + this.getNow() + '  尝试修改小程序主题背景色，修改为‘' + res + '’';
      this.phoneConfig.theme = res;
      this.setLog(log);
      this.setTitleBar();
    },
    //获取当前时间
    getNow: function() {
      var time = new Date();
      var m = time.getMonth() + 1;
      var t = time.getFullYear() + "-" + m + "-"
        + time.getDate() + " " + time.getHours() + ":"
        + time.getMinutes() + ":" + time.getSeconds();
      return t;
    },
    //实时修改小程序名称
    setProjectNameInput: function(res) {
      this.inputTemp = res;
    },
    //修改完毕小程序名称
    setProjectNameBlur: function(res) {
      var temp = this.phoneConfig.projectName;
      var log = '';
      if (temp == this.inputTemp && this.inputTemp == '') {
        log = '<br>' + this.getNow() + '  尝试修改小程序名称,但未做出任何修改';
      } else {
        log = '<br>' + this.getNow() + '  修改小程序名称,将，修改为‘' + this.inputTemp + '’';
        this.phoneConfig.projectName = this.inputTemp;
      }
      this.setLog(log);
      this.inputTemp == '';
      this.setTitleBar();
    },
    //更新日志
    setLog: function(log) {
      if (this.phoneConfig.updateLog == '还未进行修改') {
        this.phoneConfig.updateLog = log
      } else {
        this.phoneConfig.updateLog += log
      }
      $("#logPanel").html(this.phoneConfig.updateLog);
    },
    //准备修改小程序名称
    setProjectNameFocus: function(res) {
      var temp = this.phoneConfig.projectName;
      var log = '<br>' + this.getNow() + '  尝试修改小程序名称‘' + temp + '’';
      this.setLog(log);
    },
    //改变页面状态
    changePageStatus: function(page) {
      var that = this;
      if (this.phoneConfig['page' + page].show) {
        this.phoneConfig['page' + page].show = true;
      } else {
        this.phoneConfig['page' + page].show = false;
      }
      this.setBottomBar();
    },
    //图标更换成功
    page1IconSuccess: function(res, file) {
      this.phoneConfig.page1.icon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page1SelIconSuccess: function(res, file) {
      this.phoneConfig.page1.selectedIcon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page2IconSuccess: function(res, file) {
      this.phoneConfig.page2.icon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page2SelIconSuccess: function(res, file) {
      this.phoneConfig.page2.selectedIcon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page3IconSuccess: function(res, file) {
      this.phoneConfig.page3.icon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page3SelIconSuccess: function(res, file) {
      this.phoneConfig.page3.selectedIcon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page4IconSuccess: function(res, file) {
      this.phoneConfig.page4.icon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page4SelIconSuccess: function(res, file) {
      this.phoneConfig.page4.selectedIcon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page5IconSuccess: function(res, file) {
      this.phoneConfig.page1.icon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    page5SelIconSuccess: function(res, file) {
      this.phoneConfig.page5.selectedIcon = URL.createObjectURL(file.raw);
      this.setBottomBar();
    },
    //底部图标上传限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 0.05;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 50kb!');
      }
      return isJPG && isLt2M;
    },
    //设置底部导航
    setBottomBar: function() {
      var showTempNum = 0;
      var htmlStr = '';
      var barList = [];
      for (var i = 1; i <= 5; i++) {
        if (this.phoneConfig["page" + i].show) {
          showTempNum++;
          barList.push(this.phoneConfig["page" + i]);
        }
      }
      for (var i = 0; i < showTempNum; i++) {
        if (barList[i].show) {
          var selected = barList[i].icon;
          var selectedColor = this.phoneConfig.defaultTextColor;
          if (barList[i].active) {
            selected = barList[i].selectedIcon;
            selectedColor = this.phoneConfig.selectedTextColor;
          }
          var width = 100 / showTempNum;
          htmlStr += '<div style="width:' + width + '%;height:45px;display:inline-block;text-align:center;cursor:pointer">' +
            '<img src="' + selected + '" width:"20px" height="20px"><br><span style="color:' + selectedColor + ';font-size:8px">' + barList[i].text + '</span></div>'
        }

      }
      $("#mainFooter").html(htmlStr);
    },
    // 构建内容
    buildMain: function() {
      var html = '';
      var updateHtml = '';
      for(var i=1;i<=5;i++){
        if(this.phoneConfig['page'+i].active){
          var html = '';
          var updateHtml = '';
          for (var j = 0; j < this.phoneConfig['page'+i].contentList.length; j++) {
            //获取 组件 content  返回  html;
            html += this.phoneConfig["page"+i].contentList[j].content(this.phoneConfig["page"+i].contentList[j].config, this.phoneConfig.theme);

            //构建组件操作面板
            updateHtml  += '<div class="component-panel">'+
                              '<div class="titlebar">'+
                                '<div style="width:50%">'+this.phoneConfig['page'+i].contentList[j].buildConfig.name+'</div>'+
                                '<div style="width:50%;text-align:right">'+
                                  '<button class="btn btn-danger btn-xs" id="component'+i+'Delete' + j + '">删除</button>';
                                  if (j > 0) {
                                    updateHtml += '<button style="margin-left:5px" class="btn btn-default btn-xs" id="component'+i+'MoveUp' + j + '" >上移</button>'
                                  }
                                  if (j < this.phoneConfig["page"+i].contentList.length - 1 && this.phoneConfig["page"+i].contentList.length > 1) {
                                    updateHtml += '<button style="margin-left:5px" class="btn btn-default btn-xs" id="component'+i+'MoveDown' + j + '">下移</button>'
                                  }
                                  updateHtml += '<button style="margin-left:5px" class="btn btn-info btn-xs" id="component'+i+'Update' + j + '">保存</button>'
             updateHtml +=      '</div>'+
                              '</div>'+
                              '<div class="row">';
                                for(var k=0;k<this.phoneConfig['page'+i].contentList[j].buildConfig.build.length;k++){
                                  //boolean值 修改
                                  if(typeof this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]] == 'boolean'){
                                    var checked = '';
                                    if(this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]]){
                                       var checked = 'checked';
                                    }
                                    updateHtml += '<div class="col-lg-4" style="padding:10px;"><input type="checkbox" '+checked+'>'+this.phoneConfig['page'+i].contentList[j].buildConfig[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]]+'</div>';
                                   //string值 修改
                                  }else if(typeof this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]] == 'string'){
                                    updateHtml += '<div class="col-lg-4" style="padding:10px;"><span>'+this.phoneConfig['page'+i].contentList[j].buildConfig[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]]+'</span><input class="form-control" type="text" value="'+this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]]+'"></div>';
                                   //object值 修改
                                  }else if(typeof this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]] == 'object' && this.phoneConfig['page'+i].contentList[j].buildConfig.build[k].indexOf('img') >= 0){
                                    updateHtml += '<div class="col-lg-12" style="padding:10px;"><span>图片路径</span><br>'+
                                      '<table style="width:100%;">'+
                                          '<thead><tr><th style="text-align:center">图片</th><th style="text-align:center">链接</th><th style="text-align:center">操作</th></tr></thead><tbody>';
                                    for(var x=0;x<this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]].length;x++){

                                      updateHtml += '<tr ></tr><td style="padding:5px"><img height="50px" src="'+this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]][x].url+'"></td>'+
                                                    '<td style="padding:5px"><input type="text" class="form-control" value="'+this.phoneConfig['page'+i].contentList[j].config[this.phoneConfig['page'+i].contentList[j].buildConfig.build[k]][x].link+'"></td>'+
                                                    '<td style="padding:5px"></td></tr>';
                                    }
                                    updateHtml += '</tbody></table></div>';
                                  }else{

                                  }
                                }

                                '<div class="col-lg-4">asdsd</div><div class="col-lg-4">asdsd</div><div class="col-lg-4">asdsd</div>';

               updateHtml +=  '</div>'+
                           '</div>';
          }
          $("#page"+i+"Content").html(updateHtml);
          $("#wxmain").html(html);
        }
      }
      // if (this.phoneConfig.page1.active) {
      //   for (var i = 0; i < this.phoneConfig.page1.contentList.length; i++) {
      //     html += this.phoneConfig.page1.contentList[i].content(this.phoneConfig.page1.contentList[i].config, this.phoneConfig.theme);
      //     updateHtml += this.phoneConfig.page1.contentList[i].buildUpdatePanel(this.phoneConfig.page1.contentList[i].name, this.phoneConfig.page1.contentList[i].config, this.phoneConfig.theme)
      //   }
      //   $("#page1Content").html(updateHtml);
      //   for (var i = 0; i < this.phoneConfig.page1.contentList.length; i++) {
      //     var tempHtml = '<button class="btn btn-danger btn-xs" id="componentDelete' + i + '">删除</button>';
      //     if (i > 0) {
      //       tempHtml += '<button style="margin-left:5px" class="btn btn-default btn-xs" id="componentMoveUp' + i + '" >上移</button>'
      //     }
      //     if (i < this.phoneConfig.page1.contentList.length - 1 && this.phoneConfig.page1.contentList.length > 1) {
      //       tempHtml += '<button style="margin-left:5px" class="btn btn-default btn-xs" id="componentMoveDown' + i + '">下移</button>'
      //     }
      //     tempHtml += '<button style="margin-left:5px" class="btn btn-info btn-xs" id="componentUpdate' + i + '">保存</button>'
      //     $(".doEdit").eq(i).html(tempHtml);
      //   }
      // }
      // $("#wxmain").html(html);
    },

    setTitleBar: function() {
      var title = '';
      var background = '';
      var front = '';
      for (var i = 1; i <= 5; i++) {
        if (this.phoneConfig["page" + i].active) {
          if (this.phoneConfig["page" + i].titleBar.text == 'default') {
            title = this.phoneConfig.projectName;
          } else {
            title = this.phoneConfig["page" + i].titleBar.text
          }
          if (this.phoneConfig["page" + i].titleBar.background == 'default') {
            background = this.phoneConfig.theme;
            this.phoneConfig["page" + i].titleBar.background = background;
          } else {
            background = this.phoneConfig["page" + i].titleBar.background;
          }
          if (this.phoneConfig["page" + i].titleBar.color == 'default') {
            front = this.phoneConfig.frontColor;
            this.phoneConfig["page" + i].titleBar.color = front;
          } else {
            front = this.phoneConfig["page" + i].titleBar.color;
          }
          $("#titleBar").css({
            background: background,
            color: front
          });
          $("#titleBar").html(title);
        }
      }
    }
  }
}

</script>

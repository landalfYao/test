<template>
  <div>
    <div class="shoppanel">
      <div style="cursor:pointer;float:left" @click="routerBack">
        <i class="sw-icon- sw-icon-reply "></i> 返回</div>
      <div class="panel-center item-center">
        <div>
          <el-upload class="avatar-uploade" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div v-if="msg.cover" class="avatar" v-bind:style="'background:url('+msg.cover+');background-size:cover'"></div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="margin-left:40px;line-height:30px">
          <div style="font-weight:bold;font-size:16px;">{{msg.name}}</div>
          <div>
            <el-rate v-model="msg.score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled :allow-half="true" show-text text-color="#ff9900"></el-rate>
          </div>
          <div>
            <span class="sw-icon- sw-icon-favorite"></span>关注 {{msg.follow}} &nbsp;&nbsp;
            <span class="sw-icon- sw-icon-local_mall "></span>商品 {{msg.goodsCount}} &nbsp;&nbsp;
            <span class="sw-icon- sw-icon-content_paste "></span>订单 {{msg.orders}}

          </div>
        </div>
        <div style=" margin-left:40px;line-height:30px;font-size:20px">
          <span style="font-size:16px">实时营业额</span> &nbsp;&nbsp;
          <span style="color:#00CC66">${{msg.RealTimeSales}}</span> <br>
          <span style="font-size:16px">营业总额</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="color:#0099FF"> ${{msg.businessSales}}</span>
          <div style="">
            <el-switch v-model="msg.status" on-color="#13ce66" off-color="#ff4949"></el-switch>
            <div style="display:inline-block;margin-left:15px" v-if="msg.RealTimeSales > 0">
              <el-button type="text">结账</el-button>
            </div>
          </div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,0.9);padding:15px;border-radius:20px;margin-top:15px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="信息总览" name="f1">
            <div>
              <span >查看方式</span>
              <div style="width:100px;display:inline-block">
                <el-select v-model="previewStyle" placeholder="请选择">
                  <el-option  v-for="item in previewList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="width:100px;display:inline-block;margin-left:30px">
                <el-date-picker v-model="year" align="right" :type="previewStyle" placeholder="选择年" default-value="2017">
                </el-date-picker>
              </div>
            </div>
            <hr>
            <div id="sdata" style="width:100%;height:500px"></div>
          </el-tab-pane>
          <el-tab-pane label="店铺海报" name="f2">
            <div>
              <el-button type="danger" :plain="true" >批量删除</el-button>
              <el-button type="primary" :plain="true" >添加海报</el-button>
            </div>
            <hr>
            <el-row :gutter="30">
              <el-col :lg="8" :md="12" :sm="24" :xs="24">

              </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="msg.imgUrl" border tooltip-effect="dark" style="width: 100%">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="num" width="55" label="序号">
              </el-table-column>
              <el-table-column prop="url" label="海报图片">
                <template scope="scope">
                  <div style="padding:10px 10px">
                    <img v-bind:src="scope.row.url" height="100px">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="link" label="海报链接">
              </el-table-column>
              <el-table-column  label="操作" >
                <template scope="scope">
                  <el-button type="text" size="small" @click="deleteSimpleRow(scope.row.id,scope.$index)">删除</el-button>
                  <el-button type="text" size="small" @click="updateSimpleRow(scope.row,scope.$index)">修改</el-button>
                  <el-button type="text" size="small">上移</el-button>
                  <el-button type="text" size="small">下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="商品" name="f3">
            <div>
              <el-checkbox v-model="checkedAll">全选</el-checkbox>
              <el-button type="danger" :plain="true">批量删除</el-button>
              <el-button type="primary" :plain="true">批量上线</el-button>
              <el-button type="primary" :plain="true">批量下线</el-button>
              <el-button type="primary" @click="navToAddGoods()" >添加商品</el-button>
              <el-select style="float:right" v-model="classValue" placeholder="请选择">
                <el-option v-for="item in shopClass" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <hr>
            <el-row :gutter="30">
              <el-col :lg="8" :md="8" :sm="12" :xs="24" style="margin-bottom:30px">
                <div class="panel-start item-center" style="padding:15px;background:#fff;border-radius:10px;border:1px solid #d4d4d4">
                  <div style="width:110px;height:110px;border-radius:5px;background:url(/static/img/c1.jpg)">
                    <el-checkbox v-model="checkedAll"></el-checkbox>
                  </div>
                  <div style="margin-left:15px">
                    <div style="font-weight:bold;font-size:16px">我的中国心</div>
                    <div>销量:1500</div>
                    <div><span class="price">￥500</span> <span class="oprice">￥560</span></div>
                    <div>
                      <el-checkbox v-model="checkedAll">上线</el-checkbox>
                      <el-checkbox v-model="checkedAll">折扣</el-checkbox>
                      <div>
                        <el-button type="text">删除</el-button>
                        <el-button type="text">查看修改</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="订单" name="f4">订单</el-tab-pane>
          <el-tab-pane label="预约单" name="f5">预约单</el-tab-pane>
          <el-tab-pane label="关注" name="f6">预约单</el-tab-pane>
          <el-tab-pane label="评论" name="f7">评论</el-tab-pane>
        </el-tabs>
      </div>

    </div>
  </div>
</template>

<style>
  .shoppanel {
    width: 100%;
    border-radius: 20px;
    padding: 15px;
    background: url('/static/img/mzsbg.jpg') #fff;
    background-size: cover;
  }

  .avatar-uploade .el-upload {
    border: 6px solid #ffffff;
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }

  .avatar-uploade .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
<script>
var echarts = require('echarts');
export default {
  mounted: function() {
    this.showCharts();
    var date = new Date();
    this.year = date.getFullYear();
  },
  data() {
    return {
      shopClass:[{label:'傻逼',value:'阿斯达'},{label:'阿撒旦',value:'的方式是的'}],
      classValue:'全部',
      checkedAll:false,
      year:'',
      previewStyle:'year',
      previewList:[{label:'年',value:'year'},{label:'月',value:'month'}],
      activeName: 'f1',
      msg: {
        cover: '/static/img/c2.jpg', name: 'XX皮肤妆容中心', score: 4.5, location: '宁波市江北区洪塘路128号', phone: '17858959662',
        follow: 25, goodsCount: 152, orders: 120, businessSales: 15823.5, RealTimeSales: 1535, status: true,
        imgUrl: [{ url: '/static/img/c1.jpg', link: 'adsad',num:1 }, { url: '/static/img/c2.jpg', link: 'asdasd',num:2 }],

      }
    }
  },
  methods: {
    navToAddGoods: function () {
      this.$router.push({name:'goodsAdd'})
    },
    showCharts: function() {
      var myChart = echarts.init(document.getElementById('sdata'));
      myChart.setOption({

        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单数', '关注数']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '订单数',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '关注数',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [
                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      });
    },
    routerBack: function() {
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

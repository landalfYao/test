<template>
  <transition name="el-fade-in-linear">
    <div class="panel">
      <div style="padding:30px">
        <div class="font-el">信息总览(建设中)</div>
        <hr>
        <div>
          <el-date-picker @change="dateChange" v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div id="c1"></div>
      </div>
    </div>
  </transition>
</template>

<script>
var G2 = require('g2');
export default {
  data(){
    return {
      date:'',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },
  mounted(){
    this.overView();
  },
  methods:{
    dateChange(e){
      console.log(e)
    },
    overView(){
      var data = [
        {name: '访问量',data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]},
        {name: '销量',data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3,194.1, 95.6, 54.4]},
        {name: '入住量',data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2,194.1, 95.6, 54.4]},
      ];
      for(var i=0; i < data.length; i++) {
        var item = data[i];
        var datas = item.data;
        var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
        for(var j=0; j < datas.length; j++) {
          item[months[j]] = datas[j];
        }
        data[i] = item;
      }
      var Stat = G2.Stat;
      var Frame = G2.Frame;
      var frame = new Frame(data);
      frame = Frame.combinColumns(frame, ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],'数量','月份','name');
      var chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height : 350,
        plotCfg: {
          margin: [20,90,60,60]
        }
      });
      chart.source(frame);
      chart.col('name',{alias: '城市'});
      chart.intervalDodge().position('月份*数量').color('name');
      chart.render();
    }
  }
}
</script>

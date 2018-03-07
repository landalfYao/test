<template>
<transition name="el-fade-in-linear">
  <div>
        <div class="card pd-20 pd-sm-40">
          <h6 class="card-body-title">修改商品</h6>
          <p class="mg-b-20 mg-sm-b-30">A form with a label on top of each form control.</p>

          <div class="form-layout">
            <div class="row mg-b-25">
              <div class="col-lg-12">
                <div class="form-group">
                  <label class="form-control-label">所属分类: <span class="tx-danger">*</span></label>
                  <el-cascader v-model="categoryId"  :options="category" @active-item-change="categoryChange" :props="props" ></el-cascader>
                </div>
              </div><!-- col-4 -->

              <div class="col-lg-4">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">商品名称: <span class="tx-danger">*</span></label>
                  <input class="form-control" v-model="data.name" type="text"  placeholder="商品名称">
                </div>
              </div><!-- col-8 -->
              <div class="col-lg-4">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">商品销量: <span class="tx-danger">*</span></label>
                  <input class="form-control" v-model="data.sales" type="text"  placeholder="商品销量">
                </div>
              </div><!-- col-8 -->
              <div class="col-lg-4">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">商品折扣: <span class="tx-danger">*</span></label>
                  <input class="form-control" v-model="data.discount" type="number"  placeholder="商品折扣">
                </div>
              </div><!-- col-4 -->
              <div class="col-lg-12">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">商品描述: <span class="tx-danger">*</span></label>
                  <input class="form-control" v-model="data.remark.des" type="text"  placeholder="商品描述">
                </div>
              </div><!-- col-8 -->
              <div class="col-lg-4">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">店铺名称: <span class="tx-danger"></span></label>
                  <input class="form-control" v-model="data.remark.shopName" type="text"  placeholder="店铺名称">
                </div>
              </div><!-- col-8 -->
              <div class="col-lg-4">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">店铺电话: <span class="tx-danger"></span></label>
                  <input class="form-control" v-model="data.remark.shopTel" type="text"  placeholder="店铺电话">
                </div>
              </div><!-- col-8 -->
              <div class="col-lg-4">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">店铺地址: <span class="tx-danger"></span></label>
                  <input class="form-control" v-model="data.remark.address" type="text"  placeholder="店铺地址">
                </div>
              </div><!-- col-8 -->
              <div class="col-lg-12">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">商品主图: <span class="tx-danger">*</span></label>
                  <div class="panel-start">
                    <div class="showpho" v-for="(item,index) in data.tempimage" :key="index" >

                      <img :src="item" width="100%">
                      <div style="color:#fff;cursor:pointer;width:100%;line-height:30px;background:rgba(0,0,0,0.7);text-align:center;position:relative;top:-30px" @click="delPho(index)">删除</div>
                    </div>
                    <a href="javascript:;" class="upload-file">
                      +
                      <input type="file" id="file" @change="fileUpload()" >
                    </a>
                  </div>
                </div>
              </div><!-- col-12 -->
            </div><!-- row -->
            <div class="col-lg-12">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">商品属性: <span class="tx-danger">*</span>
                    <button type="button" class="btn btn-info pd-x-25 btn-sm" data-toggle="modal" data-target="#modaldemo1">添加属性</button>
                  </label>
                  <div class="table-responsive">
                    <table class="table mg-b-0">
                      <thead>
                        <tr>
                          <th>图片</th>
                          <th>属性名称</th>
                          <th>价格</th>
                          <th>重量</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,index) in attr" :key="index">
                          <td><img :src="item.image" width="30px"></td>
                          <td>{{item.name}}</td>
                          <td>{{item.price}}</td>
                          <td>{{item.weight}}</td>
                          <td><button type="button" class="btn btn-danger pd-x-25 btn-sm" @click="delattr(index)">删除</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div><!-- col-8 -->
            <div class="col-lg-12">
                <div class="form-group mg-b-10-force">
                  <label class="form-control-label">图文详情: <span class="tx-danger">*</span></label>
                  <div id="editor" style="z-index:-1">
                      <p>写点什么吧</p>
                  </div>
                </div>
              </div><!-- col-12 -->
            <div class="form-layout-footer">
              <button class="btn btn-info mg-r-5" id="submitCreate">立即提交</button>
            </div><!-- form-layout-footer -->
          </div><!-- form-layout -->
        </div><!-- card -->


        <!-- BASIC MODAL -->
    <div id="modaldemo1" class="modal fade" style="z-index:100000000">
      <div class="modal-dialog modal-dialog-vertical-center modal-lg" role="document">
        <div class="modal-content bd-0 tx-14">
          <div class="modal-header pd-y-20 pd-x-25">
            <h6 class="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">属性信息</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pd-25">
              <div class="row row-xs">
                <label class="col-sm-4 form-control-label"><span class="tx-danger">*</span> 图片:</label>
                <div class="col-sm-8 mg-t-10 mg-sm-t-0">
                  <a href="javascript:;" class="upload-file">
                      {{attrData.image !='' ? '':'+'}}
                      <img v-if="attrData.image !=''" :src="attrData.image" width="100%">
                      <input type="file" id="sfile" @change="fileUpload(1)" >
                  </a>
                </div>
              </div><!-- row -->
              <div class="row row-xs">
                <label class="col-sm-4 form-control-label"><span class="tx-danger">*</span> 属性名称:</label>
                <div class="col-sm-8 mg-t-10 mg-sm-t-0">
                  <input type="text" class="form-control" v-model="attrData.name" placeholder="属性名称">
                </div>
              </div><!-- row -->
              <div class="row row-xs mg-t-20">
                <label class="col-sm-4 form-control-label"><span class="tx-danger">*</span> 价格:</label>
                <div class="col-sm-8 mg-t-10 mg-sm-t-0">
                  <input type="text" class="form-control" v-model="attrData.price" placeholder="价格">
                </div>
              </div>
              <div class="row row-xs mg-t-20">
                <label class="col-sm-4 form-control-label"><span class="tx-danger">*</span> 重量(kg):</label>
                <div class="col-sm-8 mg-t-10 mg-sm-t-0">
                  <input type="text" class="form-control" v-model="attrData.weight" placeholder="重量">
                </div>
              </div><!-- row -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info pd-x-20" @click="submitAttr()" data-dismiss="modal">确认提交</button>
            <button type="button" class="btn btn-secondary pd-x-20" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div><!-- modal-dialog -->
    </div><!-- modal -->
  </div>
</transition>
</template>
<script>
var E = require('wangeditor');
export default {
  data(){
    return {
      category:[
        {label:'自营产品',value:1,sub:[
          // {label:'聚划算',value:1},
          // {label:'婚庆用品',value:2},
          // {label:'礼品套餐',value:3},
        ]},
        {label:'非自营产品',value:2,sub:[
          // {label:'孕婴用品',value:4},
          // {label:'服装鞋帽',value:5},
          // {label:'婚庆用品',value:6},
          // {label:'数码电脑',value:7},
          // {label:'手机配件',value:8},
          // {label:'家用电器',value:9},
          // {label:'彩妆美容',value:10},
          // {label:'其他',value:11},
        ]}
      ],
      props: {
        label:'label',
        value: 'value',
        children: 'sub'
      },
      categoryId:null,
      attr:[],
      attrData:{
        name:'',
        image:'',
        weight:'',
        price:'',
        id:''
      },
      data:{
        id:null,
        appid:'',
        name:'',
        discount:'',
        tempimage:[],
        image:'',
        richtext:'',
        remark:{
          des:'',
          shopName:'',
          shopTel:'',
          address:''
        },
        sales:'',
        tempCaId:0
      }
    }
  },
  mounted(){
    this.data.appid = this.$store.state.appid;
    this.data.id = this.$store.state.goodsParam.id;
    this.getCate();
    this.editorUpload();
  },
  methods: {
    getCate(){
      var that = this;
      $.ajax({
          type: "POST",
          url: that.$store.state.ip + "categoryfind",
          data: {
            appid:this.$store.state.appid
          },
          dataType:'JSON',
          success: function(res) {
            if (res.code == 1000) {
              for(var j in res.body){
                if(j<3){
                  that.category[0].sub.push({label:res.body[j].name,value: parseInt(j)+1})
                }else{
                  that.category[1].sub.push({label:res.body[j].name,value: parseInt(j)+1})
                }

              }
              that.getGoods();
            }
          }
        });
    },
    delPho(index){
      this.data.tempimage.splice(index,1)
    },
    delattr(index){
      this.attr.splice(index,1);
    },
    getGoods(){
      var that = this;

    },
    submitAttr(){
      var that = this;
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "attributeadd",
        data: this.attrData,
        dataType:'JSON',
        success(res){
          console.log(res)
          if(res.code == 1000){
            that.attr.push({sunwouId:res.result,name:that.attrData.name,image:that.attrData.image,price:that.attrData.price,weight:that.attrData.weight});
            console.log(that.attr);
            that.$message({
                type: "success",
                message: 'ok'
            });
          }
        }
      })
      // $.post(this.$store.state.ip + "attributeadd",this.attrData,function(res){
      //   console.log(res)
      //   if(res.code == 1000){
      //     var at = this.attrData;
      //     at.id = res.result;
      //     that.attr.push(at);
      //     console.log(that.attr)
      //     that.$message({
      //         type: "success",
      //         message: 'ok'
      //     });
      //   }
      // })
    },
    categoryChange(e){
      this.categoryId = e;
    },
    //图片上传
    fileUpload(num) {
      var that = this;
      var formData = new FormData();
      if(num == 1){
        formData.append("file",document.getElementById("sfile").files[0]);
      }else{
        formData.append("file",document.getElementById("file").files[0]);
      }
      formData.append("type", 1);
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "file/up",
        data: formData,
        dataType:'JSON',
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.code == 1000) {
            if(num == 1){
              that.attrData.image = that.$store.state.ip+res.body
            }else{
              that.data.tempimage.push(that.$store.state.ip+res.body);
            }
            that.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            that.$message({
              type: "error",
              message: res.result
            });
          }
        },
        fail(e){
          console.log(e)
        },
      });
    },
    //富文本编辑器
    editorUpload: function() {
      var that = this;
      var editor = new E("#editor");
      //图片路径配置
      editor.customConfig.uploadImgServer =
        that.$store.state.ip + "file/up";
      //图片限制大小 2MB
      editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
      //图片数量设置
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.customUploadImg = function(files, insert) {
        var formData = new FormData();
        formData.append("file", files[0]);
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "file/up",
          data: formData,
          dataType:'JSON',
          processData: false,
          contentType: false,
          success: function(res) {
            if (res.code == 1000) {
              insert(that.$store.state.ip + res.body);
              that.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              that.$message({
                type: "error",
                message: res.result
              });
            }
          }
        });
      };
      $.ajax({
        type: "POST",
        url: this.$store.state.ip + "findcommodity",
        data: {
          appid:this.$store.state.appid,
          sunwouId:this.$store.state.goodsParam.id,
          page:1,
          size:1
        },
        dataType:'JSON',
        success(res){
          var so = res.body[0];
          so.remark = JSON.parse(so.remark);
          so.tempimage = JSON.parse(so.image);
          that.attr = so.attribute;
          delete so.attribute;
          delete so.isDelete;
          delete so.createTime;
          delete so.lastUpdateTime;
          delete so.sort;
          so.image = null;
          that.tempCaId = so.categoryId;
          for(var i in that.category){
            for(var j in that.category[i].sub){
              if(that.category[i].sub[j].value == so.categoryId){
                that.categoryId = [that.category[i].value,that.category[i].sub[j].value];
              }
            }
          }
          console.log(that.categoryId)
          that.data = so;
          editor.create();
          editor.txt.html(so.richtext)
        }
      })

      $("#submitCreate").click(function() {
        var goods = that.data;
        console.log(that.categoryId)
        goods.image = JSON.stringify(that.data.tempimage);
        goods.richtext = editor.txt.html();
        goods.attributes = '';
        if(that.categoryId[1] == that.tempCaId){
          goods.categoryId = that.tempCaId
        }else{
          goods.categoryId = that.categoryId[1];
        }

        goods.remark = JSON.stringify(that.data.remark);
        for(var i in that.attr){
          goods.attributes += that.attr[i].sunwouId + ',';
        }
        $.ajax({
          type: "POST",
          url: that.$store.state.ip + "commodityupdate",
          data: goods,
          dataType:'JSON',
          success(res){
            if (res.code == 1000) {
                that.$message({
                  type: "success",
                  message: res.result
                });
                that.$router.push({ path: "/goods_list" });
              } else {
                that.$message({
                  type: "warring",
                  message: res.result
                });
              }
          }
        })


      });
    },
  }
}
</script>

<style>
.panel-start{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap
}
.showpho{
  width: 120px;
  height: 120px;
  border: 1px dotted #e1e1e1;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.upload-file{
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 1px dotted #c1c1c1;
  border-radius: 5px;
  line-height: 120px;
  text-align: center;
  font-size: 40px;
  color: #888;
  overflow: hidden;
  cursor: pointer;
}
.upload-file:hover{
  border: 1px dotted #888888;
  color: #444
}
.upload-file input{
  position: relative;
  top: -120px;
  width: 120px;
  height: 120px;
  opacity: 0;
}
</style>

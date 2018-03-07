<template>
<transition name="fade" mode="out-in" appear>
  <div>
    <Breadcrumb>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem>校园代理列表</BreadcrumbItem>
    </Breadcrumb>
    <!-- <div class="font-title">城市配送员列表</div> -->
    <ButtonGroup style="margin-top:20px">
        <Button type="error"><Icon size="14" type="trash-a"></Icon> 批量删除 </Button>
        <Button type="success"><Icon type="ios-checkmark-empty"></Icon>批量通过</Button>
        <Button type="default"><Icon type="compose"></Icon>批量驳回</Button>
    </ButtonGroup>
    <Input  v-model="search" icon="ios-search" placeholder="搜索" @input="searchInput" style="width: 200px;float:right;margin-top:20px"></Input>
    <Table ref="selection" :columns="tableColumns" :data="tableData" style="margin-top:20px"
    @on-selection-change="selectionChange"></Table>
    <Page style="margin-top:20px;float:right" :total="pageModel.total" :page-size="pageModel.pageSize"
    :current="pageModel.pageIndex" size="small" show-elevator show-sizer show-total @on-change="pageChange"
    @on-page-size-change="pageSizeChange"></Page>
    <div style="clear:both"></div>
  </div>
  </transition>
</template>
<style>
@import url('../../assets/css/style.css');
</style>

<script>
export default {
  data () {
    return {
      search:'',
      tableColumns:[
        {type: 'selection',width: '50px',align: 'center'},
        {title:'姓名',key:'name',align: 'center'},
        {title:'手机',key:'phone',align: 'center'},
        {title:'学号',key:'num',align: 'center'},
        {title:'所在院校',key:'school',align: 'center'},
        {title:'身份证号',key:'number',align: 'center'},
        {title:'身份证正面',key:'image1',align: 'center',
        render: (h, params) => {
          return h('div', [
            h('div', {
              style: {
                background: "url("+params.row.image1+")",
                backgroundSize:'cover',
                width:'120px',
                height:"80px"
              }
            })
          ]);
        }},
        {title:'身份证背面',key:'image2',align: 'center',
        render: (h, params) => {
          return h('div', [
            h('div', {
              style: {
                background: "url("+params.row.image2+")",
                backgroundSize:'cover',
                width:'120px',
                height:"80px"
              }
            })
          ]);
        }},
        {title:'操作',key:'',align: 'center',
        render:(h, params) => {
          return h('ButtonGroup',[
            h('Button',{
              props:{
                type:'success',
                size:'small'
              },
              on:{
                click(){
                  alert(params.index)
                }
              }
            },'通过'),
            h('Button',{
              props:{
                type:'default',
                size:'small'
              },
              on:{
                click(){
                  alert(params.index)
                }
              }
            },'驳回'),
            h('Button',{
              props:{
                type:'error',
                size:'small'
              },
              on:{
                click(){
                  alert(params.index)
                }
              }
            },'删除')
          ])
        }}
      ],
      tableData:[
        { phone: '17858959662',
          name:'姚志炎',number:'33052119950308133X',image1:'http://img.mp.sohu.com/upload/20170704/fee759c4743347c18f7ab53687e91965_th.png',
          image2:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513763791568&di=7dd477cdf21cc8cb6720f5fb33a5afeb&imgtype=0&src=http%3A%2F%2Fimage.techweb.com.cn%2Fupload%2Froll%2F2017%2F08%2F30%2F201708309394_7375.jpg',
          num:'1422130327',school:'大红鹰学院'
        }
      ],
      pageModel:{
        pageIndex:1,
        total:50,
        pageSize:10
      }
    }
  },
  mounted(){
    this.getTableData();
  },
  methods:{
    /**搜索 */
    searchInput(e){
      this.search = e;
      this.getTableData();
    },
    /**获取表数据 */
    getTableData(){

    },
    /**改变页码 */
    pageChange(index){
      this.pageModel.pageIndex = index;
      this.getTableData();
    },
    /**改变一页数量 */
    pageSizeChange(size){
      this.pageModel.pageSize = size;
      this.getTableData();
    },
    /**表选择的数据 */
    selectionChange(e){
      console.log(e)
    }
  }
}
</script>

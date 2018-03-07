<template>
<transition name="fade" mode="out-in" appear>
  <div>
    <Breadcrumb>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem>城市费用列表</BreadcrumbItem>
    </Breadcrumb>
    <!-- <div class="font-title">城市配送员列表</div> -->
    <ButtonGroup style="margin-top:20px">
        <Button type="error"><Icon size="14" type="trash-a"></Icon> 批量删除 </Button>
        <Button type="primary"><Icon type="ios-checkmark-empty"></Icon>添加城市</Button>
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
        {title:'城市名',key:'name',align: 'center'},
        {title:'起步价',key:'startPrice',align: 'center'},
        {title:'每公里',key:'meta',align: 'center'},
        {title:'每公里费用',key:'metaPrice',align: 'center'},
        {title:'操作',key:'',align: 'center',
        render:(h, params) => {
          return h('ButtonGroup',[
            h('Button',{
              props:{
                type:'primary',
                size:'small'
              },
              on:{
                click(){
                  alert(params.index)
                }
              }
            },'修改'),

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
        { name: '上海',startPrice:15,
          meta:1000,metaPrice:3
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

<template>
    <div class="concern approve_wrap">
        <!--页头-->
        <approve-top-search
            :tabButtons="tabButtons"
            moduleName="concern"
            @openCreateModal="createApprove"
            @changeApprvoeType="updataTableListByState"
            @changeSearch="updataTableListBySearch">
        </approve-top-search>
        <!--table表格-->
        <el-row :gutter="0" class="table">
            <approve-table
                :data ="tableData"
                :loading = "tableLoading"
                @refleshTable = "getRefleshTableData"
                @sortTaskList = "sortTaskList"
                fromPage="concern">
            </approve-table>
        </el-row>
        <!--右侧弹窗-->
        <approve-right-modal :dialogVisible = "dialogVisible" @closeCreateModal="changeDialogVisible"></approve-right-modal>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import approveTopSearch from '@Main/approve/components/approve.topSearch.vue'
    import approveRightModal from '@Main/approve/components/approve.rightModal.vue'
    import approveTable from '@Main/approve/components/approve.table.vue'
    import { concernListData } from '@Main/approve/getData'

    export default{
        components: {
          approveTopSearch,
          approveRightModal,
          approveTable,
        },
        data(){
            return {
                tabButtons:['all','approving','pass','reject','draft','skip','untread'],//页头显示的状态过滤标签
                tableLoading:false,//dataList加载动画开关
                tableData:{},//我发起的审批list
                dialogVisible:false,//右侧弹出窗开关
                approveType:null,//缓存已选择审批状态，默认null全部
                inputSearch:{//搜索缓存
                    flowCategory: [], //流程类型
                    betweenDate: '', //发起时间
                    createPersonName: '',//发起人，单选
                    createPersonId: ''//发起人，单选
                },
                flowCategoryId:'',//已选流程类型
                startDate:'',//已选开始日期
                endDate:'',//已选结束日期
                pageNum:1, //已选当前页码
                pageCount:10, //已选分页大小
            }
        },
        methods:{
            //创建审批，打开右侧弹出窗
            createApprove(type) {
                this.dialogVisible = type
            },
            //获取我关注的审批
            async getConcernTableData( { state=null , flowCategoryId= '' ,  startDate= '' , endDate = '', createPersonId= '' ,  pageNum=1 , pageCount=10 , orderby = [] } = {} ){
                this.tableLoading=true;
                let res = await concernListData( state , flowCategoryId , startDate , endDate, createPersonId , pageNum , pageCount ,orderby )
                console.info(res[0])
                if (res[0].list && res[0].list.length != 0) {
                    this.tableData = JZY.u.deepExtend({},res[0])
                    this.tableLoading=false;
                }else{
                    this.tableData = {}
                    // this.$message('获取数据为空')
                    this.tableLoading=false;
                }
            },
            //根据审批类型state，过滤审批list
            updataTableListByState:function(obj) {
                let state = null;
                switch(obj.name){
                    case 'all':
                      state = null
                      break;
                    case 'approving':
                      state = 1
                      break;
                    case 'pass':
                      state = 2
                      break;
                    case 'reject':
                      state = 3
                      break;
                    case 'draft':
                      state = 4
                      break;
                    case 'skip':
                      state = 5
                      break;
                    case 'untread':
                      state = 6
                      break;
                    default:
                      state = null
                }
                this.approveType = state;
                this.flowCategoryId = obj.flowCategoryId
                this.startDate = obj.startDate
                this.endDate = obj.endDate
                this.inputSearch.createPersonId = obj.createPersonId
                this.getConcernTableData( { 'state':state, 'flowCategoryId':this.flowCategoryId, 'startDate':this.startDate, 'endDate' : this.endDate,'createPersonId':this.inputSearch.createPersonId } )
            },
            //根据搜索框的值，过滤审批list
            updataTableListBySearch:function(obj) {
                console.info(obj)
                // this.flowCategoryId = obj.flowCategory[obj.flowCategory.length -1]
                this.flowCategoryId = obj.flowCategoryCode
                
                this.startDate =  obj.betweenDate && obj.betweenDate.length > 0 && obj.betweenDate[0]
                this.endDate =  obj.betweenDate && obj.betweenDate.length > 0 && obj.betweenDate[1]
                
                this.inputSearch =  JZY.u.deepExtend( {} , obj )

                this.getConcernTableData( { 'state':this.approveType , 'flowCategoryId':this.flowCategoryId, 'startDate':this.startDate , 'endDate' : this.endDate ,'createPersonId':this.inputSearch.createPersonId } )
            },
            //子组件回调，关闭父组件弹出窗
            changeDialogVisible:function(type = ''){
              this.dialogVisible = false
              console.info(type)
              if (type === 'reflashData') {//刷新table
                this.getConcernTableData()
              }
            },
            //审批列表排序
            sortTaskList(orderby){
              // console.log(orderby)
              this.getConcernTableData( { 'state':this.approveType , 'flowCategoryId':this.flowCategoryId, 'startDate':this.startDate , 'endDate' : this.endDate,'createPersonId':this.inputSearch.createPersonId, 'pageNum':this.pageNum, 'pageCount':this.pageCount , 'orderby':[orderby]} )
            },
            //刷新审批列表table，刷新右侧导航栏里的条数
            getRefleshTableData( { pageNum = 1 ,pageCount=10 } = {} ){
                this.pageNum = pageNum
                this.pageCount = pageCount
                this.getConcernTableData( { 'state':this.approveType , 'flowCategoryId':this.flowCategoryId, 'startDate':this.startDate , 'endDate' : this.endDate,'createPersonId':this.inputSearch.createPersonId, 'pageNum':pageNum, 'pageCount':pageCount } )
            },
            
        },
        mounted(){
            this.getConcernTableData()//获取我关注的审批table数据
        }
    }
</script>
<style scoped lang="scss">
.concern.approve_wrap{
  
}

</style>
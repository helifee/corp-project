<template>
    <div class="task task_wrap">
      <!--页头-->
      <task-top-search
        moduleName='task'
        @searchTask = "searchTaskList"
        @openCreateModal = "createTask">
        <!--项目调用任务模块时候的插槽-->
        <template slot-scope="scope">
          <slot></slot>
        </template>
      </task-top-search>
      <!--table表格-->
      <el-row class="table">
          <task-list-table
            :data ="tableData"
            moduleName='task'
            @refleshTable = "refleshTable"
            @sortTaskList = "sortTaskList">
          </task-list-table>
      </el-row>
      <!--右侧弹窗-->
      <task-right-modal :dialogVisible = "dialogVisible" @closeCreateModal="changeDialogVisible"></task-right-modal>
    </div>
</template>

<script>
    JZY.locale.add('taskLocale',require('./task.locale'))
    import config from '@/config/index.js'
    import taskTopSearch from '@Main/task/components/task.topSearch.vue'
    import taskListTable from '@Main/task/components/task.table.vue'
    import taskRightModal from '@Main/task/components/task.rightModal.vue'
    import {mapActions} from 'vuex'
    import {getTaskList} from '@Main/task/getData'
    
    export default{
        components: {
            taskTopSearch,
            taskListTable,
            taskRightModal,
        },
        data(){
            return {
                dialogVisible:false,
                tableData:{},
                inputSearch:{//搜索缓存
                  taskName:'',//任务名称
                  taskStatus:''//任务状态
                },
                pageNum:'1', //当前页码
                pageCount:10, //分页大小
                orderbyTemp:'',//缓存当前的排序规则
            }
        },
        props:{
          projectId:{//项目模块调用此组件用的项目id
            type:String,
            default:''
          },
        },
        methods:{
            ...mapActions([
                'taskSetMenuNumber'
            ]),
            //创建任务，打开右侧弹出窗
            createTask(type) {
                this.dialogVisible = type
            },
            //子组件回调，关闭父组件弹出窗
            changeDialogVisible:function(type = ''){
              this.dialogVisible = false
              console.info(type)
              if (type === 'refleshTable') {//刷新table
                this.refleshTable()
                // alert("444")
              }
            },
            //获取我创建的任务列表
            async getTaskListData( {type = '0' ,projectId = this.projectId ,taskName = '' ,taskStatus = '' ,pageNum = '1' ,pageCount=10 ,orderby = [] } = {} ){
                let res = await getTaskList( type ,projectId ,taskName ,taskStatus ,pageNum ,pageCount ,orderby  ,'task')
                console.info(res[0])
                // this.tableData = [...res[0].list]
                if (res[0].list.length != 0) {
                  this.$emit('getPageTotal',res[0].total)  //给项目调用任务组件回传list总数
                  this.tableData = JZY.u.deepExtend({},res[0])
                }else{
                  this.tableData = {}
                }
                //更新任务模块的左侧菜单条数
                this.taskSetMenuNumber({
                  num:res[0].total,
                  moduleType:'task'
                })
            },
            //查询任务
            searchTaskList(obj){
              // console.info(obj)
              this.inputSearch = { //缓存搜索记录
                taskName:obj.taskName,
                taskStatus:obj.taskStatus
              }
              this.getTaskListData( {'taskName':obj.taskName, 'taskStatus':obj.taskStatus } )
            },
            //任务列表排序
            sortTaskList(orderby){
              // console.log(orderby)
              this.getTaskListData( {'taskName':this.inputSearch.taskName,'taskStatus':this.inputSearch.taskStatus, 'pageNum':this.pageNum, 'pageCount':this.pageCount ,'orderby':[orderby]} )
              
              this.orderbyTemp = orderby
            },
            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' ,pageCount=10 } = {} ){
              this.pageNum = pageNum
              this.pageCount = pageCount
              let orderbyStr = this.orderbyTemp === '' ? []:[this.orderbyTemp]
              this.getTaskListData( { 'taskName':this.inputSearch.taskName,'taskStatus':this.inputSearch.taskStatus, 'pageNum':pageNum, 'pageCount':pageCount ,'orderby':orderbyStr } )
            },
        },
        mounted(){//console.log在chrome浏览器中调试用
            // window.vue = this
            this.getTaskListData()
        }
    }
</script>
<style scoped lang="scss">
.task.task_wrap{
    .project_select{
      display:inline-block;
    }
}
</style>
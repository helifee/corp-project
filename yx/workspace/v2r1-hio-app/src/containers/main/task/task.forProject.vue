<!--任务首页——项目项目模块调用-->
<template>
    <div class="task task_wrap">
      <!--table表格-->
      <el-row :gutter="20" class="table">
          <task-list-table
            :data ="tableData"
            moduleName="taskForProject"
            @refleshTable = "refleshTable"
            @sortTaskList = "sortTaskList">
          </task-list-table>
      </el-row>
      <!--右侧弹窗-->
      <task-right-modal :dialogVisible = "dialogVisible" @closeCreateModal="changeDialogVisible" :projectId ="projectId" :projectName ="projectName" ></task-right-modal>
    </div>
</template>

<script>
    JZY.locale.add('taskLocale',require('./task.locale'))
    import config from '@/config/index.js'
    import projectTopSearch from '@Main/task/components/task.forProject.topSearch.vue'
    import taskListTable from '@Main/task/components/task.table.vue'
    import taskRightModal from '@Main/task/components/task.rightModal.vue'
    import {mapActions} from 'vuex'
    import { getTaskList , getTaskFromProjectList } from '@Main/task/getData'

    export default{
        components: {
            projectTopSearch,
            taskListTable,
            taskRightModal,
        },
        data(){
            return {
                dialogVisible:false,
                tableData:{},
                inputSearch:{//搜索缓存
                  taskName:'',//任务名称
                },
                pageNum:'1', //当前页码
                pageCount:10, //分页大小
            }
        },
        props:{
          projectId:{//项目模块调用此组件用的项目id
            type:String,
            default:''
          },
          projectName:{//项目模块调用此组件用的项目名称
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
              // alert(9)
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
            async getTaskListData( { projectId = this.projectId ,taskName = '' ,createPersonList = [] ,beginTime = '' , endTime = '', pageNum = '1' ,pageCount=10 ,orderby = [] } = {} ){
                let res = await getTaskFromProjectList( projectId ,taskName ,createPersonList , beginTime ,endTime ,pageNum ,pageCount ,orderby )
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
                taskName:obj.taskName
              }
              this.getTaskListData( {'taskName':obj.taskName } )
            },
            //任务列表排序
            sortTaskList(orderby){
              // console.log(orderby)
              this.getTaskListData( {'taskName':this.inputSearch.taskName, 'pageNum':this.pageNum, 'pageCount':this.pageCount ,'orderby':[orderby]} )
            },
            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' ,pageCount=10 } = {} ){
              this.pageNum = pageNum
              this.pageCount = pageCount
              this.getTaskListData( { 'taskName':this.inputSearch.taskName, 'pageNum':pageNum, 'pageCount':pageCount } )
            },
        },
        mounted(){//console.log在chrome浏览器中调试用
            window.vue = this
            // this.getTaskListData()
            this.getTaskListData( )
        },
        watch:{
            projectId:function(newVal , oldVal){
                this.getTaskListData( {'projectId':newVal} )
            }
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
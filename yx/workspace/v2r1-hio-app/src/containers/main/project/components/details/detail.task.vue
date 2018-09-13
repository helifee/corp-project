<template>
    <div class="task-wrap">
        <!--页头-->
        <project-top-search
                moduleName='task'
                :projectPermissionValue="projectPermissionValue"
                @searchTask = "searchTaskList"
                @openCreateModal = "createTask">

            <!--项目调用任务模块时候的插槽-->
            <template slot-scope="scope">
                <div class="project_select">
                    <el-select v-model="value"  size="small" placeholder="请选择" @change = "changeUrl">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </template>

        </project-top-search>
        <task-list
                v-show=" value == '1'&& id "
                ref="taskList"
                :projectId = "id"
                :projectName = "projectName"
                @getPageTotal = "getPageTotal">
        </task-list>
        <div v-if="value == '2'" >
            <p style="font-size: 12px">甘特图</p>
        </div>
        <div v-if="value == '3'" >
            <schedule-view v-if="memberList!=null" :memberList="memberList" :id="id"></schedule-view>
        </div>


    </div>
</template>
<script>


    import taskDetail from '@Main/task/components/task.detail.vue'
    import projectTopSearch from '@Main/task/components/task.forProject.topSearch.vue'
    import taskList from '@Main/task/task.forProject.vue'
    import taskRightModal from '@Main/task/components/task.rightModal.vue'

    import flowForm from "@/containers/main/flowForm/client"
    import scheduleView from './detail.view.schedule'
    export default {
        components: {
            taskDetail,
            projectTopSearch,
            taskList,
            taskRightModal,
            scheduleView,


            flowForm,
        },
        props:['id','projectName',"projectPermission"],
        computed:{
            projectPermissionValue: {
                get:function(){
                    if(this.projectPermission =='4'){
                        return false;
                    }else{
                        return true;
                    }
                },
                set:function (value) {
                    return  value;
                }
            },
        },
        data() {
            return JZY.s.keepAliveDataCache[JZY.s.getPathName()+'detail.task']||{
                memberList:null,
                value:"1",//1列表，2甘特图，3日程
                options:[{
                    value:'1',
                    label:'列表布局',
                },{
                    value:'3',
                    label:'日历视图',
                }],


                //调用任务模块的首页，给项目模块用
                taskId:'eab34970c149403a9d1d466516bec619',
                // projectId:'10098',//项目id，例子
//                projectId:'',//项目id，例子
//                options: [{
//                options: [{
//                    value: '1',
//                    label: '黄金糕'
//                }, {
//                    value: '2',
//                    label: '双皮奶'
//                }, {
//                    value: '3',
//                    label: '蚵仔煎'
//                }, {
//                    value: '4',
//                    label: '龙须面'
//                }, {
//                    value: '5',
//                    label: '北京烤鸭'
//                }],
//                value: '',

            }
        },
        filters:{
        },
        updated(){
            console.log('kcuf_u projectPermission--:',this.projectPermission)
        },
        async created(){
            console.log('kcuf_u projectPermission--:',this.projectPermission)

            let res=await JZY.xhr.r({
                type:'post',
                url:'/project/projectTeamPerson/page',
                data:{
                    projectId:this.id
                }
            })

            this.memberList=res[0].list

        },
        methods: {
            //调用任务模块的首页，给项目模块用

            //模式切换
            changeUrl( val ){
                console.info(val)
            },
            //创建任务，打开右侧弹出窗
            createTask(type) {
                this.$refs.taskList.createTask(type)
            },
            //查询任务
            searchTaskList(obj){
                this.$refs.taskList.searchTaskList(obj)
            },
            //接收任务模块返回的任务list总数
            getPageTotal:function(num){
                this.$emit("taskNum",num);
            },
//            refleshTask(){
//                console.log("刷新任务了")
//                this.$refs.taskList.refleshTable();
//                this.getPageTotal();
//            }

        },
        watch: {
        },
        beforeDestroy(){
            JZY.s.keepAliveDataCache[JZY.s.routerFrom.path+'detail.task']=JZY.u.copy(this._data)
        },
        mounted(){
        }
    }
</script>
<style lang="scss">
    @import "src/containers/main/task/task.scss" //加载整个任务项目的公共样式
</style>
<style scoped lang="scss">
    .task-wrap{
        .project_select{
            display:inline-block;
        }
    }
</style>

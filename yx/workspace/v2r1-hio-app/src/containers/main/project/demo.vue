<template>
    <div class="wrap">

        <link type="text/css" rel="stylesheet" href="/static/fullCalendar/fullcalendar.css">
        <div class="content-title">
            <h3>{{projectDetail.projectName}} <span>{{projectDetail.projectStatus | state}}</span></h3>

            <div class="operation">
                <ul>
                    <li>
                        <!--<el-dropdown split-button  size="small" type="primary" @click="showProjectDialog"  @command="handleCommand">-->
                        <!--编辑-->
                        <!--<el-dropdown-menu slot="dropdown">-->
                        <!--<el-dropdown-item command="del">删除</el-dropdown-item>-->
                        <!--<el-dropdown-item command="back">撤销</el-dropdown-item>-->
                        <!--<el-dropdown-item command="comp">完成</el-dropdown-item>-->
                        <!--</el-dropdown-menu>-->
                        <!--&lt;!&ndash;<el-dropdown-item v-for="(item,index) in operationBtn" :key="index" :command="item" >&ndash;&gt;-->
                        <!--&lt;!&ndash;{{l('{taskLocale.goBackButtons}')[item]}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
                        <!--</el-dropdown>-->
                        <el-dropdown  @command="handleCommand" size="small">
                            <el-button type="primary"  size="small">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="showProjectDialog" v-if="+operation.update">编辑</el-dropdown-item>
                                <el-dropdown-item command="comp" v-if="+operation.projectFinish&&projectDetail.projectStatus!=3">完成</el-dropdown-item>
                                <el-dropdown-item command="compCancel" v-if="+operation.projectFinish&&projectDetail.projectStatus==3">取消完成</el-dropdown-item>
                                <el-dropdown-item command="revoke" v-if="+operation.projectActivation&&projectDetail.projectStatus==4">激活</el-dropdown-item>
                                <el-dropdown-item command="back" v-else-if="+operation.projectRevoke&&projectDetail.projectStatus!=4">撤销</el-dropdown-item>
                                <el-dropdown-item command="follow" v-if="!+operation.follow">关注</el-dropdown-item>
                                <el-dropdown-item command="cancelFollow" v-else>取消关注</el-dropdown-item>
                                <el-dropdown-item command="del" v-if="+operation.update">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li><el-button @click="goback"  size="small" >返回</el-button></li>
                </ul>
            </div>
        </div>
        <detail-project-info
                :info-data="projectDetail"
                :randomNum="randomNum">
        </detail-project-info>
        <!--v-if="projectDetail.projectName"-->
        <div class="project-detail">
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane  :label='"动态"+number.dynamic' name="dynamic">
                    <!--<div v-if="panel.dynamic">-->
                    <detail-dynamic :id="id" :randomNum="randomNum" @dynamicnum="dynamicNum"></detail-dynamic>
                    <!--</div>-->
                </el-tab-pane>
                <el-tab-pane :label='"阶段"+number.task' name="stage">
                    <detail-stage></detail-stage>
                </el-tab-pane>
                <el-tab-pane :label='"任务"+number.task' name="task">
                    <div  v-if="panel.task">
                        <div v-if="JZY.s.hasMenuPermisson('task_view','modify')">
                            <detail-task
                                    ref="taskPanel"
                                    :id="id"
                                    :projectName ="projectDetail.projectName"
                                    v-if="id&&projectDetail&&JZY.s.hasMenuPermisson('task_view','modify')"
                                    :projectPermission="projectDetail.projectPermission"
                                    @taskNum="taskNum"
                            ></detail-task>
                        </div>
                        <div v-else>
                            <p style="text-align: center;line-height: 60px">暂无任务权限，请联系管理员</p>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane :label='"云盘"+number.netDisk' name="file" >
                    <div v-if="panel.netDisk">
                        <div v-if="JZY.s.hasMenuPermisson('disk_view','modify')">
                            <detail-file
                                    v-if="id&&projectDetail &&(projectDetail.projectPermission!==undefined)"
                                    ref="file"
                                    @PAGE_TOTAL="netDiskTotal"
                                    :projectPermission="projectDetail.projectPermission"
                                    :projectDetail="projectDetail">
                            </detail-file>
                        </div>
                        <div v-else>
                            <p style="text-align: center;line-height: 60px">暂无审批权限，请联系管理员</p>
                        </div>
                    </div>

                </el-tab-pane>

                <el-tab-pane  :label='"团队"+number.participants'  name="participants">
                    <!--v-if="panel.participants"-->
                    <detail-participants
                            ref="participantsPanel"
                            :id="id"
                            :randomNum="randomNum"
                            @participantsNum="participantsNum"
                    ></detail-participants>
                </el-tab-pane>
                <el-tab-pane :label='"审批"+number.approval' name="approval">
                    <div v-if="panel.approval">
                        <div v-if="JZY.s.hasMenuPermisson('flow_view','modify')">
                            <detail-approval
                                    ref="approvalPanel"
                                    :id="id"
                                    :projectName ="projectDetail.projectName"
                                    v-if="id&&projectDetail"
                                    :projectPermission="projectDetail.projectPermission"
                                    @approvalNum="approvalNum">
                            </detail-approval>
                        </div>
                        <div v-else>
                            <p style="text-align: center;line-height: 60px">暂无审批权限，请联系管理员</p>
                        </div>
                    </div>

                </el-tab-pane>
                <!--<el-tab-pane label="沟通（26）" name="communication">-->
                <!--<detail-communication> </detail-communication>-->
                <!--</el-tab-pane>-->
            </el-tabs>
        </div>

        <!--编辑项目-->
        <dialog-edit-project
                :project-id="id"
                :project-detail="projectDetail"
                :dialog-visible="projectDialogVisible"
                @showGoodsModal="showProjectDialog"
                @closeCreateModal="closeProjectDialog"
        ></dialog-edit-project>


        <!--右侧弹窗-->
        <!--<right-slide-modal :title="panelTitle" :visible.sync="dialogVisible">-->
        <!--<task-create-page :taskInfo="openedTask"></task-create-page>-->
        <!--</right-slide-modal>-->

    </div>
</template>

<script>
    JZY.locale.add('projectLocale',require('./project.locale'))
    import {getProjectDetail,getProjectStageDetail,getProjectDel,getProjectOperation} from '@Main/project/getData.js'
    import dialogEditProject from '@Main/project/components/project/dialog.editProject.vue'
    import taskCreatePage from '@Main/task/components/task.createPage.vue'
    import detailProjectInfo from '@Main/project/components/details/detail.projectInfo.vue'
    import detailDynamic from '@Main/project/components/details/detail.dynamic.vue'
    import detailStage from '@Main/project/components/details/detail.stage.vue'
    import detailTask from '@Main/project/components/details/detail.task.vue'
    import detailFile from '@Main/project/components/detail.file.vue'
    import detailParticipants from '@Main/project/components/details/detail.participants.vue'
    import detailApproval from '@Main/project/components/details/detail.approval.vue'
    import detailCommunication from '@Main/project/components/detail.communication.vue'
    import {postProjectInfoList,getProjectFollow,postProjectUpdateStatus} from '@Main/project/getData.js'
    export default{
        components: {
            detailProjectInfo,
            taskCreatePage,
            detailDynamic,
            detailStage,
            detailTask,
            detailFile,
            detailParticipants,
            detailApproval,
            detailCommunication,
            dialogEditProject
        },
        methods:{

            tabClick(tab, event) {
                console.log(tab, event);
                if(tab.name == 'file'){
                    this.panel={
                        dynamic:false,
                        task:false,
                        netDisk:true,
                        participants:false,
                        approval:false,
                    }
                    JZY.s.eventBus.$emit('QUERY_DISK_SPACE')
                }else if(tab.name == 'dynamic'){
                    this.randomNum = Math.random();
                    this.panel={
                        dynamic:true,
                        task:false,
                        netDisk:false,
                        participants:false,
                        approval:false,
                    }

                }else if(tab.name == 'task'){
//                    this.$refs.taskPanel.refleshTask();
                    this.panel={
                        dynamic:false,
                        task:true,
                        netDisk:false,
                        participants:false,
                        approval:false,
                    }

                }else if(tab.name == 'participants'){

                    this.$refs.participantsPanel.refleshTable();
//                    this.randomNum = Math.random();
                    this.panel={
                        dynamic:false,
                        task:false,
                        netDisk:false,
                        participants:true,
                        approval:false,
                    }

                }else if(tab.name == 'approval'){
                    this.panel={
                        dynamic:false,
                        task:false,
                        netDisk:false,
                        participants:false,
                        approval:true,
                    }
//                    this.$refs.approvalPanel.refleshApprove();
                }
            },

            goback(){
                this.$router.back(-1);
            },
            formatTooltip(val) {
                return val+'%';
            },
            handleCommand(command){
                this[command]();
            },
            edit (){
                this.$message('编辑');
            },
            async follow(){
                let res = await getProjectFollow(this.id)
//                console.info(res[0])
                if (res) {
                    this.$message({
                        type: 'success',
                        message: '关注成功!'
                    });
                    this.rquireProjectDetail(this.id);
                    this.rquireProjectOperation(this.id);
                }
            },
            async cancelFollow(){
                let res = await getProjectFollow(this.id)
//                console.info(res);
                if (res) {
                    this.$message({
                        type: 'success',
                        message: '取消关注成功!'
                    });
                    this.rquireProjectDetail(this.id);
                    this.rquireProjectOperation(this.id);
                }
            },
            //删除
            del (){
                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.rquireProjectDel(this.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
//                this.rquireProjectDel(this.id);
            },
            //撤销
            async back (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"4"
                }
                let res = await postProjectUpdateStatus(queryData);
//                console.log(res);
                if(res){
                    this.$message({
                        type: 'success',
                        message: '撤销成功!'
                    });
                    this.randomNum = Math.random();
                    this.rquireProjectDetail(this.id);
                    this.rquireProjectOperation(this.id);
                }
            },
            //激活
            async revoke(){
                let queryData={
                    projectId:this.id,
                    projectStatus:"5"
                };
                let res = await postProjectUpdateStatus(queryData);
//                console.log(res);
                if(res){
                    this.$message({
                        type: 'success',
                        message: '激活成功!'
                    });
                    this.randomNum = Math.random();
                    this.rquireProjectDetail(this.id);
                    this.rquireProjectOperation(this.id);
                }

            },
            //完成
            async comp (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"3"
                };
                let res = await postProjectUpdateStatus(queryData);
//                console.log(res);
                if(res){
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.randomNum = Math.random();
                    this.rquireProjectDetail(this.id);
                    this.rquireProjectOperation(this.id);
                }
            },
            //取消完成
            async compCancel (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"5"
                };
                let res = await postProjectUpdateStatus(queryData);
//                console.log(res);
                if(res){
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.randomNum = Math.random();
                    this.rquireProjectDetail(this.id);
                    this.rquireProjectOperation(this.id);
                }
            },



            //动态的数量
            dynamicNum(num){
                if(num>0){
                    this.number.dynamic = '('+num+')';
                }else{
                    this.number.dynamic = '';
                }

            },
            taskNum(num){
                if(num>0){
                    this.number.task = '('+num+')';
                }else{
                    this.number.task = '';
                }
            },
            //团队的数量
            participantsNum(num){
                if(num>0){
                    this.number.participants = '('+num+')';
                }else{
                    this.number.participants = '';
                }
            },
            //审批的数量
            approvalNum(num){
                if(num>0){
                    this.number.approval = '('+num+')';
                }else{
                    this.number.approval = '';
                }
            },
            //网盘的数量
            netDiskTotal(num){
                if(num>0){
                    this.number.netDisk = '('+num+')';
                }else{
                    this.number.netDisk = '';
                }
            },

            //编辑项目
            showProjectDialog (){
                this.projectDialogVisible = true;
            },
            //关闭新建项目弹窗
            closeProjectDialog(){
                this.projectDialogVisible = false;
            },

//            getProjectOperation
            //查询项目对应操作权限getProjectDetail
            async rquireProjectOperation(id){
                let res = await getProjectOperation(id);
//                console.log(res);
                if(res){
                    this.operation = {...res};
                }
            },


            //获取项目信息getProjectDetail
            async rquireProjectDetail(id){
                let res = await getProjectDetail(id);
                if (res) {
                    this.projectDetail = {...res};
                    console.log(this.projectDetail)
                }

            },
            //删除项目getProjectDetail
            async rquireProjectDel(id){
                let res = await getProjectDel(id);
//                console.log(res);
                if(res){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.goback();
                }


            },

        },
        data(){
            return {
                id:'',
                number:{
                    dynamic:'',
                    task:'',
                    participants:'',
                    approval:'',
                    netDisk:''
                },
                panel:{
                    dynamic:true,
                    task:true,
                    netDisk:true,
                    participants:true,
                    approval:true,
                },
//                <!--<el-dropdown-item command="del">删除</el-dropdown-item>-->
//                <!--<el-dropdown-item command="back">撤销</el-dropdown-item>-->
//                <!--<el-dropdown-item command="comp">完成</el-dropdown-item>-->
//                编辑、撤销、完成、关注、删除
//                如已撤销状态操作变为“激活”，完成变为“取消完成”，关注变为“取消关注”
                operationBtn:[],
                projectDetail:{
//                    项目状态：0进行中、1已延期、2未启动、3已完成、4已撤销。5 回滚
                    projectStatus:"2"
                },//项目详情
                infoData:{},//项目详情
                projectDialogVisible:false,//编辑项目
                //当前tab
                activeName: 'stage',
                searchForm:{
                    searchVal:''
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                //任务
                openedTask:'',//对象为空，则新建任务
                panelTitle:'创建任务',
                dialogVisible:false,
                operation:{
                    createApprove: null,//创建审批（有权限true，无权限false）
                    createDocument:null,//创建文档（有权限true，无权限false）
                    createTask:null,//创建任务（有权限true，无权限false）
                    follow:"0",//关注（已关注true，未关注false）
                    projectActivation:"0",//项目激活（有权限ture）
                    projectDelete:"0",//项目删除（有删除权限true，没有false）
                    projectFinish:"0",//项目完成（有权限true）
                    projectRevoke:"0",//项目撤销（有权限ture）
                    update:"0",//编辑（有编辑权限true，无false）
                },
                randomNum:'',

            }
        },
        computed: {

        },
        watch: {

        },

        mounted(){
            this.id = this.$route.params.id;
            this.rquireProjectOperation(this.id);
            this.rquireProjectDetail(this.id);
        },
        created(){
            JZY.s.eventBus.$on('UPDATE_PROJECT_DYNAMIC',()=>{
                this.randomNum = Math.random()
            });
            JZY.s.eventBus.$on('UPDATE_PROJECT_DETAIL',()=>{
                this.rquireProjectDetail(this.id);
            })
        },
        filters:{
            state (value){
                //'项目状态 ：0进行中、1已延期、2未启动、3已完成、4已撤销。',
                switch (value) {
                    case '0':
                        return '进行中';
                    case '1':
                        return '已延期';
                    case '2':
                        return '未启动';
                    case '3':
                        return '已完成';
                    case '4':
                        return '已撤销';
                    default:
                        return '--';
                }
            },
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

    .wrap{
        height: 100%;
        overflow-y: auto;
        /*overflow: hidden;*/
        /*overflow-y: auto;*/
        background: #ffffff;
        .content-title{
            position: relative;
            /*padding: 0px 0px 12px;*/
            line-height: 32px;
            /*height: 48px;*/
            margin-left: 24px;
            border-bottom: 1px solid #eeeeee;
            background: #ffffff;
            h3{
                min-height: 32px;
                color: #191919;
                font-size: 14px;
                font-weight: normal;
                padding: 0px 210px 0px 0px;
                span{
                    font-size: 12px;
                    display: inline-block;
                    margin-left: 12px;
                }
            }
            .operation{
                position: absolute;
                top: 0px;
                right: 8px;
                z-index: 1001;
                ul{
                    float: right;
                    li{
                        float: left;
                        margin-right: 16px;
                    }
                }
            }
        }

        .project-detail{
            background-color: #ffffff;
            padding: 20px;

        }
    }
    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: .5;
        background: #C8EBFB;
    }

    .list-group {
        min-height: 20px;
    }

    .list-group-item {
        cursor: move;
    }

    .list-group-item i{
        cursor: pointer;
    }
</style>

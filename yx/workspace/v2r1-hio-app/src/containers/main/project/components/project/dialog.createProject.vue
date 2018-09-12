<template>
    <right-slide-modal
            title="创建项目"
            @open="openCreate"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button :disabled ='isSaveFinished&&!$refs.attachUpload.allowSubmit' @click="operateSave('projectForm')">保存</el-button></li>
                <li><el-button @click="operateClose('projectForm')">关闭</el-button></li>
            </ul>
        </div>
        <div class="dia-content">
            <el-form :model="projectForm" ref="projectForm" :rules="rules" label-width="130px" class="">
                <el-form-item label="项目名称:" prop="name">
                    <el-input v-model="projectForm.name"  maxlength="101" style="width: 70%"></el-input>
                </el-form-item>
                <el-form-item label="项目描述:" prop="">
                    <el-input v-model="projectForm.describe" :rows="11"  placeholder="请输入项目描述" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                </el-form-item>
                <el-form-item label="起止时间:" prop="timeRange">
                    <el-date-picker
                            v-model="projectForm.timeRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="计划完成时间"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="负责人:" prop="leader">
                    <blend-tree
                            ref= "leaderTree"
                            :enable-checked-multiple = "false"
                            :tagButtons="['user']"
                            activeTab = "user"
                            :selectedDataToTree = "leaderDataToTree"
                            @getDataFromTree = "getLeaderDataTree">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                            <i class="el-icon-circle-plus" @click.stop = "$refs.leaderTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>
                </el-form-item>
                <el-form-item label="参与人:">
                    <blend-tree
                            ref= "participantTree"
                            :enable-checked-multiple = "true"
                            :tagButtons="['user','userOutside']"
                            activeTab = "user"
                            :selectedDataToTree = "partDataToTree"
                            @getDataFromTree = "getPartDataTree">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                            <i class="el-icon-circle-plus" @click.stop = "$refs.participantTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>
                </el-form-item>
                <el-form-item label="共享人:">
                    <blend-tree
                            ref= "shareTree"
                            :enable-checked-multiple = "true"
                            :tagButtons="['user','dept','role','userOutside']"
                            activeTab = "dept"
                            :selectedDataToTree = "shareDataToTree"
                            @getDataFromTree = "getShareDataTree">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                            <i class="el-icon-circle-plus" @click.stop = "$refs.shareTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>
                </el-form-item>
                <el-form-item label="项目进度:" style="position: relative">
                    <el-slider v-model="projectForm.progress" :format-tooltip="formatTooltip" style="width: 50%;margin-left: 8px;display: inline-block"></el-slider>
                    <span style="position: absolute;left: 50%;top: 0px;margin-left: 24px">{{projectForm.progress}}%</span>

                </el-form-item>
                <el-form-item label="紧急程度:" prop="grade">
                    <el-select v-model="projectForm.grade" placeholder="请选择项目等级" style="width: 30%">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="紧急" :value="1"></el-option>
                        <el-option label="非常紧急" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传附件">
                    <!--附件组件-->
                    <attach-upload
                            ref="attachUpload"
                            :required="false"
                            :multiple="false"
                            :appId="attach.appId"
                            :businessId="attach.projectId"
                            :categoryId="attach.categoryId"
                            @fileQueued="handleAttachQueued"
                            @uploadError="handleAttachError">
                    </attach-upload>
                </el-form-item>
                <el-form-item label="创建沟通群组:" prop="communication">
                    <el-switch
                            v-model="projectForm.communication"
                            active-text="开"
                            inactive-text="关">
                    </el-switch>
                    <el-tooltip content="在CC移动端创建IM沟通群" placement="top">
                        <span class="el-icon-info"></span>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="创建云盘:" prop="netDisk">
                    <el-switch
                            v-model="projectForm.netDisk"
                            active-text="开"
                            inactive-text="关">
                    </el-switch>
                    <el-tooltip content="在云盘创建一个以项目名称命名的文件夹" placement="top">
                        <span class="el-icon-info"></span>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</template>

<script>
    import {postProjectInfoSave,postProjectNoRepeatName} from '@Main/project/getData.js'
    import UEditor from '@/components/UEditor.vue'
    import {mapGetters} from 'vuex'
    export default{
        components:{
            UEditor
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            },
            ...mapGetters({
                session:'session'
            })
        },

        methods:{

            getLeaderDataTree( obj = {} ){
                this.leaderFormTree = {...obj};
                this.projectForm.leader = obj.userList[0]?obj.userList[0].name:'';
                this.$refs['projectForm'].validateField('leader',(valid) => {});
            },
            getPartDataTree( obj = {} ){
                this.partFormTree = {...obj};
            },
            getShareDataTree( obj = {} ){
                this.shareFormTree = {...obj};
            },

            //打开
            openCreate (){
                this.getAttach();
                let obj = {};
                obj.sid = this.session.sid;
                obj.name = this.session.name;
                obj.imUserId = this.session.userIdIM;
                obj.parentId = this.session.parentRealityId;
                this.leaderDataToTree.userList.push(obj);
                this.leaderFormTree.userList.push(obj);
                this.projectForm.leader = this.session.name;
            },

//            关闭
            operateClose(formName){
                this.userData = [];
                this.leaderData=[];
                this.participantsData=[];
                this.sharedData=[];
                this.treeType='';
                this.projectForm={
                    name: '',//项目名称
                        describe:'',//项目描述  2500字符
                        timeRange:'',//起止时间
                        leader: [],//负责人
                        progress: 0,//项目进度
                        grade: 0,//项目等级
                        fileList:[],//附件
                        communication: true,//创建沟通
                        netDisk:true,//创建网盘文件夹
                };

                this.leaderFormTree={userList:[]};
                this.leaderDataToTree={userList:[]};
                this.partFormTree={userList:[],userOutsideList:[]};
                this.partDataToTree={userList:[],userOutsideList:[]};
                this.shareFormTree={userList:[],userOutsideList:[],deptList:[],roleList:[]};
                this.shareDataToTree={userList:[],userOutsideList:[],deptList:[],roleList:[]};
                this.isSaveFinished = false;
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
            //保存
            operateSave(formName){
                this.isSaveFinished = true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = this.projectForm;
                        let projectParticipantPersonList = [];
                        if(this.partFormTree.userList){
                            this.partFormTree.userList.map((item)=>{
                                let participant = {};
                                participant.teamPersonId = item.sid;
                                participant.teamPersonName = item.name;
                                participant.shareType = 0;
                                participant.teamPersonImId= item.imUserId;
                                participant.teamPersonDeptId = item.parentId;
                                participant.outType = 0;
                                participant.teamType = 3;
                                projectParticipantPersonList.push(participant);
                            });
                        }
                        if(this.partFormTree.userOutsideList){
                            this.partFormTree.userOutsideList.map((item)=>{
                                let participant = {};
                                participant.teamPersonId = item.sid;
                                participant.teamPersonName = item.name;
                                participant.shareType = 0;
                                participant.teamPersonImId= item.imUserId;
                                participant.teamPersonDeptId = item.parentId;
                                participant.outType = 1;
                                participant.teamType = 3;
                                projectParticipantPersonList.push(participant);
                            });
                        }
                        let projectSharePersonList = [];
                        //用户
                        if(this.shareFormTree.userList){
                            let data = this.shareFormTree.userList;
                            data.map((item)=>{
                                let share = {};
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.teamPersonImId= item.imUserId;
                                share.teamPersonDeptId = item.parentId;
                                share.shareType = 1;
                                share.teamType = 4;
                                share.outType = 0;
                                projectSharePersonList.push(share);
                            });
                            console.log(projectSharePersonList,"1")
                        }
                        if(this.shareFormTree.userOutsideList){
                            let data = this.shareFormTree.userOutsideList;
                            data.map((item)=>{
                                let share = {};
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.teamPersonImId= item.imUserId;
                                share.teamPersonDeptId = item.parentId;
                                share.shareType = 1;
                                share.teamType = 4;
                                share.outType = 1;
                                projectSharePersonList.push(share);
                            });
                            console.log(projectSharePersonList,"1")
                        }
                        //角色
                        if(this.shareFormTree.roleList){
                            let data = this.shareFormTree.roleList;
                            data.map((item)=>{
                                let share = {};
                                share.teamPersonId = item.roleId;
                                share.teamPersonName = item.roleName;
                                share.shareType = 2;
                                share.teamType = 4;
                                projectSharePersonList.push(share);
                            });
                            console.log(projectSharePersonList,"2")
                        }
                        //部门
                        if(this.shareFormTree.deptList){
                            let data = this.shareFormTree.deptList;
                            data.map((item)=>{
                                let share = {};
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.shareType = 3;
                                share.teamType = 4;
                                projectSharePersonList.push(share);
                            });
                            console.log(projectSharePersonList,"3")
                        }

//                        groupTreeData
//                        deptList 3
//                        roleList 2
//                        userList 1
                        let queryData = {
                            "sid":this.attach.projectId,
                            "projectName":formData.name.trim(),
                            "projectDesc":formData.describe,
                            "projectStart":formData.timeRange[0],
                            "projectEnd":formData.timeRange[1],
                            "projectCreatePersonId":this.session.sid,
                            "projectCreatePersonName":this.session.name,
                            "projectCreatePersonImId":this.session.userIdIM,
                            "projectCreatePersonDeptId":this.session.parentRealityId,
                            "projectResponsiblePersonId":this.leaderFormTree.userList[0].sid,
                            "projectResponsiblePersonName":this.leaderFormTree.userList[0].name,
                            "projectResponsiblePersonImId":this.leaderFormTree.userList[0].imUserId,
                            "projectResponsiblePersonDeptId":this.leaderFormTree.userList[0].parentId,
                            "projectProgressBar":formData.progress,
                            "projectLevel":formData.grade,
                            "projectCommunication":+formData.communication,
                            "projectNetDisk":+formData.netDisk,
                            "projectParticipantPersonList":projectParticipantPersonList,
                            "projectSharePersonList":projectSharePersonList
                        };
//                        console.log(JSON.stringify(queryData),"queryData");

                        if(queryData.projectNetDisk){
                            this.rqNoRepeatName(queryData);
                        }else{
                            this.rqProjectSave(queryData);
                        }
                    } else {
                        return false;
                    }
                });
            },
            //文件上传-上传中
            handleAttachQueued(){
            },
            //文件上传-出错
            handleAttachError(){
            },
            //进度条提示
            formatTooltip(val) {
                return val+'%';
            },

            //保存项目
            async rqProjectSave(queryData){
                JZY.xhr.post(
                    '/project/projectInfo/save'
                    ,queryData
                    ,{alertError:true,alertSuccess:false})
                    .then(async (resultData)=>{
                        await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                        this.$emit("closeCreateModal");
                        this.$emit("reloadData");
                        this.operateClose('projectForm');
                        this.isSaveFinished = false;

                        this.$message({
                            message: '新建成功！',
                            type: 'success'
                        });
                }).catch((e)=>{

                    this.isSaveFinished = false;
                    //接口失败
                    console.log("接口失败",e);
//                    throw new Error(e)
                })


            },
            //是否重名
            async rqNoRepeatName(queryData){
                let requestData = {
                    tendId:null,
                    fileName:queryData.projectName
                }
               let res  = await JZY.xhr.r([{type:'post',url:'/disk/diskCompanyProject/getNoRepeatName',data:requestData}],'GLOBAL.GATEWAY.LV_JIE',false,false).then((resultData)=>{
                    try{
                        return resultData;
                    }catch (e){
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });

                if(res[0] == queryData.projectName){
                    queryData.netDiskName = res[0];
                    this.isSaveFinished = true;
                    this.rqProjectSave(queryData);
                }else{
                    this.$confirm('该项目名称云盘已存在，是否继续已'+res[0]+'名称创建文件夹?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        queryData.netDiskName = res[0];
                        this.isSaveFinished = true;
                        this.rqProjectSave(queryData);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消保存'
                        });
                    });
                }

            },
            //获取附件信息/meeting/meetingInfo/createRedisId
            async getAttach(){
                let res  = await JZY.xhr.r([{type:'post',url:'/project/projectInfo/queryProjectId',data:{}}],'GLOBAL.YANG_NING',false,false).then((resultData)=>{
                    try{
                        return resultData;

                    }catch (e){
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });
                this.attach.appId = res[0].appId;
                this.attach.projectId = res[0].projectId;
                this.attach.categoryId = res[0].categoryId;
            }

        },
        data(){
            return {
                isSaveFinished:false,
                enableCheckedMultipleUser:false,//是否多选
                showUserTree:false,
                showInsideOutsideTabs:false,
                userData:[],
                leaderData:[],
                participantsData:[],
                sharedData:[],
                treeType:'',
                editorOption:{
                    placeholder: '请输入内容',
                    modules: { // 配置富文本
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ]
                    }
                },//编辑器配置
                projectForm: {
                    name: '',//项目名称
                    describe:'',//项目描述  2500字符
                    timeRange:'',//起止时间
                    leader: '',//负责人
                    progress: null,//项目进度
                    grade: 0,//项目等级
                    fileList:[],//附件
                    communication: true,//创建沟通
                    netDisk:true,//创建网盘文件夹
                },//项目内容
                rules:{
                    name:[
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '项目名称文字长度不能大于100字符，请重新输入！', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*?:|\\]*$/, message: '存在不合法字符', trigger: 'blur' }

                    ],
                    timeRange: [
                        { required: true, message: '请选择时间范围', trigger: 'blur' }
                    ],
                    leader: [
                        { required: true, message: '请选择负责人', trigger: 'blur' }
                    ],
                    grade:[
                        { required: true, message: '请选择紧急程度', trigger: 'blur' }
                    ],
                    communication:[
                        { required: true }
                    ],
                    netDisk:[
                        { required: true }
                    ]
                },
                attach:{
                    appId:'',
                    projectId:'',
                    categoryId:''
                },
                leaderFormTree:{userList:[]},
                leaderDataToTree:{userList:[]},
                partFormTree:{userList:[],userOutsideList:[]},
                partDataToTree:{userList:[],userOutsideList:[]},
                shareFormTree:{userList:[],userOutsideList:[],deptList:[],roleList:[]},
                shareDataToTree:{userList:[],userOutsideList:[],deptList:[],roleList:[]},

            }
        },
        mounted (){

        },

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate-buttons {
        margin-top: 8px;
        float: right;
    }
</style>

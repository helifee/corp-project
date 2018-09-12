<template>
    <right-slide-modal
            title="编辑项目"
            @open="initProject"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button :disabled ='isSaveFinished&&$refs.attachUpload&&!$refs.attachUpload.allowSubmit' @click="operateSave('projectForm')">保存</el-button></li>
                <li><el-button  @click="operateClose('projectForm')">关闭</el-button></li>
            </ul>
        </div>
        <div class="dia-content">
            <el-form :model="projectForm" ref="projectForm" :rules="rules" label-width="130px" class="">
                <el-form-item label="项目名称:" prop="name">
                    <el-input v-model="projectForm.name" maxlength="101" style="width: 70%"></el-input>
                </el-form-item>
                <el-form-item label="项目描述:" prop="">
                    <!--<UEditor-->
                            <!--id="editor"-->
                            <!--@ready="testOpen"-->
                            <!--:config="UEconfig"-->
                            <!--ref="UEditor"-->
                            <!--:appId="projectDetail.appId"-->
                            <!--:businessId="projectDetail.sid"-->
                            <!--:categoryId="projectDetail.categoryId"-->

                            <!--v-model="projectForm.describe" style="line-height: 24px"></UEditor>-->

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
                    <!--<el-progress :percentage="projectForm.process" style="width: 70%"></el-progress>-->
                    <el-slider v-model="projectForm.progress" :format-tooltip="formatTooltip" style="width: 50%;margin-left: 8px;display: inline-block"></el-slider>
                    <span style="position: absolute;left: 50%;top: 0px;margin-left: 24px">{{projectForm.progress}}%</span>
                </el-form-item>
                <el-form-item label="项目等级:" prop="grade">
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
                            :appId="projectDetail.appId"
                            :businessId="projectDetail.sid"
                            :categoryId="projectDetail.categoryId"
                            @fileQueued="handleAttachQueued"
                            @uploadError="handleAttachError">
                    </attach-upload>
                </el-form-item>
                <!--<el-form-item label="创建沟通群组:" prop="communication">-->
                    <!--<el-switch-->
                            <!--v-model="projectForm.communication"-->
                            <!--active-text="开"-->
                            <!--inactive-text="关">-->
                    <!--</el-switch>-->
                    <!--<el-tooltip content="在CC移动端创建IM沟通群" placement="top">-->
                        <!--<span class="el-icon-info"></span>-->
                    <!--</el-tooltip>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="创建网盘文件夹:" prop="netDisk">-->
                    <!--<el-switch-->
                            <!--v-model="projectForm.netDisk"-->
                            <!--active-text="开"-->
                            <!--inactive-text="关">-->
                    <!--</el-switch>-->
                    <!--<el-tooltip content="在网盘创建一个以项目名称命名的文件夹" placement="top">-->
                        <!--<span class="el-icon-info"></span>-->
                    <!--</el-tooltip>-->
                <!--</el-form-item>-->
            </el-form>
        </div>
    </right-slide-modal>
</template>

<script>
    import {getProjectDetail,postProjectInfoUpdate} from '@Main/project/getData.js'
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
            },
            projectId:{
                required:true
            },
            projectDetail:{
                type:Object,
                required:true
            },

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

            //初始化数据
            initProject (){
                let formData = {};
                let projectDetail = this.projectDetail;
                this.leaderFormTree={userList:[]};
                this.leaderDataToTree={userList:[]};
                this.partFormTree={userList:[],userOutsideList:[]};
                this.partDataToTree={userList:[],userOutsideList:[]};
                this.shareFormTree={userList:[],userOutsideList:[],deptList:[],roleList:[]};
                this.shareDataToTree={userList:[],userOutsideList:[],deptList:[],roleList:[]};
                let leaderObj = {
                    'sid':projectDetail.projectResponsiblePersonId,
                    'name':projectDetail.projectResponsiblePersonName,
                    'imUserId':projectDetail.projectResponsiblePersonImId,
                    'parentId':projectDetail.projectCreatePersonDeptId
                }
                this.leaderFormTree.userList.push(leaderObj);
                this.leaderDataToTree.userList.push(leaderObj);
                let projectParticipantPersonList = projectDetail.projectParticipantPersonList;
                //参与人
                if(projectParticipantPersonList){
                    projectParticipantPersonList.map((item)=>{
                        let participant = {};
                        participant.sid = item.teamPersonId;
                        participant.name = item.teamPersonName;
                        participant.imUserId = item.teamPersonImId;
                        participant.parentId = item.teamPersonDeptId;
                        if(!+item.outType){
                            this.partDataToTree.userList.push(participant);
                            this.partFormTree.userList.push(participant);
                        }else{
                            this.partDataToTree.userOutsideList.push(participant);
                            this.partFormTree.userOutsideList.push(participant);
                        }
                    });
                }

                let projectSharePersonList = projectDetail.projectSharePersonList;
                projectSharePersonList.map((item)=>{
//                    console.log(item)
                    if(item.shareType==1){//用户
                        let share = {};
                        share.sid = item.teamPersonId;
                        share.name = item.teamPersonName;
                        share.imUserId = item.teamPersonImId;
                        share.parentId = item.teamPersonDeptId;
                        if(!+item.outType){
                            this.shareFormTree.userList.push(share);
                            this.shareDataToTree.userList.push(share);
                        }else{
                            this.shareFormTree.userOutsideList.push(share);
                            this.shareDataToTree.userOutsideList.push(share);
                        }
                    }else if(item.shareType==2){//角色
                        let share = {};
                        share.roleId = item.teamPersonId;
                        share.roleName = item.teamPersonName;
                        this.shareFormTree.roleList.push(share);
                        this.shareDataToTree.roleList.push(share);
                    }else if(item.shareType==3){//部门
                        let share = {};
                        share.sid = item.teamPersonId;
                        share.name = item.teamPersonName;
                        this.shareFormTree.deptList.push(share);
                        this.shareDataToTree.deptList.push(share);
                    }
                });
                formData.leader = this.leaderFormTree.userList[0]?this.leaderFormTree.userList[0].name:''
                formData.name =projectDetail.projectName;
                formData.describe = projectDetail.projectDesc;
                formData.timeRange = [projectDetail.projectStart,projectDetail.projectEnd];
                formData.progress = projectDetail.projectProgressBar;
                formData.grade =parseInt(projectDetail.projectLevel);

                this.projectForm = {...formData}
            },
            testOpen(){
                this.$nextTick(()=>{
                    this.setContent(this.projectForm.describe);
                })
            },

            //文件上传-上传中
            handleAttachQueued(){
            },
            //文件上传-出错
            handleAttachError(){
            },
//            关闭
            operateClose(formName){
                this.$refs[formName].resetFields();
                this.userData = [];
                this.leaderData=[];
                this.participantsData=[];
                this.sharedData=[];
                this.treeType='';
                this.projectForm={
                    name: '',//项目名称
                    describe:'',//项目描述  2500字符
                    timeRange:'',//起止时间
                    progress: null,//项目进度
                    grade: 0,//项目等级
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
                                participant.teamPersonImId= item.imUserId;
                                participant.teamPersonDeptId = item.parentId;
                                participant.outType = 0;
                                participant.shareType = 0;
                                participant.teamType = 3;
                                participant.projectId = this.projectId;
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
                                participant.projectId = this.projectId;
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
                                share.teamPersonDeptId = item.parentId;
                                share.teamPersonImId= item.imUserId;
                                share.outType = 0;
                                share.shareType = 1;
                                share.teamType = 4;
                                share.projectId = this.projectId;
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
                                share.projectId = this.projectId;
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
                                share.projectId = this.projectId;
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
                                share.projectId = this.projectId;
                                projectSharePersonList.push(share);
                            });
                            console.log(projectSharePersonList,"3")
                        }

                        let queryData = {
                            "sid":this.projectId,
                            "projectName":formData.name.trim(),
                            "projectDesc":formData.describe,
                            "projectStart":formData.timeRange[0],
                            "projectEnd":formData.timeRange[1],
                            "projectResponsiblePersonId":this.leaderFormTree.userList[0].sid,
                            "projectResponsiblePersonName":this.leaderFormTree.userList[0].name,
                            "projectResponsiblePersonImId":this.leaderFormTree.userList[0].imUserId,
                            "projectResponsiblePersonDeptId":this.leaderFormTree.userList[0].parentId,
                            "projectCreatePersonId":this.projectDetail.projectCreatePersonId,
                            "projectCreatePersonName":this.projectDetail.projectCreatePersonName,
                            "projectCreatePersonImId":this.projectDetail.projectCreatePersonImId,
                            "projectCreatePersonDeptId":this.projectDetail.projectCreatePersonDeptId,
                            "projectProgressBar":formData.progress,
                            "projectCommunication":this.projectDetail.projectCommunication,
                            "projectNetDisk":this.projectDetail.projectNetDisk,
                            "projectStatus":this.projectDetail.projectStatus,
                            "projectLevel":formData.grade,
                            "projectParticipantPersonList":projectParticipantPersonList,
                            "projectSharePersonList":projectSharePersonList
                        };
//                        console.log(JSON.stringify(queryData),"queryData");
//                        console.log(queryData,"queryData");
                        this.rqProjectSave(queryData);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //进度条提示
            formatTooltip(val) {
                return val+'%';
            },

            //保存修改项目
            async rqProjectSave(queryData){
                JZY.xhr.post(
                    '/project/projectInfo/update'
                    ,queryData
                    ,{alertError:true,alertSuccess:false})
                    .then(async (resultData)=>{
                        await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                        this.$emit("closeCreateModal");
                        this.isSaveFinished = false;

                        JZY.s.eventBus.$emit('UPDATE_PROJECT_DYNAMIC')
                        JZY.s.eventBus.$emit('UPDATE_PROJECT_DETAIL')
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.$parent.$refs.attachUpload.getFilesList();
                    }).catch((e)=>{

                    this.isSaveFinished = false;
                    //接口失败
                    console.log("接口失败",e);
//                    throw new Error(e)
                })


            },
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
                treeType:'',
                UEconfig:{
                    initialFrameWidth :650,//设置编辑器宽度
                    initialFrameHeight:400,//设置编辑器高度
                    elementPathEnabled : false,
                    // 设置不自动调整高度
                    scaleEnabled:false,//不可以拉伸
                    maximumWords:5000,//字数限制
                    autoSyncData:false,//自动同步编辑器要提交的数据
                    autoFloatEnabled:false,//是否保持toolbar的位置不动，默认true
                    allowDivTransToP:false,
                    autoHeightEnabled: false,
                    zIndex:10000,//编辑器在页面上的z-index层级的基数，默认是900
                    toolbars:[[
                        'undo', //撤销
                        'redo', //重做
                        'bold', //加粗
                        'indent', //首行缩进
                        'italic', //斜体
                        'underline', //下划线
                        'strikethrough', //删除线
                        'formatmatch', //格式刷
                        'blockquote', //引用
                        'horizontal', //分隔线
                        'removeformat', //清除格式
                        'fontfamily', //字体
                        'fontsize', //字号
                        'paragraph', //段落格式
                        'simpleupload', //单图上传
//                        'insertimage', //多图上传
                        'link', //超链接
                        'unlink', //取消链接
                        'justifyleft', //居左对齐
                        'justifyright', //居右对齐
                        'justifycenter', //居中对齐
                        'justifyjustify', //两端对齐
                        'forecolor', //字体颜色
                        'insertorderedlist', //有序列表
                        'insertunorderedlist', //无序列表
                        'lineheight', //行间距
                        'edittip ', //编辑提示
                    ]],
                    insertorderedlist:{
                        'decimal': '' ,
                    },
                    insertunorderedlist:{
                        'circle': '', // '○ 小圆圈'
                        'disc': '', // '● 小圆点'
                        'square': '' //'■ 小方块'
                    }
                },
                projectForm: {
                    name: '',//项目名称
                    describe:'',//项目描述  2500字符
                    timeRange:'',//起止时间
                    leader: [],//负责人
                    progress: null,//项目进度
                    grade: 0,//项目等级
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
                    ]
                },
                leaderFormTree:{userList:[]},
                leaderDataToTree:{userList:[]},
                partFormTree:{userList:[],userOutsideList:[]},
                partDataToTree:{userList:[],userOutsideList:[]},
                shareFormTree:{userList:[],userOutsideList:[],deptList:[],roleList:[]},
                shareDataToTree:{userList:[],userOutsideList:[],deptList:[],roleList:[]},


            }
        },
        watch:{

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

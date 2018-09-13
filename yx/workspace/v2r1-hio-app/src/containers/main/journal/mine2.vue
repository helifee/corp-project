<template>
    <div class="mine">
        <h3>我的日志</h3>
        <div class="mine-content">
            <date-week-demo @curdate="getCurdate" v-loading="loading">
                <div slot="detail">
                    <div v-show="journalState == 0">
                    </div>
                    <div v-show="journalState == 1">
                        <p @click="payJournal" class="edit" v-if="!isEdit">点击补交日志</p>
                        <p class="time"  v-if="!isEdit">{{curDate}}</p>
                    </div>
                    <div v-show="journalState == 2">
                        <div v-show="contentShow">
                            <div v-html="journalContent.content"></div>
                            <p class="member">
                                <span v-for="item in journalContent.userShareDtoList">@{{item.name}}&nbsp;&nbsp;</span>
                                <span v-for="item in journalContent.roleShareDtoList">@{{item.name}}&nbsp;&nbsp;</span>
                                <span v-for="item in journalContent.orgShareDtoList">@{{item.name}}&nbsp;&nbsp;</span>
                            </p>
                            <div>
                                <span class="time">{{journalContent.createDate}}</span>
                                <span class="edit" @click="editJournal">
                                <i class="el-icon-edit">编辑</i>
                            </span>
                            </div>
                            <div>
                                <smart-comment
                                        :businessId="journalContent.sid"
                                        business_type="3">
                                </smart-comment>
                            </div>
                        </div>

                    </div>
                    <div v-show="isEdit">
                        <!--<new-journal v-show="isEdit"-->
                                     <!--:journalId="journalContent.sid"-->
                                     <!--:isEdit="isEdit"-->
                                     <!--:cancel-btn="cancelBtn"-->
                                     <!--:groupTreeDataParent="groupTreeData"-->
                                     <!--:groupDataParent="groupData"-->
                                     <!--:content="journalContent.content"-->
                                     <!--@cancel="cancel"-->
                                     <!--@refreshJournal="initPage(isCurDate)"-->
                                     <!--:cur-date="curDate" ></new-journal>-->
                        <div class="clearfix" v-if="isEdit">
                            <span style="float: left;line-height: 42px">共享人员：</span>
                            <group-tree
                                    :selectedDeptsToTree="groupTreeData.deptList"
                                    :selectedRolesToTree="groupTreeData.roleList"
                                    :selectedUsersToTree="groupTreeData.userList"
                                    :tagButtons="groupTreeData.tagButtons"
                                    @getDataFromGroupTree = "getDataFromGroupTree"
                            >
                            </group-tree>
                        </div>
                        <div>
                            <el-form :model="createForm" :rules="rules" status-icon  ref="createForm" label-width="0px" style="margin-top: 20px" class="demo-ruleForm">
                                <el-form-item prop="content">
                                    <UEditor id="editor"  :config="UEconfig"  v-model="createForm.content" ref="UEditor" style="line-height: 24px"></UEditor>
                                </el-form-item>
                                <el-form-item>
                                    <el-button v-if="cancelBtn" @click="cancel('createForm')">取消</el-button>
                                    <el-button type="primary" @click="submitForm('createForm')">{{l('{journalLocale.dateWeek.publish}')}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </date-week-demo>
        </div>
    </div>
</template>

<script>
    JZY.locale.add('journalLocale',require('./journal.locale'))
    import dateWeekDemo from '@Main/journal/components/dateWeekDemo.vue'
    import UEditor from '@/components/UEditor.vue'
    import {postJournalDetail,postJournalSave,postJournalEdit} from '@Main/journal/getData.js'
    export default{
        components:{
            dateWeekDemo,
            UEditor
        },
        methods:{
            getCurdate(val,isCurDate){
                this.curDate = val;
                this.isCurDate = isCurDate;
//                this.empty();
                this.initPage (isCurDate);
            },
            initPage (isCurDate){
                this.loading=true;
                this.rqJournalList(this.curDate,isCurDate);
            },
            //补交日志
            payJournal(){
                this.isEdit = true;
                this.cancelBtn = false;
            },
            //编辑日志
            editJournal(){
                this.isEdit = true;
                this.contentShow = false;
//                this.empty();

                //部门
                let orgShareDtoList = this.journalContent.orgShareDtoList;
                console.log(this.journalContent)
                if(orgShareDtoList){
                    orgShareDtoList.map((item)=>{
                        let share = {};
                        share.name = item.name;
                        share.sid = item.id;
                        this.groupData.deptList.push(share);
                        this.groupTreeData.deptList.push(share);
                    });
                }

                //角色
                let roleShareDtoList = this.journalContent.roleShareDtoList;
                if(roleShareDtoList){
                    roleShareDtoList.map((item)=>{
                        let share = {};
                        share.roleName = item.name;
                        share.roleId = item.id;
                        this.groupData.roleList.push(share);
                        this.groupTreeData.roleList.push(share);
                    });
                }

                //人员
                let userShareDtoList = this.journalContent.userShareDtoList;
                if(userShareDtoList){
                    userShareDtoList.map((item)=>{
                        let share = {};
                        share.name = item.name;
                        share.sid = item.id;
                        this.groupData.userList.push(share);
                        this.groupTreeData.userList.push(share);
                    });
                }

                console.log(this.groupTreeData,"this.groupTreeData");
                console.log(this.groupData,"this.groupData");
                this.createForm.content=this.journalContent.content;
                this.setContent(this.journalContent.content);
            },
            //获取日志
            async rqJournalList(journalDate,isCurDate){
                let res = await postJournalDetail(journalDate);
                this.loading=false;
                console.log(res,"resresres");
                if(res[0].sid){
                    this.isFill = true;
                    let resData = res[0];
                    this.journalContent = {...resData};
                    this.loading=false;
                    console.log(this.journalContent,this.isFill,isCurDate)
                }else{
                    this.isFill = false;
                }
                if(isCurDate){
                    if(this.isFill){//当前天已填写
                        console.log("当前天已填写");
                        this.journalState = 2;
                        this.isEdit = false;
                        this.cancelBtn = true;
                        this.contentShow = true;
//                        this.empty();
                    }else{  //当前天未填写
                        console.log("当前天未填写");
                        this.journalState = 0;
                        this.isEdit = true;
                        this.cancelBtn = false;
                        this.contentShow = false;
//                        this.empty();

                    }
                }else{
                    if(this.isFill){//非当前天已填写
                        console.log("非当前天已填写");
                        this.journalState = 2;
                        this.isEdit = false;
                        this.cancelBtn = true;
                        this.contentShow = true;
                        this.empty();
                    }else{  //非当前天未填写
                        console.log("非当前天未填写")
                        this.journalState = 1;
                        this.isEdit = false;
                        this.cancelBtn = true;
                        this.contentShow = false;
                        this.empty();
                    }
                }

            },
            //取消
            cancel(formName){
                this.$refs[formName].resetFields();
                this.isEdit = false;
                this.contentShow = true;
            },
            //获取编辑器里的内容
            getContent () {
                console.log(this.$refs.UEditor.getContent())
            },
            //给编辑器设置
            setContent(msg){
                this.$refs.UEditor.setContent(msg);
            },
            submitForm(formName){
                this.createForm.content = this.$refs.UEditor.getContent();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //用户
                        let userIdList = [];
                        if(this.groupData.userList){
                            let data = this.groupData.userList;
                            data.map((item)=>{
                                userIdList.push(item.sid);
                            });
                            console.log(userIdList,"1")
                        }
                        //角色
                        let roleIdList = [];
                        if(this.groupData.roleList){
                            let data = this.groupData.roleList;
                            data.map((item)=>{
                                roleIdList.push(item.roleId);
                            });
                            console.log(roleIdList,"2")
                        }
                        //部门
                        let orgIdList = [];
                        if(this.groupData.deptList){
                            let data = this.groupData.deptList;
                            data.map((item)=>{
                                orgIdList.push(item.sid);
                            });
                            console.log(orgIdList,"3")
                        }
                        let queryData = {
                            userIdList:userIdList,
                            roleIdList:roleIdList,
                            orgIdList:orgIdList,
                            content:this.createForm.content,
                            journalDate:this.curDate
                        };
                        console.log(queryData,"queryData");
                        if(this.cancelBtn){
                            console.log("编辑")
                            this.loading=true;
                            queryData.sid = this.journalContent.sid;
                            this.rqJournalSave(queryData);
//                            this.rqJournalEdit(this.journalContent.sid,queryData);
                        }else{
                            console.log("新建")
                            this.loading=true;
                            this.rqJournalSave(queryData);
                        }
                        console.log(JSON.stringify(queryData),"queryData");

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //接收组合树组件的返回值
            getDataFromGroupTree:function(obj){
                this.groupData = {...obj};
            },

            //保存日志
            async rqJournalSave(queryData){
                let res = await postJournalSave(queryData);
                if(res[0]){
                    console.log(res,"res成功啊 啊啊");
                    if(queryData.sid){
                        this.$message({
                            message: '修改日志成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '新建日志成功！',
                            type: 'success'
                        });
                    }

                    this.empty();
                    this.initPage(this.curDate);
                    this.loading=false;

                }else{

                }

            },
            //修改日志postJournalEdit postJournalEdit

//            async rqJournalEdit(journalId,queryData){
//                let res = await postJournalEdit(journalId,queryData);
//                if(res[0]){
//                    console.log(res,"res成功啊 啊啊");
//                    this.$message({
//                        message: '修改日志成功！',
//                        type: 'success'
//                    });
//                    this.empty();
//                    this.initPage(this.curDate);
//                    this.loading=false;
//
//                }else{
//
//                }
//
//            },
            empty(){
                this.createForm.content = '';
                this.setContent('');
                this.groupData = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[],};
                let initTreeData = {
                    tagButtons:['dept','role','user'],//部门、角色、用户，默认三个，可不传值
                    //已选择的部门
                    deptList:[
                    ],
                    //已选择的角色
                    roleList:[
//
                    ],
                    //已选择的用户
                    userList:[
//
                    ],
                };
                this.groupTreeData={...initTreeData};
                console.log('重置数据');
            }
        },
        data(){
            return {
                loading:false,
                isFill:false,//是否已填写
                isEdit:false,//是否正在编辑
                cancelBtn:false,//是否有取消按钮
                contentShow:true,//详情是否显示
                isCurDate:true,//是否是当前天
                curDate:'',
                journalState:0, //0当前未写日志， 1补交日志， 2已填写日志
                journalContent:{},//日志内容
                UEconfig:{
                    initialContent:'请输入内容',
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
//                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:350,//设置编辑器高度
                    scaleEnabled:false,//不可以拉伸
                    maximumWords:5000,//字数限制
                    wordCount:true,
                    autoFloatEnabled:false,//是否保持toolbar的位置不动，默认true
                    autoSyncData:false,//自动同步编辑器要提交的数据
                    elementPathEnabled : false,
                    toolbars: [[ 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'strikethrough',  'blockquote', 'pasteplain', '|', 'selectall', 'cleardoc', '|'
                    ]]
                },
                createForm: {
                    content:''
                },
                rules:{
                    content:[
                        { required: true, message: '日志内容不能为空', trigger: 'blur' },
                    ],
                },
                //组合树-开始
                groupTreeData:{
                    tagButtons:['dept','role','user'],//部门、角色、用户，默认三个，可不传值
                    //已选择的部门
                    deptList:[
//                        {
//                            sid:'1002',
//                            name:'市场部'
//                        },{
//                            sid:'1003',
//                            name:'人事部'
//                        }
                    ],
                    //已选择的角色
                    roleList:[
//                        {
//                            roleId:'1003',
//                            roleName:'销售经理'
//                        }
                    ],
                    //已选择的用户
                    userList:[
//                        {
//                            // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
//                            sid:'1000',
//                            name:'创建者'
//                        }
                    ],
                },
                groupData:{
                    deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[],
                },
            }
        },
        watch:{

        },
        mounted (){
//            this.initPage();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .mine{
        /*padding: 12px;*/
        /*overflow-y: scroll;*/
        /*height: 100%;*/
        h3{
            line-height: 48px;
            padding-left: 20px;
        }
        .detail{
        }
        .edit{
            cursor: pointer;
            font-size: 14px;
            color: #00a0e9;
        }
        .member,.time {
            color: #666666;
            font-size: 14px;
            line-height: 24px;
        }
    }
</style>

<template>
    <div class="mine journal">
        <h3>我的日志</h3>
        <div class="mine-content" v-loading="!sysTime">
            <date-week-demo :sysTime="sysTime" @curdate="getCurdate" v-loading="loading" v-if="sysTime">
                <div slot="detail">
                    <div v-show="journalState == 0">
                    </div>
                    <div v-show="journalState == 1">
                        <p @click="payJournal" class="edit" v-if="!isEdit">点击补交日志</p>
                        <p class="time"  v-if="!isEdit">{{curDate}}</p>
                    </div>
                    <div v-show="journalState == 2">
                        <div v-show="contentShow">
                            <pre v-html="journalContent.content" class="journal-content"></pre>
                            <p class="member">
                                <span v-for="item in journalContent.userShareDtoList">@{{item.name}}&nbsp;&nbsp;</span>
                                <span v-for="item in journalContent.roleShareDtoList">@{{item.name}}&nbsp;&nbsp;</span>
                                <span v-for="item in journalContent.orgShareDtoList">@{{item.name}}&nbsp;&nbsp;</span>
                            </p>
                            <div>
                                <span class="time">{{journalContent.createDate}}</span>
                                <span class="edit" @click="editJournal">&nbsp;&nbsp;&nbsp;
                                <i class="el-icon-edit">编辑</i>
                            </span>
                            </div>
                            <div>
                                <smart-comment
                                        v-if="journalContent.sid"
                                        :businessId="journalContent.sid"
                                        :commentUserId = 'commentUserId'
                                        business_type="3">
                                </smart-comment>
                            </div>
                        </div>

                    </div>
                    <div v-show="isEdit">
                        <div class="clearfix" v-if="isEdit">
                            <span style="float: left;line-height: 42px;font-size: 12px">共享人员：</span>
                            <blend-tree
                                    ref= "groupTree"
                                    :enable-checked-multiple = "true"
                                    :tagButtons="['dept','role','user']"
                                    activeTab = "dept"
                                    :selectedDataToTree = "selectedDataToTree"
                                    @getDataFromTree = "getDataFromTree">
                                <!--添加按钮图标的插槽-->
                                <div slot="add_button">
                                    <i class="el-icon-circle-plus" @click.stop = "$refs.groupTree.blendTreeDialogShow()"></i>
                                </div>
                            </blend-tree>


                        </div>
                        <div>
                            <el-form :model="createForm" :rules="rules" status-icon  ref="createForm" label-width="0px" style="margin-top: 8px" class="demo-ruleForm">
                                <el-form-item prop="content">
                                    <el-input v-model="createForm.content" :rows="11"  placeholder="记录今日日报" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button v-if="cancelBtn" size="small" @click="cancel('createForm')">取消</el-button>
                                    <el-button type="primary" size="small" @click="submitForm('createForm')">{{l('{journalLocale.dateWeek.publish}')}}</el-button>
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
    //    import UEditor from '@/components/UEditor.vue'
    import {postJournalDetail,postJournalSave,postJournalEdit} from '@Main/journal/getData.js'
    export default{
        components:{
            dateWeekDemo
        },
        methods:{

            getDataFromTree( obj = {} ){
                this.formGroupData = {...obj};
            },


            getCurdate(val,isCurDate){
                this.curDate = val;
                this.isCurDate = isCurDate;
                this.$refs['createForm'].resetFields();
                this.formGroupData = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]}
                this.selectedDataToTree = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};
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
                this.empty();

                //部门
                let orgShareDtoList = this.journalContent.orgShareDtoList;
                if(orgShareDtoList){
                    orgShareDtoList.map((item)=>{
                        let share = {};
                        share.name = item.name;
                        share.sid = item.id;


                        this.selectedDataToTree.deptList.push(share);
                        this.formGroupData.deptList.push(share);
                    });
                }

                //角色
                let roleShareDtoList = this.journalContent.roleShareDtoList;
                if(roleShareDtoList){
                    roleShareDtoList.map((item)=>{
                        let share = {};
                        share.roleName = item.name;
                        share.roleId = item.id;


                        this.selectedDataToTree.roleList.push(share);
                        this.formGroupData.roleList.push(share);

                    });
                }

                //人员
                let userShareDtoList = this.journalContent.userShareDtoList;
                if(userShareDtoList){
                    userShareDtoList.map((item)=>{
                        let share = {};
                        share.name = item.name;
                        share.sid = item.id;


                        this.selectedDataToTree.userList.push(share);
                        this.formGroupData.userList.push(share);
                    });
                }

                this.createForm.content=this.journalContent.content;
//                this.setContent(this.journalContent.content);
            },
            //获取日志
            async rqJournalList(journalDate,isCurDate){
                let res = await postJournalDetail(journalDate);
                this.loading=false;
//                console.log(res,"resresres");
                if(res[0].sid){
                    this.isFill = true;
                    let resData = res[0];
                    this.journalContent = {...resData};
                    this.loading=false;
                    // debugger
//                    console.log(this.journalContent,this.isFill,isCurDate)
                }else{
                    this.isFill = false;
                }
                if(isCurDate){
                    if(this.isFill){//当前天已填写
//                        console.log("当前天已填写");
                        this.journalState = 2;
                        this.isEdit = false;
                        this.cancelBtn = true;
                        this.contentShow = true;
//                        this.empty();
                    }else{  //当前天未填写
//                        console.log("当前天未填写");
                        this.journalState = 0;
                        this.isEdit = true;
                        this.cancelBtn = false;
                        this.contentShow = false;
//                        this.empty();

                    }
                }else{
                    if(this.isFill){//非当前天已填写
//                        console.log("非当前天已填写");
                        this.journalState = 2;
                        this.isEdit = false;
                        this.cancelBtn = true;
                        this.contentShow = true;
                        this.empty();
                    }else{  //非当前天未填写
//                        console.log("非当前天未填写")
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
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //用户
                        let userIdList = [];
                        if(this.formGroupData.userList){
                            let data = this.formGroupData.userList;
                            data.map((item)=>{
                                userIdList.push(item.sid);
                            });
//                            console.log(userIdList,"1")
                        }
                        //角色
                        let roleIdList = [];
                        if(this.formGroupData.roleList){
                            let data = this.formGroupData.roleList;
                            data.map((item)=>{
                                roleIdList.push(item.roleId);
                            });
//                            console.log(roleIdList,"2")
                        }
                        //部门
                        let orgIdList = [];
                        if(this.formGroupData.deptList){
                            let data = this.formGroupData.deptList;
                            data.map((item)=>{
                                orgIdList.push(item.sid);
                            });
//                            console.log(orgIdList,"3")
                        }
                        let queryData = {
                            userIdList:userIdList,
                            roleIdList:roleIdList,
                            orgIdList:orgIdList,
                            content:this.createForm.content,
                            journalDate:this.curDate
                        };
//                        console.log(queryData,"queryData");
                        if(this.cancelBtn){
//                            console.log("编辑")
                            this.loading=true;
                            queryData.sid = this.journalContent.sid;
                            this.rqJournalSave(queryData);
//                            this.rqJournalEdit(this.journalContent.sid,queryData);
                        }else{
//                            console.log("新建")
                            this.loading=true;
                            this.rqJournalSave(queryData);
                        }
//                        console.log(JSON.stringify(queryData),"queryData");

                    } else {
//                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //保存日志
            async rqJournalSave(queryData){
                let res = await postJournalSave(queryData);
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

            },
            empty(){
                this.createForm.content = '';
                this.formGroupData = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]}
                this.selectedDataToTree = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};
            },
            //获取服务器时间
            async getSysTime(){
                let res = await JZY.xhr.r([{
                    type: 'get',
                    url: '/sys/common/getSysTime',
                    data: {}
                }], 'GLOBAL', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {
                        this.sysTime = res[0];
                        return res;

                    } catch (e) {

                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
            }
        },
        data(){
            return {
                commentUserId:this.$store.state.session.sid,
                loading:false,
                isFill:false,//是否已填写
                isEdit:false,//是否正在编辑
                cancelBtn:false,//是否有取消按钮
                contentShow:true,//详情是否显示
                isCurDate:true,//是否是当前天
                curDate:'',
                journalState:0, //0当前未写日志， 1补交日志， 2已填写日志
                journalContent:{},//日志内容
                createForm: {
                    content:''
                },
                rules:{
                    content:[
                        { required: true, message: '日志内容不能为空', trigger: 'blur' },
                    ],
                },


                selectedDataToTree: {//已选树节点
                    userList: [],
                    deptList: [],
                    roleList: [],


                },
                formGroupData:{

                },
                sysTime:'',



            }
        },
        watch:{

        },
        mounted (){
//            this.initPage();
        },
        created(){
          this.getSysTime();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .mine{
        padding: 0 24px;
        height: 100%;
        overflow-y: auto;
        /*overflow-y: scroll;*/
        /*height: 100%;*/
        h3{
            line-height: 64px;
            font-size: 14px;
            font-weight: normal;
            color: #191919;
            padding: 0;
            margin: 0;

        }
        .journal-content{
            line-height: 24px;
            font-size: 12px;
            color: $theme-black-title;
        }
        .edit{
            cursor: pointer;
            font-size: 14px;
            color: $theme-blue;
        }
        .member,.time {
            color: $theme-black-other;
            font-size: 12px;
            line-height: 24px;
        }
        .el-icon-edit{
            font-size: 12px;
            color: $theme-blue;
        }
        .el-icon-edit:hover{
            color: #2C92EE;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .mine.journal{
        .el-form-item__error{
            top:92%;
        }
    }
</style>

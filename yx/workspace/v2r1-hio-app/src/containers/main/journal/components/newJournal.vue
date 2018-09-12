<template>
    <div>
        <div class="clearfix">
            <span style="float: left;line-height: 42px">共享人员：</span>
            <group-tree
                    style="float: left"
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
</template>

<script>
    import UEditor from '@/components/UEditor.vue'
    import {postJournalSave,postJournalEdit} from '@Main/journal/getData.js'
    export default{
        components:{
            UEditor
        },
        props:{
            curDate:{
                type:String,
                require:true
            },
            cancelBtn:{
                type:Boolean,
                require:true
            },
            isEdit:{
                type:Boolean,
                require:true
            },
            journalId:{
                require:false
            },
            groupTreeDataParent:{
                type:Object,
                require:false,
                default:{
                    tagButtons:['dept','role','user'],//部门、角色、用户，默认三个，可不传值
                    //已选择的部门
                    deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[],
                },
            },
            groupDataParent:{
                type:Object,
                require:false,
                default:{
                    deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[],
                },
            },


        },
        methods:{
            cancel(formName){
                this.$emit("cancel");
                this.$refs[formName].resetFields();
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
                                this.rqJournalEdit(this.journalId,queryData);
                            }else{
                                console.log("新建")
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
                    this.$message({
                        message: '新建日志成功！',
                        type: 'success'
                    });
                    this.empty();
                    this.$emit("refreshJournal")

                }else{

                }

            },
            //修改日志postJournalEdit postJournalEdit

            async rqJournalEdit(journalId,queryData){
                let res = await postJournalEdit(journalId,queryData);
                if(res[0]){
                    console.log(res,"res成功啊 啊啊");
                    this.$message({
                        message: '修改日志成功！',
                        type: 'success'
                    });
                    this.empty();
                    this.$emit("refreshJournal")

                }else{

                }

            },
            empty(){
                this.createForm.content = '';
                this.groupData = [];
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
            }


        },
        data(){
            return {
                UEconfig:{
//                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:350,//设置编辑器高度
                    scaleEnabled:false,//不可以拉伸
                    maximumWords:5000,//字数限制
                    autoFloatEnabled:false,//是否保持toolbar的位置不动，默认true
                    autoSyncData:false,//自动同步编辑器要提交的数据
                    toolbars: [[
                        'source', '|', 'undo', 'redo', '|',
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
        mounted (){
        },
        watch:{


            groupDataParent:{
                handler:function (newVal) {
                     this.groupData = {...newVal};
//                    this.$set(this.groupData, {
//                        ...newVal
//                    });
                    console.log(this.groupData,"this.groupData.groupData");
                },
                deep:true
            },
            groupTreeDataParent:{
                handler:function (newVal) {
                     this.groupTreeData = {...newVal};
//                    this.$set(this.groupTreeData, {
//                        ...newVal
//                    });
                     console.log(this.groupTreeData,"this.groupTreeDatathis.groupTreeData");
                },
                deep:true
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>



</style>

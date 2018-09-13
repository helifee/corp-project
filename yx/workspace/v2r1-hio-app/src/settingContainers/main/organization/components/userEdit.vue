<template>
    <div>
        <right-slide-modal title="编辑用户" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled" @click="operateSave()" >保存</el-button></li>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <div class="userEdit">
                <el-form label-width="100px" label-position="right"  :model="userData" :rules="rules" ref="refUser">
                    <el-row>
                        <el-col  :span="16">
                            <el-form-item label="姓名：" prop="userName">
                                <el-input placeholder="输入姓名" v-model="userData.userName" maxlength="21"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码：" prop="userMobile">
                                <el-input placeholder="输入手机号码" v-model="userData.userMobile" @blur="handleBlurMobile"
                                          maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                            </el-form-item>
                            <el-form-item label="性别：" prop="sex">
                                <el-radio v-model="userData.sex" label="0">女</el-radio>
                                <el-radio v-model="userData.sex" label="1">男</el-radio>
                            </el-form-item>
                            <el-form-item label="邮箱：" prop="userEmail">
                                <el-input placeholder="请输入邮箱地址" v-model="userData.userEmail" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="在职状态：" prop="workStatus">
                                <el-checkbox v-model="userData.workStatus">离职</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item  prop="jobs" >
                        <el-table :data="userData.jobs" :show-header="false" style="margin-left:-120px">
                            <el-table-column
                                    width="270"
                                    prop="name">
                                <template slot-scope="scope">
                                    <el-form-item label="所属部门：" v-if="scope.row.isDefault=='true'">
                                        <el-button class="operaterDept" plain
                                                   @click="handleSelectDep(scope.$index)">{{scope.row.organizationName}}</el-button>
                                    </el-form-item>
                                    <el-form-item label="兼职部门：" v-else>
                                        <el-button  class="operaterDept" plain
                                                   @click="handleSelectDep(scope.$index)">{{scope.row.organizationName}}</el-button>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="postName"
                                    width="260">
                                <template slot-scope="scope">
                                    <el-form-item
                                            label="职务"
                                            :prop="'jobs.' + scope.$index + '.postName'"
                                            :rules="[
                                            {  message: '请输入职务名称', trigger: 'blur' },
                                            { min: 1, max: 20, message: '长度不能大于20字符', trigger: 'blur' },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                                            ]"
                                    >
                                        <el-input style="width: 130px" v-model="scope.row.postName" :maxlength=21 ></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="110">
                                <template slot-scope="scope">
                                    <el-form-item v-if="scope.row.isDefault=='true'">
                                        <el-button  type="text" class="btnMainJob" @click="handleAddPartTime">
                                            <i class="el-icon-circle-plus-outline"></i>添加兼职</el-button>
                                    </el-form-item>
                                    <el-form-item v-else>
                                        <el-button  type="text" class="btnJz" @click="handleDelPartTime(scope.$index)">
                                        <i class="el-icon-close"></i>删除兼职</el-button>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-row>
                        <el-col  :span="16">
                            <el-form-item label="所属角色：" >
                                <el-input  v-model="userData.roleNames" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </right-slide-modal>
        <selectDep :selectDepDialogVisible.sync="selectDepDialogVisible" @getSelectDep="getSelectDep"
                   v-if="selectDepDialogVisible" :jobsIndex="jobsIndex"></selectDep>
    </div>
</template>

<script>
    import selectDep from './userEdit.selectDep.vue'
    import {isvalidPhone} from  '@/utils/validate.js'
    // import deepExtend from '@utils/deepExtend'
    let validPhone=(rule, value,callback)=>{
        if (!value){
            callback(new Error('手机号码不能为空'))
        }else  if (!isvalidPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
        }else {
            callback()
        }
    }
    export default {
        name: "user-edit",
        components:{
            selectDep
        },
        data(){
            return{
                userData:{
                    userName:"",
                    userMobile:"",
                    userEmail:"",
                    sex:"",
                    workStatus:false,
                    jobs:[],
                    // jobs:[{
                    //     organizationId:"",
                    //     postName:"",           //职务
                    //     isDefault:"",         //false为兼职
                    //     organizationName:"",
                    //     userPositionId:""     //职务id
                    // }],
                    roleNames:""
                },
                initUserData:{},
                rules:{
                    userName:[{required:true,message: '姓名不能为空', trigger: 'blur'},
                        {min:1, max:20, message:"姓名长度不能大于20字符，请重新输入！", trigger:'blur'},
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }],
                    userMobile:[{ required: true, trigger: 'blur', validator: validPhone }],
                    userEmail:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }],
                    // postName:[{min:1, max:20, message:"职务长度不能大于20字符，请重新输入！", trigger:'blur'},
                    //     { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }]
                },
                selectDepDialogVisible:false,
                jobsIndex:"",
                btnDisabled:false
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            userId:{
                required:true
            }
        },
        mounted(){
            // console.log("this.userId"+this.userId);
             this.getDataByUserId(this.userId);
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        methods: {
            operateClose() {
                //刷新userlist
                // this.$emit("refreshUserTable");
                this.$emit("closeCreateModal");
            },
            operateSave(){
                this.btnDisabled=true;
                this.$refs.refUser.validate((valid) => {
                    if (valid) {
                        try{
                            let pas={
                                userId:this.userId,
                                userName:this.userData.userName,
                                userMobile:this.userData.userMobile,
                                userEmail:this.userData.userEmail,
                                sex:this.userData.sex,
                            }
                            //workStatus  1表示在职；2表示离职
                            if(this.userData.workStatus){
                                pas.workStatus="2"
                            }else{
                                pas.workStatus="1"
                            }
                            //计算删除部门的id和有变化的部门信息
                            let strDelDep=[];
                            let arrChangeDep=[];
                            //过滤出删除和修改
                            this.initUserData.jobs.forEach(item=>{
                                let hasInOld=false;
                                this.userData.jobs.forEach(item2=>{
                                    if(item.organizationId==item2.organizationId && item.isDefault==item2.isDefault){
                                        hasInOld=true;
                                        if(item.postName!=item2.postName){
                                            arrChangeDep.push(item2)
                                        }
                                        return
                                    }
                                })
                                if(!hasInOld){
                                    strDelDep.push(item.userPositionId);
                                }
                            })
                            //过滤出新增
                            this.userData.jobs.forEach(curItem=>{
                                let hasInOld=false;
                                this.initUserData.jobs.forEach(initItem=>{
                                    if(curItem.organizationId==initItem.organizationId && curItem.isDefault==initItem.isDefault){
                                        hasInOld=true;
                                        return
                                    }
                                })
                                if(!hasInOld){
                                    arrChangeDep.push(curItem)
                                }
                            })
                            pas.userPositionDeletedIds=strDelDep;
                            pas.jobs=arrChangeDep;
                            // console.log("pas:"+JSON.stringify(pas))
                            this.commitAllData(pas,'/sys/user/updateUser');
                        }catch (e){
                            this.btnDisabled=false
                        }
                    }else {
                        this.btnDisabled=false
                        return false;
                    }
                })
            },
            handleAddPartTime(){
                //增加兼职部门
                let objPartTime={
                    organizationId:"",
                    postName:"",           //职务
                    isDefault:"false",         //false为兼职
                    organizationName:"",
                    userPositionId:""     //职务id
                }
                this.userData.jobs.push(objPartTime);
            },
            handleDelPartTime(index){
                //删除兼职部门
                this.userData.jobs.splice(index,1)
            },
            handleSelectDep(jobsIndex){
                this.jobsIndex=jobsIndex;
                this.selectDepDialogVisible=true;
            },
            getSelectDep(depInfo,jobsIndex){
                //selectDep组件传回的选择的部门信息
                this.userData.jobs[jobsIndex].organizationId=depInfo.sid;
                this.userData.jobs[jobsIndex].organizationName=depInfo.name;
                // console.log("depInfo:"+JSON.stringify(depInfo))

            },
            handleBlurMobile(){
                let newUserMobile=this.userData.userMobile.replace(/[^\d]/g,'');
                this.$nextTick(() => {
                    this.userData.userMobile=newUserMobile;
                });
            },
            async commitAllData(pas,url){
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        // this.roleData=resultData[0].list;
                        this.$emit("closeCreateModal");
                        this.$emit("refreshUserTable");
                        this.btnDisabled=false;
                    }catch (e){
                        this.btnDisabled=false;
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
            async getDataByUserId(userId){
                await JZY.xhr.request('/sys/user/get/'+ userId).then((resultData)=>{
                    // console.log("userEdit:"+JSON.stringify(resultData))
                    try{
                        this.initUserData=JZY.u.copy(resultData[0]);
                        this.userData.userName=resultData[0].userName;
                        this.userData.userMobile=resultData[0].userMobile;
                        this.userData.userEmail=resultData[0].userEmail;
                        this.userData.sex=resultData[0].sex;
                        if(resultData[0].workStatus=="job"){
                            this.userData.workStatus=false;
                        }else if(resultData[0].workStatus=="leave"){
                            this.userData.workStatus=true;
                        }
                        this.userData.jobs=resultData[0].jobs;
                        this.userData.roleNames=resultData[0].roleNames;
                    }catch (e){
                        this.$message("userEdit.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            }
        }
    }
</script>

<style  lang="scss">
    .operate_buttons {
        float: right;
        margin: -5px 10px 0 0;
    }
    .userEdit{
        .btnMainJob{
            padding-left: 20px;
            font-size: 14px;
            font-weight: 400;
        }
        .btnJz{
            padding-left: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #FF0000;;
        }
        .el-table .el-table__body tr:hover > td{
            background-color:white;
        }
        .el-table td{
            border: 0;
        }
        .el-table::before{
            height: 0;
        }
        .operaterDept{
            width:100%;
            text-align:left;
            min-height:40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>
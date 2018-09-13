<template>
    <!--右侧弹窗编辑部门-->
    <div>
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false" modal-append-to-body>
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled"  @click="operateSave()">保存</el-button></li>
                    <li><el-button @click="operateClose()">关闭</el-button></li>
                </ul>
            </div>
            <div class="departmentEdit">
                <el-form label-position="right" label-width="110px" :model="data" :rules="rules" ref="refEditDep">
                    <el-form-item label="部门名称：" prop="depName">
                        <el-input placeholder="输入部门名称" v-model="data.depName" maxlength="21"
                                  style="width:50%" :disabled="depDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="上级部门：">
                        <el-input v-model="data.parentName" :disabled="true" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="部门描述：">
                        <el-input v-model="data.remark" :rows="3" type="textarea" v-textarea-limiter maxlength="2500"></el-input>
                    </el-form-item>
                    <el-form-item label="部门负责人：">
                        <el-button style="width:50%;text-align:left;min-height:40px" plain @click="handlerSeleManager">{{data.manager}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </right-slide-modal>
        <selectManager :selectUserDialogVisible.sync="selectUserDialogVisible" :depData="data" @selectUserInfo="selectUserInfo"
                  v-if="selectUserDialogVisible" @inviteUserInfo="inviteUserInfo" :depId="depId"></selectManager>
    </div>
</template>

<script>
    import selectManager from './depEdit.selectUser.vue'
    export default {
        name: "department-edit",
        components:{
            selectManager
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            depId:{
                required:true
            },
            treeNodeData:{
                required:true
            }
        },
        data(){
            return{
                data:{
                    depName:"",
                    // depId:"",      //只有在update时用到
                    parentName:"",
                    parentId:"",
                    remark:"",
                    manager:"",
                    managerType:0,//部门负责人选择类型：0表示不选择负责人，1表示直接选择人员,leaderId必传；2表示邀请用户（userName,userMobile）必传
                    leaderId:"",
                    userName:"",
                    userMobile:"",
                    userEmail:""
                },
                rules:{
                    depName:[{required:true,message: '部门名称不能为空', trigger: 'blur'},
                        {min:1, max:20, message:"部门名称长度不能大于20字符，请重新输入！", trigger:'blur'},
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ]
                },
                selectUserDialogVisible:false,
                title:"",
                btnDisabled:false,
                depDisabled:false,
            }
        },
        mounted(){
            if(this.depId!="add" && this.depId!=""){
                //更新
                this.title="编辑部门";
                this.getDataByOrgId();
            }else{
                this.data={
                    remark:"",
                };
                this.title="新增部门";
                this.data.parentName=this.treeNodeData.name;
                this.data.parentId=this.treeNodeData.sid;
                this.data.managerType=0;
                // console.log("parentDepName："+parentDepName);
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
            }
        },
        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
            },
            handlerSeleManager(){
                this.selectUserDialogVisible=true;
            },
            selectUserInfo(user){
                //选择人员列表组件传回选择的人员信息
                if(user){
                    this.data.managerType=1;
                    this.data.manager=user.userName;
                    this.data.leaderId=user.userId;
                }
            },
            inviteUserInfo(user){
                //邀请用户组件传回邀请用户信息
                // console.log("user:"+JSON.stringify(user))
                this.data.managerType=2;
                this.data.userName=user.userName;
                this.data.manager=user.userName;
                this.data.userMobile=user.userMobile;
                this.data.userEmail=user.userEmail;
            },
            operateSave(){
                this.btnDisabled=false;
                this.$refs.refEditDep.validate((valid) => {
                   if(valid){
                       try{
                           let pas={};
                           pas.name=this.data.depName;
                           pas.remark=this.data.remark;
                           pas.parentId=this.data.parentId;
                           pas.type=this.data.managerType;
                           pas.leaderId=this.data.leaderId;
                           pas.userName=this.data.userName;
                           pas.userMobile=this.data.userMobile;
                           pas.userEmail=this.data.userEmail;
                           if(this.depId!="add" && this.depId!=""){
                               //更新
                               pas.organizationId=this.depId;
                               pas.parentId=this.data.parentId;
                               if(pas.parentId=="" || pas.parentId==undefined){
                                   //最顶层结点编辑
                                   pas.parentId="-1";
                               }
                               this.commitAllData(pas,'/sys/organization/updateOrganization',"update")
                           }else{
                               this.commitAllData(pas,'/sys/organization/save',"add")
                           }
                       }catch (e){
                           this.btnDisabled=false;
                           this.$message("保存数据异常:"+e)
                       }
                   }else {
                       this.btnDisabled=false
                       return false;
                   }
                })
            },
            async commitAllData(pas,url,type){
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        // this.roleData=resultData[0].list;
                        this.btnDisabled=false;
                        //如果想刷新role.list不调用接口，需要在新增成功后后台返回roleid
                        if(type=="add"){
                            resultData[0].children=[];  //增加个children属性
                            this.$emit("successBackFun",type,resultData[0]);//刷新树
                        }else{
                            this.$emit("successBackFun",type,pas);//刷新树
                        }


                    }catch (e){
                        this.btnDisabled=false;
                        this.$message("departmentEdit.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
            async getDataByOrgId(){
                await JZY.xhr.post('/sys/organization/get',{organizationId:this.depId},{alertSuccess:false}).then((resultData)=>{
                // await JZY.xhr.request('/sys/organization/get/'+this.depId).then((resultData)=>{
                    // console.log("getUserListData1111:"+JSON.stringify(resultData))
                    try{
                        this.data.depName=resultData[0].name;
                        this.data.remark=resultData[0].remark;
                        this.data.manager=resultData[0].leaderName;
                        this.data.leaderId=resultData[0].leaderId;
                        this.data.parentName=resultData[0].parentName;
                        this.data.parentId=resultData[0].parentId;
                        if(this.data.parentId==null){
                            this.depDisabled=true;
                        }
                        if(resultData[0].leaderId!=null){
                            this.data.managerType=1;
                        }
                    }catch (e){
                        this.$message("depEdit.selectuser.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            }
        }

    }
</script>

<style scoped lang="scss">
    .operate_buttons {
        float: right;
        margin: -5px 10px 0 0;
    }
.departmentEdit{

}
</style>
<template>
    <div class="select_manager">
        <!--选择人员-->
        <div >
            <el-dialog :title="title"  :visible.sync="selectUserDialogVisible" append-to-body custom-class="depEdit-selectUser-dialog"
                       style="overflow-y: hidden"  width="40%" :before-close="selectUserClose" :close-on-click-modal="false">
                <div v-if="!inviteUserDialogVisible">
                    <el-table :data="userTabledata" :show-header="false" style="max-height: 300px;overflow: auto"
                              highlight-current-row @current-change="handleCurrentChange">
                        <el-table-column prop="userName" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="userPhone"> </el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="medium" @click="handleInviteUser">邀请</el-button>
                        <el-button type="primary" size="medium" v-if="btnOK" @click="selectUserSure">确 定</el-button>
                        <el-button @click="selectUserClose" size="medium">取 消</el-button>
                    </span>
                </div>
                <!--邀请用户-->
                 <div v-if="inviteUserDialogVisible">
                     <inviteUser ref="refInviteUser" :depData="depData" @inviteUserInfo="inviteUserInfo"
                                 @closeDialog="selectUserClose"></inviteUser>
                     <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="medium" @click="sendUserSure">确定</el-button>
                        <el-button @click="inviteUserClose" size="medium">取 消</el-button>
                     </span>
                 </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import inviteUser from "./inviteUser"
    export default {
        name: "dep-edit-select-user",
        components:{
            inviteUser
        },
        props:{
            selectUserDialogVisible:{
              required:true,
                type:Boolean
            },
            depData:{
                type:Object
            },
            depId:{
                required:true
            }
        },
        data(){
          return{
              // userTabledata:[{
              //     userId:"1",
              //     userName:"张三",
              //     userPhone:"13700000"
              // }],
              userTabledata:[],
              inviteUserDialogVisible:false,
              title:"选择人员",
              btnOK:true,
              currentRow: null
          }
        },
        mounted(){
            if(this.depId!="add" && this.depId!=""){
                //编辑部门
                this.getUserListData();
            }else{
                //新增部门不用去请求人员，因为部门id还不存在
                this.userTabledata=[];
                this.btnOK=false
            }
            // this.getUserListData();
            // console.log("depEdit.selectuser.vue mounted")
        },
        created(){
            // this.getUserListData();
            // console.log("depEdit.selectuser.vue created")
        },
        methods:{
            selectUserSure(){
                this.$emit('selectUserInfo',this.currentRow);
                this.$emit('update:selectUserDialogVisible', false);
            },
            selectUserClose(){
                this.$emit('update:selectUserDialogVisible', false);
            },
            sendUserSure(){
                this.$refs.refInviteUser.sendMessage("depInvite");
            },
            inviteUserClose(){
                this.inviteUserDialogVisible=false;
            },
            handleInviteUser(){
                this.inviteUserDialogVisible=true;
            },
            handleCurrentChange(val){
                // console.log("dkkdkd:"+JSON.stringify(val))
                this.currentRow = val;
            },
            async getUserListData(){
                await JZY.xhr.request('/sys/user/getUserListByOrgId/'+this.depId).then((resultData)=>{
                    // console.log("getUserListByOrgId:"+JSON.stringify(resultData))
                    try{
                        this.userTabledata=[];
                        resultData[0].forEach(item=>{
                            let user={};
                            user.userId=item.id;
                            user.userName=item.name;
                            user.userPhone=item.mobile;
                            user.workStatus=item.workStatus;
                            this.userTabledata.push(user)
                        })
                    }catch (e){
                        this.$message("depEdit.selectuser.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            // arrangeUsersData(initData,resultData){
            //     //过虑部分等信息只提取人
            //     initData.forEach(item=>{
            //         if(item.type===null){
            //             let objUser={};
            //             objUser.userId=item.sid;
            //             objUser.userName=item.name;
            //             objUser.userPhone=item.mobile;
            //             resultData.push(objUser);
            //         }
            //         if(item.children){
            //             this.arrangeUsersData(item.children);
            //         }
            //     })
            // },
            inviteUserInfo(user){
                this.$emit('inviteUserInfo',user)
            }
        }
    }
</script>

<style scoped lang="scss">
.dialog-footer{
    text-align: right;
    display: block;
    margin-top: 20px;
}
    .depEdit-selectUser-dialog{
        .el-table::before{
            height: auto;
        }
    }
</style>
<template>
    <!--右侧弹窗邀请用户-->
    <div>
        <right-slide-modal title="邀请用户" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled" @click="operateSave()">保存</el-button></li>
                    <li><el-button @click="operateClose()">关闭</el-button></li>
                </ul>
            </div>
            <inviteUser  :depData="depData" @inviteUserInfo="inviteUserInfo" ref="refInviteUser"></inviteUser>
        </right-slide-modal>
    </div>

</template>

<script>
    import inviteUser from './inviteUser'
    export default {
        name: "invite-user-dialog",
        components:{
            inviteUser
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            depData:{
                required:true
            }
        },
        data(){
            return{
                // inviteUserData:{},
                btnDisabled:false
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
                //刷新userlist
                // this.$emit("refreshUserTable");
                this.$emit("closeCreateModal");
            },
            operateSave(){
                //会回调inviteUserInfo方法
                this.$refs.refInviteUser.sendMessage("userlistInvite");
            },
            inviteUserInfo(user){
                this.btnDisabled=true;
                let pas={
                    userName:user.userName,
                    userMobile:user.userMobile,
                    userEmail:user.userEmail,
                    organizationId:this.depData.depId
                }
                // console.log("pas:"+JSON.stringify(pas))
                this.commitAllData(pas,'/sys/user/inviteUser');
            },
            async commitAllData(pas,url){
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.btnDisabled=false;
                        this.$emit("refreshUserTable");
                        this.$emit("closeCreateModal");
                    }catch (e){
                        this.btnDisabled=false;
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
        }

    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>
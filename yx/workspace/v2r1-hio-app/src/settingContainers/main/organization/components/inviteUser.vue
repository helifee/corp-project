<template>
    <el-form label-width="110px" label-position="right"  :model="inviterUserData" :rules="rules" ref="refInviteUser">
        <el-form-item label="用户姓名：" prop="userName">
            <el-input placeholder="输入姓名" v-model.trim="inviterUserData.userName" maxlength="21"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="userMobile" >
            <el-input placeholder="输入手机号码" v-model="inviterUserData.userMobile" @blur="handleBlurMobile" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'') "></el-input>
        </el-form-item>
        <el-form-item label="部门名称：" >
            <el-input :disabled="true" v-model="depData.depName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="userEmail">
            <el-input placeholder="请输入邮箱地址" v-model.trim="inviterUserData.userEmail" maxlength="101"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import {isvalidPhone} from  '@/utils/validate.js'
    let validPhone=(rule, value,callback)=>{
        if (!value){
            callback(new Error('手机号码不能为空'))
        }else  if (!isvalidPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
        }else {
            callback()
        }
    }
    // let validUserName=(rule, value,callback)=>{
    //     if (!value){
    //         callback(new Error('用户姓名不能为空'))
    //     }else  if (value.length>100){
    //         callback(new Error('最多100字符'))
    //     }else {
    //         callback()
    //     }
    // }
    export default {
        name: "invite-user",
        props:{
            depData:{
                type:Object
            }
        },
        data(){
            return{
                inviterUserData:{
                    userName:"",
                    userMobile:"",
                    // orgName:"",
                    // organizationId:"",
                    userEmail:""
                },
                rules:{
                    userName:[{required:true, message: '用户姓名不能为空',trigger: 'blur'},
                        {min:1, max:20, message:"用户姓名长度不能大于20字符，请重新输入！", trigger:'blur'},
                        {pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' },],
                    userMobile:[{ required: true, trigger: 'blur', validator: validPhone }],
                    userEmail:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' },
                        {min:1, max:100, message:"邮箱长度不能大于100字符，请重新输入！", trigger:'change'}],
                }
            }
        },
        methods:{
            sendMessage(type){
                this.$refs.refInviteUser.validate((valid) => {
                    if (valid) {
                        if(type=="depInvite"){
                            //发送消息 来源是部门编辑不立刻调用接口
                            this.$emit('inviteUserInfo',this.inviterUserData);
                            this.$emit('closeDialog');
                        }else{
                            this.$emit('inviteUserInfo',this.inviterUserData);
                        }
                    }
                })
            },
            handleBlurMobile(){
                let newUserMobile=this.inviterUserData.userMobile.replace(/[^\d]/g,'');
                this.$nextTick(() => {
                    this.inviterUserData.userMobile=newUserMobile;
                });
            }
        }
    }
</script>

<style scoped >

</style>
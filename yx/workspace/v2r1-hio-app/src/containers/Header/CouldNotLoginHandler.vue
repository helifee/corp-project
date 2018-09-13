<template>
    <div>
        <el-dialog title="修改初始化密码"
                   :show-close="false"
                   :close-on-click-modal="false" :close-on-press-escape="false"
                   v-model="firstLoginDialogVisible">
            <p style="margin-bottom:30px;">
                您好，欢迎使用蜂网供应链系统！为了提高您账号的安全性，增加使用体验，请更改您的登录密码。
            </p>
            <div style="width:80%;margin:0 auto;">
                <p style="color:red;font-size:12px;margin-bottom:15px;">

                    提示：“用户账号”作为系统内用户显示的唯一性标识，以后将不允许修改！
                </p>
                <el-form label-width="100px" ref="firstLoginForm" :rules="firstLoginRules" :model="firstLoginFormData">
                    <el-form-item label="用户账号" prop="userName">
                        <el-input autocomplete="off" placeholder="请输入账号名称" v-model="firstLoginFormData.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="新密码">
                        <el-input autocomplete="off" type="password" placeholder="请输入新密码" v-model="firstLoginFormData.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwordAgain" label="确认密码">
                        <el-input autocomplete="off" type="password" placeholder="请再次输入新密码" v-model="firstLoginFormData.passwordAgain"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @disabled="isSubmitingFirstLogin"
                            @click="submitFirstLogin()" style="display:block;width:100%;">{{isSubmitingFirstLogin?'处理中...':'完成'}}</el-button>
                    </el-form-item>
                </el-form>


            </div>
        </el-dialog>
        <el-dialog title="重置密码"
                   :show-close="false"
                   :close-on-click-modal="false" :close-on-press-escape="false"
                   v-model="resetPasswordVisible">
            <p style="margin-bottom:30px;">
                您好，欢迎使用蜂网供应链系统！您的密码已被管理员重置，请修改后再登录。
            </p>
            <div style="width:80%;margin:0 auto;">

                <el-form label-width="100px" ref="resetPasswordForm" :rules="resetPasswordRules" :model="resetPasswordData">

                    <el-form-item prop="password" label="新密码">
                        <el-input autocomplete="off" type="password" placeholder="请输入新密码" v-model="resetPasswordData.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwordAgain" label="确认密码">
                        <el-input autocomplete="off" type="password" placeholder="请再次输入新密码" v-model="resetPasswordData.passwordAgain"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @disabled="isSubmitingResetPassword"
                            @click="submitResetPassword()" style="display:block;width:100%;">{{isSubmitingResetPassword?'处理中...':'完成'}}</el-button>
                    </el-form-item>
                </el-form>


            </div>
        </el-dialog>
        <fw-vm-data-viewer
            v-if="util.isDebugMode()"
            :vm="_self"
            :keys="'_props.preventLoginUserInfo firstLoginFormData resetPasswordData'.split(' ')"
        >

        </fw-vm-data-viewer>
    </div>
</template>
<script>
    import util from '@FWUI/util'
    import httpService from '@FWUI/axiosService.js'
    // import xhrSetting from '@FWUI/xhrSetting.js'

    import userCenterService from './userCenter/userCenterService'
    export default {
        methods:{
            submitResetPassword(){
                let self=this
                this.$refs.resetPasswordForm.validate(function(valid){
                    if(valid){


                        self.isSubmitingResetPassword=true

                        httpService.request({
                            url:userCenterService.getUrl('/user/updateUserNameAndPassword'),

                            type:'post',
                            params:{
                                token:self.preventLoginUserInfo.token,
                                newPassword:self.resetPasswordData.password
                            }
                        })
                            .then(()=>{
                                util.successMsg('恭喜，修改成功，现在可以重新登入了')
                                try{
                                    self.$parent.createCode()
                                }catch(e){console.warn('刷新验证码失败')}

                                self.resetPasswordVisible=false
                                self.isSubmitingResetPassword=false
                            })
                            .catch(()=>{
                                self.isSubmitingResetPassword=false
                            })

                    }
                })
//                resetPasswordForm
            },
            submitFirstLogin(){
                let self=this



                this.$refs.firstLoginForm.validate(function(valid){
                    if(valid){



//                        if(self.firstLoginFormData.userName==self.preventLoginUserInfo.userName){
//                            util.warningMsg('请修改用户名后再提交')
//                            return false
//                        }

                        self.isSubmitingFirstLogin=true

                        httpService.request({
                            url:userCenterService.getUrl('/user/updateUserNameAndPassword'),

                            type:'post',
                            params:{
                                token:self.preventLoginUserInfo.token,
                                userName:self.firstLoginFormData.userName,
                                newPassword:self.firstLoginFormData.password
                            }
                        })
                            .then(()=>{
                                util.successMsg('恭喜，修改成功，现在可以重新登入了')
                                try{
                                    self.$parent.createCode()
                                }catch(e){console.warn('刷新验证码失败')}
                                self.firstLoginDialogVisible=false
                                self.isSubmitingFirstLogin=false
                            })
                            .catch(()=>{
                                self.isSubmitingFirstLogin=false
                            })

                    }
                })
            },
            handleCouldNotLoginDialogVisible(){


                if(this.preventLoginUserInfo!=null){



                    if(this.preventLoginUserInfo.firstTimeLogin==true){
                        this.firstLoginDialogVisible=true
                        this.$nextTick(()=>{
                            setTimeout(()=>{
                                this.firstLoginFormData.password=''
                                this.firstLoginFormData.userName=this.preventLoginUserInfo.userName
                            },150)


//                            firstLoginFormData:{
//                                password:'',
//                                    userName:'',
//                                    passwordAgain:''
//                            }
                        })
                    }
                    else if(this.preventLoginUserInfo.passwordFlag==true){
                        this.resetPasswordVisible=true
                    }
                }
            }
        },
        props:{
            preventLoginUserInfo:Object
        },
//        beforeMounted(){
//
//            alert('test')
//            util.clog('this--:',this)
//        },
        mounted(){
          this.handleCouldNotLoginDialogVisible()
        },
        watch:{
            preventLoginUserInfo(v){
                this.handleCouldNotLoginDialogVisible()
                util.clog('preventLoginUserInfo--:', this.preventLoginUserInfo)
            }
        },
        data(){
            let self=this
            return {
                util:util,
                resetPasswordRules:{
                    password:[
                        {required:true,trigger:'blur',message:'请输入用户名称'},
                        {
                            trigger:'blur',
                            validator:(rule, value, callback)=>{


                                if(/^[A-Za-z0-9\\S]{6,16}$/.test(value)){
                                    callback()

                                }else{
                                    callback(new Error('密码格式错误，只允许字母、数字、字符且长度在6至16'))
                                }
                            }
                        }
                    ],
                    passwordAgain:[
                        {required:true,trigger:'blur',type:'string',message:'请输入确认密码'},
                        {
                            trigger:'blur',
                            validator:(rule, value, callback)=>{
                                if(value==self.resetPasswordData.password){
                                    callback()
                                }else{

                                    callback(new Error('两次输入密码不一致'))
                                }
                            }
                        }
                    ]
                },
                firstLoginRules:{
                    userName:[
                        {required:true,trigger:'blur',message:'请输入用户名称'},
                        {
                            trigger:'blur',
                            validator:(rule, value, callback)=>{

                                if(/^(?![0-9]*$)[A-Za-z0-9_\\-\\u4e00-\\u9fa5]{6,20}$/.test(value)){
                                    callback()

                                }else{
                                    callback(new Error('账号格式错误，只允许数字字母下划线或短横线'))
                                }
                            }
                        },
//                        {
//                            trigger:'change',
//                            validator:(rule, value, callback)=>{
//
//
//                                if(value.trim()!=self.preventLoginUserInfo.userName){
//                                    callback()
//
//                                }else{
//                                    callback(new Error('请修改账号'))
//                                }
//                            }
//                        }
                    ],
                    password:[
                        {required:true,trigger:'blur',message:'请输入用户名称'},
                        {
                            trigger:'blur',
                            validator:(rule, value, callback)=>{


                                if(/^[A-Za-z0-9\\S]{6,16}$/.test(value)){
                                    callback()

                                }else{
                                    callback(new Error('密码格式错误，只允许字母数字下划线且长度在6至16'))
                                }
                            }
                        }
                    ],
                    passwordAgain:[
                        {required:true,trigger:'blur',type:'string',message:'请输入确认密码'},
                        {
                            trigger:'blur',
                            validator:(rule, value, callback)=>{
                                if(value==self.firstLoginFormData.password){
                                    callback()
                                }else{

                                    callback(new Error('两次输入密码不一致'))
                                }
                            }
                        }
                    ]
                },
                resetPasswordData:{
                    password:'',
                    passwordAgain:''
                },
                firstLoginFormData:{
                    password:'',
                    userName:'',
                    passwordAgain:''
                },
                resetPasswordVisible:false,
                firstLoginDialogVisible:false,
                isSubmitingResetPassword:false,
                isSubmitingFirstLogin:false
            }
        }
    }
</script>

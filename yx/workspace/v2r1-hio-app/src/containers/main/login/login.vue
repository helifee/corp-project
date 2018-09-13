<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div style="width:100%;height:100%;position:fixed;background:#204a70;">
            <canvas style="width:100%;height:100%;" id="canvas"></canvas>
        </div>
        <!--<el-dialog width="500px" custom-class="login-dialog" style="position: relative" :visible="true" :modal="false" :show-close="false">-->
            <!--<div>-->
                <!--<el-input v-model="form.mobile" placeholder="mobile"></el-input>-->
            <!--</div>-->
            <!--<div>-->
                <!--<el-input v-model="form.pictureVilidateCode" placeholder="验证码"></el-input>-->
                <!--&lt;!&ndash;<iframe src="http://10.17.9.40:9999/platform-app/platform/validateCodeGet?mobile=123211"></iframe>&ndash;&gt;-->
                <!--&lt;!&ndash;<iframe :src="JZY.xhr.transformUrl('/platform/validateCode?mob','GLOBAL.CUI_PENG')"></iframe>&ndash;&gt;-->
                <!--&lt;!&ndash;<div id="imgcontainer"></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<debug-log>提示：开发模式验证码不用输</debug-log>&ndash;&gt;-->
                <!--<img :src="validateCodeSrc" />-->
                <!--<el-button @click="handleMobileChange()">刷新验证码</el-button>-->
            <!--</div>-->
            <!--<div>-->
                <!--<el-input :type="JZY.DEBUG_MODE?'text':'password'" v-model="form.password" placeholder="pwd"></el-input>-->
                <!--<debug-log>如果是老旧账号无法登陆，请尝试在登录url中加入一个参数skip_md5，-->
                    <!--格式类似：http://localhost:8084/#/login?redirect=%2F&skip_md5</debug-log>-->
            <!--</div>-->
            <!--<el-checkbox v-model="rememberAccount">记住密码</el-checkbox>-->

            <!--<div>-->
                <!--<el-button @click="submit()">submit</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
        <div class="login-wrap" v-show="(!JZY.store.state.route.query.accessToken && tendList.length<=1) || (JZY.store.state.route.query.accessToken)">
            <div v-show="loginPanel"  class="login-panel">
                <div class="logo"><img src="/static/images/loginlogo.png" alt=""></div>
                <div class="login-item">
                    <el-input v-model.trim="form.mobile" placeholder="手机号码"></el-input>
                </div>
                <div v-if="imgCode" class="login-item code-panel">
                    <el-input style="position:relative;top:-11px;" class="code" v-model="form.pictureVilidateCode" placeholder="验证码"></el-input>
                    <!--<iframe src="http://10.17.9.40:9999/platform-app/platform/validateCodeGet?mobile=123211"></iframe>-->
                    <!--<iframe :src="JZY.xhr.transformUrl('/platform/validateCode?mob','GLOBAL.CUI_PENG')"></iframe>-->
                    <!--<div id="imgcontainer"></div>-->
                    <!--<debug-log>提示：开发模式验证码不用输</debug-log>-->
                    <div @click="handleMobileChange()" style="display:inline-block;width:143px;height:36px;">
                        <img style="position:relative;width:100%;height:100%;display:block;left:4px;" :src="validateCodeSrc" />
                    </div>

                    <!--<el-button @click="handleMobileChange()">刷新验证码</el-button>-->
                </div>
                <div class="login-item">
                    <el-input @keyup.enter.native="submit()" :type="JZY.DEBUG_MODE?'text':'password'"  v-model="form.password" placeholder="密码"></el-input>
                    <!--<debug-log>如果是老旧账号无法登陆，请尝试在登录url中加入一个参数skip_md5，-->
                    <!--格式类似：http://localhost:8084/#/login?redirect=%2F&skip_md5</debug-log>-->
                </div>
                <!--<el-checkbox v-model="rememberAccount">记住密码</el-checkbox>-->
                <div class="login-item">
                    <el-button class="submit" @click="submit()">登录</el-button>
                </div>
                <div class="operation">
                    <!--<span >扫码登录</span>-->
                    <!--<span @click="qrcodeHandle" style="float: left">扫码登录</span>-->
                    <span @click="forget" style="float: right">忘记密码</span>
                </div>
            </div>
            <div v-show="forgetPanel"  class="forget-panel">
                <div class="logo"><img src="/static/images/JZYlogo.png" alt=""></div>
                <h3>找回密码</h3>
                <div class="login-item">
                    <el-input v-model="forgetForm.mobile" placeholder="手机号码"></el-input>
                </div>
                <div class="login-item code-panel">
                    <el-input @keyup.enter.native="nextStep()" :disabled="!hasClickedValidateCodeInForgetPwdPanel" class="code" v-model="forgetForm.mobileCode" placeholder="验证码"></el-input>
                    <el-button class="send" @click="sendVerificationCode" v-if="!countDownVisible">发送验证码</el-button>
                    <el-button class="count-down" v-else type="info" disabled>{{countDownNum}}秒</el-button>
                </div>
                <div class="login-item">
                    <el-button class="submit" @click="nextStep" :disabled="!nextStepBtn">下一步</el-button>
                </div>
                <div class="operation">
                    <p style="float: right">已有账号，<span @click="goLogin">马上登录</span></p>
                </div>
            </div>
            <div v-show="setpwdPanel"  class="setpwd-panel">
                <div class="logo"><img src="/static/images/JZYlogo.png" alt=""></div>
                <h3>设置新密码</h3>
                <div class="login-item">
                    <el-input v-model="forgetForm.newPassword" @keyup.enter.native="editComplete()" :type="JZY.DEBUG_MODE?'text':'password'"   placeholder="密码"></el-input>
                </div>
                <div class="login-item">
                    <el-button class="submit" @click="editComplete">完成</el-button>
                </div>
                <div class="operation">
                    <p style="float: right">已有账号，<span @click="goLogin">马上登录</span></p>
                </div>
            </div>
            <div v-show="loadPanel" class="load-panel">
                <div class="logo">
                    <img src="/static/images/loading-logo.png" alt="">
                </div>
                <span>{{JZY.s.needLogout?'正在退出登录...':'正在登录...'}}</span>
            </div>
            <div v-show="qrcodePanel" class="qrcode-panel">

                <div id="qrcode"></div>
                <p class="tip">请用手机CC扫码登录</p>
                <div class="operation">
                    <p><span @click="goLogin">马上登录</span></p>
                </div>
            </div>
            <div v-show="qrcodeLoadPanel"  class="qrcodeLoad-panel">
                <img src="/static/images/JZYlogo2.png" alt="">
                <p class="sucess-info">扫描成功</p>
                <p class="info">请在手机CC中点击登录</p>
                <div class="operation">
                    <span @click="changeUser" style="float: left">切换用户</span>
                    <span @click="goLogin" style="float: right">账号登录</span>
                </div>
            </div>
            <div v-show="qrcodeFanelPanel"  class="qrcodeLoad-panel">
                <img src="/static/images/scanfail.png" alt="">
                <p class="fail-info">扫描失败</p>
                <p class="info">用户信息不存在</p>
                <div class="operation">
                    <span @click="changeUser" style="float: left">切换用户</span>
                    <span @click="goLogin" style="float: right">账号登录</span>
                </div>
            </div>
        </div>
        <el-dialog :modalAppendToBody="true" :appendToBody="true" style="min-height:300px;" width="90%"  class="choose-tend" title="请选择一个租户" :visible="switchTendDialogVisible" :showClose="false" :close-on-press-escape="false" :close-on-click-modal="false">
            <switch-tend :switching-tend="switchingTend" @switchTend="setDefaultTend" :tend-list="tendList"></switch-tend>
            <!--<el-radio-group v-model="currentTendId"  size="small">-->
                <!--<el-radio-button style="margin-bottom: 16px"  v-for="item in tendList" :label="item.sid">{{item.tendName}}</el-radio-button>-->
            <!--</el-radio-group>-->
                <!--<br>-->
            <!--<el-button style="float: right" size="small" type="primary" :disabled="!currentTendId" @click="setDefaultTend()">确定</el-button>-->
        </el-dialog>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .login-dialog.el-dialog{
        background:#ffffffb8;
    }
    .login-wrap{
        z-index: 3;
        padding: 32px;
        width: 264px;
        position: fixed;
        top:50%;
        left: 50%;
        margin-left: -164px;
        margin-top: -170px;
        min-height: 276px;
        background: rgba(0,0,0,0.5);
        box-shadow: 0 4px 6px 0 rgba(70,167,255,0.25);
        border-radius: 6px;
        .login-panel{
            .logo{
                img{
                    width: 147px;
                    height: 77px;
                    margin: 0 auto;
                    display: block;
                }
            }
            .login-item{
                width: 264px;
                height: 36px;
                padding-top: 20px;
                .submit{
                    width: 264px;
                    height: 36px;
                    background: #46A7FF;
                    border-radius: 2px;
                    border:1px solid #46A7FF;
                    font-size: 14px;
                    font-weight: normal;
                    color: #FFFFFF;
                    letter-spacing: 1.6px;
                    text-align: center;
                }
                .submit:hover{
                    background-color: #2C92EE;
                    border:1px solid #2C92EE;
                }
            }
            .login-item.code-panel{
                .code{
                    width: 112px;
                }
                img{
                    float: right;
                    height: 36px;
                    cursor: pointer;
                    margin-top: 2px;
                }
            }
            .operation{
                padding-top: 8px;
                span{
                    font-size: 12px;
                    color: #C8C8C8;
                }
                span:hover{
                    cursor: pointer;
                    color: #46A7FF;
                }
            }
        }
        .forget-panel{
            .logo{
                img{
                    width: 80px;
                    /*height: 77px;*/
                    margin: 0 auto;
                    display: block;
                }
            }
            h3{
                margin: 8px 0;
                text-align: center;
                color: #C8C8C8;
            }
            .login-item{
                width: 264px;
                height: 36px;
                padding-top: 20px;
                .submit{
                    width: 264px;
                    height: 36px;
                    background: #46A7FF;
                    border-radius: 2px;
                    border:1px solid #46A7FF;
                    font-size: 14px;
                    font-weight: normal;
                    color: #FFFFFF;
                    letter-spacing: 1.6px;
                    text-align: center;
                }
                .submit:hover{
                    background-color: #2C92EE;
                    border:1px solid #2C92EE;
                }
            }
            .login-item.code-panel{
                .code{
                    width: 142px;
                    margin-right: 12px;
                }
                .send{
                    height: 36px;
                    line-height: 4px;
                    font-size: 14px;
                    font-weight: normal;
                    color: #FFFFFF;
                    vertical-align: middle;
                    background: #46A7FF;
                    border-radius: 2px;
                    border:1px solid #46A7FF;
                }
                .send:hover{

                    background-color: #2C92EE;
                    border:1px solid #2C92EE;
                }
                .count-down{
                    width: 104px;
                    height: 36px;
                    line-height: 4px;
                    font-size: 14px;
                    font-weight: normal;
                    vertical-align: middle;
                    text-align: center;
                }

            }
            .operation{
                padding-top: 8px;
                p{
                    font-size: 12px;
                    color: #C8C8C8;
                }
                span{
                    text-decoration: underline;
                }
                span:hover{
                    cursor: pointer;
                    color: #46A7FF;
                }
            }
        }
        .setpwd-panel{
            .logo{
                img{
                    width: 80px;
                    /*height: 77px;*/
                    margin: 0 auto;
                    display: block;
                }
            }
            h3{
                margin: 8px 0;
                text-align: center;
                color: #C8C8C8;
            }
            .login-item{
                width: 264px;
                height: 36px;
                padding-top: 20px;
                .submit{
                    width: 264px;
                    height: 36px;
                    background: #46A7FF;
                    border-radius: 2px;
                    border:1px solid #46A7FF;
                    font-size: 14px;
                    font-weight: normal;
                    color: #FFFFFF;
                    letter-spacing: 1.6px;
                    text-align: center;
                }
                .submit:hover{
                    background-color: #2C92EE;
                    border:1px solid #2C92EE;
                }
            }
            .operation{
                padding-top: 8px;
                p{
                    font-size: 12px;
                    color: #C8C8C8;
                }
                span{
                    text-decoration: underline;
                }
                span:hover{
                    cursor: pointer;
                    color: #46A7FF;
                }
            }
        }
        .load-panel{
            text-align: center;
            img{
                width: 144px;
                height: 150px;
                padding: 42px 0px 18px;
            }
            span{
                color: #46A7FF;
            }
        }
        .qrcode-panel{
            padding-top: 40px;
            text-align: center;
            p{
                padding: 0;
                margin: 0;
            }
            #qrcode{
                width: 150px;
                height: 150px;
                margin: 0 auto;
            }
            .tip{
                padding: 16px 0px 30px;
                margin: 0;
                font-size: 14px;
                color: #46A7FF;
            }
            .operation{
                span{
                    font-size: 12px;
                    color: #C8C8C8;
                }
                span:hover{
                    cursor: pointer;
                    color: #46A7FF;
                }
            }
        }
        .qrcodeLoad-panel{
            p{
                margin: 0;
                padding: 0;
                text-align: center;
            }
            img{
                display: block;
                width: 110px;
                height: 110px;
                margin: 30px auto 20px;
            }
            .sucess-info{
                font-size: 20px;
                color: #46A7FF;
                margin-bottom: 10px;
            }
            .fail-info{
                font-size: 20px;
                color: $theme-red;
                margin-bottom: 10px;
            }
            .info{
                font-size: 14px;
                color: #ffffff;
                margin-bottom: 66px;
            }
            .operation{
                width: 130px;
                margin: 0 auto;
                span{
                    display: inline-block;
                    width: 48px;
                    font-size: 12px;
                    color: #8E9397;
                    cursor: pointer;
                }
                span:hover{
                    cursor: pointer;
                    color: #46A7FF;
                }
            }
        }
    }


</style>
<style rel="stylesheet/scss" lang="scss">
    .login-wrap{
        .el-input__inner{
            height: 36px;
        }
    }
    .choose-tend{

        .el-dialog__header{
            display:none;
        }
        .el-dialog{
            background:rgba(255,255,255,0);
        }
        .el-dialog .el-dialog__body{
            overflow-y: auto;
            padding-bottom: 24px;
            padding-top:160px;
        }
    }

</style>
<script>
    // import ElButton from "../../../plugins/element-ui/packages/button/src/button";
    import QRCode from 'qrcodejs2'
    import switchTend from './switchTend'
    function isvalidPhone(str) {

        if(!JZY.PROD_MODE && (str.length==11)){
            return true
        }

        const reg = /^1[3|4|5|7|8|6|9][0-9]\d{8}$/
        return reg.test(str)
    }
    let cookieUtil={
        //设置cookie
        setLoginCookie(c_name, c_pwd, exdays=30) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = JZY.APP_ENV+"mobile" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = JZY.APP_ENV+"pwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        setCookie(key, value, exdays=30) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = JZY.APP_ENV+key + "=" + value + ";path=/;expires=" + exdate.toGMTString();
        },
        getCookie: function(key) {
            let res=null

            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == JZY.APP_ENV+key) {
                        res = arr2[1]; //保存到保存数据的地方
                    }
                }
            }
            return res
        },
        //读取cookie
        getLoginCookie: function() {
            let res={}
            
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == JZY.APP_ENV+'mobile') {
                        res.mobile = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == JZY.APP_ENV+'pwd') {
                        res.pwd = arr2[1];
                    }
                }
            }
            return res
        },
        // //清除cookie
        // clearCookie: function() {
        //     this.setLoginCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        // }
    };
    export default {
        computed: {

        },
        components:{

            switchTend
        },
        methods: {
            handleTendClick(item){

            },
            //切换用户
            changeUser(){
                this.qrcodeLoadPanel = false;
                this.qrcodeFanelPanel = false;
                this.form.mobile = '';
                this.form.pictureVilidateCode = '';
                this.form.password = ''
                this.loginPanel = true;
            },
            //扫码登录
            qrcodeHandle(){
                this.loginPanel = false;
                this.qrcodePanel = true;
            },
            //忘记密码
            forget(){
                this.forgetForm.mobile = cookieUtil.getLoginCookie().mobile||'',
                this.forgetForm.newPassword = '',
                this.forgetForm.mobileCode = '',
                this.loginPanel = false;
                this.forgetPanel = true;
            },
            //马上登录
            goLogin(){
                this.qrcodePanel = false;
                this.forgetPanel = false;
                this.setpwdPanel = false;
                this.qrcodeFanelPanel = false;
                this.form.mobile = cookieUtil.getLoginCookie().mobile||'',
                this.loginPanel = true;
            },
            //下一步
            nextStep(){
                if(!this.hasClickedValidateCodeInForgetPwdPanel){

                    JZY.u.warningMsg('请输入验证码')
                    return false
                }else{
                    let data = {
                        'mobile':this.forgetForm.mobile,
                        'smscode':this.forgetForm.mobileCode
                    };
                    JZY.xhr.r({
                        type:'post',
                        url:'/platform/checkSmsCode',
                        timeout:30000,
                        data:data
                    })
                        .then(([res])=>{
                            this.setpwdPanel = true;
                            this.forgetPanel = false;
                        })
                        // .catch((e)=>{
                        //     JZY.u.warningMsg('验证码有误')
                        // })
                }


            },
            //完成修改密码
            editComplete(){
                let isPwdValidate=()=>{
                    let str=this.forgetForm.newPassword
                    return str.length==32||(str.length>=6 && str.length<=20)
                }
                if(!isPwdValidate()){
                    JZY.u.warningMsg('密码格式错误，必须在6到20个字符之间');return false
                }

                let data = {
                    'mobile':this.forgetForm.mobile,
                    'password':JZY.u.md5(this.forgetForm.newPassword),
                    'smscode':this.forgetForm.mobileCode,
                };
                JZY.xhr.r({
                    type:'post',
                    url:'/platform/findPassword',
                    timeout:30000,
                    data:data
                })
                    .then(([res])=>{
                        cookieUtil.setLoginCookie('','',-1);
                        this.form.password = '';
                        this.setpwdPanel = false;
                        this.loginPanel = true;
                    })
                    .catch(()=>{

                    })



            },
            //发送验证码
            sendVerificationCode(){
                this.hasClickedValidateCodeInForgetPwdPanel=true;
                this.countDownVisible = true;
                //倒计时
                let that = this;
                let interval = window.setInterval(function() {
                    if ((that.countDownNum--) <= 0) {
                        that.countDownNum = 60;
                        that.countDownVisible  = false;
                        window.clearInterval(interval);
                    }
                }, 1000);




                let data={'mobile':this.forgetForm.mobile};
                JZY.xhr.r({
                    type:'post',
                    url:'/platform/smscode',
                    timeout:30000,
                    data:data
                })
                    .then(([res])=>{
                        try{
                            JZY.s.clog("发送验证码发送验证码发送验证码 res--:",res)
//                            let token=res.tokenType+' '+res.accessToken
                            // let {access_token,refresh_token}=res

                            // if(JZY.APP_ENV=='local'){
                            //     if(!JZY.c.AUTO_LOGIN.headers.authorization){
                            //         JZY.c.AUTO_LOGIN.headers.authorization=token
                            //     }
//                            // }else{
//                            JZY.c.AUTO_LOGIN.headers.authorization=token
//                            // }
//
//                            this.tendList=res.userInfo.tendList
//                            let tendList=res.userInfo.tendList,
//                                defaultTend=tendList.find((item)=>item.defaultFlag==1)||tendList[0]
//                            if(tendList.length==0){
//                                JZY.u.warningMsg('没有租户请联系管理员')
//                                return false
//                            }
//                            this.authorization=token
//                            this.userInfo=res.userInfo
//                            if(defaultTend){
//                                this.setDefaultTend(defaultTend)
//                                // this.loginSuccess()
//                            }else{
//                                if(tendList.length==1){
//                                    this.setDefaultTend(tendList[0])
//                                }else{
//                                    this.switchTendDialogVisible=true
//                                }
//                            }
//                            if(this.rememberAccount){
//                                cookieUtil.setLoginCookie(this.form.mobile,
//                                    JZY.DEBUG_MODE?d.password:(d.password.length==32?d.password:JZY.u.md5(d.password))
//                                )
//                            }
                            // console.log('login res--:',res)
                        }catch(e){
                            JZY.u.warningMsg('接口数据异常')
                        }
                    })

            },
            //登录成功
            loginSuccess(){
                localStorage.setItem('authorization',this.authorization)

                if(JZY.DEBUG_MODE && JZY.store.state.route.query.redirect){
                    let redirectUrl=JZY.store.state.route.query.redirect
                    if(redirectUrl.trim()=='/login'){
                        redirectUrl='/'
                    }
                    JZY.router.push(redirectUrl)
                    return false
                }



                    // if(JZY.store.state.route.query.redirect){
                    //     let redirectUrl=JZY.store.state.route.query.redirect
                    //     if(redirectUrl.trim()=='/login'){
                    //         redirectUrl='/'
                    //     }
                    //     JZY.router.push(redirectUrl)
                    // }else{
                location.href=(location.href.split('#')[0]+'#/')
                console.log('page will be reload')
                location.reload()
                        // JZY.router.push('/')
                    // }


            },
            setDefaultTend(row){
                if(!row){
                    row=this.tendList.find((item)=>item.sid==this.currentTendId)
                }
                if(row.sid==this.switchingTend.sid){
                    return false
                }
                this.switchingTend=row
                JZY.xhr.r({
                    type:'post',
                    url:'/platform/currentTenant',
                    timeout:30000,
                    data:{
                        tendid:row.tendId
                    }
                })
                    .then(async ([res])=>{
                        this.switchingTend={}
                        if(res.isSuper=="0" && res.roleMenus.length==0){
                            this.loginPanel=true
                            this.loadPanel=false
                            JZY.u.errorMsg("您没有角色权限请联系系统管理员");
                            return;
                        }else{
                            this.userInfo.currentTenantInfo=row;
                            let userInfo={
                                userInfo:this.userInfo,
                                tenantInfo:res,
                            };

                            if(!JZY.store.state.route.query.hasOwnProperty('skip_photo')){
                                let [{photo}]=await JZY.xhr.r({
                                    type:'post',
                                    url:'/hr/emp/empPersonInfo/queryUserPhotoByImUserId',
                                    data:{
                                        tendId:row.tendId,
                                        imUserId:this.userInfo.userIdIM
                                    }
                                },'GLOBAL')
                                // .then(([{photo}])=>{
                                // JZY.store.state.route.query.hasOwnProperty('skip_md5')

                                if((photo||'').trim()!=''){
                                    userInfo.userInfo.resourceImgUrl='data:image/jpeg;base64,'+photo
                                    // userInfo.userInfo.resourceImgUrl=userInfo.userInfo.resourceImgUrl.split('//Z//?')[0]+'//'
                                    // alert(userInfo.userInfo.resourceImgUrl.split('').reverse().join('').substring(0,50).split('').reverse().join(''))
                                }
                            }





                            this.$store.commit('UPDATE_USERINFO',userInfo)
                            this.loginSuccess()
                                // })




                        }
                    })
                    .catch(()=>{
                        this.switchingTend={}
                        this.loginPanel=true
                        this.loadPanel=false
                    })

            },
            handleMobileChange(){
                if(isvalidPhone(this.form.mobile)){
                    // this.validateCodeSrc=JZY.xhr.transformUrl('/platform/validateCode/get?mobile='+this.form.mobile+'&r='+Math.random())
                    this.validateCodeSrc=JZY.xhr.transformUrl('/platform/validateCodeGet?mobile='+this.form.mobile+'&r='+Math.random())
                }
            },
            async submit(){
                let d={},
                    token=JZY.store.state.route.query.accessToken

                if(!token){
                    if(this.form.mobile.trim()==''){
                        JZY.u.warningMsg('请输入手机号');return false
                    }
                    if(this.isCountOfErrorPasswordGt2 && this.form.pictureVilidateCode.trim()==''){
                        JZY.u.warningMsg('请输入验证码');return false
                    }
                    if(this.form.password.trim()==''){
                        JZY.u.warningMsg('请输入密码');return false
                    }

                    let isPwdValidate=()=>{
                        let str=this.form.password
                        return str.length==32||(str.length>=6 && str.length<=20)
                    }

                    // if(!isvalidPhone(this.form.mobile)){
                    //     JZY.u.warningMsg('手机号格式错误');return false;
                    // }
                    // if(!isPwdValidate()){
                    //     JZY.u.warningMsg('密码格式错误，必须在6到20个字符之间');return false
                    // }


                    d=JZY.u.copy(this.form)
                    // if(JZY.PROD_MODE){
                    //     d.password=JZY.u.md5(d.password)
                    // }
                    // let cookiePwd=cookieUtil.getLoginCookie().pwd||''

                    if(d.password.length!=32){
                        // if(cookiePwd.length!=32){
                        if(!JZY.store.state.route.query.hasOwnProperty('skip_md5')){
                            d.password=JZY.u.md5(d.password)
                        }

                    }
                    // if(!JZY.store.state.route.query.hasOwnProperty('skip_md5')){
                    //
                    //     // if(cookieUtil.getLoginCookie().pwd){
                    //     //
                    //     // }else{
                    //     //
                    //     // }
                    //
                    //
                    //
                    //
                    // }

                    this.loginPanel=false
                    this.loadPanel=true
                }else{
                    JZY.c.AUTO_LOGIN.headers.authorization=token
                }




                JZY.xhr.r({
                    type:'post',
                    url:token?'/platform/loginToken':'/platform/login',
                    timeout:30000,
                    data:d
                })
                    .then(([res])=>{

                        if(token){

                            let filteredTendList=res.userInfo.tendList.filter((item)=>item.outerLinkman!=1)
                            this.tendList=filteredTendList
                            res.userInfo.tendList=JZY.u.copy(filteredTendList)
                            let tendList=res.userInfo.tendList

                            let currentTendInfo=tendList.find((item)=>JZY.store.state.route.query.tendId==item.tendId)||{}

                            this.authorization=token
                            this.userInfo=res.userInfo
                            // this.switchTendDialogVisible=true
                            // this.loginPanel=false
                            // this.loadPanel=false
                            this.setDefaultTend(currentTendInfo)
                            console.log('login token res--:',res)
                            JZY.s.eventBus.$emit('LOGIN_SUCCESS')
                            return false
                        }


                        try{
                            
                            // let a=await JZY.u.waiting(500)

                            JZY.s.clog("login res--:",res)
                            let token=res.tokenType+' '+res.accessToken
                            // let {access_token,refresh_token}=res

                            // if(JZY.APP_ENV=='local'){
                            //     if(!JZY.c.AUTO_LOGIN.headers.authorization){
                            //         JZY.c.AUTO_LOGIN.headers.authorization=token
                            //     }
                            // }else{
                            JZY.c.AUTO_LOGIN.headers.authorization=token
                            // }
                            cookieUtil.setCookie('countOfErrorPassword_'+this.form.mobile,'',-1)
                            this.tendList=res.userInfo.tendList.filter((item)=>item.outerLinkman!=1)
                            // this.tendList=this.tendList.concat(this.tendList)
                            res.userInfo.tendList=JZY.u.copy(this.tendList)
                            let tendList=res.userInfo.tendList,
                                defaultTend=tendList.find((item)=>item.defaultFlag==1)||tendList[0]
                            if(tendList.length==0){
                                JZY.u.warningMsg('您没有归属团队，请创建或加入团队')
                                this.loginPanel=true
                                this.loadPanel=false
                                return false
                            }
                            this.authorization=token
                            this.userInfo=res.userInfo

                            // this.switchTendDialogVisible=true



                            if(tendList.length==1){
                                this.setDefaultTend(tendList[0])
                            }else{
                                this.switchTendDialogVisible=true
                                this.loginPanel=false
                                this.loadPanel=false
                            }


                            // if(defaultTend){
                            //     this.setDefaultTend(defaultTend)
                            //     // this.loginSuccess()
                            // }else{
                            //     if(tendList.length==1){
                            //         this.setDefaultTend(tendList[0])
                            //     }else{
                            //         this.switchTendDialogVisible=true
                            //     }
                            // }
                            if(this.rememberAccount&&(!JZY.PROD_MODE)){
                                cookieUtil.setLoginCookie(this.form.mobile,
                                    JZY.DEBUG_MODE?d.password:(d.password.length==32?d.password:JZY.u.md5(d.password))
                                    )
                            }


                            JZY.s.eventBus.$emit('LOGIN_SUCCESS')



//                            console.log('login res--currentTendId:',this.currentTendId)
                        }catch(e){
                            JZY.u.warningMsg('接口数据异常')
                        }
                    })
                    .catch((e)=>{

                        setTimeout(()=>{
                            this.loginPanel=true
                            this.loadPanel=false
                        },500)


                        this.handleMobileChange()

                        cookieUtil.setCookie('countOfErrorPassword_'+this.form.mobile,e.result.countOfErrorPassword)


                    if(e.result.countOfErrorPassword>=2){
                            this.isCountOfErrorPasswordGt2=true
                        this.imgCode = true;
                        this.handleMobileChange()
                    }else{
                        this.imgCode = false;
                    }
//                    console.log(e.result.countOfErrorPassword,"sadqa")

                    })
            },
            //手机端扫码后请求接口
            rqScan(){
                JZY.xhr.r({
                    type:'post',
                    url:'/platform/scan',
                    timeout:30000,
                    data:{
                        'uuid':this.qrcodeContent
                    }
                })
                    .then(([res])=>{
                        console.log('扫码成功',res)
                    })
                    .catch((e)=>{

                    })
            },
            //获取生成二维码中的uuid
            rqQrCode(){
                JZY.xhr.r({
                    type:'post',
                    url:'/platform/scanUUID',
                    timeout:30000,
                    data:{}
                })
                    .then(([res])=>{
                        try{

                            this.qrcode(res)
                             console.log('获取生成二维码中的uuid--:',res)
                        }catch(e){
                            JZY.u.warningMsg('接口数据异常')
                        }
                    })
            },
            //绘制二维码
            qrcode(qrcodeContent) {
                let qrcode = new QRCode('qrcode', {
                    width: 150,
                    height: 150, // 高度
                    text: qrcodeContent, // 二维码内容
                    image: ''
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
                console.log(qrcode)
            }
        },
        props: {


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeDestroy(){
          JZY.s.eventBus.$off('LOGIN_SUCCESS')
        },
        beforeCreate() {

        },
        data() {
            this.$nextTick(()=>{
                this.handleMobileChange()
            })
            return {
                switchingTend:{},
                countDownNum:60,
                countDownVisible:false,
                isCountOfErrorPasswordGt2:false,
                hasClickedValidateCodeInForgetPwdPanel:false,
                nextStepBtn:false,//下一步按钮
                rememberAccount:!JZY.PROD_MODE,
                userInfo:null,
                authorization:null,
                tendList:[],
                currentTendId:null,
                switchTendDialogVisible:false,
                validateCodeSrc:null,
                src:'',
                form:{
                    mobile:cookieUtil.getLoginCookie().mobile||'',
                   // mobile:JZY.DEBUG_MODE&&JZY.c.AUTO_LOGIN?(JZY.c.AUTO_LOGIN.username||''):'',
                   pictureVilidateCode:'',
                   password:cookieUtil.getLoginCookie().pwd||''
                   // pictureVilidateCode:JZY.DEBUG_MODE&&JZY.c.AUTO_LOGIN?(JZY.c.AUTO_LOGIN.username||''):'',
                   // password:JZY.DEBUG_MODE&&JZY.c.AUTO_LOGIN?(JZY.c.AUTO_LOGIN.password||''):'',
                },
                forgetForm:{
                    mobile:cookieUtil.getLoginCookie().mobile||'',
                    mobileCode:'',
                    newPassword:''
                },
                qrcodeContent:'1212',//二维码内容
                imgCode:false,
                loginPanel:JZY.store.state.route.query.accessToken?false:(JZY.s.needLogout?false:true),
                forgetPanel:false,
                setpwdPanel:false,
                loadPanel:JZY.store.state.route.query.accessToken?true:(JZY.s.needLogout?true:false),
                qrcodePanel:false,
                qrcodeLoadPanel:false,
                qrcodeFanelPanel:false,
//                qrcodePanel:true,
            }
        },
        async created(){


            if(JZY.store.state.route.query.accessToken){

                this.submit()
                return false
            }
            
            
            if(JZY.s.needLogout){
                JZY.xhr.r({
                    type:'post',
                    url:'/platform/hioLogout',
                    timeout:1000
                },'GLOBAL.LOGIN')
                    .then(()=>{
                        JZY.s.clearUserInfoCache()
                        location.reload()
                    })
                    .catch((e)=>{
                        JZY.u.errorMsg('登出失败')
                    })

                return false
            }
            
            
            
            if(localStorage.getItem('authorization')){
                JZY.u.infoMsg('您已经登陆过了，无需重复登录')
                JZY.router.push('/')
                return false
            }






            if(cookieUtil.getCookie('countOfErrorPassword_'+this.form.mobile)>=2){
                this.isCountOfErrorPasswordGt2=true
                this.imgCode = true;
                this.handleMobileChange()
            }



            // return false
            if(this.form.mobile!=''){
                this.handleMobileChange();
                return false
                // JZY.xhr.r({
                //     type:'post',
                //     url:'/platform/validateCode',
                //     headers:{
                //
                //       // 'Content-Type':'image/png'
                //     },
                //     data:{
                //         mobile:this.form.mobile
                //     }
                // })
                // // },['global.zs','global.gateway.zs','global.dev','global.test'])
                //     .then(([res])=>{
                //
                //         JZY.s.clog('login code res--:',res)
                //
                //
                //
                //         this.src=res;
                //         return false;
                //
                //
                //         let self=this
                //         var bb = new Blob([res]);
                //         var f = new FileReader();
                //         f.onload = function (e) {
                //             console.log('e.target.result--:',e.target.result.substring(5));
                //
                //             let src='data:image/png'+e.target.result.substring(5)
                //             self.src=src
                //
                //         };
                //         f.readAsDataURL(bb);
                //
                //         return false;
                //
                //
                //
                //
                //
                //         let newBlob=function(data, datatype){
                //             var out;
                //             try {
                //                 out = new Blob([data], {type: datatype});
                //             }
                //             catch (e) {
                //                 window.BlobBuilder = window.BlobBuilder ||
                //                     window.WebKitBlobBuilder ||
                //                     window.MozBlobBuilder ||
                //                     window.MSBlobBuilder;
                //
                //                 if (e.name == 'TypeError' && window.BlobBuilder) {
                //                     var bb = new BlobBuilder();
                //                     bb.append(data.buffer);
                //                     out = bb.getBlob(datatype);
                //                 }
                //                 else if (e.name == "InvalidStateError") {
                //                     out = new Blob([data], {type: datatype});
                //                 }
                //                 else {
                //                 }
                //             }
                //             return out;
                //         }
                //
                //
                //         // window.URL = window.URL || window.webkitURL;
                //         //
                //         // var blob = res;
                //         // var img = document.createElement("img");
                //         // img.onload = function(e) {
                //         //     window.URL.revokeObjectURL(img.src); // 清除释放
                //         // };
                //         // img.src = window.URL.createObjectURL(blob);
                //         // // eleAppend.appendChild(img);
                //         //
                //         // document.body.appendChild(img)
                //
                //         JZY.s.clog("evt data--:",window.event.data)
                //
                //
                //
                //         var URL = window.URL || window.webkitURL;
                //         var blob = newBlob(res, { type: 'image/png' });
                //         var url = URL.createObjectURL(blob);
                //
                //
                //         //
                //         JZY.s.clog('url-----:',url);
                //         this.src=url
                //
                //
                //         // return false
                //
                //
                //         // var image = new PNG(res);
                //         //
                //         // JZY.s.clog('iamge---:',image)
                //         //
                //         //
                //         // function hexToBase64(str) {
                //         //     return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
                //         // }
                //         //
                //         // JZY.s.clog('res--:',res)
                //         //
                //         // let src='data:image/png;base64,'+btoa(unescape(encodeURIComponent(res)))
                //         //
                //         // // document.body.innerHTML='<img src="'+res+'" />'
                //         //
                //         // JZY.s.clog('src--:',src)
                //         //
                //         // this.src=src
                //
                //
                //     })
                //     .catch((e)=>{
                //         JZY.s.clog('login e--:',e)
                //     })
            }
          // let validateCodeRes=await JZY.xhr.r({
          //     type:'post',
          //     url:'/validateCode'
          // })[0]
          //
          //   JZY.s.clog('validateCodeRes:',validateCodeRes)

        },
        mounted() {

            if(!JZY.PROD_MODE){
                window.JZY.loginCookieUtil=cookieUtil
                window.JZY.LOGIN_VM=this
            }



            class Circle {
                //创建对象
                //以一个圆为对象
                //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
                //this.r是创建圆的半径，参数越大半径越大
                //this._mx,this._my是移动的距离，参数越大移动
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.r = Math.random() * 10 ;
                    this._mx = Math.random() ;
                    this._my = Math.random() ;

                }

                //canvas 画圆和画直线
                //画圆就是正常的用canvas画一个圆
                //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
                drawCircle(ctx) {
                    ctx.beginPath();
                    //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
                    ctx.arc(this.x, this.y, this.r, 0, 360)
                    ctx.closePath();
                    ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
                    ctx.fill();
                }

                drawLine(ctx, _circle) {
                    let dx = this.x - _circle.x;
                    let dy = this.y - _circle.y;
                    let d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 150) {
                        ctx.beginPath();
                        //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
                        ctx.moveTo(this.x, this.y);   //起始点
                        ctx.lineTo(_circle.x, _circle.y);   //终点
                        ctx.closePath();
                        ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
                        ctx.stroke();
                    }
                }

                // 圆圈移动
                // 圆圈移动的距离必须在屏幕范围内
                move(w, h) {
                    this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
                    this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
                    this.x += this._mx / 2;
                    this.y += this._my / 2;
                }
            }
            //鼠标点画圆闪烁变动
            class currentCirle extends Circle {
                constructor(x, y) {
                    super(x, y)
                }

                drawCircle(ctx) {
                    ctx.beginPath();
                    //注释内容为鼠标焦点的地方圆圈半径变化
                    //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
                    this.r = 8;
                    ctx.arc(this.x, this.y, this.r, 0, 360);
                    ctx.closePath();
                    //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
                    ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
                    ctx.fill();

                }
            }
            //更新页面用requestAnimationFrame替代setTimeout
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            let w = canvas.width = canvas.offsetWidth;
            let h = canvas.height = canvas.offsetHeight;
            let circles = [];
            let current_circle = new currentCirle(0, 0)

            let draw = function () {
                ctx.clearRect(0, 0, w, h);
                for (let i = 0; i < circles.length; i++) {
                    circles[i].move(w, h);
                    circles[i].drawCircle(ctx);
                    for (let j = i + 1; j < circles.length; j++) {
                        circles[i].drawLine(ctx, circles[j])
                    }
                }
                if (current_circle.x) {
                    current_circle.drawCircle(ctx);
                    for (var k = 1; k < circles.length; k++) {
                        current_circle.drawLine(ctx, circles[k])
                    }
                }
                requestAnimationFrame(draw)
            }

            let init = function (num) {
                for (var i = 0; i < num; i++) {
                    circles.push(new Circle(Math.random() * w, Math.random() * h));
                }
                draw();
            }



            init(60)


            let mousemove=function(e){
                if(!JZY.s.getPathName().startsWith('/login')){return false}


                e = e || window.event;
                current_circle.x = e.clientX;
                current_circle.y = e.clientY;
            },mouseout=function(e){
                if(!JZY.s.getPathName().startsWith('/login')){return false}
                current_circle.x = null;
                current_circle.y = null;
            }



            JZY.s.eventBus.$on('LOGIN_SUCCESS',()=>{
                window.removeEventListener('mousemove',mousemove)
                window.removeEventListener('mouseout',mouseout)
            })

            window.addEventListener('mousemove',mousemove)
            window.addEventListener('mouseout',mouseout)


            // window.onmousemove = function (e) {
            //     if(!JZY.s.getPathName().startsWith('/login')){return false}
            //
            //
            //     e = e || window.event;
            //     current_circle.x = e.clientX;
            //     current_circle.y = e.clientY;
            // }
            // window.onmouseout = function () {
            //     if(!JZY.s.getPathName().startsWith('/login')){return false}
            //     current_circle.x = null;
            //     current_circle.y = null;
            //
            // };
            // 东宇给的开发服务器账号：
            // 15011228165
            // 111111


            // 18610350270
            // 111111


            /*
            Bearer 1f4c3b61-e306-4962-9735-a8a230bb755d

            */



            // return false
            //
            // var url = "http://192.168.3.157:9999/platform-app/platform/validateCode";
            // var xhr = new XMLHttpRequest();
            // xhr.open('POST', url, true);
            // xhr.responseType = "blob";
            // xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.onload = function () {
            //     if (this.status == 200) {
            //         var blob = this.response;
            //         var img = document.createElement("img");
            //         img.onload = function (e) {
            //             window.URL.revokeObjectURL(img.src);
            //         };
            //         img.src = window.URL.createObjectURL(blob);
            //         $("#imgcontainer").html(img);
            //     }
            // }
            // var pa={"mobile":"13077777777"}
            // xhr.send(JSON.stringify(pa));

//            this.rqQrCode();

        },
        watch:{
            'form.mobile':function(val){
//              console.log('mobile has been changed')
                this.handleMobileChange()
            },
            'forgetForm.mobileCode':function (curVal,oldVal) {
                if(curVal.length==6&&this.hasClickedValidateCodeInForgetPwdPanel){
                    this.nextStepBtn = true
                }else{
                    this.nextStepBtn = false
                }
            },
        },
    }

    /*
    defaultflag是否主租户，1是：0：否
楚海成
outerlinkman，是否外部联系人 0：否，1：是
楚海成
uid和userIdIm都是用户id
楚海成
sid你们应该是用不到
楚海成
tendId租户id，切库用
     */

</script>




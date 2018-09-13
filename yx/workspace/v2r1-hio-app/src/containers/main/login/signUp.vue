<template>

    <div>
        <div>
            <el-input v-model="form.mobile" placeholder="mobile"></el-input>
        </div>
        <div>
            <el-input v-model="form.smscode" placeholder="输入手机验证码"></el-input>
            <el-button @click="sendMobileCode()">发送验证码</el-button>
        </div>
        <div>
            <el-input v-model="form.password" placeholder="pwd"></el-input>
        </div>

        <div>
            <el-button @click="submit()">submit</el-button>
        </div>


    </div>
</template>
<style>

</style>
<script>


    export default {
        computed: {

        },

        components:{

        },
        methods: {

            sendMobileCode(){
                JZY.xhr.post('/platform/smscode',{mobile:this.form.mobile})
            },
            submit(){

                let d=JZY.u.copy(this.form)

                d.password=JZY.u.md5(d.password)




                JZY.xhr.r({
                    type:'post',
                    url:'/platform/register',
                    data:d
                })
                    .then(([res])=>{

                        JZY.u.successMsg('sign up success!')

                        let {access_token,refresh_token}=res


                        // JZY.c.AUTO_LOGIN.headers.authorization=access_token
                        JZY.router.push('/')
                        // console.log('login res--:',res)
                    })
            }

        },
        props: {


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        data() {



            return {
                src:'',
                form:{
                    mobile:JZY.DEBUG_MODE&&JZY.c.AUTO_LOGIN?(JZY.c.AUTO_LOGIN.username||''):'',
                    smscode:'',
                    // picVilidatecode:JZY.DEBUG_MODE&&JZY.c.AUTO_LOGIN?(JZY.c.AUTO_LOGIN.username||''):'',
                    password:JZY.DEBUG_MODE&&JZY.c.AUTO_LOGIN?(JZY.c.AUTO_LOGIN.password||''):'',

                }
            }
        },

        async created(){
            // let validateCodeRes=await JZY.xhr.r({
            //     type:'post',
            //     url:'/validateCode'
            // })[0]
            //
            //   JZY.s.clog('validateCodeRes:',validateCodeRes)

        },
        mounted() {



        },

    }
</script>

<template>
        <el-form :model="form" :rules="rules" ref="myForm" label-width="150px">
            <el-form-item prop="selectedEmail" label="选择邮箱类型">
                <el-select v-model="form.selectedEmail" placeholder="请选择">
                    <el-option
                            v-for="item in allSupportedEmails"
                            :key="item.name"
                            :label="item.name+'邮箱'"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" placeholder="请输入邮箱账号">
                    <template v-if="form.selectedEmail" slot="append">@{{form.selectedEmail}}.com</template>
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd" type="password" placeholder="请输入邮箱密码"></el-input>
            </el-form-item>
            <div style="text-align:right">
                <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
            </div>
        </el-form>
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
            nextStep(){

                this.$refs.myForm.validate((res)=>{
                    if(res){
                        this.$emit('nextStep',this.form)
                    }
                    console.log('validate res--:',res)
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
        created(){

        },
        data() {



            return {
                rules:{
                    selectedEmail:[
                        { required: true, message: '请选择邮箱类型', trigger: 'change' }
                    ],
                    account:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { required: true, message: '请输入账号', trigger: 'change' },
                    ],
                    pwd:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { required: true, message: '请输入密码', trigger: 'change' },
                    ]
                },
                form:{
                    selectedEmail:'',
                    account:'',
                    pwd:''
                },
                // selectedEmail:'',
                allSupportedEmails:[
                    {name:'aa'},
                    {name:'126'},
                    {name:'163'},
                    {name:'gmail'},
                    {name:'outlook'},
                    {name:'qq'},
                    {name:'yahoo'}
                ],

                data:[
                    {
                        a:'sdfsdf',
                        isHover:false
                    }
                ]
            }
        },

        beforeDestroy(){

        },
        destroyed(){

        },
        mounted() {



        },

    }
</script>

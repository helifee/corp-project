<template>
    <right-slide-modal
            title="新建联系人"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave('form')" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form"  :model="form" :rules="rules" label-width="120px">
                <el-form-item label="客户名称：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="fullName">
                    <el-input v-model="form.fullName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio  :label="0" >女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="职务：">
                    <el-input v-model="form.job"></el-input>
                </el-form-item>
                <el-form-item label="决策关系：" prop="relation">
                    <el-select v-model="form.relation" placeholder="请选择决策关系">
                        <el-option label="普通员工" value="0"></el-option>
                        <el-option label="采购决策人" value="1"></el-option>
                        <el-option label="项目决策人" value="2"></el-option>
                        <el-option label="人事决策人" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电子邮件：" prop="mail">
                    <el-input v-model="form.mail"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="form.des":rows="5" v-textarea-limiter type="textarea" :maxlength="100"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</template>

<script>
    import {postOfficeHouseSelectTree,postOfficeHouseSave} from '@Main/officeSupplies/getData.js'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            id:{
                required:false
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
//            关闭
            operateClose(formName){
//
                this.$emit("closeCreateModal");
            },
//            保存
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        data(){
            return {
                categoryList:'',
                form:{
                    name:'',
                    fullName:'',
                    sex:0,
                    phone:'',
                    job:'',
                    relation:'',
                    mail:'',
                    des:'',
                },
                rules:{
                    fullName: [
                        { required: true, message: '请选择所属类别', trigger: 'change' },
                        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                    ],
                },
            }
        },
        watch:{

        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>

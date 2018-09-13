<template>
    <div>

        <el-button plain  @click="submitForm('form')">{{l('{officeLocale.goods.otherButtons.save}')}}</el-button>
        <el-button plain @click="goback()">{{l('{officeLocale.goods.otherButtons.goback}')}}</el-button>

        <div class="detail-content">
            <el-form ref="form"  :model="form" :rules="rules" label-width="120px">
                <el-form-item :label="l('{officeLocale.goods.detail.theCategory}')+'：'" prop="category">
                    <el-select v-model="form.category" placeholder="请选择活动区域">
                        <el-option label="办公用品1" value="office1"></el-option>
                        <el-option label="办公用品2" value="office2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="l('{officeLocale.goods.detail.name}')+'：'" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="l('{officeLocale.goods.detail.number}')+'：'" prop="number">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item :label="l('{officeLocale.goods.detail.specification}')+'：'">
                    <el-input v-model="form.specification"></el-input>
                </el-form-item>
                <el-form-item :label="l('{officeLocale.goods.detail.brand}')+'：'">
                    <el-input v-model="form.brand"></el-input>
                </el-form-item>

                <el-form-item :label="l('{officeLocale.goods.detail.unit}')+'：'">
                    <el-input v-model="form.unit"></el-input>
                </el-form-item>

                <el-form-item :label="l('{officeLocale.goods.detail.remarks}')+'：'">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    export default{
        props:["form"],
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            goback(){
                this.$router.back(-1);
            },
        },
        data(){
            return {
                rules:{
                    category: [
                        { required: true, message: '请选择所属类别', trigger: 'change' },
                    ],
                    name: [
                        { required: true, message: '请输入物品名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入物品编号', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                goods:{
                    number: 'H008',
                    name: '固体胶',
                    specification:'36g',
                    brand:'得力',
                    unit:'个',
                    inventory:'1',
                    recordData:[{
                        type:'入库',
                        requisition:'王丽丽',
                        operation:'曲丽丽',
                        time:'2017-10-01 12:00:23',
                        number:'+20'
                    },{
                        type:'出库',
                        requisition:'王丽丽',
                        operation:'曲丽丽',
                        time:'2017-10-01 12:00:23',
                        number:'-20'
                    },{
                        type:'入库',
                        requisition:'王丽丽',
                        operation:'曲丽丽',
                        time:'2017-10-01 12:00:23',
                        number:'+20'
                    }
                    ],
                }
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .detail-content{
        overflow-x: hidden;
        padding: 30px 300px 0 12px;
    }
</style>

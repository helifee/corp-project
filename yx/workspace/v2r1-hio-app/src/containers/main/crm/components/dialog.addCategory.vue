<template>
    <right-slide-modal
            title="创建分类"
            :visible.sync="propsDialogVisible"
            :showClose="false"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave('form')"  size="medium ">保存</el-button>
                <el-button @click="operateClose('form')" size="medium ">关闭</el-button>
            </ul>
        </div>
        <el-form ref="form" :model="form" :rules="rules"  label-width="120px">
            <el-form-item label="所属类别" prop="code">
                <el-select v-model="form.category" placeholder="请选择所属类别">
                    <el-option :key="index" v-for="(item,index) in classList" :label="item.name" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别编码：" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="类别名称：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类别描述：">
                    <el-input v-model="form.comment" :rows="5" v-textarea-limiter type="textarea" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="类别状态：">
                    <el-radio v-model="form.categoryStatus" label="1">启用</el-radio>
                    <el-radio v-model="form.categoryStatus" label="2">禁用</el-radio>
                </el-form-item>
            
        </el-form>
    </right-slide-modal>
</template>

<script>
    import cService from '@Main/crm/crm_service.js'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
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
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
//            提交
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //分类列表
            getClassList(){
                cService.getProductCategory({pid:0},true).then((data)=>{
                    this.classList = data[0];
                });
            }

        },
        data(){
            return {
                classList:[],
                form:{
                    category:{},
                    name:'',
                    unit:'',
                    price:'',
                    comment:'',
                    productStatus:"1"
                },
                rules:{
                     code: [
                        { required: true, message: '请填写类别编码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入产品价格', trigger: 'blur' },
                        { type: 'number', message: '价格必须为数字', trigger: 'blur' },
                    ],
                    unit: [
                        { required: true, message: '请输入产品单位', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                    ],
                },
            }
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

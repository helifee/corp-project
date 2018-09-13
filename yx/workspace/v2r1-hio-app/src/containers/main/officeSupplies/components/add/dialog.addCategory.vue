<template>
    <right-slide-modal
            title="创建分类"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            class="office-dialog-wrap"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')">保存</el-button></li>
                <li> <el-button @click="operateClose('form')">关闭</el-button></li>
            </ul>
        </div>
        <el-form ref="form" :model="form" :rules="rules"  label-width="86px">
            <el-form-item :label="l('{officeLocale.goods.category.code}')+'：'" prop="code">
                <el-input v-model="form.code" :maxlength="51"></el-input>
            </el-form-item>
            <el-form-item :label="l('{officeLocale.goods.category.name}')+'：'" prop="name">
                <el-input v-model="form.name" :maxlength="51"></el-input>
            </el-form-item>
            <el-form-item :label="l('{officeLocale.goods.category.describe}')+'：'">
                <el-input v-model="form.specification" v-textarea-limiter type="textarea" :rows="5" :maxlength="200"></el-input>
            </el-form-item>
            <el-form-item :label="l('{officeLocale.goods.category.state}')+'：'">
                <el-radio-group v-model="form.state">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio  :label="0" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </right-slide-modal>
</template>

<script>
    import {postOfficeHouseSave} from '@Main/officeSupplies/getData.js'
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
                this.form = {
                    name:'',
                    code:'',
                    specification:'',
                    state:1
                };
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
//            提交
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let queryData = {
                            "parentId":"",
                            "numberCode":"",
                            "typeName":"",
                            "state":"",
                            "remark":""
                        };
                        queryData.numberCode = this.form.code;
                        queryData.typeName = this.form.name;
                        queryData.remark = this.form.specification;
                        queryData.state = this.form.state;

                        this.officeHouseSave(queryData);


                    } else {
//                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            async officeHouseSave(queryData){
                let res = await postOfficeHouseSave(queryData);
                if(res){
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.$emit("refreshData");
                    this.operateClose('form');
                }
            }
        },
        data(){
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                form:{
                    name:'',
                    code:'',
                    specification:'',
                    state:1
                },
                rules:{
                    code: [
                        { required: true, message: '请输入物品编号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9]+$/, message: '类别编码只能是数字或者英文', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入物品名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                },
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate-buttons {
        margin-top: 10px;
        float: right;
    }
</style>

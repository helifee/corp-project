<template>
    <right-slide-modal
            title="编辑一级分类"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            class="office-dialog-wrap"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')"  size="medium ">保存</el-button></li>
                <li><el-button @click="operateClose('form')" size="medium ">关闭</el-button></li>
            </ul>
        </div>
        <el-form ref="form" :model="form" :rules="rules"  label-width="86px">
            <el-form-item :label="l('{officeLocale.goods.category.code}')+'：'" prop="code">
                <el-input v-model="form.code" :maxlength="51"></el-input>
            </el-form-item>
            <el-form-item :label="l('{officeLocale.goods.category.name}')+'：'" prop="name">
                <el-input v-model="form.name"  :maxlength="51"></el-input>
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
    import {putOfficeHouseUpdate,getOfficeHouseGet} from '@Main/officeSupplies/getData.js'
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
            },
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            async officeHouseSave(queryData){
                let res = await putOfficeHouseUpdate(this.id,queryData);
                if(res){
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.$emit("refreshData");
                    this.operateClose('form');
                }
//                console.log("成功了",res)
            },
            async officeHouseGet(){
                let res = await getOfficeHouseGet(this.id);

//                console.log("成功了officeHouseGet",res)
//                let {typeName:name,numberCode:code,remark:specification,state:state} = res;
                this.form.name = res.typeName;
                this.form.code = res.numberCode;
                this.form.specification = res.remark||"";
                this.form.state = parseInt(res.state);

            },
        },
        data(){
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
        watch:{
            propsDialogVisible(curVal,oldVal){
                if(curVal){
                    this.officeHouseGet();
                }

            },
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate-buttons {
        margin-top: 8px;
        float: right;
    }
</style>

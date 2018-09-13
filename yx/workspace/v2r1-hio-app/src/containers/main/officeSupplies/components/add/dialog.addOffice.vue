 <template>
    <right-slide-modal
            title="创建分类"
            @open="initData"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            class="office-dialog-wrap"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')">保存</el-button></li>
                <li><el-button @click="operateClose('form')">关闭</el-button></li>
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form"  :model="form" :rules="rules" label-width="86px">
                <el-form-item label="一级类别：" prop="category" >
                    <el-select v-model="form.category" placeholder="请选择一级类别" v-if="propsDialogVisible">
                        <el-option v-for="item in categoryList" :label="item.typeName" :value="item.sid" :key="item.sid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别编码：" prop="code">
                    <el-input v-model="form.code" :maxlength="51"></el-input>
                </el-form-item>
                <el-form-item label="类别名称：" prop="name">
                    <el-input v-model="form.name" :maxlength="51"></el-input>
                </el-form-item>
                <el-form-item label="类别描述：">
                    <el-input v-model="form.specification" v-textarea-limiter type="textarea" :rows="5" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item :label="l('{officeLocale.goods.category.state}')+'：'">
                    <el-radio-group v-model="form.state">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio  :label="0" >禁用</el-radio>
                    </el-radio-group>
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
            initData(){
                this.rquireOfficeTree();
            },
//            关闭
            operateClose(formName){
                this.form = {
                    name:'',
                    code:'',
                    specification:'',
                    state:1,
                    category:'',
                };
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
//            保存
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let queryData = {
                            "parentid":"",
                            "numberCode":"",
                            "typeName":"",
                            "state":"",
                            "remark":""
                        };
                        queryData.parentId = this.form.category;
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

            //新建二级分类
            async rquireOfficeTree(){
                let queryData = {
                    "parentId":null,
                    "state":1
                }
                let res = await postOfficeHouseSelectTree(queryData);
                this.categoryList = [...res[0]];
                this.form.category = this.id;

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
            },
        },
        data(){
            return {
                categoryList:'',
                form:{
                    name:'',
                    code:'',
                    specification:'',
                    state:1,
                    category:'',
                },
                rules:{
                    category: [
                        { required: true, message: '请选择所属类别', trigger: 'change' },
                    ],
                    code: [
                        { required: true, message: '请输入物品编号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9]+$/, message: '类别编码只能是数字或者英文', trigger: 'blur'  }
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
 <style rel="stylesheet/scss" lang="scss">
     .detail-content .el-select-dropdown{
         z-index: 100000!important;
     }
 </style>

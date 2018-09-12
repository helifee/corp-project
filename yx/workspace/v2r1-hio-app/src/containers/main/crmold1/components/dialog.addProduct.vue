<template>
    <right-slide-modal
            title="创建产品"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            @open="openDialog"
            >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave('form')" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form"  :model="form" :rules="rules" label-width="120px">
                <el-form-item label="所属类别：" prop="createNodeArr">
                     <el-cascader style="width:100%"
                        v-model="form.createNodeArr"
                        placeholder="搜索类别名称"
                        :options="classList"
                        filterable
                        :show-all-levels="false"
                        :props="propsSelect"
                        :disabled="disableSelected">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="产品名称：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="产品单位：" prop="unit">
                    <el-input v-model="form.unit"></el-input>
                </el-form-item>
                <el-form-item label="产品单价：" prop="price">
                    <el-input v-model.number="form.price"></el-input>
                </el-form-item>
                <el-form-item label="产品类别状态：" prop="productStatus">
                    <el-radio v-model="form.productStatus" label="1">启用</el-radio>
                    <el-radio v-model="form.productStatus" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="产品描述：">
                    <el-input v-model="form.comment" :rows="5" v-textarea-limiter type="textarea" :maxlength="100"></el-input>
                </el-form-item>
                
            </el-form>
        </div>
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
            },
            productClass:{
                required:false,
                type:Array
            },
            productNode:{
                required:false,
                type:Object
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
            
            openDialog(){
                this.getClassList();
                this.form = {
                    createNodeArr:[],
                    name:'',
                    unit:'',
                    price:'',
                    comment:'',
                    productStatus:"1",
                    sid:""
                },
                this.form.createNodeArr = [];  //只能是二级
                if(this.productNode.node){
                    this.form.createNodeArr = [this.productNode.node.parentId,this.productNode.node.sid];
                }
                this.disableSelected = false;

                if(this.productNode.actType == "modify"){
                    this.disableSelected = true;
                    cService.getProductById(this.productNode.node.sid).then((data) =>{
                        let r = data[0];
                        this.form.name = r.name;
                        this.form.comment = r.comment;
                        this.form.productStatus = String(this.form.productStatus);
                        this.form.sid = r.sid;
                        this.form.price = r.price;
                        this.form.unit = r.unit;
                        this.form.createNodeArr = [r.categoryBaseId,r.categoryId];
                    })
                }
            },
//            关闭
            operateClose(formName){
//
                this.$emit("closeCreateModal");
            },
//            保存
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = {},
                        forms = this.form;
                        param = {
                            sid:forms.sid,
                            name : forms.name,
                            unit : forms.unit,
                            price : forms.price,
                            categoryId : forms.createNodeArr[1],
                            categoryBaseId : forms.createNodeArr[0],
                            productStatus : (forms.productStatus == "1") ? 1:0 ,
                            comment : forms.comment
                        }
                        //当前被选中节点
                        // let selectedTreeData = forms.category;
                        cService.saveProducts(param).then((data) => {
                            if(data[0].status == "200"){
                                this.$message(data[0].message);
                                this.operateClose();
                                this.$emit("reloadTable");
                                this.$refs[formName].resetFields();
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //分类列表
            getClassList(){
                if(this.productClass && this.productClass.length){
                    this.classList = this.productClass;
                    return;
                }
                cService.getProductCategory({}).then((data)=>{
                    this.classList = data[0];
                });
            },

        },
        data(){
            let createProductorValidator = (rule, value, callback) => {
                if(value.length == 1){
                    callback(new Error("请选择产品所属类别"));
                }
                callback();
            }
            return {
                propsSelect: {
                    label:'name',
                    value:'sid',
                    children: 'cateList'
                },
                disableSelected:false,
                form:{
                    createNodeArr:[],
                    name:'',
                    unit:'',
                    price:'',
                    comment:'',
                    productStatus:"1"
                },
                rules:{
                    createNodeArr: [
                        { required: true, message: '请选择所属类别', trigger: 'change' },
                        {validator:createProductorValidator,trigger: 'change' }
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
                classList:[]
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
<style rel="stylesheet/scss" lang="scss" >
    .el-cascader-menus{
        z-index: 10000;
    }
</style>

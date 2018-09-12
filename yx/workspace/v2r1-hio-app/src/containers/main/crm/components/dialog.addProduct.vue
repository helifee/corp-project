<template>
    <div>
            <right-slide-modal
                :title="productNode.actType == 'modify' ? '修改产品': (productNode.actType == 'view' ? '查看产品':'创建产品') "
                :visible.sync="dialogVisible"
                :showClose="false"
                @open="openDialog"
                >
            <div slot="operateButtons" class="operate_buttons">
                <ul v-if="productNode.actType != 'view'">
                    <li><el-button @click="operateSave('form')">保存</el-button></li>
                    <li><el-button @click="operateClose()">关闭</el-button></li>
                </ul>
                <ul v-if="productNode.actType == 'view'">
                    <li><el-button @click="showEdit()">编辑</el-button></li>
                    <li><el-button @click="delProduct()">删除</el-button></li>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <div class="detail-content" v-if="!viewPage">
                <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
                    <el-form-item label="所属类别：" prop="createNodeArr">
                        <el-cascader style="width:100%"
                            v-model="form.createNodeArr"
                            placeholder="搜索类别名称"
                            :options="classList"
                            filterable
                            :show-all-levels="false"
                            change-on-select
                            :props="propsSelect"
                            @change="changeHander"
                            
                            >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="name">
                        <el-input v-model="form.name" :maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="单位：" prop="unit">
                        <el-input v-model="form.unit" :maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="单价：" prop="price">
                        <!-- <el-input v-model="form.price" ></el-input> -->
                        <numberInput v-model="form.price" type="blend" ></numberInput>
                    </el-form-item>
                    <el-form-item label="状态：" prop="productStatus">
                        <el-radio v-model="form.productStatus" label="1">销售</el-radio>
                        <el-radio v-model="form.productStatus" label="2">停售</el-radio>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input v-model="form.comment" :rows="5" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            <div class="detail-content" v-if="viewPage">
                <ul class="productViewWrap">
                    <li>
                        <span class="r_label">所属类别：</span>
                        <span class="l_des">{{form.categoryname}}</span>
                    </li>
                    <li>
                        <span class="r_label"><span class="red">*</span>产品名称：</span>
                        <span class="l_des">{{form.name}}</span>
                    </li>
                    <li>
                        <span class="r_label"><span class="red">*</span>产品单位：</span>
                        <span class="l_des">{{form.unit}}</span>
                    </li>
                    <li>
                        <span class="r_label"><span class="red">*</span>产品单价：</span>
                        <span class="l_des">{{form.price}}</span>
                    </li>
                    <li>
                        <span class="r_label"><span class="red">*</span>产品状态：</span>
                        <span class="l_des">{{form.productStatus == "1" ? '销售' : '停售'}}</span>
                    </li>
                    <li>
                        <span class="r_label">产品描述：</span>
                        <span class="l_des"><pre>{{form.comment}}</pre></span>
                    </li>
                </ul>
            </div>
        </right-slide-modal>
    </div>
    
</template>

<script>


    import cService from '@Main/crm/crm_service.js'
    import numberInput from '@Main/crm/components/number.vue'

    export default{
        components:{
            numberInput
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
            // propsDialogVisible: {
            //     get:function(){
            //         return this.dialogVisible;
            //     },
            //     set:function () {
            //         return  this.$emit("closeCreateModal");
            //     }
            // }
        },
        methods:{
            delProduct(){
                let temp = this.productNode.node;
                this.$parent.delProduct(temp,(data)=>{
                    this.operateClose();
                });
            },
            showEdit(){
                this.productNode.actType = 'modify';
                this.viewPage = !this.viewPage;
            },
            changeHander(item){
                this.selectCurrentId = item[0];
            },
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
                // this.disableSelected = false;

                if(this.productNode.actType == "modify" || this.productNode.actType == "view"){
                    // this.disableSelected = true;
                    this.viewPage = this.productNode.actType == "view" ? true : false;
                    cService.getProductById(this.productNode.node.sid,"p").then((data) =>{
                        let r = data[0];
                        this.form.name = r.name;
                        this.form.comment = r.comment;
                        this.form.productStatus = String(r.productStatus);
                        this.form.sid = r.sid;
                        this.form.price = r.price;
                        this.form.unit = r.unit;
                        this.form.createNodeArr = [r.categoryBaseId,r.categoryId];
                        this.form.categoryname = 
                            r.categoryBaseName +  (r.categoryName ? (" - " + r.categoryName) : "");
                           
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
                            categoryId : forms.createNodeArr[1] || "",
                            categoryBaseId : forms.createNodeArr[0],
                            productStatus : (forms.productStatus == "1") ? 1:2 ,
                            comment : forms.comment
                        }
                        //当前被选中节点
                        // let selectedTreeData = forms.category;
                        param = JSON.stringify(param);
                        let mythis = this;
                        cService.saveProducts(param).then((data) => {
                            if(data.status == "200"){
                                mythis.$message(data.message);
                                mythis.operateClose();
                                mythis.$emit("reloadTable",forms.createNodeArr[0],forms.createNodeArr[1]);
                                mythis.$refs[formName].resetFields();
                                
                            }else{
                                mythis.$message(data.message);
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
                // if(this.productClass && this.productClass.length){
                //     this.classList = this.productClass;
                //     return;
                // }
                cService.getProductCategory(1).then((data)=>{
                    this.classList = data[0] || [];
                });
            },

        },
        data(){
            // let createProductorValidator = (rule, value, callback) => {
            //     if(value.length == 1){
            //         callback(new Error("请选择产品所属类别"));
            //     }
            //     callback();
            // }
            let NumberValidator = (rule, value, callback) => {
                if(value){
                    let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
                    if(reg.test(value)){
                        callback();
                    }else{
                        callback(new Error("请输入13位整数或带两位小数的15位数字"))
                    }
                }
            }
            let nameValidator = (rule, value, callback) => {
                if(value){
                    let param = {
                        name : value,
                        sid : this.productNode.node ? this.productNode.node.sid : ''
                    }
                    cService.getProductValName(param).then( (data)=>{
                        if(data.status == 200){
                            return callback();
                        }else{
                            return callback(new Error(data.message));
                        }
                    })
                }
            }
            return {
                priceNum:18,
                viewPage:false,
                selectCurrentId : "",
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
                        { required: true, message: '请选择所属类别', trigger: 'change' }
                        // {validator:createProductorValidator,trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: ['blur','change'] },
                        { validator:nameValidator,trigger:'blur'}
                    ],
                    price: [
                        { required: true, message: '请输入产品价格', trigger: 'blur' },
                        { validator:NumberValidator,trigger:['blur','change'] }

                    ], 
                    unit: [
                        { required: true, message: '请输入产品单位', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: ['blur','change'] },
                    ],
                },
                classList:[]
            }
        },
        mounted(){
            this.openDialog();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../crmcss/css.scss'
</style>

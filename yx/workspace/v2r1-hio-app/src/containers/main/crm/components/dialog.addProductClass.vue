<template>
<div>
    <right-slide-modal
            :title="createNode.actType == 'modify' ? '编辑类别': '创建类别'"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            @open="openDialog"
            >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-button @click="operateSave('form')" size="medium ">保存</el-button>
                </li>
                <li>
                    <el-button @click="operateClose('form')" size="medium ">关闭</el-button>
                </li>
                
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form"  :model="form" :rules="rules" label-width="120px">
                <el-form-item :label="createNode.actType == 'modify' ? '一级分类': '所属类别'" prop="sid" 
                v-if="(createNode.showPut) "
                 >
                    <el-select v-model="form.parentId" placeholder="请选择所属类别" :disabled="disableSelected" >
                        <el-option v-for="item in classList" :label="item.name" :value="item.sid"></el-option>
                    </el-select>
                    <!-- <el-cascader style="width:100%" 
                        v-model="form.createNodeArr"
                        placeholder="搜索类别名称"
                        :options="classList"
                        filterable
                        change-on-select
                        :show-all-levels="false"
                         :props="propsSelect"
                         active-item-change="itemChangeHander"
                         :disabled="disableSelected">
                    </el-cascader> -->
                    <!-- <el-input v-model="form.sid" :disabled="true" v-if="createNode.actType == 'modify'"></el-input> -->
                </el-form-item>
                <el-form-item label="类别编码：" prop="code">
                    <!-- <el-input v-model.trim="form.code" :maxlength="101"></el-input> -->
                    <numberInput v-model="form.code" :maxlength="51"></numberInput>
                </el-form-item>
                <el-form-item label="类别名称：" prop="name">
                    <el-input v-model.trim="form.name" :maxlength="51"></el-input>
                </el-form-item>
                <el-form-item label="类别描述：">
                    <el-input v-model.trim="form.comment" :rows="5" v-textarea-limiter type="textarea" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="类别状态：">
                    <el-radio v-model="form.categoryStatus" label="1">启用</el-radio>
                    <el-radio v-model="form.categoryStatus" label="0">禁用</el-radio>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</div>
    
</template>

<script>
    // import editOffice from '@Main/officeSupplies/components/edit.office.vue'
    import cService from '@Main/crm/crm_service.js'
    import numberInput from '@Main/crm/components/number.vue'
    export default{
        components:{
           numberInput
        },
        props:{
            title:{
                type:Object,
            },
            dialogVisible:{
                type:Boolean,
                required:true
            },
            productClass:{
                required:false,
                type:Array
            },
            createNode:{   //当前节点
                required:false,
                type:Object
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
            //只能选一级
            itemChangeHander(){

            },
//            关闭
            operateClose(formName){
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
//            保存分类
            operateSave (formName){
                let my = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let sid = "",parentId = "";

                        sid = this.form.sid || "";

                        parentId = this.form.parentId || "";
                        
                        let param = {
                            sid: sid,
                            code:my.form.code,
                            name:my.form.name,
                            parentId:parentId == sid ? "" : parentId,
                            categoryStatus:Number(my.form.categoryStatus),
                            comment:my.form.comment
                        };
                        param = JSON.stringify(param);
                        cService.saveProductCategory(param).then((data) =>{
                            if(data.status == "200"){
                                my.operateClose(formName);
                                my.$refs[formName].resetFields();
                                //刷新分类列表
                                my.$emit("reloadTree");
                            }
                            my.$message(data.message);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //分类列表
            getClassList(){
                // console.log(this.productClass)
                // if(this.productClass && this.productClass.length){
                    
                //     this.classList = this.productClass;
                //     return;
                // }
                //查询分类的接口需要改 todotodo
                cService.getProductCategory({pid:0,status:1},true).then((data)=>{
                    this.classList = data[0];
                });
            },
            //打开窗口时执行
            openDialog(){
                this.getClassList();
                let nodeId = "";
                
                this.form = {
                    parentId:this.createNode.currentNode.parentId == "0" ? this.createNode.currentNode.sid : this.createNode.currentNode.parentId,
                    sid : "",
                    code:'',
                    name:'',
                    comment:'',
                    categoryStatus:"1"
                };


                this.disableSelected = false;

                if(this.createNode.actType == "modify"){
                    
                    //初始化当前数据
                    //为一级修改时不可编辑
                    if(this.createNode.currentNode.parentId == "" || this.createNode.currentNode.parentId == "0"){
                        this.disableSelected = true;
                    }
                      
                    // this.disableSelected = true;
                    cService.getProductById(this.createNode.currentNode.sid).then((data) =>{
                        let r = data[0];
                        this.form.code = r.code;
                        this.form.name = r.name;
                        this.form.comment = r.comment;
                        this.form.categoryStatus = String(r.categoryStatus);
                        
                        this.form.sid = r.sid;
                        this.form.parentId = r.parentId == "0" ? r.sid : r.parentId;
                        // this.form.createNodeArr = [r.parentId,r.sid];
                    })
                }

            },
        },
        data(){
            let my = this;
            let nameValidator = (rule, value, callback) => {
                if(value){
                    let sid = "",parentId = "";

                        sid = this.form.sid || "";

                        parentId = this.form.parentId || "";
                    //  if(this.createNode.showPut && this.createNode.actType == "new"){
                    //      parentId = "";
                    //  }  
                    let param = {
                        name : value,
                        sid : my.form.sid || '',
                        pid : parentId == sid ? "" : parentId
                    }
                    cService.getProductCategoryValName(param).then( (data)=>{
                        if(data.status == 200){
                            return callback();
                        }else{
                            return callback(new Error(data.message));
                        }
                    })
                }
            }
            return {

                disableSelected: false,
                propsSelect: {
                    label:'name',
                    value:'sid',
                    children: 'cateList'
                },
                classList:[],  //所属分类列表
                form:{
                    parentId:"",
                    sid:'',
                    code:'',
                    name:'',
                    comment:'',
                    categoryStatus:"1",
                },
                rules:{
                    parentId:[
                        { required: true, message: '请选择产品类别', trigger: 'change' }
                    ],
                    code: [
                        { required: true, message: '请输入类别编码', trigger: 'blur' },
                        { pattern:/^[A-Za-z0-9]+$/, message: '只能输入数字或英文', trigger: 'blur' },
                        { min: 1, max: 51, message: '长度在 1 到 51 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入类别名称', trigger: 'blur' },
                        { min: 1, max: 51, message: '长度在 1 到 51 个字符', trigger: 'blur' },
                        { validator:nameValidator,trigger:'blur'}
                    ],
                    categoryStatus: [
                        { required: true, message: '请选择类别状态', trigger: 'blur' }
                    ],
                },
            }
        },
        watch:{
        },
        mounted (){
            this.openDialog();
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

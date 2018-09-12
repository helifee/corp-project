<template>
    <right-slide-modal
            title="创建分类"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            @open="openDialog"
            >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave('form')" size="medium ">保存</el-button>
                <el-button @click="operateClose('form')" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form"  :model="form" :rules="rules" label-width="120px">
                <el-form-item label="所属类别：" prop="sid" v-if="createNode.actType != 'create'">
                    <!-- <el-select v-model="form.sid" placeholder="请选择所属类别" :change="getCategory">
                        <el-option v-for="item in classList" :label="item.name" :value="item.sid"></el-option>
                    </el-select> -->
                    <el-cascader style="width:100%"
                        v-model="form.createNodeArr"
                        placeholder="搜索类别名称"
                        :options="classList"
                        filterable
                        change-on-select 
                         :props="propsSelect"
                         :disabled="disableSelected">
                    </el-cascader>
                    <!-- <el-input v-model="form.sid" :disabled="true" v-if="createNode.actType == 'modify'"></el-input> -->
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
        </div>
    </right-slide-modal>
</template>

<script>
    // import editOffice from '@Main/officeSupplies/components/edit.office.vue'
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
                        let sidArr = this.form.createNodeArr;
                        let sid = "";
                        if(this.createNode.actType == "modify"){
                            sid = this.form.createNodeArr[1];
                        }
                        let param = {
                            sid: sid,
                            code:my.form.code,
                            name:my.form.name,
                            parentId:this.form.createNodeArr[0],
                            categoryStatus:Number(my.form.categoryStatus),
                            comment:my.form.comment
                        };
                        cService.saveProductCategory(param).then((data) =>{
                            if(data[0].status == "200"){
                                my.$message(data[0].message);
                                my.operateClose(formName);
                                my.$refs[formName].resetFields();
                                //刷新分类列表
                                my.$emit("reloadTree");
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
                cService.getProductCategory({pid:0}).then((data)=>{
                    this.classList = data[0];
                });
            },
            //打开窗口时执行
            openDialog(){
                this.getClassList();
                let nodeId = "";
                
                this.form = {
                    sid : "",
                    code:'',
                    name:'',
                    comment:'',
                    categoryStatus:"1"
                };
                this.form.createNodeArr = [];
                if( this.createNode.currentNode.parentId == "0") {
                    this.form.createNodeArr = ["0",this.createNode.currentNode.sid]
                }else{
                    this.form.createNodeArr = [this.createNode.currentNode.parentId,this.createNode.currentNode.sid]  //当前节点sid
                }
                this.disableSelected = false;
                
                if(this.createNode.actType == "modify"){
                    //初始化当前数据
                    this.disableSelected = true;
                    cService.getProductById(this.createNode.currentNode.sid).then((data) =>{
                        let r = data[0];
                        this.form.code = r.code;
                        this.form.name = r.name;
                        this.form.comment = r.comment;
                        this.form.categoryStatus = String(this.form.categoryStatus);
                        
                        this.form.sid = r.sid;
                        this.parentId = r.parentId;
                        this.form.createNodeArr = [r.parentId,r.sid];
                    })
                }

            },
        },
        data(){

            return {
                disableSelected: false,
                propsSelect: {
                    label:'name',
                    value:'sid',
                    children: 'cateList'
                },
                classList:[],  //所属类别列表
                form:{
                    createNodeArr:[],
                    sid:'',
                    code:'',
                    name:'',
                    comment:'',
                    categoryStatus:"1",
                },
                rules:{
                    createNodeArr:[
                        { required: true, message: '请选择产品编码', trigger: 'change' }
                    ],
                    code: [
                        { required: true, message: '请输入产品编码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
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

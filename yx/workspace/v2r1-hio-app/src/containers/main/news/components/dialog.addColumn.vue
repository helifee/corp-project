<template>
    <right-slide-modal
            :title="title"
            :visible.sync="propsDialogVisible"
            :showClose="false"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')" :disabled ='isSaveFinished'>保存</el-button></li>
                <li><el-button @click="operateClose('form')">关闭</el-button></li>
            </ul>
        </div>
        <div class="dia-content">
            <el-form  label-width="80px" :model="form" :rules="rules" ref="form">
                <el-form-item label="栏目名称"  prop="title">
                    <el-input v-model="form.title" style="width: 540px" :maxlength="7"></el-input>
                </el-form-item>
                <el-form-item label="栏目描述"  prop="describe">
                    <el-input v-model="form.describe" style="width: 540px" :rows="6" v-textarea-limiter type="textarea" :maxlength="200"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</template>

<script>
    import {mapMutations,mapGetters,mapState,mapActions} from 'vuex'
    import {postNewsTypeSave,postNewsTypeEdit} from '@Main/news/getData.js'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            editData:{
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
            },
        },
        methods:{
            addColumnData (data){
                this.addColumn(data)
            },
//            ...mapActions([
//                'addColumn'
//            ]),
            ...mapMutations({
                'addColumn':"ADD_COLUMN"
            }),
//            保存
            operateSave (formName){
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        let queryData = {
                            "name":this.form.title,
                            "remark":this.form.describe
                        };
                        console.log("akvukl")
                        if(this.isEdit){//编辑
                        this.rqNewsTypeEdit(this.id,queryData)
                        }else{//新建
//                        this.addColumnData({...this.form});
                            this.isSaveFinished = true;
                            this.rqNewsTypeSave(queryData);
                        }
                    }
                });
            },
//            关闭
            operateClose(formName){
                this.form.title = '';
                this.form.describe = '';
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
            //保存
            async rqNewsTypeSave(queryData){
//                let res = await postNewsTypeSave(queryData);
                JZY.xhr.r({
                    type:'post',
                    url:'/newsType/save',
                    data:queryData
                })
                    .then(([res])=>{
                        this.isSaveFinished = false;
                        this.$message({
                            message: '新建栏目成功！',
                            type: 'success'
                        });
                        this.$emit("refreshList")
                        this.$emit("closeCreateModal");
                        this.operateClose('form');
                    })
                    .catch((e)=>{
                        this.isSaveFinished = false;
//                    console.log(e,"catchcatchcatch")
                    })
            },




            //修改
            async rqNewsTypeEdit(id,queryData){
//                let res = await postNewsTypeEdit(id,queryData);
//                console.log(res,"resresres");

                JZY.xhr.put(
                    '/newsType/update/'+id,
                    queryData,
                    true
                    )
                    .then(([res])=>{
                        this.isSaveFinished = false;
                        this.$message({
                            message: '修改栏目成功！',
                            type: 'success'
                        });
                        this.$emit("refreshList")
                        this.$emit("closeCreateModal");
                        this.operateClose('form');
                    })
                    .catch((e)=>{
                        this.isSaveFinished = false;
//                    console.log(e,"catchcatchcatch")
                    })


//                this.$message({
//                    message: '修改栏目成功！',
//                    type: 'success'
//                });
//                this.$emit("refreshList")
//                this.operateClose('form');
            },
        },
        data(){
            return {
                isSaveFinished:false,
                title:'新建栏目',
                form: {
                    title: '',
                    describe: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' },
                        { min: 1, max: 6, message: '栏目名称文字长度不能大于6个字符，请重新输入！', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    describe: [
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],

                },
                isEdit:false,
                id:'',
            }
        },
        mounted (){

        },
        watch:{
            editData(curVal,oldVal){

                console.log(!!curVal)
                if(curVal){
                    console.log(curVal)
                    //有值说明是编辑
                    this.title = "编辑栏目";
                    this.isEdit = true;
                    this.id = curVal.sid;
                    this.form.title = curVal.name;
                    this.form.describe = curVal.remark;
                }else{
                    console.log(curVal)
                    //无值说明是新建
                    this.title = "新建栏目";
                    this.isEdit = false;
                }
            },
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>

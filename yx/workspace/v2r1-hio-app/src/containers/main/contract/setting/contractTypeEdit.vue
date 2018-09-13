<template>
    <div>
        <!--右侧弹窗编辑合同类型-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled" @click="operateSave()" size="medium ">保存</el-button></li>
                    <li><el-button @click="operateClose()" size="medium ">关闭</el-button></li>
                </ul>
            </div>
            <div>
                <el-form label-position="right" label-width="120px" :model="detailData" :rules="rules" ref="refForm">
                    <el-form-item label="上级类型：" prop="parentId" v-if="detailData.parentId!=null">
                        <el-cascader  :options="treeData"  style="width: 600px" v-model="selectParentTypeIds" change-on-select
                                      expand-trigger="hover"　:props="typePropsConfig"></el-cascader>
                    </el-form-item>
                    <el-form-item label="类型名称：" prop="contractType">
                        <el-input v-model="detailData.contractType" style="width: 600px" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="类型备注："  prop="remark">
                        <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="1024"
                                  v-model="detailData.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    export default {
        name: "contract-type-edit",
        data(){
            return{
                title:"创建类型",
                btnDisabled:false,
                detailData:{
                    contractType:"",
                    parentId:"",
                    remark:""
                },
                rules: {
                    parentId:{  required: true,message: '请选择上级类型'},
                    contractType:[{  required: true,message: '类型名称不能为空'},
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                        ]
                },
                treeData:[],
                typePropsConfig:{
                    value:"sid",
                    label:"contractType",
                    children:"children"
                },
                selectParentTypeIds:[]
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            contractType:{
                required:true
            },
            treeNodeData:{}
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
        mounted(){
            // console.log("this.treeNodeData",this.treeNodeData)
            JZY.xhr.requestPromises([
                this.getContractTypeListData()
            ]).then(async ([])=>{
                // console.log(JSON.stringify(this.detailData.parentId))
                if(this.contractType!=""){
                    //修改
                    this.title="编辑类型";
                     this.selectParentTypeIds=this.treeNodeData.$extra.idPath.split("->");
                     this.selectParentTypeIds.pop();
                     if(this.selectParentTypeIds.length>0){
                         this.detailData.parentId=this.selectParentTypeIds[this.selectParentTypeIds.length-1]
                     }else{
                         this.detailData.parentId=null;
                     }
                     this.detailData.contractType=this.treeNodeData.contractType;
                     this.detailData.remark=this.treeNodeData.remark;

                }
            })

        },
        watch:{
            selectParentTypeIds(){
                if(this.detailData.parentId!=null){
                    this.detailData.parentId=this.selectParentTypeIds[this.selectParentTypeIds.length-1]
                }
            }
        },
        methods:{
            operateSave(){
                // console.log(this.detailData.parentId);
                this.$refs.refForm.validate(valid=> {
                    if (valid) {
                        let pas={
                            contractType:this.detailData.contractType,
                            parentId:this.detailData.parentId,
                            remark:this.detailData.remark,
                            // prefixId:this.selectParentTypeIds.join('-'),
                        }
                        if(this.contractType!=""){
                            //修改
                            pas.sid=this.contractType;
                            // console.log("ssss:"+JSON.stringify(pas))
                            this.commitAllData(pas,"/contract/contractType/update","update");
                        }else {
                            this.commitAllData(pas,"/contract/contractType/save","add");
                        }
                    }
                })
            },
            operateClose(){
                this.$emit("closeCreateModal");
            },
            async getContractTypeListData(){
                // let pas={contractType:this.searchName};
                await JZY.xhr.post('/contract/contractType/getContractTypeList',{},{alertSuccess:false}).then((resultData)=>{
                    // console.log("getContractTypeListData:"+JSON.stringify(resultData[0]))
                    try{
                        this.treeData=resultData[0];
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            async commitAllData(pas,url,type){
                this.btnDisabled=true;
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.btnDisabled=false;
                        this.$emit("closeCreateModal");
                        this.$emit("refushTableFun");
                    }catch (e){
                        this.btnDisabled=false;
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
        }
    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>
<template>
    <div>
        <!--右侧弹窗编辑角色-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled" @click="operateSave()" size="medium ">保存</el-button></li>
                    <li><el-button @click="operateClose()" size="medium ">关闭</el-button></li>
                </ul>
            </div>
            <div>
                <el-form label-position="right" label-width="120px" :model="detailData" :rules="rules" ref="refForm">
                    <el-form-item label="类型名称：" prop="contractChangeType">
                        <el-input v-model="detailData.contractChangeType" style="width: 600px" maxlength="50"></el-input>
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
        name: "change-type-edit",
        data(){
            return{
                title:"创建变更类型",
                btnDisabled:false,
                detailData:{
                    contractChangeType:"",
                    remark:""
                },
                rules: {
                    contractChangeType:[{required: true,message: '类型名称不能为空'},
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                },
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            changeTypeData:{
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
        mounted(){
            if(this.changeTypeData!=""){
                //修改
                this.title="编辑变更类型";
                this.detailData.contractChangeType=this.changeTypeData.contractChangeType;
                this.detailData.remark=this.changeTypeData.remark;
            }
        },
        methods:{
            operateSave(){
                this.$refs.refForm.validate(valid=> {
                    if (valid) {
                        let pas={
                            contractChangeType:this.detailData.contractChangeType,
                            remark:this.detailData.remark
                        }
                        if(this.changeTypeData!=""){
                            //修改
                            pas.sid=this.changeTypeData.sid;
                            // console.log("ssss:"+JSON.stringify(pas))
                            this.commitAllData(pas,"/contract/contractChangeType/update","update");
                        }else {
                            this.commitAllData(pas,"/contract/contractChangeType/save","add");
                        }
                    }
                })
            },
            operateClose(){
                this.$emit("closeCreateModal");
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
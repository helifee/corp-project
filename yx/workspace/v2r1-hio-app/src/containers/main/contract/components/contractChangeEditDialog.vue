<template>
    <div>
        <!--右侧弹窗编辑合同变更查看/新增/编辑-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <span v-if="editType=='look'">
                        <li>
                          <el-dropdown @command="handleCommandOperate" v-if="isShowOperate">
                              <el-button type="primary"  size="small" >
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                  </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="edit" v-if="contractAuth.contractUpdate">编辑</el-dropdown-item>
                                    <el-dropdown-item command="nullify" v-if="contractAuth.contractCancel">作废</el-dropdown-item>
                                      <el-dropdown-item command="lookFlow" v-if="contractAuth.contractSeeFlow">查看流程</el-dropdown-item>
                                    <el-dropdown-item command="del"  v-if="contractAuth.contractDelete">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                          </li>
                    </span>
                    <span v-else-if="editType=='edit' || editType=='add'">
                        <li><el-button :disabled="btnDisabled" @click="operateSave('commit')" >提交</el-button></li>
                        <li><el-button :disabled="btnDisabled" @click="operateSave('saveDraft')" >保存</el-button></li>
                    </span>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <contractChangeEdit :contractChangeId="contractChangeId"  :editType="editType" @contractAuthBackFun="contractAuthBackFun"
                                ref="refContractChangeEdit"  @saveBackFun="saveBackFun"  :contractData="contractData"></contractChangeEdit>
        </right-slide-modal>
    </div>
</template>

<script>
    import contractChangeEdit from './contractChangeEdit'
    export default {
        name: "contract-change-edit-dialog",
        components:{
            contractChangeEdit
        },
        data(){
            return{
                title:"变更查看",
                btnDisabled:false,
                contractAuth:{
                    contractUpdate:false,
                    contractCancel:false,
                    contractSeeLog:false,
                    contractDelete:false,
                    contractSeeFlow:false,
                },
                fiId:"",
                isShowOperate:false
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            editType:{
                required:true,   //look,edit,add
                default:"look"
            },
            contractChangeId:{},
            contractData:{},    //新增时要带过来一些合同的信息
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
            if(this.editType=="add"){
                this.title="创建变更"
            }else if(this.editType=="edit"){
                this.title="编辑变更"
            }else{
                this.title="变更查看"
            }
        },
        methods: {
            operateClose() {
                this.$emit("closeCreateModal");
            },
            contractAuthBackFun(contractAuth,contractPaymentFiId){
                this.contractAuth=contractAuth;
                this.fiId=contractPaymentFiId;
                this.isShowOperate=false;
                for ( let p in contractAuth ){
                    if(contractAuth[p]){
                        this.isShowOperate=true;
                    }
                    // console.log("p:",contractAuth[p])
                }
            },
            saveBackFun(type){
                this.btnDisabled=false;
                if(type=="success"){
                    this.$emit("closeCreateModal");
                    this.$emit("refushTableFun");
                }
            },
            handleCommandOperate(command){
                switch (command){
                    case "edit":
                        this.title="编辑变更"
                        this.$emit('update:editType', "edit");
                        break;
                    case "nullify":
                        this.$confirm('是否确定作废', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.nullifyContractChangeData(this.contractChangeId);
                        }).catch(() => {
                        });
                        break;
                    case "lookFlow":
                        this.$router.push("/approve/detail/"+this.fiId);
                        break;
                    case "del":
                        this.$confirm('此操作将删除当前合同变更信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.delContractChangeData(this.contractChangeId);
                        }).catch(() => {
                        });
                        break;
                }
            },
            operateSave(type){
                this.btnDisabled=true;
                this.$refs.refContractChangeEdit.operateSave(type);
            },
            async delContractChangeData(contractChangeId){
                await JZY.xhr.post('/contract/contractChange/delete',{sid:contractChangeId},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.$emit("closeCreateModal");
                        this.$emit("refushTableFun");
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            async nullifyContractChangeData(contractChangeId){
                await JZY.xhr.post('/contract/contractChange/updateStatus',{sid:contractChangeId,status:9},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.$emit("closeCreateModal");
                        this.$emit("refushTableFun");
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
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
<template>
    <div>
        <!--右侧弹窗编辑合同付款查看/新增/编辑-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <span v-if="editType=='look'">
                          <li>
                              <el-dropdown @command="handleCommandOperate" v-if="isShowOperate">
                              <!--<span class="el-dropdown-link">-->
                                <!--操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                              <!--</span>-->
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
            <contractPaymentEdit :contractPayId="contractPayId" :editType="editType" @contractAuthBackFun="contractAuthBackFun"
                             ref="refContractPaymentEdit"  @saveBackFun="saveBackFun"  :contractData="contractData"></contractPaymentEdit>
        </right-slide-modal>
        <!--右侧弹窗合同付款作废-->
        <contractBalance :dialogVisible="contractBalanceDialogVisible" v-if="contractBalanceDialogVisible" type="nullifyContractPay"
                         :contractId="contractPayId"  @closeCreateModal="closeContractBalanceDialog" @refushTableFun="saveBackFun"></contractBalance>
    </div>
</template>

<script>
    import contractPaymentEdit from './contractPaymentEdit'
    import contractBalance from './contractBalanceDialog'
    export default {
        name: "contract-payment-edit-dialog",
        components:{
            contractPaymentEdit,
            contractBalance
        },
        data(){
           return{
               title:"付款查看",
               btnDisabled:false,
               contractAuth:{
                   contractUpdate:false,
                   contractCancel:false,
                   contractSeeLog:false,
                   contractDelete:false,
                   contractSeeFlow:false,
               },
               fiId:"",
               contractBalanceDialogVisible:false,
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
            contractPayId:{},
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
                this.title="创建付款"
             }else if(this.editType=="edit"){
                 this.title="编辑付款"
             }else{
                 this.title="付款查看"
             }
        },
        methods: {
            operateClose() {
                this.$emit("closeCreateModal");
            },
            closeContractBalanceDialog(){
                this.contractBalanceDialogVisible=false;
            },
            handleCommandOperate(command){
                switch (command){
                    case "edit":
                        this.title="编辑付款"
                        this.$emit('update:editType', "edit");
                        break;
                    case "nullify":
                        // this.$emit("closeCreateModal");
                        // setTimeout(function () {
                            this.contractBalanceDialogVisible=true;
                        // },10)


                        // this.$confirm('是否确定作废', '提示', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     type: 'warning'
                        // }).then(() => {
                        //     this.nullifyContractPayData(this.contractPayId);
                        // }).catch(() => {
                        // });
                        break;
                    case "lookFlow":
                        this.$router.push("/approve/detail/"+this.fiId);
                        break;
                    case "del":
                        this.$confirm('此操作将删除当前合同付款信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.delContractPayData(this.contractPayId);
                        }).catch(() => {
                        });
                        break;
                }
            },
            contractAuthBackFun(contractAuth,contractPaymentFiId){
                this.contractAuth=contractAuth;
                this.fiId=contractPaymentFiId;
                this.isShowOperate=false;
                for ( let p in contractAuth ){
                    if(contractAuth[p]){
                        this.isShowOperate=true;
                    }
                }
            },
            saveBackFun(type){
                // console.log("kdkd")
                this.btnDisabled=false;
                if(type=="success"){
                    this.$emit("closeCreateModal");
                    this.$emit("refushTableFun");
                }
            },
            operateSave(type){
                this.btnDisabled=true;
                this.$refs.refContractPaymentEdit.operateSave(type);
            },
            async delContractPayData(contractPayId){
                await JZY.xhr.post('/contract/contractPayment/delete',{sid:contractPayId},{alertSuccess:true}).then((resultData)=>{
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
            // async nullifyContractPayData(contractPayId){
            //     await JZY.xhr.post('/contract/contractPayment/updateStatus',{sid:contractPayId,status:9},{alertSuccess:true}).then((resultData)=>{
            //         try{
            //             this.$emit("closeCreateModal");
            //             this.$emit("refushTableFun");
            //         }catch (e){
            //             this.$message(e);
            //         }
            //     }).catch((e)=>{
            //         //接口失败
            //     })
            // },
        }
    }
</script>

<style scoped>
    /*.el-dropdown-link {*/
        /*cursor: pointer;*/
        /*background: #fff;*/
        /*border: 1px solid #dcdfe6;*/
        /*color: #606266;*/
        /*height: 33px;*/
        /*margin-right: 20px;*/
        /*line-height: 33px;*/
        /*display: inline-block;*/
        /*padding: 1px 10px;*/
        /*border-radius: 3px;*/
    /*}*/
    .operate_buttons {
        float: right;
    }
</style>
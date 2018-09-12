<template>
    <div>
        <!--右侧弹窗编辑合同结算/做废-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled"  @click="operateSave()">保存</el-button></li>
                    <li><el-button @click="operateClose()">关闭</el-button></li>
                </ul>
            </div>
            <div>
                <el-form label-width="110px" label-position="right"  :model="balanceData" :rules="rules" ref="refBalance">
                    <el-form-item :label="fieldTitle" prop="logText">
                        <el-input type="textarea" :rows="9"  v-textarea-limiter maxlength="2500"
                                  v-model="balanceData.logText">
                        </el-input>
                    </el-form-item>
                    <!--<el-form-item label="结束时间：" prop="userName">-->
                        <!--<el-input  width="50%" v-model="balanceData.overTime" ></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="操作人：" prop="userName">-->
                        <!--<el-input width="50%" v-model="balanceData.userName" ></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    export default {
        name: "contract-balance-dialog",
        data(){
            return{
                btnDisabled:false,
                title:"合同结算",
                fieldTitle:"结算说明",
                balanceData:{
                    logText:"",
                    // overTime:moment(new Date()).Formate("YYYY-MM-DD"),
                    // userName:
                },
                rules:{
                    logText:[{required: true,message: '说明不能为空'},
                       { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }]
                }
            }
        },
          props:{
              dialogVisible:{
                  type:Boolean,
                      required:true
              },
              type:{
                  default:"balance"      //值为balance合同结算,balanceCancel合同取消结算，nullify合同作废,nullifyContractPay合同付款作废
              },
              contractId:{},   //nullifyContractPay时为合同付款id
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
            if(this.type=="nullify"){
                this.title="合同作废";
                this.fieldTitle="作废说明"
            }else if(this.type=="nullifyContractPay"){
                this.title="合同付款作废";
                this.fieldTitle="作废说明"
            }else if(this.type=="balanceCancel"){
                this.title="取消结算";
                this.fieldTitle="取消结算说明"
            }
        },
        methods:{
            operateClose() {
                this.$emit("closeCreateModal");
            },
            operateSave(){
                this.$refs.refBalance.validate((valid) => {
                    if (valid) {
                        let pas={sid:this.contractId,logText:this.balanceData.logText};
                        if(this.type=="nullify"){
                            pas.status=9;
                            this.commitAllData("/contract/contractInfo/updateStatus",pas)
                        }else if(this.type=="balance"){
                            pas.balanceStatus=2;
                            this.commitAllData("/contract/contractInfo/updateBalanceStatus",pas)
                        }else if(this.type=="nullifyContractPay"){
                            pas.status=9;
                            this.commitAllData("/contract/contractPayment/updateStatus",pas)
                        }else if(this.type=="balanceCancel"){
                            pas.balanceStatus=0;
                            this.commitAllData("/contract/contractInfo/updateBalanceStatus",pas)
                        }
                    } else {
                        return false;
                    }
                })
            },
            async commitAllData(url,pas){
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        // this.refushTableFun();
                        this.$emit("closeCreateModal");
                        this.$emit("refushTableFun","success");
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

</style>
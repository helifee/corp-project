<template>
    <div class="contractDetail" v-loading="loading">
        <div class="bx_title">
            <div class="contractTitle"><span class="titleName" :title="detailData.title">{{detailData.title}}</span>
                <span style="color: #F35959">{{handleBillStatus(detailData.status)}}</span>
                <span v-if="detailData.fiId!=null" style="padding-left: 10px">数据来自审批应用</span>
            </div>
            <div class="clear_float">
                <el-dropdown @command="handleCommandOperate" >
                  <!--<span class="el-dropdown-link">-->
                    <!--操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</span>-->
                    <el-button type="primary"  size="small" class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit" v-if="detailData.contractAuth.contractUpdate">编辑</el-dropdown-item>
                        <el-dropdown-item command="balance" v-if="detailData.contractAuth.contractBalance">结算</el-dropdown-item>
                        <el-dropdown-item command="balanceCancel" v-if="detailData.contractAuth.contractBalanceCancel">取消结算</el-dropdown-item>
                        <el-dropdown-item command="nullify" v-if="detailData.contractAuth.contractCancel">作废</el-dropdown-item>
                        <el-dropdown-item command="lookLog" v-if="detailData.contractAuth.contractSeeLog">查看日志</el-dropdown-item>
                        <el-dropdown-item command="lookFlow" v-if="detailData.contractAuth.contractSeeFlow">查看流程</el-dropdown-item>
                        <el-dropdown-item command="del"  v-if="detailData.contractAuth.contractDelete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button @click="operateClose()" size="small">返回</el-button>
            </div>
        </div>
        <div class="detail_content">
                <el-row>
                    <el-col :span="5" class="item">
                        <label >合同类型:</label><span :title="detailData.contractTypeName">{{detailData.contractTypeName}}</span>
                    </el-col>
                    <el-col :span="7" class="item">
                        <label >乙方单位:</label><span :title="detailData.secondParty">{{detailData.secondParty}}</span>
                    </el-col>
                    <el-col :span="7" class="item">
                        <label >合同总金额/元:</label><span >￥{{formatMoneyDisplay(detailData.money)}}</span>
                    </el-col>
                    <el-col :span="5" class="item">
                        <label >累计付款金额/元:</label><span >￥{{formatMoneyDisplay(detailData.sumPaymentMoney)}}</span>
                    </el-col>
                    <el-col :span="2" style="float: right;">
                        <el-button type="text" v-if="!contractDetailShow" @click="handleDetailSpread">
                            <i class="el-icon-circle-check"></i>查看详情</el-button>
                    </el-col>
                </el-row>
            <div v-show="contractDetailShow">
                <el-row>
                    <el-col :span="5" class="item">
                        <label >合同编号:</label><span :title="detailData.code">{{detailData.code}}</span>
                    </el-col>
                    <el-col :span="7" class="item">
                        <label >甲方单位:</label><span :title="detailData.firstParty">{{detailData.firstParty}}</span>
                    </el-col>
                    <el-col :span="7" class="item">
                        <label >收款单位:</label><span :title="detailData.payee">{{detailData.payee}}</span>
                    </el-col>
                    <el-col :span="5" class="item">
                        <label >累计变更金额:</label><span >￥{{formatMoneyDisplay(detailData.sumChangeMoney)}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" class="item">
                        <label >签订日期:</label><span >{{detailData.signingDate}}</span>
                    </el-col>
                    <el-col :span="7" class="item">
                        <label >开始时间:</label><span >{{detailData.startDate}}</span>
                    </el-col>
                    <el-col :span="7" class="item">
                        <label >结束时间:</label><span >{{detailData.endDate}}</span>
                    </el-col>
                    <el-col :span="5" class="item">
                        <label >结算状态:</label><span >{{handleBalanceStatus(detailData.balanceStatus)}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" class="item">
                        <label >经办人:</label><span >{{detailData.operatorName}}</span>
                    </el-col>
                    <el-col :span="5" class="item">
                        <label >经办部门:</label><span >{{detailData.operatorDeptName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="item1">
                        <label style="color: #999999;">合同摘要:</label>
                    </el-col>
                    <el-col :span="20" >
                         <span v-html="detailData.summary" class="uedit-content-contract">
                            <!--<UEditor id="contractDetailUE"  @ready="testOpen" :config="UEconfig" ref="UEditor" style="line-height: 24px"></UEditor>-->
                        </span>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="item1">
                        <label style="color: #999999;">付款约定:</label>
                    </el-col>
                    <el-col :span="20" class="item1">
                        <pre >{{detailData.paymentAgreement}}</pre>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="item1">
                        <label style="color: #999999;">其      他:</label>
                    </el-col>
                    <el-col :span="20" class="item1">
                        <pre >{{detailData.remark}}</pre>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" class="itemAttachment">
                        <label >附件:</label>
                        <attach-upload v-if="showAttachment" :appId="attachmentPK.appId" :readonly="true"
                                    ref="contractDetailAttach"   :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                    </el-col>
                </el-row>
                <div class="itemBottom">
                    <el-button type="text" @click="handleDetailClose">
                        <i class="el-icon-circle-check"></i>收起</el-button>
                </div>
            </div>
        </div>
        <div class="bx_space"></div>
        <div>
            <!--<span class="zfCheckbox">-->
                <!--<el-checkbox v-model="nullifyCheck">不显示作废数据</el-checkbox>-->
            <!--</span>-->
            <el-tabs v-model="activeName" style="padding: 10px 24px" @tab-click="handleTabClick">
                <el-tab-pane label="  付款  " name="first">
                    <contractPayment :contractData="detailData" :contractId="$route.params.id" ref="refContractPaymentList"
                                     :nullifyCheck="nullifyCheck" @refushTableFun="refushTableFun"></contractPayment>
                </el-tab-pane>
                <el-tab-pane label="  变更  " name="second" >
                    <contractChange :contractData="detailData" :contractId="$route.params.id" ref="refContractChangeList"
                                    :nullifyCheck="nullifyCheck" @refushTableFun="refushTableFun"></contractChange>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--右侧弹窗创建/编辑合同-->
        <contractEditDialog :dialogVisible="contractEditDialogVisible" v-if="contractEditDialogVisible"
                      :contractId="contractId"  @refushTableFun="refushTableFun" @closeCreateModal="closeContractEditDialog"></contractEditDialog>
        <!--右侧弹窗合同日志-->
        <contractLog :dialogVisible="contractLogDialogVisible" v-if="contractLogDialogVisible"
                     :contractId="contractId"  @closeCreateModal="closeContractLogDialog"></contractLog>
        <!--右侧弹窗合同结算/作废-->
        <contractBalance :dialogVisible="contractBalanceDialogVisible" v-if="contractBalanceDialogVisible" :type="oprateType"
                     :contractId="contractId"  @closeCreateModal="closeContractBalanceDialog" @refushTableFun="refushTableFun"></contractBalance>
    </div>
</template>

<script>
    // import UEditor from '@/components/UEditor.vue'
    import contractPayment from  './contractPayment'
    import contractChange from './contractChange'
    import contractEditDialog from './contractEditDialog'
    import contractLog from './contractLog'
    import contractUtil from '../contract.util'
    import contractBalance from './contractBalanceDialog'
    export default {
        name: "contract-detail",
        components:{
            // UEditor,
            contractPayment,
            contractChange,
            contractEditDialog,
            contractLog,
            contractBalance
        },
        data(){
            return{
                contractDetailShow:false,
                detailData:{
                    sid:"",
                    title:"",
                    contractTypeId:"",
                    contractTypeName:"",
                    code:"",
                    firstParty:"",
                    secondParty:"",
                    payee:"",
                    startDate:"",
                    endDate:"",
                    money:"",
                    signingDate:"",
                    operatorId:"",
                    operatorName:"",
                    operatorDeptId:"",
                    operatorDeptName:"",
                    sumChangeMoney:"",
                    summary:"",
                    paymentAgreement:"",
                    remark:"",
                    contractAuth:{
                        contractUpdate:false,
                        contractBalance:false,
                        contractBalanceCancel:false,
                        contractSeeLog:false,
                        contractDelete:false,
                        contractSeeFlow:false,
                        contractCancel:false,
                    }
                },
                // UEconfig:{
                //     initialFrameWidth :null,//设置编辑器宽度
                //     initialFrameHeight:200,//设置编辑器高度
                //     // 设置不自动调整高度
                //     scaleEnabled:false//不可以拉伸
                // },
                activeName: 'first',
                contractEditDialogVisible:false,
                contractId:"",
                showAttachment:false,
                attachmentPK:{
                    appId:"",
                    businessId:"",
                    categoryId:""
                },
                contractLogDialogVisible:false,
                loading:true,
                nullifyCheck:false,
                contractBalanceDialogVisible:false,
                oprateType:"",
            }
        },
        mounted(){
            // JZY.xhr.requestPromises([
            //     JZY.xhr.r('/contract/contractInfo/get/'+this.$route.params.id),
            // ]).then(async ([contractDetailData])=>{
            //     this.detailData=contractDetailData[0];
            // })
            this.refushTableFun();
        },
        methods:{
            formatMoneyDisplay(money){
                return contractUtil.transformMoneyFormat(money);
            },
            operateClose(){
                this.$router.push("/contract")
            },
            closeContractEditDialog(){
                this.contractEditDialogVisible=false;
            },
            closeContractBalanceDialog(){
                this.contractBalanceDialogVisible=false;
            },
            handleTabClick(item){
                // console.log("handleTabClick",item.label,item.index)
                if(item.index==0){
                    this.$refs.refContractPaymentList.refushTableOnlySelf();
                }else if(item.index==1){
                    this.$refs.refContractChangeList.refushTableOnlySelf();
                }
            },
            handleCommandOperate(command){
                switch (command){
                    case "edit":
                        this.contractId=this.detailData.sid;
                        this.contractEditDialogVisible=true;
                        break;
                    case "balance":
                        this.contractId=this.detailData.sid;
                        this.oprateType="balance";
                        this.contractBalanceDialogVisible=true;
                        // this.balanceContract(this.detailData.sid);
                        break;
                    case "balanceCancel":
                        this.contractId=this.detailData.sid;
                        this.oprateType="balanceCancel";
                        this.contractBalanceDialogVisible=true;
                        break;
                    case "nullify":
                        this.contractId=this.detailData.sid;
                        this.oprateType="nullify";
                        this.contractBalanceDialogVisible=true;
                        // this.$confirm('是否确定作废', '提示', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     type: 'warning'
                        // }).then(() => {
                        //     this.nullifyContract(this.detailData.sid);
                        // }).catch(() => {
                        // });
                        break;
                    case "lookFlow":
                        this.$router.push("/approve/detail/"+this.detailData.fiId);
                        break;
                    case "lookLog":
                        this.contractId=this.detailData.sid;
                        this.contractLogDialogVisible=true;
                        break;
                    case "del":
                        this.$confirm('此操作将删除当前合同变更信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.delContractData(this.detailData.sid);
                        }).catch(() => {
                        });
                        break;
                }
            },
            // testOpen(){
            //     this.$nextTick(()=>{
            //         this.$refs.UEditor.setContent(this.detailData.summary);
            //     })
            // },
            refushTableFun(){
                // debugger
                this.loading=true;
                JZY.xhr.requestPromises([
                    // JZY.xhr.r('/contract/contractInfo/get/'+this.$route.params.id),
                    JZY.xhr.post('/contract/contractInfo/getContractInfo',{sid:this.$route.params.id,isApproveQuery:0},{alertSuccess:false}),
                ]).then(async ([contractDetailData])=>{
                    this.detailData=contractDetailData[0];
                    this.showAttachment=true;
                    this.attachmentPK=contractDetailData[0].fileIdDto;
                    // this.$nextTick(()=>{
                    //     this.$refs.UEditor.setContent(this.detailData.summary);
                    // })
                    this.$refs.contractDetailAttach.getFilesList();
                    // $refs.attachUpload.getFilesList();
                    this.loading=false;
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            closeContractLogDialog(){
                this.contractLogDialogVisible=false;
            },
            handleBillStatus(val){
                switch(val){
                    case 0:return "未生效";
                    case 2:return "已生效";
                    case 9:return "作废";
                }
            },
            handleBalanceStatus(val){
                switch(val){
                    case 0:return "未结算";
                    case 2:return "已结算";
                }
            },
            handleDetailSpread(){
                this.contractDetailShow=true
            },
            handleDetailClose(){
                this.contractDetailShow=false
            },
            async delContractData(contractId){
                await JZY.xhr.post('/contract/contractInfo/delete',{sid:contractId},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.$router.push("/contract");
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            async nullifyContract(contractId){
                await JZY.xhr.post('/contract/contractInfo/updateStatus',{sid:contractId,status:9},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.refushTableFun();
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            // async balanceContract(contractId){
            //     await JZY.xhr.post('/contract/contractInfo/updateBalanceStatus',{sid:contractId},{alertSuccess:true}).then((resultData)=>{
            //         try{
            //             this.refushTableFun();
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

<style   lang="scss">
    @import '../contract.uedit.scss';
.contractDetail{
    /*font-size: 13px;*/
    .bx_title{
        padding: 20px 0 15px 0;
        border-bottom: 1px solid #eeeeee;
        margin: 0 24px;
        .contractTitle{
            float: left;
            width: calc( 100% - 220px);
            padding-top: 10px;
        }
        .titleName{
            font-size: 14px;
            margin-right:10px;
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: calc(100% - 200px);
            vertical-align: bottom;
        }
        .clear_float{
            overflow: hidden;
            text-align: right;
            width: 220px;
            .el-dropdown-link {
                /*cursor: pointer;*/
                /*background: #fff;*/
                /*border: 1px solid #dcdfe6;*/
                /*color: #606266;*/
                /*height: 28px;*/
                margin-right: 10px;
                /*line-height: 28px;*/
                /*display: inline-block;*/
                /*padding: 1px 10px;*/
                /*border-radius: 3px;*/
            }
        }
    }
    .bx_space{
        height: 20px;
        background: whitesmoke;
    }
    .detail_content{
        padding:24px;
        .item{
            max-width: 300px;
            overflow: hidden;
            height: 17px;
            margin: 12px 0;
            label{
                color: #999999;
            }
            span{
                overflow: hidden;
                display: inline-block;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: calc(100% - 100px);
                vertical-align: top;
            }
        }
        .item1{
            /*height: 17px;*/
            margin: 12px 0;
            label{
                color: #999999;
            }
        }
        .itemBottom{
            text-align: center;
            border-top: 1px solid #eeeeee;
        }
        .itemAttachment{
            margin-top: 12px;
            label{
                color: #999999;
            }
        }
    }
    .zfCheckbox{
        float: right;
        padding: 20px 20px 9px 0;
        border-bottom: 2px #F0F2F3 solid;
        display: inline-block;
    }
}
</style>
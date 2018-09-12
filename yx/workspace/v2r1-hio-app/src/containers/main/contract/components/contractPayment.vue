<template>
    <div class="contractPayment">
        <el-row class="search">
            <el-col :span="16">
                <span>合同付款主题</span>
                <el-input size="medium" placeholder="请输入合同付款主题"  v-model="searchForm.title"
                          style="width: 300px;margin: 0 20px"></el-input>
                <el-button 　type="primary"  size="small" @click="handlerQueryPay">查询</el-button>
                <el-button  size="small" @click="handlerReset">重置</el-button>
            </el-col>
            <el-col :span="8" class="add-news">
                <el-button 　type="primary"  size="small" @click="handlerCreatePay" :disabled="contractData.status!=2 || contractData.balanceStatus==2">
                    <i class="el-icon-plus"></i> 创建付款
                </el-button>
            </el-col>
        </el-row>
        <div>
            <el-table :data="tableData"   size="medium" v-loading="loading"
                      :header-cell-style="{'color':'#333333','background-color': 'rgba(250, 250, 250, 1)','font-weight': '650'}">
                <el-table-column prop="theme" label="合同付款主题"  width="200">
                    <template slot-scope="scope">
                        <span @click="handleLookPayment(scope.row)" style="cursor: pointer;">
                            <span class="icon_yuan bg_1" v-if="scope.row.fiId!=null" title="数据来自审批应用">审</span>
                            <span class="itemTitle" :title="scope.row.title"> {{ scope.row.title}}</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="单据状态" width="100">
                    <template slot-scope="scope">
                        <span v-text="handleBillStatus(scope.row.status)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="payee"  show-overflow-tooltip label="收款单位"></el-table-column>
                <el-table-column prop="paymentMoney" label="付款金额/元" width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.paymentMoney)}}
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="合同总金额/元" width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.money)}}
                    </template>
                </el-table-column>
                <el-table-column prop="operatorName" label="经办人" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operatorDeptName"  show-overflow-tooltip label="经办部门" width="100"></el-table-column>
                <el-table-column prop="paymentDate" label="付款时间" width="140"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <i class="operation el-icon-edit-outline" v-if="scope.row.contractAuth.contractUpdate" title="编辑"
                           @click="handleContractPayEdit(scope.$index,scope.row)"></i>
                        <i class="operation el-icon-circle-close-outline" v-if="scope.row.contractAuth.contractCancel" title="作废"
                           @click="handleContractPayNullify(scope.$index,scope.row)"></i>
                        <i class="operation el-icon-delete" v-if="scope.row.contractAuth.contractDelete" title="删除"
                           @click="handleContractPayDel(scope.$index,scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.pageNum"
                    :page-sizes="[10,20, 50,100]"
                    :page-size="searchForm.pageCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="searchForm.dataTotal"
                    style="margin-top: 40px;text-align: center;">
            </el-pagination>
        </div>
        <!--右侧弹窗编辑合同付款查看/新增/编辑-->
        <contractPaymentEditDialog :dialogVisible="contractPayEditDialogVisible" v-if="contractPayEditDialogVisible" :contractPayId="contractPayId"
                         :editType.sync="contractPayEditType"  @refushTableFun="refushTableFun" :contractData="contractData"
                         @closeCreateModal="closeContractPayEditDialog"></contractPaymentEditDialog>
        <!--右侧弹窗合同付款作废-->
        <contractBalance :dialogVisible="contractBalanceDialogVisible" v-if="contractBalanceDialogVisible" type="nullifyContractPay"
                         :contractId="contractPayId"  @closeCreateModal="closeContractBalanceDialog" @refushTableFun="refushTableFun"></contractBalance>
    </div>
</template>

<script>
    import contractPaymentEditDialog from './contractPaymentEditDialog'
    import contractUtil from '../contract.util'
    import contractBalance from './contractBalanceDialog'
    export default {
        name: "contract-payment",
        components:{
            contractPaymentEditDialog,
            contractBalance
        },
        props:{
            contractId:{},
            contractData:{},
            nullifyCheck:{}
        },
        data(){
            return{
                searchForm: {
                    title: '',
                    pageTotal:0,   //总页数
                    pageNum:1,      //当前页数
                    pageCount:10, //分页大小,每页多少条
                    dataTotal:0,   //数据总条数
                },
                tableData:[],
                loading:true,
                contractPayEditDialogVisible:false,
                contractPayId:"",
                contractPayEditType:"",
                pagination:false,
                contractBalanceDialogVisible:false
            }
        },
        mounted(){
            this.getContractPaymentListData();
        },
        methods:{
            formatMoneyDisplay(money){
                return contractUtil.transformMoneyFormat(money,true);
            },
            handleSizeChange(val) {
                this.searchForm.pageCount=val;
                this.getContractPaymentListData();
            },
            handleCurrentChange(val) {
                this.searchForm.pageNum=val;
                this.getContractPaymentListData();
            },
            handlerQueryPay(){
                this.searchForm.pageNum=1;
                this.getContractPaymentListData();
            },
            handlerReset(){
                this.searchForm.title="";
            },
            handlerCreatePay(){
                // if(!this.contractData.contractAuth.contractAddPayment){
                //     JZY.u.errorMsg(this.contractData.contractAuth.contractAddPaymentErrorMsg);
                //     return;
                // }
                // this.contractPayId="";
                // this.contractPayEditType="add";
                // this.contractPayEditDialogVisible=true;
                this.checkBeforeAddPaymentOrChange();
            },
            handleLookPayment(row){
                this.contractPayId=row.sid;
                this.contractPayEditType="look";
                this.contractPayEditDialogVisible=true;
            },
            closeContractPayEditDialog(){
                this.contractPayEditDialogVisible=false;
            },
            handleContractPayEdit(index,row){
                this.contractPayId=row.sid;
                this.contractPayEditType="edit";
                this.contractPayEditDialogVisible=true;
            },
            closeContractBalanceDialog(){
                this.contractBalanceDialogVisible=false;
            },
            handleContractPayNullify(index,row){
                this.contractPayId=row.sid;
                this.contractBalanceDialogVisible=true;
               // alert("作废付款")
               //  this.$confirm('是否确定作废', '提示', {
               //      confirmButtonText: '确定',
               //      cancelButtonText: '取消',
               //      type: 'warning'
               //  }).then(() => {
               //      this.nullifyContractPayData(row.sid);
               //  }).catch(() => {
               //  });
            },
            handleContractPayDel(index,row){
                this.$confirm('此操作将删除当前合同付款信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delContractPayData(row.sid);
                }).catch(() => {
                });
            },
            handleBillStatus(val){
                switch(val){
                    case 0:return "未生效";
                    case 2:return "已生效";
                    case 9:return "作废";
                }
            },
            refushTableOnlySelf(){
                this.searchForm.pageNum=1;
                this.getContractPaymentListData();
            },
            refushTableFun(){
                this.searchForm.pageNum=1;
                this.$emit("refushTableFun");
                this.getContractPaymentListData();
            },
            async checkBeforeAddPaymentOrChange(){
                //核查是否可创建付款 1-新增付款 2-新增变更
                await JZY.xhr.post('/contract/contractInfo/checkBeforeAddPaymentOrChange',{sid:this.contractId,addType:1},{alertSuccess:false}).then((resultData)=>{
                    this.contractPayId="";
                    this.contractPayEditType="add";
                    this.contractPayEditDialogVisible=true;
                }).catch((e)=>{
                    //接口失败
                })
            },
            async getContractPaymentListData(){
                this.loading=true;
                let pas={pageNum:this.searchForm.pageNum,pageCount:this.searchForm.pageCount,
                    title:this.searchForm.title,
                    contractId:this.contractId,
                    noCancel:this.nullifyCheck==false?"":'true'
                };
                await JZY.xhr.post('/contract/contractPayment/page',pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("getContractListData:"+JSON.stringify(resultData))
                    try{
                        this.tableData=resultData[0].list;
                        this.loading=false;
                        this.searchForm.pageTotal=resultData[0].pageTotal;
                        this.searchForm.pageNum=resultData[0].pageNum;
                        this.searchForm.dataTotal=resultData[0].total;
                        this.pagination=this.searchForm.dataTotal==0?false:true;
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            async delContractPayData(contractPayId){
                this.loading=true;
                await JZY.xhr.post('/contract/contractPayment/delete',{sid:contractPayId},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.loading=false;
                        this.refushTableFun();
                        // this.tableData.forEach((item,index)=>{
                        //     if(item.sid==contractPayId){
                        //         this.tableData.splice(index,1)
                        //     }
                        // })
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            // async nullifyContractPayData(contractPayId){
            //     await JZY.xhr.post('/contract/contractPayment/updateStatus',{sid:contractPayId,status:9},{alertSuccess:true}).then((resultData)=>{
            //         try{
            //             // this.$emit("closeCreateModal");
            //             // this.$emit("refushTableFun");
            //             this.tableData.forEach((item,index)=>{
            //                 if(item.sid==contractPayId){
            //                     item.contractAuth.contractCancel=false;
            //                 }
            //             })
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

<style scoped lang="scss">
    .contractPayment{
        .search{
            padding: 10px 0;
            .add-news{
                text-align: right;
                padding: 5px 0 0 0;
            }
        }
    }
    .el-table {
        .operation {
            color: #409EFF;
            cursor: pointer;
            margin-right: 3px;
        }
        .icon_yuan {
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 50%;
            display: inline-block;
            color: #fff;
            margin: 10px 5px 0 0;
            float: left;
            &.bg_0 {
                background-color: #f00; //红
            }
            &.bg_1 {
                background-color: #46a7ff; //蓝
            }
        }
        .itemTitle{
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 150px;
            float: left;
        }
    }

</style>
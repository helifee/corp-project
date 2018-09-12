<template>
    <div class="contractChange">
        <el-row class="search">
            <el-col :span="18">
                <span>合同变更主题</span>
                <el-input size="medium" placeholder="请输入合同变更主题"  v-model="searchForm.title"
                          style="width: 300px;margin: 0 10px"></el-input>
                <span>变更类型</span>
                <el-select v-model="searchForm.changeType" placeholder="请选择变更类型" size="medium"
                           popper-class="changeTypeCss" style="margin-right: 10px" >
                    <el-option v-for="item in changeTypeData"
                               :label="item.contractChangeType" :value="item.sid" :key="item.sid"></el-option>
                </el-select>
                <el-button 　type="primary"  size="small" @click="handlerQueryPay">查询</el-button>
                <el-button  size="small" @click="handlerReset">重置</el-button>
            </el-col>
            <el-col :span="6" class="add-news">
                <el-button 　type="primary"  size="small" @click="handlerCreateChange" :disabled="contractData.status!=2 || contractData.balanceStatus==2">
                    <i class="el-icon-plus"></i> 创建变更
                </el-button>
            </el-col>
        </el-row>
        <div>
            <el-table :data="tableData"   size="medium" v-loading="loading"
                      :header-cell-style="{'color':'#333333','background-color': 'rgba(250, 250, 250, 1)','font-weight': '650'}">
                <el-table-column prop="theme" label="合同变更主题" width="200">
                    <template slot-scope="scope">
                        <span @click="handleLookChange(scope.row)" style="cursor: pointer;">
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
                <el-table-column prop="changeType" label="变更类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="changeMoney" label="本次变更金额" width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.changeMoney)}}
                    </template>
                </el-table-column>
                <el-table-column prop="newMoney" label="变更后合同金额" width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.newMoney)}}
                    </template>
                </el-table-column>
                <el-table-column prop="operatorName" label="经办人" width="110" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operatorDeptName" label="经办部门" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createDate" label="变更时间" width="160"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <i class="operation el-icon-edit-outline" v-if="scope.row.contractAuth.contractUpdate" title="编辑"
                           @click="handleContractChangeEdit(scope.$index,scope.row)"></i>
                        <i class="operation el-icon-circle-close-outline" v-if="scope.row.contractAuth.contractCancel" title="作废"
                           @click="handleContractChangeNullify(scope.$index,scope.row)"></i>
                        <i class="operation el-icon-delete" v-if="scope.row.contractAuth.contractDelete"  title="删除"
                           @click="handleContractChangeDel(scope.$index,scope.row)"></i>
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
        <!--右侧弹窗编辑合同变更查看/新增/编辑-->
        <contractChangeEditDialog :dialogVisible="contractChangeEditDialogVisible" v-if="contractChangeEditDialogVisible"
                            :contractChangeId="contractChangeId" :editType.sync="contractChangeditType"  @refushTableFun="refushTableFun"
                            :contractData="contractData" @closeCreateModal="closeContractChangeEditDialog"></contractChangeEditDialog>
    </div>
</template>

<script>
    import contractChangeEditDialog from './contractChangeEditDialog'
    import contractUtil from '../contract.util'
    export default {
        name: "contract-change",
        components:{
            contractChangeEditDialog
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
                    changeType:"",
                    pageTotal:0,   //总页数
                    pageNum:1,      //当前页数
                    pageCount:10, //分页大小,每页多少条
                    dataTotal:0,   //数据总条数
                },
                tableData:[],
                loading:true,
                contractChangeEditDialogVisible:false,
                contractChangeId:"",
                contractChangeditType:"",
                changeTypeData:[],
                pagination:false,
            }
        },
        mounted(){

            JZY.xhr.requestPromises([
                JZY.xhr.post('/contract/contractChangeType/getContractChangeTypeList',{},{alertSuccess:false}),
                this.getContractChangeListData()
            ]).then(async ([changeTypeList])=>{
                this.changeTypeData=changeTypeList[0];
                this.changeTypeData.unshift({contractChangeType:"全部",sid:""})
            })
        },
        methods:{
            formatMoneyDisplay(money){
                return contractUtil.transformMoneyFormat(money,true);
            },
            handleSizeChange(val) {
                this.searchForm.pageCount=val;
                this.getContractChangeListData();
            },
            handleCurrentChange(val) {
                this.searchForm.pageNum=val;
                this.getContractChangeListData();
            },
            handlerQueryPay(){
                this.searchForm.pageNum=1;
                this.getContractChangeListData();
            },
            handlerReset(){
                this.searchForm.title="";
                this.searchForm.changeType="";
            },
            handlerCreateChange(){
                // if(!this.contractData.contractAuth.contractAddChange){
                //     JZY.u.errorMsg(this.contractData.contractAuth.contractAddChangeErrorMsg);
                //     return;
                // }
                // this.contractChangeId="";
                // this.contractChangeditType="add";
                // this.contractChangeEditDialogVisible=true;
                this.checkBeforeAddPaymentOrChange();
            },
            closeContractChangeEditDialog(){
                this.contractChangeEditDialogVisible=false;
            },
            handleContractChangeEdit(index,row){
                this.contractChangeId=row.sid;
                this.contractChangeditType="edit";
                this.contractChangeEditDialogVisible=true;
            },
            handleContractChangeNullify(index,row){
                this.$confirm('是否确定作废', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.nullifyContractChangeData(row.sid);
                }).catch(() => {
                });
            },
            handleContractChangeDel(index,row){
                this.$confirm('此操作将删除当前合同变更信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delContractChangeData(row.sid);
                }).catch(() => {
                });
            },
            handleLookChange(row){
                this.contractChangeId=row.sid;
                this.contractChangeditType="look";
                this.contractChangeEditDialogVisible=true;
            },
            refushTableOnlySelf(){
                this.searchForm.pageNum=1;
                this.getContractChangeListData();
            },
            refushTableFun(){
                this.$emit("refushTableFun");
                this.searchForm.pageNum=1;
                this.getContractChangeListData();
            },
            handleBillStatus(val){
                switch(val){
                    case 0:return "未生效";
                    case 2:return "已生效";
                    case 9:return "作废";
                }
            },
            async checkBeforeAddPaymentOrChange(){
                //核查是否可创建付款 1-新增付款 2-新增变更
                await JZY.xhr.post('/contract/contractInfo/checkBeforeAddPaymentOrChange',{sid:this.contractId,addType:2},{alertSuccess:false}).then((resultData)=>{
                    this.contractChangeId="";
                    this.contractChangeditType="add";
                    this.contractChangeEditDialogVisible=true;
                }).catch((e)=>{
                    //接口失败
                })
            },
            async getContractChangeListData(){
                this.loading=true;
                let pas={pageNum:this.searchForm.pageNum,pageCount:this.searchForm.pageCount,
                    title:this.searchForm.title,
                    changeTypeId:this.searchForm.changeType,
                    contractId:this.contractId,
                    noCancel:this.nullifyCheck==false?"":'true'
                };
                await JZY.xhr.post('/contract/contractChange/getChangePageByContractId',pas,{alertSuccess:false}).then((resultData)=>{
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
            async delContractChangeData(contractChangeId){
                this.loading=true;
                await JZY.xhr.post('/contract/contractChange/delete',{sid:contractChangeId},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.loading=false;
                       this.refushTableFun();
                        // this.tableData.forEach((item,index)=>{
                        //     if(item.sid==contractChangeId){
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
            async nullifyContractChangeData(contractChangeId){
                this.loading=true;
                await JZY.xhr.post('/contract/contractChange/updateStatus',{sid:contractChangeId,status:9},{alertSuccess:true}).then((resultData)=>{
                        this.loading=false;
                        this.refushTableFun();
                        // this.tableData.forEach((item,index)=>{
                        //     if(item.sid==contractChangeId){
                        //         item.contractAuth.contractCancel=false;
                        //     }
                        // })
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
        }
    }
</script>

<style  lang="scss">
    .changeTypeCss{
        .el-select-dropdown__list, .el-popper .el-cascader-menu{
            width:178px;
        }
    }
    .contractChange{
        .search{
            padding: 10px 0;
            .add-news{
                text-align: right;
                padding: 5px 0 0 0;
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
    }
</style>
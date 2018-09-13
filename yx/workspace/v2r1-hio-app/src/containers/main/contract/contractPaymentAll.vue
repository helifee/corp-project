<template>
    <div class="contractPaymentAll">
        <el-row  class="bx_title">
            <el-col :span="12"><p>付款台账</p></el-col>
            <el-col :span="12" class="clear_float">
                <el-button type="primary" size="small" @click="handleExportAllData">全部导出</el-button>
            </el-col>
        </el-row>
        <div class="search_content">
            <el-form label-position="right" :inline="true" label-width="85px" :model="searchForm" size="small">
                <el-form-item label="付款主题">
                    <el-input v-model="searchForm.title" placeholder="请输入付款主题" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="合同类型">
                    <el-cascader  :options="contractTypeTreeData"  v-model="selectContractTypeIdPath" change-on-select
                                  expand-trigger="hover" :show-all-levels="false"　:props="typePropsConfig" placeholder="请选择合同类型"
                                  style="width: 200px"></el-cascader>
                </el-form-item>
                <el-form-item label="合同签订日期" >
                    <el-date-picker  v-model="searchForm.signTime" value-format="yyyy-MM-dd"
                                     type="daterange" range-separator="~" start-placeholder="开始日期"
                                     end-placeholder="结束日期" style="width: 200px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同主题" v-show="searchDetail">
                    <el-input v-model="searchForm.contractTitle" placeholder="请输入合同主题" style="width: 200px"></el-input>
                    <!--<el-select v-model="searchForm.changeType" placeholder="请选择变更类型" style="width: 200px">-->
                    <!--<el-option v-for="item in changeTypeData"-->
                    <!--:label="item.contractChangeType" :value="item.sid" :key="item.sid"></el-option>-->
                    <!--</el-select>-->
                </el-form-item>
                <el-form-item label="收款单位" v-show="searchDetail">
                    <el-input v-model="searchForm.payee" placeholder="请输入收款单位" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="单据状态" v-show="searchDetail">
                    <el-select v-model="searchForm.billStatus" placeholder="请选择付款单据状态" style="width: 200px">
                        <el-option v-for="item in billStatusData"
                                   :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="结算状态" v-show="searchDetail">-->
                    <!--<el-select v-model="searchForm.payStatus" placeholder="请选择结算状态" style="width: 200px">-->
                        <!--<el-option v-for="item in payStatusData"-->
                                   <!--:label="item.label" :value="item.value" :key="item.value"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="经办部门" v-show="searchDetail">
                    <el-button style="width:200px;text-align:left;height:33px" plain
                               @click="handlerSeleDep">{{searchForm.operatorDeptName}}</el-button>
                </el-form-item>
                <el-form-item label="付款日期" v-show="searchDetail">
                    <el-date-picker  v-model="searchForm.paymentDate" value-format="yyyy-MM-dd"
                                     type="daterange" range-separator="~" start-placeholder="开始日期"
                                     end-placeholder="结束日期" style="width: 250px">
                    </el-date-picker>
                </el-form-item>
                <span style="float: right;margin-right: 20px;">
                    <el-button type="primary" size="mini" @click="refushTableFun">查询</el-button>
                   <el-button plain size="mini" @click="handleResetSearch">重置</el-button>
                   <el-button type="text" v-if="!searchDetail" @click="handleSearchSpread">展开<i class="el-icon-arrow-down"></i></el-button>
                   <el-button type="text" v-else @click="handleSearchClose">收起<i class="el-icon-arrow-up"></i></el-button>
               </span>
            </el-form>
        </div>
        <div class="bx_space"></div>
        <div>
            <el-table :data="tableData"   size="medium" v-loading="loading"
                      :header-cell-style="{'color':'#333333','background-color': 'rgba(250, 250, 250, 1)','font-weight': '650'}">
                <el-table-column prop="theme" label="合同付款主题" >
                    <template slot-scope="scope">
                        <span @click="handleLookPayment(scope.row)" style="cursor: pointer;">
                            <span class="icon_yuan bg_1" v-if="scope.row.fiId!=null" title="数据来自审批应用">审</span>
                            <span class="itemTitle" :title="scope.row.title"> {{ scope.row.title}}</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="120">
                    <template slot-scope="scope">
                        <span v-text="handleBillStatus(scope.row.status)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="payee" label="收款单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="paymentMoney" label="付款金额/元" width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.paymentMoney)}}
                    </template>
                </el-table-column>
                <el-table-column prop="sumPayMoney" label="累计付款金额/元" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.sumPaymentMoney)}}
                    </template>
                </el-table-column>
                <el-table-column prop="contractTitle" label="合同主题" width="140" show-overflow-tooltip></el-table-column>
                <el-table-column prop="money" label="合同总金额/元" width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatMoneyDisplay(scope.row.money)}}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="operatorName" label="经办人" width="100"></el-table-column>-->
                <el-table-column prop="operatorDeptName" label="经办部门" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="paymentDate" label="付款时间" width="100"></el-table-column>
            </el-table>
            <el-pagination v-if="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.pageNum"
                    :page-sizes="[10,20, 50,100]"
                    :page-size="searchForm.pageCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="searchForm.dataTotal"
                    style="text-align: center;margin-top: 40px;">
            </el-pagination>
        </div>
        <!--右侧弹窗编辑合同付款查看/新增/编辑-->
        <contractPaymentEditDialog :dialogVisible="contractPayEditDialogVisible" v-if="contractPayEditDialogVisible" :contractPayId="contractPayId"
                     :editType.sync="contractPayEditType"  @refushTableFun="refushTableFun" @closeCreateModal="closeContractPayEditDialog"></contractPaymentEditDialog>
        <!--<dept-tree :selectDeptDialogVisible="showDeptTreeOnly" @closeCreateModal ="showDeptTreeOnly = !showDeptTreeOnly"-->
                   <!--:selectedDepts = "selectedDeptToTree" @getDeptTree = "getDeptFromTree" :enable-checked-multiple="false"></dept-tree>-->
        <selectDep :selectDepDialogVisible.sync="showDeptTreeOnly" @getSelectDep="getDeptFromTree"
                   v-if="showDeptTreeOnly"></selectDep>
    </div>
</template>

<script>
    import contractUtil from './contract.util'
    import contractPaymentEditDialog from './components/contractPaymentEditDialog'
    import selectDep from './components/selectDep'
    export default {
        name: "contract-payment-all",
        components:{
            contractPaymentEditDialog,
            selectDep
        },
        data(){
            return{
                searchDetail:false,
                typePropsConfig:{
                    value:"sid",
                    label:"contractType",
                    children:"children"
                },
                contractTypeTreeData:[],
                selectContractTypeIdPath:[],
                // changeTypeData:[],
                billStatusData:[
                    {label:"全部", value:""},
                    {label:"未生效", value:"0"},
                    {label:"已生效 ", value:"2"},
                    {label:"作废 ", value:"9"}],
                // payStatusData:[{label:"未结算", value:"0"},{label:"已结算 ", value:"2"}],
                searchForm: {
                    title: '',
                    signTime: [],
                    paymentDate:[],
                    payee:"",
                    contractTitle:"",
                    billStatus:"",
                    // payStatus:"",
                    operatorDeptName:"",
                    operatorDeptId:"",
                    pageTotal:0,   //总页数
                    pageNum:1,      //当前页数
                    pageCount:10, //分页大小,每页多少条
                    dataTotal:0,   //数据总条数
                },
                loading:true,
                showDeptTreeOnly:false,
                selectedDeptToTree:[],
                tableData:[],
                contractPayEditDialogVisible:false,
                contractPayEditType:"look",
                contractPayId:"",
                pagination:false,
            }
        },
        mounted() {
            JZY.xhr.requestPromises([
                JZY.xhr.post('/contract/contractType/getContractTypeList',{},{alertSuccess:false}),
                // JZY.xhr.post('/contract/contractChangeType/getContractChangeTypeList',{},{alertSuccess:false}),
                this.getContractPaymentListData()
            ]).then(async ([contractTypeList])=>{
                this.contractTypeTreeData=contractTypeList[0];
                // this.changeTypeData=changeTypeList[0];
            })
        },
        methods:{
            formatMoneyDisplay(money){
                return contractUtil.transformMoneyFormat(money,true);
            },
            handleExportAllData(){
                this.contractPaymentExportExcel();
            },
            handleSearchSpread(){
                this.searchDetail=true;
            },
            handleSearchClose(){
                this.searchDetail=false;
            },
            closeContractPayEditDialog(){
               this.contractPayEditDialogVisible=false;
            },
            handleLookPayment(row){
                this.contractPayId=row.sid;
                this.contractPayEditType="look";
                this.contractPayEditDialogVisible=true;
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
            handleResetSearch(){
                this.searchForm.title="";
                this.searchForm.signTime=[];
                this.searchForm.contractTitle="";
                this.searchForm.billStatus="";
                // this.searchForm.payStatus="";
                this.searchForm.operatorDeptName="";
                this.searchForm.operatorDeptId="";
                this.selectContractTypeIdPath=[];
                this.searchForm.paymentDate=[];
                this.searchForm.payee=""
            },
            handlerSeleDep(){
                this.showDeptTreeOnly=true;
            },
            getDeptFromTree(selectedDepts){
                this.searchForm.operatorDeptName=selectedDepts.name;
                this.searchForm.operatorDeptId=selectedDepts.sid;
            },
            handleSizeChange(val) {
                this.searchForm.pageCount=val;
                this.getContractPaymentListData();
            },
            handleCurrentChange(val) {
                this.searchForm.pageNum=val;
                this.getContractPaymentListData();
            },
            refushTableFun(){
                this.searchForm.pageNum=1;
                this.getContractPaymentListData();
            },
            queryPas(){
                let pas={pageNum:this.searchForm.pageNum,pageCount:this.searchForm.pageCount,
                    title:this.searchForm.title,
                    contractTypeId:this.selectContractTypeIdPath.length>0?this.selectContractTypeIdPath[this.selectContractTypeIdPath.length-1]:"",
                    payee:this.searchForm.payee,
                    contractTitle:this.searchForm.contractTitle,
                    status:this.searchForm.billStatus,
                    // balanceStatus:this.searchForm.payStatus,
                    operatorDeptId:this.searchForm.operatorDeptId,
                };
                if(this.searchForm.signTime==null){
                    pas.signingDateBegin="";
                    pas.signingDateEnd="";
                }else{
                    pas.signingDateBegin=this.searchForm.signTime.length>0?moment(this.searchForm.signTime[0]).format('YYYY-MM-DD 00:00:00'):"";
                    pas.signingDateEnd=this.searchForm.signTime.length>0?moment(this.searchForm.signTime[1]).format('YYYY-MM-DD 00:00:00'):"";
                }
                if(this.searchForm.paymentDate==null){
                    pas.paymentDateBegin="";
                    pas.paymentDateEnd=""
                }else{
                    pas.paymentDateBegin=this.searchForm.paymentDate.length>0?moment(this.searchForm.paymentDate[0]).format('YYYY-MM-DD 00:00:00'):"";
                    pas.paymentDateEnd=this.searchForm.paymentDate.length>0?moment(this.searchForm.paymentDate[1]).format('YYYY-MM-DD 00:00:00'):"";
                }
                if(!this.searchDetail){
                    pas.contractTitle="";
                    pas.payee="";
                    pas.status="";
                    pas.operatorDeptId="";
                    pas.paymentDateBegin="";
                    pas.paymentDateEnd="";
                }
                return pas;
            },
            async getContractPaymentListData(){
                this.loading=true;
                let pas=this.queryPas();
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
            async contractPaymentExportExcel(){
                let pas=this.queryPas();
                let url= JZY.xhr.transformUrl('/contract/contractPayment/exportExcel','GLOBAL.OA',false);
                url=url+"?"+JZY.s.getAccessTokenByAuthorization();
                // let $iframe = jQuery('<iframe id="down-file-iframe" />');
                // let form = jQuery('<form method="POST" action="' + url + '" enctype="text/plain">');
                let $iframe = jQuery('<iframe id="down-file-iframe" />');
                let form = jQuery('<form method="POST" action="' + url + '">');
                jQuery.each(pas, function(k, v) {
                    form.append(jQuery('<input type="hidden" name="' + k +
                        '" value="' + v + '">'));
                });
                $iframe.append(form);
                jQuery(document.body).append($iframe);
                form[0].submit();
                $iframe.remove();
            },
        }
    }
</script>

<style scoped lang="scss">
.contractPaymentAll{
    .bx_title{
        padding: 20px 20px 5px 20px;
        border-bottom: 1px solid #eeeeee;
        /*.standing_book{*/
        /*color: #656565;*/
        /*}*/
        .clear_float{
            overflow: hidden;
            text-align: right;
        }
    }
    .bx_space{
        height: 20px;
        background: whitesmoke;
    }
    .search_content{
        padding-top:20px;
    }
    .el-table{
        .operation{
            color: #409EFF;
            cursor:pointer;
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
            margin: 0 5px;
            &.bg_0 {
                background-color: #f00; //红
            }
            &.bg_1 {
                background-color: #46a7ff; //蓝
            }
        }
    }
}
</style>
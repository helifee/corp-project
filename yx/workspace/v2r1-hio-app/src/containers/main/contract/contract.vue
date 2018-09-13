<template>
   <div class="bx_contract">
       <el-row  class="bx_title">
           <el-col :span="12"><p class="standing_book">付款合同</p></el-col>
           <el-col :span="12" class="clear_float">
               <el-dropdown split-button type="primary" size="small" @click="handleCrateContract" @command="handleExportAllData">
                   <i class="el-icon-plus" ></i> 创建合同
                   <el-dropdown-menu slot="dropdown" :visible-arrow="false"  style="margin-top:1px">
                       <el-dropdown-item :visible-arrow="false"
                                         style="width: 90px;text-align: center;">全部导出</el-dropdown-item>
                   </el-dropdown-menu>
               </el-dropdown>
           </el-col>
       </el-row>
       <div class="search_content">
           <el-form label-position="right" :inline="true" label-width="80px" :model="searchForm" size="small">
               <el-form-item label="合同主题">
                   <el-input v-model="searchForm.title" placeholder="请输入合同主题" style="width: 200px"></el-input>
               </el-form-item>
               <el-form-item label="合同类型">
                   <el-cascader  :options="contractTypeTreeData"  v-model="selectContractTypeIdPath" change-on-select
                                 expand-trigger="hover" :show-all-levels="false"　:props="typePropsConfig" placeholder="请选择合同类型"
                                 style="width: 200px"></el-cascader>
               </el-form-item>
               <el-form-item label="签订日期" >
                   <el-date-picker  v-model="searchForm.signTime" value-format="yyyy-MM-dd"
                                    type="daterange" range-separator="~" start-placeholder="开始日期"
                                    end-placeholder="结束日期" style="width: 200px">
                   </el-date-picker>
               </el-form-item>
               <el-form-item label="乙方" v-show="searchDetail">
                   <el-input v-model="searchForm.secondParty" placeholder="请输入乙方名称" style="width: 200px"></el-input>
               </el-form-item>
               <el-form-item label="结算状态" v-show="searchDetail">
                   <el-select v-model="searchForm.payStatus" placeholder="请选择结算状态" style="width: 200px">
                       <el-option v-for="item in payStatusData"
                                  :label="item.label" :value="item.value" :key="item.value"></el-option>
                   </el-select>
               </el-form-item>
               <!--<el-form-item label="变更类型" v-show="searchDetail">-->
                   <!--<el-select v-model="searchForm.changeType" placeholder="请选择变更类型" style="width: 200px">-->
                       <!--<el-option v-for="item in changeTypeData"-->
                                  <!--:label="item.contractChangeType" :value="item.sid" :key="item.sid"></el-option>-->
                   <!--</el-select>-->
               <!--</el-form-item>-->
               <el-form-item label="单据状态" v-show="searchDetail">
                   <el-select v-model="searchForm.billStatus" placeholder="请选择单据状态" style="width: 200px">
                       <el-option v-for="item in billStatusData"
                                  :label="item.label" :value="item.value" :key="item.value"></el-option>
                   </el-select>
               </el-form-item>

               <el-form-item label="经办部门" v-show="searchDetail">
                   <!--<el-input v-model="searchForm.operatorDeptName" placeholder="选择经办部门"></el-input>-->
                   <el-button style="width:200px;text-align:left;height:33px" plain
                              @click="handlerSeleDep">{{searchForm.operatorDeptName}}</el-button>
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
       <el-table :data="tableData"   size="medium" v-loading="loading"
                 :header-cell-style="{'color':'#333333','background-color': 'rgba(250, 250, 250, 1)','font-weight': '650'}">
           <el-table-column prop="theme" label="合同主题"  >
               <template slot-scope="scope">
                   <router-link  :to="'/contract/detail/' + scope.row.sid "
                                 style="height: 30px;overflow: hidden;display: inline-block;white-space: nowrap;text-overflow: ellipsis;">
                       <span class="icon_yuan bg_1" v-if="scope.row.fiId!=null" title="数据来自审批应用">审</span>
                       <span class="itemTitle" :title="scope.row.title"> {{ scope.row.title}}</span>
                   </router-link>
               </template>
           </el-table-column>
           <el-table-column prop="code" label="合同编号" width="150" show-overflow-tooltip></el-table-column>
           <el-table-column prop="contractTypeName" label="合同类型" show-overflow-tooltip></el-table-column>
           <el-table-column prop="money" label="合同总金额/元" width="110" show-overflow-tooltip>
               <template slot-scope="scope">
                   {{formatMoneyDisplay(scope.row.money)}}
               </template>
           </el-table-column>
           <el-table-column prop="sumPaymentMoney" label="累计付款金额/元" width="120" show-overflow-tooltip>
               <template slot-scope="scope">
                  {{formatMoneyDisplay(scope.row.sumPaymentMoney)}}
               </template>
           </el-table-column>
           <el-table-column prop="status" label="单据状态" width="100">
               <template slot-scope="scope">
                   <span v-text="handleBillStatus(scope.row.status)"></span>
               </template>
           </el-table-column>
           <el-table-column prop="balanceStatus" label="结算状态" width="100">
               <template slot-scope="scope">
                   <span v-text="handleBalanceStatus(scope.row.balanceStatus)"></span>
               </template>
           </el-table-column>
           <el-table-column prop="signingDate" label="签订日期" width="140"></el-table-column>
           <el-table-column label="操作" width="110">
               <template slot-scope="scope">
                   <i class="operation el-icon-edit-outline" v-if="scope.row.contractAuth.contractUpdate" title="编辑"
                      @click="handleContractEdit(scope.$index,scope.row)"></i>
                   <i class="operation el-icon-delete" v-if="scope.row.contractAuth.contractDelete" title="删除"
                      @click="handleContractDel(scope.$index,scope.row)"></i>
               </template>
           </el-table-column>
       </el-table>
       <el-pagination  v-if="pagination"
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="searchForm.pageNum"
               :page-sizes="[10,20, 50,100]"
               :page-size="searchForm.pageCount"
               layout="total, sizes, prev, pager, next, jumper"
               :total="searchForm.dataTotal"
               style="margin-top: 40px;text-align: center;">
       </el-pagination>

       <!--右侧弹窗创建/编辑合同-->
       <contractEditDialog :dialogVisible="contractEditDialogVisible" v-if="contractEditDialogVisible"
                         :contractId="contractId"  @refushTableFun="refushTableFun" @closeCreateModal="closeContractEditDialog"></contractEditDialog>
       <!--<dept-tree :selectDeptDialogVisible="showDeptTreeOnly" @closeCreateModal ="showDeptTreeOnly = !showDeptTreeOnly"-->
                  <!--:selectedDepts = "selectedDeptToTree" @getDeptTree = "getDeptFromTree" :enable-checked-multiple="false"></dept-tree>-->
       <selectDep :selectDepDialogVisible.sync="showDeptTreeOnly" @getSelectDep="getDeptFromTree"
                  v-if="showDeptTreeOnly"></selectDep>
   </div>
</template>


<script>
    // JZY.locale.add('contractLocale',require('./contract.locale'))
    import contractUtil from './contract.util'
    import contractEditDialog from './components/contractEditDialog'
    import selectDep from './components/selectDep'
    export default {
        components:{
            contractEditDialog,
            selectDep
        },
        data() {
            return {
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
                payStatusData:[ {label:"全部", value:""},{label:"未结算", value:"0"},{label:"已结算 ", value:"2"}],
                searchForm: {
                    title: '',
                    // contractTypeId: '',
                    signTime: [],
                    secondParty:"",
                    // changeType:"",
                    billStatus:"",
                    payStatus:"",
                    operatorDeptName:"",
                    operatorDeptId:"",
                    pageTotal:0,   //总页数
                    pageNum:1,      //当前页数
                    pageCount:10, //分页大小,每页多少条
                    dataTotal:0,   //数据总条数
                },
                contractId:"",
                contractEditDialogVisible:false,
                tableData:[],
                loading:true,
                showDeptTreeOnly:false,
                selectedDeptToTree:[],
                pagination:false,
            }
        },
        mounted() {
            JZY.xhr.requestPromises([
                JZY.xhr.post('/contract/contractType/getContractTypeList',{},{alertSuccess:false}),
                // JZY.xhr.post('/contract/contractChangeType/getContractChangeTypeList',{},{alertSuccess:false}),
                this.getContractListData()
            ]).then(async ([contractTypeList])=>{
               this.contractTypeTreeData=contractTypeList[0];
               // this.changeTypeData=changeTypeList[0];
            })
        },
        methods: {
            handleSearchSpread(){
                this.searchDetail=true;
            },
            handleSearchClose(){
                this.searchDetail=false;
            },
            handleCrateContract(){
                this.contractId="";
                this.contractEditDialogVisible=true;
            },
            closeContractEditDialog(){
                this.contractEditDialogVisible=false;
            },
            handleContractEdit(index,row){
                this.contractId=row.sid;
                this.contractEditDialogVisible=true;
            },
            formatMoneyDisplay(money){
               return contractUtil.transformMoneyFormat(money,true);
            },
            handleContractDel(index,row){
                this.$confirm('此操作将删除当前合同信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delContractData(row.sid);
                }).catch(() => {
                });
            },
            handleExportAllData(){
                   // alert("还没接口 ");
                this.contractExportExcel();
            },
            handleResetSearch(){
                this.searchForm.title="";
                this.searchForm.signTime=[];
                // this.searchForm.changeType="";
                this.searchForm.billStatus="";
                this.searchForm.payStatus="";
                this.searchForm.secondParty="",
                this.searchForm.operatorDeptName="";
                this.searchForm.operatorDeptId="";
                this.selectContractTypeIdPath=[];
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
                this.getContractListData();
            },
            handleCurrentChange(val) {
                this.searchForm.pageNum=val;
                this.getContractListData();
            },
            refushTableFun(){
               this.searchForm.pageNum=1;
               this.getContractListData();
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
            queryPas(){
                let pas={pageNum:this.searchForm.pageNum,pageCount:this.searchForm.pageCount,
                    title:this.searchForm.title,
                    contractTypeId:this.selectContractTypeIdPath.length>0?this.selectContractTypeIdPath[this.selectContractTypeIdPath.length-1]:"",
                    secondParty:this.searchForm.secondParty,
                    status:this.searchForm.billStatus,
                    balanceStatus:this.searchForm.payStatus,
                    operatorDeptId:this.searchForm.operatorDeptId,
                };
                if(this.searchForm.signTime==null){
                    pas.signingDateBegin="";
                    pas.signingDateEnd="";
                }else{
                    pas.signingDateBegin=this.searchForm.signTime.length>0?moment(this.searchForm.signTime[0]).format('YYYY-MM-DD 00:00:00'):"";
                    pas.signingDateEnd=this.searchForm.signTime.length>0?moment(this.searchForm.signTime[1]).format('YYYY-MM-DD 00:00:00'):"";
                }
                if(!this.searchDetail){
                    pas.secondParty="";
                    pas.status="";
                    pas.balanceStatus="";
                    pas.operatorDeptId="";
                }
                return pas;
            },
            async getContractListData(){
                this.loading=true;
                let pas=this.queryPas();
                await JZY.xhr.post('/contract/contractInfo/page',pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("getContractListData:"+JSON.stringify(resultData))
                    try{
                        // new Number(resultData[0].list.money).toFixed(2);
                        // resultData[0].list.sumPaymentMoney.toFixed(2);
                        // console.log("getContractListData:"+JSON.stringify(resultData[0]))
                        this.tableData=resultData[0].list;
                        // this.tableData.money=new Number(this.tableData.money).toFixed(2);
                        // console.log("this.tableData.money:"+this.tableData.money);
                        this.loading=false;
                        this.searchForm.pageTotal=resultData[0].pageTotal;
                        this.searchForm.pageNum=resultData[0].pageNum;
                        this.searchForm.dataTotal=resultData[0].total;
                        this.pagination=this.searchForm.dataTotal==0?false:true;
                    }catch (e){
                        this.$message(""+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            async contractExportExcel(){
                let pas=this.queryPas();
                let url= JZY.xhr.transformUrl('/contract/contractInfo/exportExcel','GLOBAL.OA',false);
                url=url+"?"+JZY.s.getAccessTokenByAuthorization();
                // let $iframe = $('<iframe id="down-file-iframe" />');
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
            async delContractData(contractId){
                this.loading=true;
                await JZY.xhr.post('/contract/contractInfo/delete',{sid:contractId},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.loading=false;
                        this.refushTableFun();
                        //本地直接删除会存在页码，条数不对等问题
                        // this.tableData.forEach((item,index)=>{
                        //     if(item.sid==contractId){
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
        },

    }
</script>
<style scoped lang="scss">
    .bx_contract{
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
<template>
    <div class="crm order_wrap">
        <!--页头-->
            <div class="order_wrap top_search" :class="{noBorder:showTabTitle}">
                <!--title-->
                <h3 v-if="!showTabTitle">销售订单</h3>
                <div v-if="!showTabTitle" class="order_tab_wrap">
                    <ul>
                        <li v-for="(item,index) of tabButtons" @click="setUrlHistory(item)" :class="{'on':item==activeName}">
                            {{l('{orderLocale.tabs_buttons}')[item]}}
                            <!-- <el-radio v-model="activeName" :label="item">{{l('{orderLocale.tabs_buttons}')[item]}}</el-radio> -->
                        </li>
                    </ul>
                </div>
                <!-- <div v-if="!showTabTitle" class="order_tab_wrap">
                        <el-tabs v-model="activeName" @tab-click="updataTableListByState">
                        <el-tab-pane v-for="(item,index) of tabButtons" :key="index" :label="l('{orderLocale.tabs_buttons}')[item]" :name="item"></el-tab-pane>
                        </el-tabs>
                </div> -->
                <ul class="operation">
                    <li>
                        <el-button type="primary" class="crm_b_btn_add"  @click="createOrder" >
                            <i class="el-icon-plus"></i>
                            {{l('{orderLocale.order.createOrder.buttonName}')}}</el-button>
                            <!-- <el-button type="primary"  @click="createOrder" v-if="showTabTitle">{{l('{orderLocale.order.createOrder.buttonName}')}}</el-button>
                            <el-dropdown split-button type="primary" v-if="!showTabTitle">
                                <span @click="createOrder">
                                    <i class="el-icon-arrow-right el-icon-plus"></i> {{l('{orderLocale.order.createOrder.buttonName}')}}
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>{{l('{orderLocale.order.createOrder.download}')}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
                    </li>
                </ul>
            </div>
        <div>

        <el-row :gutter="20" class="search crm_form_common">
            <el-col :span="8" >
                <div class="label">订单名称</div>
                <div class="search_content">
                    <el-input placeholder="订单名称" style="    width: 165%;" v-model.trim="orderform.orderName" ></el-input>
                </div>
            </el-col>
            <el-col :span="8" v-if="!(customerName && customerName.sid)">
                <div class="label">客户名称</div>
                <div class="search_content">
                    <el-input placeholder="客户名称" style="    width: 165%;" v-model.trim="orderform.customerName" ></el-input>
                </div>
            </el-col>
            <el-col :span="!(customerName && customerName.sid) ? 8 : 13">
                <!-- <div class="buttons">
                    <el-button type="primary" @click="search">
                        {{l('{orderLocale.order.serchInputButtons.search}')}}
                    </el-button>
                    <el-button @click="reset">
                        {{l('{orderLocale.order.serchInputButtons.reset}')}}
                    </el-button>
                </div> -->
                <div class="crm_b_Btn_Search buttons">
                        <span class="crm_b_search" @click="search">
                            <x-icon type="ios-search-strong" class="crm_xicon1" size="25"></x-icon>
                        </span>
                        <span class="crm_b_reset" @click="reset">
                            <icon name="refresh" class="crm_xicon2"  scale = "2.5" ></icon>
                        </span>
                    </div>
            </el-col>
        </el-row>

        </div>
        <!--table表格-->
        
            <!-- <el-row :gutter="20" class="table"> -->
                <el-table ref="myTable"
                    :data="tableData"
                    class="crm_b_table"
                    @sort-change="sortChange"
                    @selection-change='handleSelectionChange'
                    :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}"
                    >
                    <el-table-column 
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column 
                                prop="orderName"
                                align="left"
                                show-overflow-tooltip
                                label="订单名称">
                            <template slot-scope="scope">
                                <router-link class="apprave-detail-panel" :to="'/crm/order/detail/' + scope.row.orderId ">{{ scope.row.orderName}}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column 
                                prop="orderCode"
                                align="center"
                                show-overflow-tooltip
                                label="订单编号">
                        </el-table-column>
                        <el-table-column 
                                prop="customerName"
                                align="center"
                                show-overflow-tooltip
                                label="客户名称">
                            <template slot-scope="scope">
                                <span v-if="customerName && customerName.sid && !(opportunities && opportunities.sid)">
                                    {{ scope.row.customerName}}
                                </span>
                                <a style="cursor: pointer;" v-if="!customerName || (opportunities && opportunities.sid)" class="apprave-detail-panel" @click="customerJump(scope.row.customerId)">{{ scope.row.customerName}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column 
                                prop="personOtherName"
                                align="center"
                                show-overflow-tooltip
                                label="客户签约人">
                                <template slot-scope="scope">
                                    <a class="apprave-detail-panel" style="cursor: pointer;" @click="contactJump(scope.row.customerId,scope.row.personChargeOther)">{{ scope.row.personOtherName}}</a>
                                </template>
                        </el-table-column>
                        <el-table-column 
                                prop="personOurName"
                                align="center"
                                show-overflow-tooltip
                                label="我方负责人">
                                <!-- <template slot-scope="scope">
                                    <router-link class="apprave-detail-panel" :to="'/crm/business/detail/' + scope.row.personChargeOur +'?type='+scope.row.personOurName">{{ scope.row.personOurName}}</router-link>
                                </template> -->
                        </el-table-column>
                        <el-table-column 
                                prop="signAmount"
                                sortable="custom"
                                align="center"
                                label="签约金额">
                        </el-table-column>
                        <el-table-column 
                                prop="orderStatus"
                                label="订单状态" 
                                align="center"
                                :formatter="formatterStage">
                        </el-table-column>
                        <el-table-column
                                prop="des"
                                label="操作"
                                align="center"
                                >
                            <template slot-scope="scope" v-if="scope.row.orderStatus != 1 ">
                                <span @click="editBusinessFn(scope.row,'modify')" class="crm-el-btn">
                                    <i class="el-icon-edit"></i>
                                </span>
                                <span @click="delBusinessFn(scope.row,scope.$index)" class="crm-el-btn">
                                    <i class="el-icon-delete"></i>
                                </span>

                            </template>
                        </el-table-column>
                </el-table>
            <!-- </el-row> -->
        <div>    
            <div v-if="!noscrollStatu">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNum"
                :page-sizes="[10,20,50,100]"
                :page-size="page.pageCount"
                v-if='page.pageTotal!=0'
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.pageTotal">
                </el-pagination>
            </div>  
        </div>
        
        <!--tabs对应的content内容-->
        <!-- <el-row :gutter="20" class="text_panel">
          <el-col :span="24">
            <div class="cc" v-if="orderType == null">null</div>
            <div v-if="orderType == 0">0</div>
            <div v-if="orderType == 1">1</div>
          </el-col>
        </el-row> -->
        <!--右侧弹窗-->
        <order-right-modal :dialogVisible = "dialogVisible" 
        @closeCreateModal="changeDialogVisible"
        @showGoodsModal="closeGoodsDialog"
        :showGoodsDialogVisible="goodsDialogVisible"
        @reloadOrder='reloadTableEdit'
        :orderDetail="orderDetail"
        v-if="dialogVisible"
        ></order-right-modal>
        <dialog-choose-goods  class="goods"
         :dialogVisible="goodsDialogVisible" 
         v-if="goodsDialogVisible"
         ref="chooseGoods"
         @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
    </div>
</template>
<script>
    JZY.locale.add("orderLocale", require("@Main/crm/crm.locale"))
    import orderRightModal from '@Main/crm/components/order.rightModal.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'
    import cService from '@Main/crm/crm_service.js'
    import {modify,modifyCustomer} from '@Main/crm/getData'
    

    export default{
        components: {
            orderRightModal,
            dialogChooseGoods
        },  
        props:{
            
            showTabTitle:{  //是否显示头部切换
                type:Boolean
            },
            customerName:{  //当前客户的订单
                type:Object
            },
            opportunities:{  //当前商机
                type:Object
            },
            noscrollStatu:{  //是否是滚动加载
                type:Boolean
            }
        },      
        data(){
            // let pageNum = this.$router.query.page || 1;
            let stage = cService.getParam('stage') || "all";
            return {
                activeName: stage,//初始化选中的tabs标签
                orderDetail:{},
                goodsList:[],
                goodsDialogVisible:false,
                tabButtons:['all','signed','draft'],//页头显示的状态过滤标签
                orderType:"",//订单的状态
                tableData:[],//订单表格
                dialogVisible:false,//右侧弹出窗开关
                orderform:{
                    orderName:"",
                    customerName:""
                },
                page:{
                    pageNum:Number(this.$route.query.orderpage) || 1,
                    pageCount:10,
                    pageTotal:0
                }
            }
        },
        methods:{
            //查看联系人是否存在
            async contactJump(customerId,contactId){
                let res = await modify(contactId)
                let routeData = this.$router.push({
                    path: '/crm/contacts/details',
                    query:{
                        customerId:customerId,
                        contactId:contactId,
                    }
                });
            },
            //查看客户是否存在
            async customerJump(customerId){
                let res = await modifyCustomer(customerId)
                console.info(res[0])
                let routeData = this.$router.push({
                path: '/crm/customer/details',
                query:{
                    customerId:customerId
                    }
                });
            },
            sortChange(val){
                let vals = val.order == "ascending" ? "asc" : (val.order == "descending" ? "desc" : "");
                this.signAmountSort = vals;
                if(this.noscrollStatu){
                    this.page.pageNum = 1;
                }
                this.reloadTable({});
            },
            handleSelectionChange(item){
                // this.$message("选中了")
            },
            editBusinessFn(row,type){
                row.actType = type;
                this.orderDetail = row;
                this.dialogVisible = !this.dialogVisible;
            },
            delBusinessFn(row,$index){
                JZY.u.warningMsg('您确认删除此订单吗?',true)
                  .then(() => {
                    cService.delBusiness({id:row.orderId,context:this },true).then((data) =>{
                        if(data.status == "200"){
                            this.tableData.splice($index,1);
                        }
                        this.$message(data.message);
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
                
            },
            //加载订单列表
            async reloadTable(p,cb){
                if(!this.reloadStatus){
                    let orderState = cService.getParam('stage') || "all";
                    this.updataTableListByState(orderState);

                    this.reloadStatus = true; 
                    let param = {
                        pageNum : this.page.pageNum,
                        pageCount : this.page.pageCount,
                        orderStatus : this.orderType,
                        orderName : this.orderform.orderName,
                        customerName : this.orderform.customerName || (this.customerName ? this.customerName.name : ""),
                        customerId : this.customerName ? this.customerName.sid : "",
                        opportunityId : this.opportunities ? this.opportunities.sid : "",
                        signAmountSort : this.signAmountSort || ""
                    }
                    if(p){
                        jQuery.extend(param,p);
                    }
                    this.page.pageTotal = 0;
                    let res = await cService.getOpportunitiesPage(param,true);
                    JZY.s.hideLoading();
                    this.reloadStatus = false; 
                    if(this.noscrollStatu){ //滚动加载
                        if(this.page.pageNum != 1 ){
                            if(res[0].list.length){
                                this.tableData = this.tableData.concat(res[0].list);
                            }      
                        }else{
                            this.tableData = res[0].list;
                        }
                        
                        this.page.pageNum ++;
                        if((this.tableData.length >= res[0].total)){
                            cb && cb(res);
                        }
                    }else{//非滚动加载
                        this.tableData = res[0].list;
                    }
                    this.page.pageTotal = res[0].total; 
                } 
                
                

            },
            reloadTableEdit(){
                this.page.pageNum = 1;
                this.reloadTable({});
                if(this.orderDetail.actType != "modify"){
                    if(this.opportunities && this.opportunities.sid){
                        cService.getStatistical({
                            customerId : this.customerName ? this.customerName.sid : "",
                            opportunityId : this.opportunities ? this.opportunities.sid : ""
                        }).then( (res)=>{
                            if(res.status == 200){
                                this.$emit("setTotal",res.result);
                            }
                        })
                    }else{
                        cService.getStatistical({
                            customerId : this.customerName ? this.customerName.sid : ""
                        },true).then( (res)=>{
                            if(res.status == 200){
                                this.$emit("setTotal",res.result);
                            }
                        })
                    }
                    
                }
                
            },
            formatterStage(row, column, cellValue, index){
                let result = "";
                result = (cellValue == "1") ? "已签": "草稿";
                return result;
            },
            //选择物品的弹窗
            closeGoodsDialog(item){
                this.goodsDialogVisible = !this.goodsDialogVisible;
                this.goodsList = item || [];
            },
            //创建审批，打开右侧弹出窗
            createOrder(state) {
                this.orderDetail = {
                    customerName: this.customerName || {},
                    opportunities: this.opportunities || {}
                };
                this.dialogVisible = !this.dialogVisible;
            },
            updataTableListByState:function(obj) {
                let state = null;
                switch(obj){
                    case 'all':
                      state = ""
                      break;
                    case 'signed':
                      state = 1
                      break;
                    case 'draft':
                      state = 0
                      break;
                    default:
                      state = null
                }
                
                this.orderType = state;
            },
            setUrlHistory (obj){
                this.updataTableListByState(obj);
                this.page.pageNum = 1;
                this.activeName = obj;
                let path = "/#" + this.$route.path + 
                            "?orderpage=" + 1 + 
                            "&stage=" + obj ;

                window.history.replaceState({data:111},null,path);

                this.reset();
                this.reloadTable({});
            },
           
            //子组件回调，关闭父组件弹出窗
            changeDialogVisible:function(from = ''){
              this.dialogVisible = false;
              this.$emit("cli");
              // from === 'reflashData' && this.getOrderTableData()
            },
            //分页
            handleSizeChange(val) {
                this.page.pageCount = val;
                this.pageNum = 1;
                this.reloadTable({});
            },
            //分页
            handleCurrentChange(val) {
                // this.$router.push({
                //     path: '/crm/order',
                //     query: {orderpage: val,stage:this.activeName}
                // })
                let path = "/#" + this.$route.path + 
                            "?orderpage=" + val + 
                            "&stage=" + this.activeName ;

                window.history.replaceState({data:111},null,path);

                this.page.pageNum = val;
                this.reloadTable({})
            },
            //搜索
            search() {
                this.page.pageNum = 1;
                this.reloadTable({});
                // this.reset();
            },
            // 重置
            reset() {
                this.orderform = {
                    orderName : "",
                    customerName : ""
                }
                // this.$refs['orderform'].reset();
                this.tableData = [];
                this.page.pageNum = 1;
                this.reloadTable({});
            },
            routerReloadMethod(){
                this.setUrlHistory("all")
            },

        },
        computed:{
        },

        mounted(){
            // this.setScroll();
            //初始化列表
            this.reloadTable({});
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" >
    @import './crmcss/crm_common.scss'
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './crmcss/css.scss'

</style>



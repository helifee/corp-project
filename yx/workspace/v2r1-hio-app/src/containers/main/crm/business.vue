<template>
    <div class="wrap_crm">
        <div class="content-title">
            <h3>销售商机</h3>
            <ul class="operation">
                <li>
                    <!-- <el-dropdown split-button type="primary" @click="showBusinessDialog" v-if="!customerId">
                        <i class="el-icon-plus"></i> 创建商机
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>导出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <!-- <el-button type="primary"  @click="showBusinessDialog" v-if="customerId && customerId.sid" >创建商机</el-button> -->
                    <el-button type="primary"  class="crm_b_btn_add"  @click="showBusinessDialog" >
                        <i class="el-icon-plus"></i>
                        创建商机</el-button>
                </li>
            </ul>

        </div>
        <!--项目列表-->
        <div class="project-wrap">
            <div style="margin-bottom:10px">
                <ul class="color-panle">
                    <li v-for ="(item,index) in customerClass" @click="tab(item,index)" :class="{cur:index == showIndex}"  :style="{  width: item.width +'%', backgroundColor: item.color }">{{item.statusName}}（{{item.showCount}}）</li>
                </ul>
            </div>
            <!--查询条件-->
            <div class="project-search">
                <!--检索内容-->
                <el-form :inline="true" class="crm_form_common" :model="searchForm" :rules="searchRules" ref="searchForm">
                    <el-form-item label=" 商机名称：" prop="opportunityName">
                        <el-input v-model="searchForm.opportunityName" placeholder="请输入关键词进行检索" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 预计成交金额：" prop="estimateAmountStart" class="searchItem">
                        <numberInput v-model="searchForm.estimateAmountStart" placeholder="签约金额" type="blend" style="width: 150px"></numberInput>
                        <!-- <el-input v-model="searchForm.estimateAmountStart" type="Number" placeholder="签约金额"></el-input> -->
                    </el-form-item>
                    <span class="search_icon_">
                      ~ 
                    </span>
                    <!-- {{searchForm.estimateAmountEnd}} -->
                    <el-form-item prop="estimateAmountEnd" label-width="0">
                        <numberInput v-model="searchForm.estimateAmountEnd" placeholder="签约金额" type="blend" style="width: 150px"></numberInput>
                        <!-- <el-input v-model="searchForm.estimateAmountEnd" type="Number" placeholder="签约金额" style="width: 150px"></el-input> -->
                    </el-form-item>
                    <!-- <el-form-item label=" 预计签约日期：" prop="searchVal2">
                        <el-date-picker
                                v-model="searchForm.searchVal"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <div class="crm_b_Btn_Search">
                        <span class="crm_b_search" @click="search">
                            <x-icon type="ios-search-strong" class="crm_xicon1" size="25"></x-icon>
                        </span>
                        <span class="crm_b_reset" @click="resetForm('')">
                            <icon name="refresh" class="crm_xicon2"  scale = "2.5" ></icon>
                        </span>
                    </div>
                </el-form>

            </div>
            <!--表格-->
            <el-table ref="myTable"
                class="crm_b_table"
                :data="tableData"
                @sort-change="sortChange"
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}"
                style="width: 100%">
                    <el-table-column 
                            prop="opportunitName"
                            show-overflow-tooltip
                            label="商机名称">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" 
                            :to="'/crm/business/details/' + scope.row.opportunityId + '?customer=' + scope.row.customerId + '&page=dynamic' ">
                            {{ scope.row.opportunitName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column 
                            prop="personInChargeName"
                            show-overflow-tooltip
                            align="center"
                            label="负责人">
                    </el-table-column>
                    <el-table-column 
                            prop="customerName"
                            show-overflow-tooltip
                            label="客户名称">
                        <template slot-scope="scope">
                            <span v-if="customerId && customerId.sid">
                                    {{ scope.row.customerName}}
                                </span>
                            <a class="apprave-detail-panel" style="cursor: pointer;" v-if="!customerId" @click="customerJump(scope.row.customerId)">{{ scope.row.customerName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column 
                            prop="contcatName"
                            show-overflow-tooltip
                            align="center"
                            label="联系人">
                            <template slot-scope="scope">
                                <a class="apprave-detail-panel" style="cursor: pointer;" @click="contactJump(scope.row.customerId,scope.row.contcatId)">{{ scope.row.contcatName}}</a>
                            </template>
                    </el-table-column>
                    <el-table-column 
                            prop="phoneNumber"
                            show-overflow-tooltip
                            align="center"
                            label="手机号码">
                    </el-table-column>
                    <el-table-column 
                            prop="estimateAmount"
                            sortable="custom"
                            align="center"
                            label="预计成交金额">
                    </el-table-column>
                    <el-table-column 
                            width="140px"
                            sortable="custom"
                            prop="lastFollowTime"
                            label="最后跟进时间">
                    </el-table-column>
                    <el-table-column 
                            width="100px"
                            prop="stage"
                            align="center"
                            label="商机阶段" :formatter="formatterStage">
                    </el-table-column>
                    <el-table-column
                            prop="des"
                            width="120px"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <span  @click="showRecordformDialog(scope.row.customerId,scope.row.contcatId,scope.row.opportunityId)" class="crm-el-btn">
                                <i class="el-icon-tickets"></i>
                            </span>
                            <span   @click="editBusinessFn(scope.row,'modify')" class="crm-el-btn">
                                <i class="el-icon-edit"></i>
                            </span>
                            <span  @click="delBusinessFn(scope.row,scope.$index)" class="crm-el-btn">
                                <i class="el-icon-delete"></i>
                            </span>
                            <!-- <el-button type="text" size="small" @click="flowUpfn(scope.row,'modify')"><i class="el-icon-tickets"></i></el-button> -->
                            <!-- <el-button type="text" size="small" @click="showRecordformDialog(scope.row.customerId,scope.row.contcatId,scope.row.opportunityId)"><i class="el-icon-tickets"></i></el-button>
                            <el-button type="text" size="small" @click="editBusinessFn(scope.row,'modify')"><i class="el-icon-edit"></i></el-button>
                            <el-button @click="delBusinessFn(scope.row,scope.$index)" type="text" size="small"><i class="el-icon-delete"></i></el-button> -->
                        </template>
                    </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        
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
        
        <!-- 创建商机 -->
        <dialog-create-business  :dialogVisible="businessDialogVisible"
          @showGoodsModal="showGoodsDialog"
           @closeCreateModal="showBusinessDialog"
           :showGoodsDialogVisible="goodsDialogVisible"
           :businessDetail="businessDetail"
           v-if="businessDialogVisible"
           @reloadList="reloadBusinessFn"
           >
        </dialog-create-business>
        <!-- 选择商机 -->
           <dialog-choose-goods  class="goods"
         :dialogVisible="goodsDialogVisible" 
         v-if="goodsDialogVisible"
         @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
         <!-- 创建跟进 -->
         <dialog-follow-recordform-cu-opp :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-opp>
         <!-- <dialogFollowrecordform :dialogVisible="followDialogVisible" :customer="currentCustomer" v-if="followDialogVisible" :title="followTitle" @closeCreateModal="showfollowDialog"></dialogFollowrecordform> -->

    </div>
</template>

<script>
    import dialogCreateBusiness from '@Main/crm/components/dialog.create.business.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'
    // import dialogFollowrecordform from '@Main/crm/components/dialog.follow.recordform_cu.vue'
    import dialogFollowRecordformCuOpp from '@Main/crm/components/dialog.follow.recordform_cu_opp.vue'
    import myTable from '@Main/crm/components/table.vue'
    import cService from '@Main/crm/crm_service.js'
    import {modify,modifyCustomer} from '@Main/crm/getData'
    import numberInput from '@Main/crm/components/number.vue'
    // import { crmGetRouter } from '@Main/crm/crmDirective.js'

    export default{
        
        // mixins:[crmGetRouter],
        components: {
            dialogCreateBusiness,
            dialogChooseGoods,
            myTable,
            // dialogFollowrecordform,
            dialogFollowRecordformCuOpp,
            numberInput
        },
        props:{
            customerId:{
                type:Object
            },
            noscrollStatu:{  //是否是滚动加载
                type:Boolean
            }
        },
        // beforeRouteEnter(to, from, next){
        //     this.reload();
        //     next(); 
        // },
        methods:{
            routerReloadMethod(){
                this.resetForm(" ")
            },
            //查看联系人是否存在
            async modify(customerId,contactId){
                let res = await modify(contactId)
                let routeData = this.$router.push({
                    path: '/crm/contacts/details',
                    query:{
                        customerId:customerId,
                        contactId:contactId,
                    }
                });
            },
            //查看客户是否有权限
            async contactJump(customerId,contactId){
                let res = await modifyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        //初始化列表
                        this.reloadBusinessFn();
                        //获取当前客户商机阶段
                        this.getBusinessStage();
                    }
                })
                this.modify(customerId,contactId);
            },
            //查看客户是否存在
            async customerJump(customerId){
                let res = await modifyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        //初始化列表
                        this.reloadBusinessFn();
                        //获取当前客户商机阶段
                        this.getBusinessStage();
                    }   
                })
                let routeData = this.$router.push({
                path: '/crm/customer/details',
                query:{
                    customerId:customerId
                    }
                });
            },
            sortChange(val){
                this.lastContactTimeSort = "";
                this.estimateAmountSort = "";
                let vals = val.order == "ascending" ? "asc" : (val.order == "descending" ? "desc" : "");
                if(val.prop == "estimateAmount"){
                    this.estimateAmountSort = vals;
                }else if(val.prop == "lastFollowTime"){
                    this.lastContactTimeSort = vals;
                }
                if(this.noscrollStatu){
                    this.page.pageNum = 1;
                }
                this.reloadBusinessList({});
                
                
            },
            showRecordformDialogClo(){
                this.$emit('cli')
                this.recordformDialogVisible = false;
                //初始化列表
                this.reloadBusinessList({});
            },
            async showRecordformDialog (customerId,contactId,opportunityId){
                let res = await modifyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        //初始化列表
                        this.reloadBusinessFn();
                        //获取当前客户商机阶段
                        this.getBusinessStage();
                    }   
                })
                console.info(res[0])
                this.recordformDialogVisible = true;
                this.$nextTick(function(){
                    this.$refs.recordformId.test(customerId,contactId,opportunityId)
                })
            },
            //创建跟进
            flowUpfn(item){
                this.currentCustomer = {
                    sid:item.customerName,
                    name:item.customerId,
                }
                this.showfollowDialog();
            },
            //商机阶段
            formatterStage(row, column, cellValue, index){
                let stage = l('{crmLocale.staticvariable.businessstage}');
                let result = "";
                for(let i = 0; i< stage.length; i++){
                    if(stage[i].value == cellValue){
                    result = stage[i].name;
                    }
                }
                return result;
            },
            //商机修改
            editBusinessFn(row,type){
                
                row.actType = type;
                this.businessDetail = row;
                this.businessDialogVisible  = !this.businessDialogVisible;
            },
            //商机删除
            delBusinessFn(row,$index){
                JZY.u.warningMsg('您确认删除此商机吗?',true)
                  .then(() => {
                    cService.delBusiness({id:row.opportunityId,context:this }).then((data) =>{
                    this.$message(data.message);
                        if(data.status == "200"){
                            this.tableData.splice($index,1);
                        }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
                
            },
            //商机列表
            reloadBusinessList(p,cb){
                if(!this.reloadStatus){
                    this.reloadStatus = true;
                     let param = {
                        pageNum : this.page.pageNum,
                        pageCount : this.page.pageCount,
                        customerId : this.customerId ? this.customerId.sid : "",
                        opportunityName : this.searchForm.opportunityName,
                        estimateAmountStart : this.searchForm.estimateAmountStart,
                        estimateAmountEnd : this.searchForm.estimateAmountEnd,
                        stage:this.page.stage,
                        lastContactTimeSort : this.lastContactTimeSort || "",
                        estimateAmountSort : this.estimateAmountSort || ""
                    }
                    jQuery.extend(param,p);
                    this.page.pageTotal = 0;
                    cService.getOpportunitiesPage(param).then( (data)=>{
                         this.reloadStatus = false; 
                        if(this.noscrollStatu){
                            if(this.page.pageNum != 1){
                                if(data[0].list.length){
                                    this.tableData = this.tableData.concat(data[0].list);
                                    // this.tableData.push.apply( this.tableData, data[0].list );
                                }
                            }else{
                                this.tableData = data[0].list;
                            }
                            this.page.pageNum ++;
                            if((this.tableData.length >= data[0].total)){
                                cb && cb(data);
                            }
                        }else{
                            this.tableData = data[0].list;
                        }
                        this.page.pageTotal = data[0].total;
                        JZY.s.hideLoading();
                        
                    }).catch(()=>{
                        JZY.s.hideLoading();
                    })
                }    
            },
            reloadBusinessFn(){
                this.tableData = [];
                this.page.pageNum = 1;
                this.reloadBusinessList({});
                this.getBusinessStage();
                //获取当前商机总数量
                if(this.businessDetail.actType != "modify"){
                    let p = {
                        customerId : this.customerId ? this.customerId.sid : "",
                    }
                    cService.getStatistical(p,true).then((data)=>{
                        if(data.status == 200){
                            this.$emit("setTotal",data.result);
                        }
                    })
                }
                
            },
            tab(item,index){
                this.page.pageNum = 1;
                this.showIndex = index;
                if(this.oldShowIndex == this.showIndex){
                    this.showIndex = "-1";
                    this.page.stage = '';
                    this.$refs['searchForm'].resetFields();
                    this.reloadBusinessList({});
                }else{
                    this.$refs['searchForm'].resetFields();
                    this.page.stage = item.status;
                    this.reloadBusinessList({});
                    
                }
                this.oldShowIndex = this.showIndex;
                
            },
            showBusinessDialog(type){
                this.businessDetail = {
                    customer:{
                        name:this.customerId ? this.customerId.name : "",
                        sid:this.customerId ? this.customerId.sid : ""
                    }
                };
                this.businessDialogVisible  = !this.businessDialogVisible;
            },
            handleSizeChange(val) {
                this.page.pageCount = val;
                this.page.pageNum = 1;
                this.reloadBusinessFn();
            },
            handleCurrentChange(val) {
                this.$router.push({
                    path: '/crm/business',
                    query: {businesspage: val}
                })
                this.page.pageNum = val;
                this.reloadBusinessList({})
            },
           
            resetForm(stage) {
                this.$refs["searchForm"].resetFields();
                this.page.pageNum = 1;
                this.page.stage = stage;
                this.showIndex = -1;
                this.reloadBusinessList({});
            },
            search (){
                this.$refs["searchForm"].validate((valid) => {
                    if(valid){
                        this.page.pageNum = 1;
                        this.reloadBusinessFn()
                    }
                })
                
            },
            //选择物品的弹窗
            showGoodsDialog(){
                this.goodsDialogVisible = true;
            },
            //选择物品的弹窗
            closeGoodsDialog(item){
                this.goodsDialogVisible = false;
            },
           
            showfollowDialog(){  //打开关闭跟进窗口
                
                this.followDialogVisible = !this.followDialogVisible;
            },
            //获取商机阶段
            getBusinessStage(){
                //当前客户
                let params = {
                    customerId : this.customerId ? this.customerId.sid : ""
                }
                let colorArr = ["rgba(245,166,35,.8)",
                "rgba(70,167,255,.8)",
                "rgba(126,211,33,.8)",
                "rgba(57,203,164,.8)",
                "rgba(247,122,122,.8)",
                "rgba(202,165,255,.8)"];
                cService.getopportunitiesStages(JSON.stringify(params)).then((data) =>{
                    this.customerClass = data.result;
                    let result = data.result;
                    let sum = 0;
                    let countSum = 0;
                    let arr = [];
                    //用于标记最后一位非零的位置
                    let index = 0;

                    for(let i=0; i< result.length; i++){
                        // sum += Number(result[i]['count']);
                        countSum += Number(result[i]['count']);
                        result[i].color = colorArr[i];
                        if(i == (result.length - 1)){
                            result[i].width = (100 - sum).toFixed(2);
                        }else{
                            result[i].width = (1/6)*100;
                            result[i].width = result[i].width.toFixed(2);
                            sum += Number(result[i].width);
                        }
                        if(result[i]['count'] != 0){
                            index = i;
                        }
                        // if(result[i]['count'] != 0){
                            arr.push(result[i])
                        // }

                    }
                    let pTotal = 0;
                    arr.map((data,idex) =>{
                        // data.width = data['count']/sum*100;
                            data.showCount = (data['count']/countSum*100).toFixed(0);
                            
                            if(index == idex){
                                data.showCount = 100 - pTotal
                            }
                            pTotal += Number(data.showCount);
                            if(data['count'] == 0){
                                data.showCount = 0 + "%"
                            }else{
                                data.showCount  = data.showCount + "%";
                            }
                            
                        // data.width = result.length/100;
                    })
                    
                    this.customerClass = arr;
                })
            }
        },
        data(){
            let my = this;
            //小数点两位验证
            let numberValidator = (rule, value, callback) => {
                if(value){
                    let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
                    if(reg.test(value)){
                        if(my.searchForm.estimateAmountEnd && (Number(value) > Number(my.searchForm.estimateAmountEnd))){
                            my.$refs.searchForm.validateField('estimateAmountEnd');
                            // this.$refs['searchForm'].validateField('estimateAmountEnd');
                        }
                        callback();
                    }else{
                        callback(new Error("请输入13位整数或带两位小数的15位数字"))
                    }
                }else{
                     callback();
                }
            }
            let estimateAmountEndFn = (rule, value, callback) => {
                if(value){
                    let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
                    if(reg.test(value)){
                        if(my.searchForm.estimateAmountStart && (Number(value) < Number(my.searchForm.estimateAmountStart))){
                            callback(new Error("请输入大于开始金额的数字"))
                        }else{
                            callback();
                        }
                    }else{
                        callback(new Error("请输入13位整数或带两位小数的15位数字"))
                    }
                }else{
                    callback();
                }
            } 
            return {
                recordformDialogVisible : false,
                currentCustomer:{},
                followTitle:'创建跟进',
                followDialogVisible:false,
                // customerId:"", //客户id
                businessDetail:{},
                tableTitle:[
                    {
                      type:"personInChargeName",
                      name:"负责人"
                    },
                    {
                      type:"customerName",
                      name:"客户名称"
                    },
                    {
                      type:"contcatName",
                      name:"主要联系人"
                    },
                    {
                      type:"phoneNumber",
                      name:"手机"
                    },
                    {
                      type:"estimateAmount",
                      name:"预计成交额"
                    },
                    {
                      type:"lastFollowTime",
                      name:"预计签约时间"
                    },
                    {
                      type:"stage",
                      name:"商机阶段",
                      formatter:function(row, column, cellValue, index){
                          console.log(cellValue)
                          let stage = l('{crmLocale.staticvariable.businessstage}');
                          let result = "";
                          for(let i = 0; i< stage.length; i++){
                              if(stage[i].value == cellValue){
                                result = stage[i].name;
                              }
                          }
                          return result;
                      }
                    }
                ],
                tableData:[],
                oldShowIndex:-1,
                showIndex:-1,
                businessDialogVisible:false,
                goodsDialogVisible:false,
                searchForm:{
                    opportunityName:'',
                    estimateAmountStart:'',    
                    estimateAmountEnd:''          
                },
                // chooseGoodsData:[],

                
               
                page:{
                    pageNum: Number(this.$route.query.businesspage) || 1, //当前页
                    pageCount:10,
                    pageTotal:0,
                    stage:""
                },
                searchRules:{
                    
                    estimateAmountStart: [
                        // { type:'number', message: '请输入数字', trigger: 'change' },
                        // { validator:estimateStartFn,trigger:'change'},
                        {validator:numberValidator,trigger: ['blur','change']}
                    ],
                    estimateAmountEnd: [
                        // { type:'number', message: '请输入数字', trigger: 'change' },
                        {validator:estimateAmountEndFn,trigger: ['blur','change']},
                    ]
                },
                customerClass:[]
            }
        },
       
        computed:{
            
        },
        mounted(){
            // this.$root.$eventCRMSELECT.$on('CRM_MENU_SELECT', ()=>{
            //     this.resetForm(" ")
            // })
            //初始化列表
            this.reloadBusinessFn();
            //获取当前客户商机阶段
            this.getBusinessStage();
        }
        
    }
</script>
<style rel="stylesheet/scss" lang="scss" >
    @import './crmcss/crm_common.scss'
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import './crmcss/css.scss'
</style>

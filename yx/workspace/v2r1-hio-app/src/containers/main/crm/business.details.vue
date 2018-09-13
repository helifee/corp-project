<template>

    <!-- <div> -->
        <crmScroll class="wrap crm_wrap_details" ref="scroll" @scoll="getScroll" :status.sync="scrollStatus">
            <div slot="content">
                <div class="top-wrap">
                    <div class="title-wrap">
                        <div class="title-name">
                        {{businessDetail.name}}
                        </div>
                        <div class="operate-box">
                            <el-button @click="showEdit">编辑</el-button>
                            <el-button @click="del">删除</el-button>
                            <el-button @click="back">返回</el-button>
                        </div> 
                    </div>
                    <div class="content-list-wrap" :class="{hiddenClass:!showList}">
                        <el-row>
                            <el-col :span="6"  v-for ="(item,index) in details.info" :key="index" class="items">
                                <div class="grid-content">
                                    <span class="name">{{item.name}}：</span><span class="text">{{item.text}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24" class="items rowItems">
                                <div class="grid-contend">
                                    <span class="name">附件：</span>
                                    <span class="text">
                                        <attach-upload
                                                ref="attachFile"
                                                :readonly="true"
                                                :appId="businessDetail.attachmentParam.app"
                                                :businessId="businessDetail.attachmentParam.businessId"
                                                :categoryId="businessDetail.attachmentParam.category"
                                                >
                                        </attach-upload>
                                    </span>
                                </div>
                            </el-col>     
                        </el-row>
                        <div class="o-bt" @click="isShow()">
                            <!-- <span class="el-icon-arrow-up"></span> -->
                            <x-icon type="ios-arrow-down" class="crm_b_showIcon" v-if="!showList" size="20"></x-icon>
                            <x-icon type="ios-arrow-up" class="crm_b_showIcon" v-if="showList" size="20"></x-icon>
                            <!-- <span>收起</span> -->
                        </div>
                    </div>
                </div>
                <div class="customer-detail-tab ustomer-detail-tab-b">
                    <el-tabs v-model="activeName" @tab-click="tab" class="crm_b_tabDetils">
                        <el-tab-pane :label="dynamicTotal" name="dynamic">
                            <detail-dynamic :typePage="typePage" ref='dynamicPage' :setVal="setDynamic" v-if="activeName == 'dynamic'"></detail-dynamic>
                        </el-tab-pane>

                        <el-tab-pane :label="orderTotal" name="file">
                            <orderTab v-if="activeName == 'file' && orderCustomerName.sid"
                             :opportunities="setOrderOpportunities"
                             :noscrollStatu="fileScrollStatu"
                              ref='orderPage'
                              :showTabTitle="orderTabTitle"
                               @setTotal="setTotal"
                                :customerName="orderCustomerName" style="padding:0"></orderTab>

                        </el-tab-pane>
                        <el-tab-pane :label="'跟进记录（'+this.followHisCount+'）'" name="participants">
                            <detail-crm-dynamic-opp ref='dynamic' v-if="activeName == 'participants'" :contact="contactId"  :customer="customer" :followHis="followHis" @cli="cli"></detail-crm-dynamic-opp>
                        </el-tab-pane>
                        <el-tab-pane :label="'跟进计划（'+this.followPlanCount+'）'" name="approval">
                            <detail-followplan-opp ref='followplan' v-if="activeName == 'approval'"  :followPlan="followPlan" @cli="cli"></detail-followplan-opp>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <!-- 创建商机 -->
                <dialog-create-business  :dialogVisible="businessDialogVisible"
                    v-if="businessDialogVisible"
                @showGoodsModal="showGoodsDialog"
                @closeCreateModal="showBusinessDialog"
                :showGoodsDialogVisible="goodsDialogVisible"
                :businessDetail="businessDetail"
                @reloadList="reloadBusinessFn"
                >
                </dialog-create-business>
                <!-- 选择商机 -->
            <dialog-choose-goods  class="goods"
            v-if="goodsDialogVisible"
            :dialogVisible="goodsDialogVisible" 
            @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
            </div>
                
        </crmScroll>
            
    <!-- </div> -->
</template>

<script>
    import detailDynamic from '@Main/crm/components/detail.dynamic.vue'
    import detailContacts from '@Main/crm/components/detail.contacts.vue'
    // import detailBusiness from '@Main/crm/components/detail.business.vue'
    // import detailOrder from '@Main/crm/components/detail.order.vue'
    import detailFollowrecord from '@Main/crm/components/detail.followrecord.vue'
    // import detailFollowplan from '@Main/crm/components/detail.followplan.vue'
    import detailFollowplanOpp from '@Main/crm/components/detail.followplan.opp.vue'
    import detailCrmDynamicOpp from '@Main/crm/components/detail.crm.dynamic.opp.vue'

    import dialogCreateBusiness from '@Main/crm/components/dialog.create.business.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'
    //订单tab
    import orderTab from '@Main/crm/order.vue'
    import crmScroll from '@Main/crm/components/crmScroll.vue'

    import cService from '@Main/crm/crm_service.js'
    //获取跟进数据数量
    import {oppPageNum} from '@Main/crm/getData'
    import { setTimeout } from 'timers';
    export default{
        components: {
            detailDynamic,
            detailContacts,
            // detailBusiness,
            detailFollowrecord,
            detailFollowplanOpp,
            orderTab,
            detailCrmDynamicOpp,            
            dialogCreateBusiness,
            dialogChooseGoods,
            crmScroll
        },
        methods:{
            // scrollData(){
            //     if(this.activeName == 'file' && this.fileScrollStatu){
            //         this.$refs['orderPage'].reloadTable({});
            //     }
            // },
            getScroll(status){
                if(this.activeName == 'file' && this.fileScrollStatu){
                    this.$refs['orderPage'].reloadTable({});
                }
            },
            //调接口数字接口和初始化客户
            cli(){
                //获取跟进数量
                this.oppPageNumData(this.followPlan)
            },

            setTotal(obj){
                this.orderTotal = "订单(" + obj.orderCount + ")";
                this.dynamicTotal = "动态(" + obj.changeCount + ")";
                // this.followPlanTotal = "跟进计划(" + obj.followHisCount + ")";
                // this.followRecodeTotal = "跟进记录(" + obj.followPlanCount + ")";
            },
            
            //客户详情页数量
            async oppPageNumData({customerId = '',opportunityId}= {}){
                let res = await oppPageNum(customerId,opportunityId)
                console.log('商机详情',res[0]);
                this.dynamicTotal = "动态(" + res[0].changeCount + ")";
                this.orderTotal = "订单(" + res[0].orderCount + ")";

                this.followHisCount=res[0].followHisCount

                this.followPlanCount=res[0].followPlanCount
            },
            //tab切换
            tab(tab,event){
                // this.$router.push({
                //     path: '/crm/business/details/'+this.$route.params.id,
                //     query: {page: this.activeName,customer:this.$route.query.customer,contact:this.contactId}
                // })
                let path = "/#" + this.$route.path + 
                            "?page=" + this.activeName + 
                            "&customer=" + this.$route.query.customer + 
                            "&contact=" + this.contactId;
                let my = this;
                window.history.replaceState({data:111},null,path);
                if(this.activeName == 'dynamic'){
                    if(this.oldActiveName == this.activeName){
                        my.$refs['dynamicPage'].initPage();
                    }
                }
                else if(this.activeName == 'file'){
                    //订单滚动监听
                    this.scrollStatus = true;
                    let my = this;
                    if(this.oldActiveName == this.activeName){
                        // if(my.$refs['orderPage']){
                        //     my.$refs['orderPage'].reset();
                        // }
                        setTimeout(()=>{
                            my.$refs['orderPage'] && my.$refs['orderPage'].reset && my.$refs['orderPage'].reset();
                        },0)
                        // this.reload();
                    }
                    
                    
                }else{
                    this.scrollStatus = false;
                }
                this.oldActiveName = this.activeName;
                if(tab.name=="participants"){
                    this.participantsShow=true;
                    // this.$nextTick(function(){
                        this.$refs.dynamic.customerFollowRecordData({ 
                            customerId : this.customerId,
                            contactId : '' ,
                            opportunityId : this.opportunityId,
                            planId:'',
                            pageNum : '1',
                            pageCount : '10'
                        })
                    // })
                    this.approvalShow=false;
                    //获取跟进数量
                    this.oppPageNumData(this.followPlan)
                }else if(tab.name=="approval"){
                    // this.$nextTick(function(){
                        this.$refs.followplan.customerFollowPlanData({ 
                            customerId : this.customerId,
                            contactId : '' ,
                            opportunityId : this.opportunityId,
                            pageNum : '1',
                            pageCount : '10',
                            contactName:'',
                            startTime:'', 
                            endTime:'', 
                        })
                    // })
                    this.approvalShow=true;
                    this.participantsShow=false;
                    //获取跟进数量
                    // this.oppPageNumData(this.followPlan)
                }
                
            },

            getTotal(customerId,opportunityId){
                cService.getStatistical({
                            customerId:customerId,
                            opportunityId:opportunityId,
                        }).then( (res)=>{
                            if(res.status == 200){
                                this.setTotal(res.result);
                            }
                        })
            },
           isShow (){
               this.showList = !this.showList;
           },
           showEdit(){
               this.businessDialogVisible  = !this.businessDialogVisible;
           },
           del(){
               JZY.u.warningMsg('您确认删除此商机吗?',true)
                  .then(() => {
                    cService.delBusiness({id:this.$route.params.id }).then((data) =>{
                        this.$message(data.message);
                        if(data.status == "200"){
                            this.back();
                        }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
                
           },
           back(){
               this.$router.go(-1);
           },
           //选择物品的弹窗
            showGoodsDialog(){
                this.goodsDialogVisible = true;
            },
            //选择物品的弹窗
            closeGoodsDialog(item){
                this.goodsDialogVisible = false;
            },
            showBusinessDialog(){
                this.businessDialogVisible = !this.businessDialogVisible;
            },
            reloadBusinessFn(){
                this.getDetails();
                this.$refs['attachFile'].getFilesList();
                
            },
            getDetails(){
                this.opportunityId = this.$route.params.id;
                cService.getOpportunities(this.opportunityId).then( (data) =>{
                        this.setDynamic = true;
                        let d = data[0];
                        this.contactId=d.contactId;
                        d.opportunityId = d.sid;
                        d.actType = "modify";
                        this.businessDetail = d;
                        let stageName = "";

                        this.customer = {
                            name : this.businessDetail.customerName,
                            sid : this.businessDetail.customerId
                        }

                        switch (d.stage){
                            case 0:
                            stageName = "立项";
                            break;
                            case 1:
                            stageName = "初步沟通";
                            break;
                            case 2:
                            stageName = "需求商定";
                            break;
                            case 3:
                            stageName = "方案报价";
                            break;
                            case 4:
                            stageName = "赢单";
                            break;
                            case 5:
                            stageName = "输单";
                            break;
                        }
                        d.estimateDealTime = d.estimateDealTime? d.estimateDealTime.split(" ")[0] : '';
                        
                        this.details.info = [
                            {
                            name:"客户名称",
                            text:d.customerName
                            },
                            {
                                name:"创建于",
                                text:d.createDate
                            },
                            {
                                name:"联系人",
                                text:d.contactName
                            },
                            {
                                name:"手机号码",
                                text:d.phoneNumber
                            },
                            {
                                name:"预订成交额",
                                text:d.estimateAmount + "元"
                            },{
                                name:"预计成交日期",
                                text:d.estimateDealTime
                            },{
                                name:"商机阶段",
                                text:stageName
                            },{
                                name:"负责人",
                                text:d.personInChargeName
                            }
                        ]
                        this.orderCustomerName = {
                            name:d.customerName,
                            sid:d.customerId
                        };
                        this.setOrderOpportunities = {
                            name:d.name,
                            sid:this.opportunityId
                        }
                        this.getTotal(d.customerId,this.opportunityId);
                    })
                    this.setDynamic = false;
            }
        },
        data(){
            return {
                // scrollEnd:false,
                fileScrollStatu:true,
                scrollStatus:false,
                setDynamic:false,
                participantsShow:false,
                approvalShow:false,
                followHis:{},
                followPlan:{},
                followHisCount:'',
                followPlanCount:'',
                contactId:'',
                orderTotal:"订单(0)",
                dynamicTotal:"动态(0)",
                followRecodeTotal:'跟进记录(0)',
                followPlanTotal:'跟进计划(0)',
                customer:{},
                typePage:'opportunity',
                customerId : this.$route.query.customer,
                opportunityId : this.$route.params.id,
                businessDetail:{
                    attachmentParam :{
                        app:null,
                        businessId:null,
                        category:null
                    }                    
                },
                followDialogVisible:false,
                goodsDialogVisible:false,
                businessDialogVisible:false,
                orderCustomerName:{},   //客户名称传递给订单tab
                orderTabTitle:true,
                activeName: this.$route.query.page || 'dynamic',
                showList:false,
                details:{
                    info : [
                        {
                            name:"客户名称",
                            text:""
                        },
                        {
                            name:"创建于",
                            text:""
                        },
                        {
                            name:"联系人",
                            text:""
                        },
                        {
                            name:"联系电话",
                            text:""
                        },
                        {
                            name:"预订成交额",
                            text:""
                        },{
                            name:"预计成交时间",
                            text:""
                        },{
                            name:"商机阶段",
                            text:""
                        },{
                            name:"负责人",
                            text:""
                        }
                    ]
                }
            }
        },
        computed:{
            
        },
        watch:{

        },
        async mounted(){
            this.oldActiveName = this.activeName;

            if(this.$route.query.page == 'file'){
                this.scrollStatus = true;
            }
            //获取商机详情
            this.getDetails();

            //获取跟进记录id
            let customerId=this.$route.query.customer;
            let opportunityId=this.$route.params.id;
            if(customerId==undefined){
                return false;
            }else{
                this.followPlan={
                    customerId : customerId,
                    opportunityId : opportunityId
                };
                this.followHis={
                    customerId : customerId,
                    opportunityId : opportunityId
                };
                //获取跟进数量
                this.oppPageNumData(this.followPlan)
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" >
    @import './crmcss/crm_common.scss'

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import './crmcss/css.scss'

</style>

<template>
    <crmScroll class="wrap" ref="scroll" @scoll="getScroll" :status.sync="scrollStatus">
        <div slot="content">
            <!-- <div class="wrap"> -->
                <div class="top-wrap">
                    <div class="title-wrap">
                        <div style="width: 84%; padding-left:14px; display: inline-block;">
                        <div :title="this.details.name" style="max-width:93%; font-family: MicrosoftYaHei; font-size: 14px; color: #191919; letter-spacing: 0; vertical-align: text-bottom; display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" class="title-name">
                        {{this.details.name}}
                        </div>
                        <div v-if="this.details.statusName? true : false" class="statusStyle" style="display:inline-block;">
                            <p>{{this.details.statusName}}</p>
                        </div>
                        </div>
                        
                        <div  class="operate_buttons">
                            <ul>
                                <li>
                                    <el-dropdown @command="opeSel">
                                        <el-button type="primary" size="small" >
                                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command='0'>编辑</el-dropdown-item>
                                            <el-dropdown-item command='1' v-if="funSet">分配</el-dropdown-item>
                                            <el-dropdown-item command='2'>{{this.keyName}}</el-dropdown-item>
                                            <el-dropdown-item command='3'>{{this.failName}}</el-dropdown-item>
                                            <el-dropdown-item command='4'>作废</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                </li>
                                <li class="back">
                                    <el-button @click="back" type="primary" size="small">返回</el-button>
                                </li>
                            </ul>
                            <!-- <el-button @click="showEdit">编辑</el-button>
                            <el-button @click="del">删除</el-button>
                            <el-button @click="back">返回</el-button> -->
                        </div> 
                    </div>
                    <div class="content-list-wrap" :class="{hiddenClass:!showList}">
                        <el-row>
                            <!-- <el-col :span="6"  v-for ="(item,index) in details.info" v-bind:key="index" class="items">
                                <div class="grid-content">
                                <span class="name">{{item.name}}：</span><span class="text">{{item.text}}</span>
                                </div>
                            </el-col> -->
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">负责人：</span><span class="text">{{this.details.ownerPersonName}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">客户来源：</span><span class="text">{{this.details.source}}</span>
                                </div>
                            </el-col>
                            
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">客户类型：</span><span class="text">{{this.details.type}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">创建于：</span><span class="text">{{this.details.createDate}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">联系电话：</span><span class="text">{{this.details.phoneNumber}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">电子邮件：</span><span class="text">{{this.details.email}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">企业网站：</span><span class="text">{{this.details.webSite}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">联系地址：</span><span class="text">{{this.details.address}}</span>
                                </div>
                            </el-col>
                            <!-- <el-col :span="6" class="items">
                                <div class="grid-content">
                                <span class="name">负责人：</span><span class="text" >{{this.details.contacts}}</span>
                                </div>
                            </el-col> -->
                            
                            
                            
                            <!-- <el-col :span="6" class="items" style="width:100%;">
                                <div class="grid-content">
                                <span class="name">共享人：</span> -->
                                <!-- <span class="text" v-for='item in this.details.salesmans'>{{item.salesmanName}}</span> -->
                                <!-- <span class="text" >{{this.details.salesmans}}</span>
                                </div>
                            </el-col> -->
                            <el-col :span="6" class="items" style="width:100%;">
                                <div class="grid-content">
                                <span class="name">备注：</span><p class="text" v-html="details.comment"></p>
                                </div>
                            </el-col>
                            <el-col :span="6" class="items" style="width:100%;">
                                <div class="grid-content">
                                <span class="name">附件：</span>
                                <attach-upload
                                        :multiple="false"
                                        :readonly="true"
                                        @fileQueued="handleAttachQueued"
                                        @uploadError="handleAttachError"
                                        @uploadFinished="handleAttachUploadSuccess"
                                        :required="false"
                                        ref="attachUpload"
                                        :appId="this.details.appId"
                                        :businessId="this.details.businessId"
                                        :categoryId="this.details.categoryId">
                                </attach-upload>
                                <!-- <span class="down">
                                    <p>
                                        <span style="font-family:'PingFangSC-Regular', 'PingFang SC';">客户资料.</span>
                                        <span style="font-family:'Arial Normal', 'Arial';">rar</span>
                                        <span><i class="el-icon-download"></i></span>
                                    </p>
                                </span> -->
                                </div>
                            </el-col>
                        </el-row>
                        <div class="o-bt" @click="isShow()">
                            <span class="el-icon-arrow-down"></span>
                            <!-- <span>查看详情</span> -->
                        </div>
                    </div>
                </div>
                <div class="customer-detail-tab">
                    <el-tabs v-model="activeName" @tab-click="tab">
                        <el-tab-pane :label="'动态 '+this.changeCount+''"  name="dynamic">
                            <detail-dynamic-customer ref="dynamicScroll" v-if="dynamicShow"></detail-dynamic-customer>
                        </el-tab-pane>
                        <el-tab-pane :label="'联系人 '+this.contactCount+''" name="Contacts">
                        <detail-contacts-customer ref="contactsScroll" :custoName="this.details.name" v-if="contactsShow" @getNum="getNum" @cliNewData="cliNewData"></detail-contacts-customer>
                        </el-tab-pane>
                        <el-tab-pane :label="'商机 '+this.opportunityCount+''" name="task">
                                <!-- <detail-business></detail-business> -->
                            <businessTab ref='taskPage' 
                            @cli="cliBusiness"
                            class="crm_b_pwrap"
                            :noscrollStatu="true"
                            v-if="activeName=='task'&& orderCustomerName.sid" 
                            :customerId="orderCustomerName" @setTotal="setTotal"></businessTab>
                        </el-tab-pane>
                        <el-tab-pane :label="'订单 '+this.orderCount+''" name="file" >
                        <!-- <detail-order></detail-order> -->
                            <orderTab 
                            @cli="cli" 
                            ref='orderPage' 
                            :noscrollStatu="true"
                            v-if="activeName=='file'&&orderCustomerName.sid" 
                            :showTabTitle="orderTabTitle"  @setTotal="setTotal" :customerName="orderCustomerName"
                            style="padding:0;"
                             ></orderTab>

                        </el-tab-pane>
                        <el-tab-pane :label="'跟进记录 '+this.followHisCount+''" name="participants">
                            <detail-crm-dynamic ref="participantsScroll" v-if="participantsShow" @cli="cli"></detail-crm-dynamic>
                        </el-tab-pane>
                        <el-tab-pane :label="'跟进计划 '+this.followPlanCount+''" name="approval">
                            <detail-followplan-customer ref="approvalScroll"  v-if="approvalShow" @getNum="getNum"  @cli="cli"></detail-followplan-customer>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <dialog-update-customer v-if="customerDialogVisibleUpdate"  ref="reftest" :dialogVisible="customerDialogVisibleUpdate"  @closeCreateModal="closeCustomerDialogUpdate"></dialog-update-customer>
                <dialog-assign-users-single v-if="assignDialogVisibleSingle" :queryData="queryData" ref="refdestSingle" :dialogVisible="assignDialogVisibleSingle"  @closeCreateModal="closeAssignDialogSingle" @closeDist="closeDisSin"></dialog-assign-users-single>
            <!-- </div> -->
        </div>
    </crmScroll>    
    
</template>

<script>
    import dialogAssignUsersSingle from '@Main/crm/components/dialog.assign.users.single.vue'
    import dialogUpdateCustomer from '@Main/crm/components/dialog.update.customer.vue'
    import detailDynamicCustomer from '@Main/crm/components/detail.dynamic_customer.vue'
    import detailContactsCustomer from '@Main/crm/components/detail.contacts_customer.vue'
    import detailBusiness from '@Main/crm/components/detail.business.vue'
    import detailOrder from '@Main/crm/components/detail.order.vue'
    import detailFollowrecord from '@Main/crm/components/detail.followrecord.vue'
    import detailFollowplanCustomer from '@Main/crm/components/detail.followplan_customer.vue'
    import detailCrmDynamic from '@Main/crm/components/detail.crm.dynamic.vue'
    import {modifyCustomer,voidCustomer,keyCustomer,failCustomer,cusPageNum} from '@Main/crm/getData'
   //订单tab
    import orderTab from '@Main/crm/order.vue'
    import businessTab from '@Main/crm/business.vue'
    //滚动加载
    import crmScroll from '@Main/crm/components/crmScroll.vue'

    export default{
        components: {
            detailDynamicCustomer,
            detailContactsCustomer,
            detailBusiness,
            // detailOrder,
            detailFollowrecord,
            detailFollowplanCustomer,
            detailCrmDynamic,
            orderTab,
            businessTab,
            dialogUpdateCustomer,
            dialogAssignUsersSingle,
            crmScroll
        },
        methods:{
            //关闭分配页面
            closeDisSin(){
                this.assignDialogVisibleSingle  = false;
            },
            getScroll(status){
                if(this.activeName == 'file' && this.$refs['orderPage'].noscrollStatu){
                    this.$refs['orderPage'].reloadTable({});
                }else if(this.activeName == 'task'&& this.$refs['taskPage'].noscrollStatu){
                    this.$refs['taskPage'].reloadBusinessList({});
                }
            },
            //调接口数字接口和初始化客户
            cli(){
                this.cusPageNumData({'customerId':this.customerId})
                this.modifyCustomerData(this.customerId); 
            },
            cliBusiness(){
                this.cusPageNumData({'customerId':this.customerId})
                this.modifyCustomerData(this.customerId); 
                this.$refs.taskPage.reloadBusinessFn()
            },
            cliNewData(){
                this.cusPageNumData({'customerId':this.customerId})
                this.modifyCustomerData(this.customerId); 
            },
            getNum(){
                this.cusPageNumData({'customerId':this.customerId})
            },
            setTotal(obj){
                this.orderCount =  obj.orderCount ;
                this.opportunityCount =  obj.opportunityCount ;
            },
            //客户详情页数量
            async cusPageNumData({customerId = ''}= {}){
                let res = await cusPageNum(customerId)
                console.log('数量',res[0]);
                console.log("动态数量",res[0].changeCount);
                this.changeCount=res[0].changeCount
                console.log("联系人数量",res[0].contactCount);
                this.contactCount=res[0].contactCount
                console.log("商机数量",res[0].opportunityCount);
                this.opportunityCount=res[0].opportunityCount
                console.log("订单数量",res[0].orderCount);
                this.orderCount=res[0].orderCount
                console.log("跟进记录数量",res[0].followHisCount);
                this.followHisCount=res[0].followHisCount
                console.log("跟进计划数量",res[0].followPlanCount);
                this.followPlanCount=res[0].followPlanCount
            },
            //展示分配
            showAssignDialogSingle(customerId,ownerPersonId,ownerPersonName){
                this.assignDialogVisibleSingle=true;
                this.$nextTick(function(){
                    this.$refs.refdestSingle.destSingle(customerId,ownerPersonId,ownerPersonName)
                })
            },
            closeAssignDialogSingle(){
                this.assignDialogVisibleSingle  = false;
                this.modifyCustomerData(this.customerId); 
            },
            //展示编辑
            showCustomerDialogUpdate(sid){
                this.customerDialogVisibleUpdate  = true;
                this.modifyCustomerData(this.customerId); 
                this.$nextTick(function(){
                    this.$refs.reftest.test(this.editData)
                }) 
            },
               
            closeCustomerDialogUpdate(){
                this.customerDialogVisibleUpdate  = false;
                this.modifyCustomerData(this.customerId); 
                // let pageNum=this.pageNum;
                // let pageCount=this.pageCount;
                // this.contomerData({
                //     'pageNum':pageNum,
                //     'pageCount':pageCount,
                // });
            },
            //作废
            async voidCustomerData(sid){
                let res = await voidCustomer(sid)
                console.info('作废',res[0])
                JZY.u.successMsg('设置成功');
                this.$router.go(-1);
                // let pageNum=this.pageNum;
                // let pageCount=this.pageCount;
                // this.contomerData({
                //     'pageNum':pageNum,
                //     'pageCount':pageCount,
                // });
            },
            //标记重点
            async keyCustomerData({customerId = ''}= {}){
                let res = await keyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        this.$router.push({
                            path: '/crm/customer',
                            // query: {customerId:this.$route.query.customerId}
                        })
                    }   
                })
                console.log('重点',res[0]);
                JZY.u.successMsg('设置成功');
                this.modifyCustomerData(this.customerId);
                if(this.details.statusName=="重点跟进"){
                    this.keyName="取消重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="失败"){
                    this.keyName="重点跟进"
                    this.failName="取消失败"
                }else if(this.details.statusName=="跟进中"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="未跟进"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="已签约"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }
            },
            //标记失败
            async failCustomerData({customerId = ''}= {}){
                let res = await failCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        this.$router.push({
                            path: '/crm/customer',
                            // query: {customerId:this.$route.query.customerId}
                        })
                    }   
                })
                console.log('失败',res[0]);
                JZY.u.successMsg('设置成功');
                this.modifyCustomerData(this.customerId);
                if(this.details.statusName=="重点跟进"){
                    this.keyName="取消重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="失败"){
                    this.keyName="重点跟进"
                    this.failName="取消失败"
                }else if(this.details.statusName=="跟进中"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="未跟进"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="已签约"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }
            },
            opeSel(num){
                if(num==0){
                    this.showCustomerDialogUpdate(this.customerId)
                }else if(num==1){
                    this.showAssignDialogSingle(this.customerId,this.details.ownerPersonId,this.details.ownerPersonName)
                }else if(num==2){
                    this.keyCustomerData({'customerId':this.customerId})
                }else if(num==3){
                    this.failCustomerData({'customerId':this.customerId})
                }else if(num==4){
                    this.$confirm('您确认作废?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.voidCustomerData(this.customerId).catch((e)=>{
                            if(e.status !==200){
                                this.$router.push({
                                    path: '/crm/customer',
                                    // query: {customerId:this.$route.query.customerId}
                                })
                            }   
                        });
                        }).catch(() => {
                            this.$message({
                            type: 'info',
                            message: '已取消'
                            }); 
                    });  
                }
            },
            //附件上传方法
            handleAttachError(){
              alert('附件上传出错啦')
            },
            handleAttachQueued(){
                // alert('add one new attach file')
              this.isAttachUploadFinished=false
            },
            handleAttachUploadSuccess(res){
                this.isAttachUploadFinished=true
            //   alert('全部上传成功,返回信息请查看控制台显示')
              console.log('附件上传成功返回信息：',res)
            },
            //tab切换
            tab(tab,event){
                this.scrollStatus = false; 
                if(tab.name=="dynamic"){
                    // this.$router.push({
                    //     path: '/crm/customer/details',
                    //     query: {customerId:this.$route.query.customerId,activeName:'dynamic'}
                    // })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&activeName=" +"dynamic";
                    location.replace(newUrl);

                    this.dynamicShow=false;
                    this.$nextTick(function(){
                        this.dynamicShow=true;
                    })
                    this.contactsShow=false;
                    this.taskShow=false;
                    this.fileShow=false;
                    this.participantsShow=false;
                    this.approvalShow=false;
                    this.cusPageNumData({'customerId':this.customerId})
                }else if(tab.name=="Contacts"){
                    // this.$router.push({
                    //     path: '/crm/customer/details',
                    //     query: {customerId:this.$route.query.customerId,activeName:'Contacts'}
                    // })
                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&activeName=" +"Contacts";
                    location.replace(newUrl);

                    this.dynamicShow=false;
                    this.contactsShow=false;
                    this.$nextTick(function(){
                        this.contactsShow=true;
                    })
                    this.taskShow=false;
                    this.fileShow=false;
                    this.participantsShow=false;
                    this.approvalShow=false;
                    this.cusPageNumData({'customerId':this.customerId})
                }else if(tab.name=="task"){
                //    this.$router.push({
                //             path: '/crm/customer/details',
                //             query: {customerId:this.$route.query.customerId,activeName:'task'}
                //         })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&activeName=" +"task";
                    location.replace(newUrl);

                    this.dynamicShow=false;
                    this.contactsShow=false;
                    this.taskShow=false;
                    this.$nextTick(function(){
                        this.taskShow=true;
                    })
                    this.fileShow=false;
                    this.participantsShow=false;
                    this.approvalShow=false;
                    this.cusPageNumData({'customerId':this.customerId});
                    let my = this;
                    my.scrollStatus = true;
                    //商机重置刷新
                    if(this.oldActiveName == this.activeName){
                        // if(my.$refs['taskPage']){
                        //     my.$refs['taskPage'].resetForm("");
                        // }
                       
                    }
                    
                }else if(tab.name=="file"){
                    // this.$router.push({
                    //         path: '/crm/customer/details',
                    //         query: {customerId:this.$route.query.customerId,activeName:'file'}
                    //     })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&activeName=" +"file";
                    location.replace(newUrl);

                    this.dynamicShow=false;
                    this.contactsShow=false;
                    this.taskShow=false;
                    this.fileShow=false;
                    this.$nextTick(function(){
                        this.fileShow=true;
                    })
                    this.participantsShow=false;
                    this.approvalShow=false;
                    this.cusPageNumData({'customerId':this.customerId});
                    let my = this;
                    //订单页面重置刷新
                    my.scrollStatus = true;
                    if(this.oldActiveName == this.activeName){
                        // if(my.$refs['orderPage']){
                        //     my.$refs['orderPage'].reset();
                        // }
                    }
                    
                }else if(tab.name=="participants"){
                    // this.$router.push({
                    //     path: '/crm/customer/details',
                    //     query: {customerId:this.$route.query.customerId,activeName:'participants'}
                    // })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&activeName=" +"participants";
                    location.replace(newUrl);

                    this.dynamicShow=false;
                    this.contactsShow=false;
                    this.taskShow=false;
                    this.fileShow=false;
                    this.participantsShow=false;
                    this.$nextTick(function(){
                        this.participantsShow=true;
                    })
                    this.approvalShow=false;
                    this.cusPageNumData({'customerId':this.customerId})
                }else if(tab.name=="approval"){
                    // this.$router.push({
                    //     path: '/crm/customer/details',
                    //     query: {customerId:this.$route.query.customerId,activeName:'approval'}
                    // })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&activeName=" +"approval";
                    location.replace(newUrl);

                    this.dynamicShow=false;
                    this.contactsShow=false;
                    this.taskShow=false;
                    this.fileShow=false;
                    this.participantsShow=false;
                    this.approvalShow=false;
                    this.$nextTick(function(){
                        this.approvalShow=true;
                    })
                    this.cusPageNumData({'customerId':this.customerId})
                }
                this.oldActiveName = this.activeName;
            },
            // 修改初始化
             async modifyCustomerData(sid){
                let res = await modifyCustomer(sid).catch((e)=>{
                    if(e.status !==200){
                        this.$router.push({
                            path: '/crm/customer',
                            // query: {customerId:this.$route.query.customerId}
                        })
                    }   
                })
                console.info(res[0])
                this.editData=res[0];
                
                console.log('客户来源',res[0].source);
                // console.log('创建于',res[0].source);
                console.log('客户类型',res[0].type);
                console.log('联系电话',res[0].phoneNumber);
                console.log('负责人',res[0].contacts);
                console.log('电子邮件',res[0].email);
                console.log('联系地址',res[0].address);
                console.log('企业网站',res[0].webSite);
                console.log('共享人',res[0].salesmans);
                console.log('备注',res[0].comment);
                // console.log('附件',res[0].source);
                this.details.name=res[0].name;
                // 商机和订单参数
                this.orderCustomerName = {
                    name:this.details.name,
                    sid:sid
                };
                // 商机和订单参数
                this.details.phoneNumber=res[0].phoneNumber;
                this.details.email=res[0].email;
                this.details.address=res[0].address;
                this.details.webSite=res[0].webSite;
                // this.details.salesmans=res[0].salesmans;
                res[0].salesmans.forEach((item)=>{
                    this.details.salesmans.push(
                        // salesmanName:item.salesmanName
                        item.salesmanName
                    )
                })
                console.log(this.details.salesmans);

                this.details.status=res[0].status;
                console.log('状态',this.details.status);
                if(this.details.status==0){
                    this.details.statusName='未跟进';
                }else if(this.details.status==1){
                    this.details.statusName='跟进中';
                }else if(this.details.status==2){
                    this.details.statusName='重点跟进';
                }else if(this.details.status==3){
                    this.details.statusName='已签约';
                }else if(this.details.status==4){
                    this.details.statusName='失败';
                }


                if(this.details.statusName=="重点跟进"){
                    this.keyName="取消重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="失败"){
                    this.keyName="重点跟进"
                    this.failName="取消失败"
                }else if(this.details.statusName=="跟进中"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="未跟进"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }else if(this.details.statusName=="已签约"){
                    this.keyName="重点跟进"
                    this.failName="失败"
                }

                // this.details.contacts=res[0].contacts;
                res[0].contacts.forEach((item)=>{
                    this.details.contacts.push(
                        // salesmanName:item.salesmanName
                        item.name
                    )
                })
                console.log(this.details.contacts);
                console.log('备注信息',res[0].comment);
                if(res[0].comment==null || res[0].comment==''){
                    this.details.comment="";
                }else{
                    this.details.comment=res[0].comment.replace(/\n/g, "<br/>");
                }
                
                // this.details.comment=res[0].comment;
                // this.details.phoneNumber=res[0].phoneNumber;
                // this.details.phoneNumber=res[0].phoneNumber;

                //来源
                if(res[0].source==0){
                     this.details.source="网站"
                 }else if(res[0].source==1){
                     this.details.source="百度推广"
                 }else if(res[0].source==2){
                     this.details.source="会销"
                 }else if(res[0].source==3){
                     this.details.source="微信"
                 }else if(res[0].source==4){
                     this.details.source="地推"
                 }else if(res[0].source==9 || res[0].source==5){
                     this.details.source="其他"
                 }

                //类型
                if(res[0].type==0){
                    this.details.type='一般客户';
                }else if(res[0].type==1){
                    this.details.type='潜在客户';
                }else if(res[0].type==2){
                    this.details.type='普通客户';
                }else if(res[0].type==3){
                    this.details.type='vip客户';
                };

                // 新加的
                this.details.ownerPersonId=res[0].ownerPersonId;
                this.details.ownerPersonName=res[0].ownerPersonName;
                this.details.createDate=res[0].createDate;
                this.details.attachmentParam=res[0].attachmentParam;

                this.details.appId=this.details.attachmentParam.app;
                this.details.businessId=this.details.attachmentParam.businessId;
                this.details.categoryId=this.details.attachmentParam.category;
            },
           isShow (){
               if($(".o-bt").children().attr("class")=="el-icon-arrow-down"){
                   $(".o-bt").children().attr("class","el-icon-arrow-up")
               }else{
                   $(".o-bt").children().attr("class","el-icon-arrow-down")
               }
               this.showList = !this.showList;
            //    this.$refs.dynamicScroll.setScroll();
            //    this.$refs.contactsScroll.setScroll();
            //    this.$refs.participantsScroll.setScroll();
            //    this.$refs.approvalScroll.setScroll();
           },
           showEdit(){

           },
           del(){

           },
           back(){
            //    this.$router.push({
            //         path: '/crm/customer',
            //     })
                this.$router.go(-1);
           }
        },
        data(){
            
            return {
                funSet:false,
                scrollStatus: (this.$route.query.activeName=='file' || this.$route.query.activeName=='task') ? true:false,
                changeCount:"",
                contactCount:"",
                opportunityCount:"",
                orderCount:"",
                followHisCount:"",
                followPlanCount:"",
                keyName:"",
                failName:"",
                queryData:{},
                assignDialogVisibleSingle:false,
                customerDialogVisibleUpdate:false,
                editData:[],
                dynamicShow:true,
                contactsShow:false,
                taskShow:false,
                fileShow:false,
                participantsShow:false,
                approvalShow:false,

                customerId:"",
                orderTabTitle:true,
                orderCustomerName:{},   //客户名称传递给订单tab
                recordformDialogVisible:false,
                activeName: this.$route.query.activeName || 'dynamic' ,
                showList:false,
                details:{
                    ownerPersonId:'',
                    ownerPersonName:'',
                    createDate:'',
                    attachmentParam:{},
                    source:'',
                    createDate:'',
                    type:'',
                    phoneNumber:'',
                    contacts:[],
                    email:'',
                    address:'',
                    webSite:"",
                    salesmans:[],
                    comment:"",
                    enclosure:'',
                    name:'',
                    status:'',
                    statusName:'',
                    appId:'',
                    businessId:'',
                    categoryId:''
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal1: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal2: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal3: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        computed:{
            
            
        },
        watch:{
        },
        mounted(){   
        },
      created(){
            let roleMenus=this.$store.state.session.tenantInfo.roleMenus;
            if(roleMenus.length !==0){
                roleMenus.forEach((item) => {
                    console.log(item.code);
                    if(item.code=="crm_manage"){
                            this.funSet=true;
                    }
                });
            }else if(roleMenus.length==0){
                this.funSet=true;
            }

          // let sid=this.$route.params.id;
            this.oldActiveName = this.activeName;
            let sid=this.$route.query.customerId;
            this.customerId = sid;
            this.modifyCustomerData(sid); 
            this.cusPageNumData({'customerId':this.customerId})
            
            let activeName=this.$route.query.activeName;
            if(activeName=="dynamic"){
                this.dynamicShow=true;
                this.contactsShow=false;
                this.taskShow=false;
                this.fileShow=false;
                this.participantsShow=false;
                this.approvalShow=false;
            }else if(activeName=="Contacts"){
                this.dynamicShow=false;
                this.contactsShow=true;
                this.taskShow=false;
                this.fileShow=false;
                this.participantsShow=false;
                this.approvalShow=false;
            }else if(activeName=="task"){
                this.dynamicShow=false;
                this.contactsShow=false;
                this.taskShow=true;
                this.fileShow=false;
                this.participantsShow=false;
                this.approvalShow=false;
            }else if(activeName=="file"){
                this.dynamicShow=false;
                this.contactsShow=false;
                this.taskShow=false;
                this.fileShow=true;
                this.participantsShow=false;
                this.approvalShow=false;
            }else if(activeName=="participants"){
                this.dynamicShow=false;
                this.contactsShow=false;
                this.taskShow=false;
                this.fileShow=false;
                this.participantsShow=true;
                this.approvalShow=false;
            }else if(activeName=="approval"){
                this.dynamicShow=false;
                this.contactsShow=false;
                this.taskShow=false;
                this.fileShow=false;
                this.participantsShow=false;
                this.approvalShow=true;
            }
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .top-wrap{
            margin-bottom: 10px;
            position: relative;
            .operate_buttons {
                float: right;
                margin-top: 4px;
                // .back button{padding-top: 12px; padding-bottom: 12px;} 
                li{
                    float: left;
                    margin-right: 12px;
                }
            }
            .title-wrap{
                margin-bottom:16px;
                position: relative;
                border-bottom:1px solid #ebeef5;
                padding:10px;
                .title-name{font-size:20px;font-weight: bold; color:#333;}
                .operate-box{position: absolute; right:10px;bottom:3px;}
                .statusStyle p{
                    line-height:20px;
                    width:53px;
                    height:20px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    color: #F05A5A;
                    letter-spacing: 0;
                    margin-left: 14px;
                    text-align: center;
                }
            }
            .content-list-wrap{
                margin-left:24px;
                .items{float: left; width:29%; line-height: 1.5em;
                        font-size:13px;
                        box-sizing: border-box;
                        display: -webkit-box;
                        padding:10px;
                        .name{font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
                        .text{font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
                        .down p{width: 114; height: 16px; padding-top: 7px; padding-bottom: 7px; padding-left: 5px; padding-right: 5px; display: inline-block; background-color: rgba(242, 242, 242, 1);}
                    }
                .o-bt{
                    text-align: center;
                    color:#2E9CFF;
                    cursor: pointer;
                    font-size:14px;
                    // .el-icon-arrow-up{ color:#fff;
                    // background:#2E9CFF; 
                    // width:18px;height:18px;border-radius: 50%}
                }
            }
            .content-list-wrap.hiddenClass{ 
                position: relative;
                .el-row{width:90%;    overflow: hidden;
                height: 30px;}
                .o-bt{
                    position: absolute;
                    right:24px;
                    top: 10px;
                }
            }
        }
        .customer-detail-tab{
            padding:20px 20px 0px 20px;
            background:#fff;
        }

    }

</style>
<style  rel="stylesheet/scss" lang="scss" scoped>
    @import './crmcss/css.scss'
</style>
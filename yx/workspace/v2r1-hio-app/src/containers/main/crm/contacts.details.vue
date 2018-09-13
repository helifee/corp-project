<template>
    <div class="wrap">
        <div class="top-wrap">
            <div class="title-wrap">
                <div style="width: 84%; height:44px; line-height:44px; padding-left:14px; display: inline-block;">
                <div :title="this.details.name" style="max-width:93%; font-family: MicrosoftYaHei; font-size: 14px; color: #191919; letter-spacing: 0; vertical-align: text-bottom; display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" class="title-name">
                {{this.details.name}}
                </div>
                <div v-if="this.details.statusName? true : false" class="statusStyle" style="display:inline-block;">
                     <p>{{this.details.statusName}}</p>
                </div>
                </div>
                
                <div class="operate-box">
                    <el-button type="primary" size="small" @click="showContactsDialogDel(customerId,contcatId)">编辑</el-button>
                    <el-button type="primary" size="small" @click="delMethod(customerId,contcatId)">删除</el-button>
                    <el-button type="primary" size="small" @click="back">返回</el-button>
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
                        <span class="name">客户名称：</span><span class="text">{{this.details.customerName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">手机号码：</span><span class="text">{{this.details.phoneNumber}}</span>
                        </div>
                    </el-col>
                    
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">决策关系：</span><span class="text">{{this.details.decisionRole}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">职务：</span><span class="text">{{this.details.title}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">性别：</span><span class="text">{{this.details.gendar}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">电子邮件：</span><span class="text">{{this.details.email}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">创建人：</span><span class="text">{{this.details.createPersonName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items">
                        <div class="grid-content">
                        <span class="name">创建时间：</span><span class="text">{{this.details.createDate}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="items" style="width:100%;">
                        <div class="grid-content">
                        <span class="name">备注：</span><p class="text" v-html="details.comment"></p>
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
                <el-tab-pane :label="'跟进记录 '+this.followHisCount+''" name="participants">
                     <detail-crm-dynamic v-if="participantsShow && customer.sid" :customer='customer' @cli="cli"></detail-crm-dynamic>
                </el-tab-pane>
                <el-tab-pane :label="'跟进计划 '+this.followPlanCount+''" name="approval">
                    <detail-followplan-customer v-if="approvalShow" @getNum="getNum"></detail-followplan-customer>
                </el-tab-pane>
            </el-tabs>
        </div>
        <dialog-del-contacts  ref="reftest" :editLi="editData" v-if="contactsDialogVisibleDelete"  :dialog-visible="contactsDialogVisibleDelete" @closeCreateModal="closeContactsDialogDele"></dialog-del-contacts>
    </div>
</template>

<script>
    import dialogDelContacts from '@Main/crm/components/dialog.delContacts.vue'
    import detailDynamicCustomer from '@Main/crm/components/detail.dynamic_customer.vue'
    import detailContacts from '@Main/crm/components/detail.contacts_customer.vue'
    import detailBusiness from '@Main/crm/components/detail.business.vue'
    import detailOrder from '@Main/crm/components/detail.order.vue'
    import detailFollowrecord from '@Main/crm/components/detail.followrecord.vue'
    import detailFollowplanCustomer from '@Main/crm/components/detail.followplan_customer.vue'
    import detailCrmDynamic from '@Main/crm/components/detail.crm.dynamic.vue'
    import {modify,voidCustomer,conPageNum,del,modifyCustomer} from '@Main/crm/getData'
   //订单tab
    import orderTab from '@Main/crm/order.vue'
    import businessTab from '@Main/crm/business.vue'
    export default{
        components: {
            detailDynamicCustomer,
            detailContacts,
            detailBusiness,
            // detailOrder,
            detailFollowrecord,
            detailFollowplanCustomer,
            detailCrmDynamic,
            orderTab,
            businessTab,
            dialogDelContacts
        },
        methods:{
            //调接口数字接口和初始化客户
            cli(){
                this.conPageNumData({'customerId':this.customerId,'contactId':this.contcatId});
                // this.modifyData(this.$route.query.contactId); 
            },
            getNum(){
                this.conPageNumData({'customerId':this.customerId,'contactId':this.contcatId});
            },
            // 编辑按钮
            showContactsDialogDel (customerId,contactId){
                this.modifyCustomerData(customerId,contactId,'editContact');
            },
             closeContactsDialogDele (){
                this.contactsDialogVisibleDelete = false;
                this.modifyData(this.$route.query.contactId); 
                // let pageNum=this.pageNum;
                // let pageCount=this.pageCount;
                // this.contactListData({
                //     'pageNum':pageNum,
                //     'pageCount':pageCount,
                // });
            },
            //删除
             async delData(sid){
                let res = await del(sid)
                console.info(res[0])
                console.log("删除返回信息",res[0]);
                this.$router.go(-1);
                // let pageNum=this.pageNum;
                // let pageCount=this.pageCount;
                // this.contactListData({
                //     'pageNum':pageNum,
                //     'pageCount':pageCount,
                // });
            },
            delMethod(customerId,contactId){
                this.modifyCustomerData(customerId,contactId,'delContact');
            },
            // 修改初始化
             async modifyCustomerData(customerId,contactId,title){
                let res = await modifyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        this.$router.push({
                            path: '/crm/contacts',
                        })
                        // this.$router.go(-1);
                    }   
                })
                console.info(res[0]);
                if(title=="editContact"){
                    this.contactsDialogVisibleDelete = true;
                    this.$nextTick(function(){
                        this.$refs.reftest.test(this.editData)
                    })
                }else if(title=="delContact"){
                    this.$confirm('您确认删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.delData(contactId);
                        }).catch(() => {
                            this.$message({
                            type: 'info',
                            message: '已取消'
                            }); 
                    });
                }
             },
            //联系人详情页数量
            async conPageNumData({customerId = '',contactId = ''}= {}){
                let res = await conPageNum(customerId,contactId)
                console.log('数量',res[0]);
                
                console.log("跟进记录数量",res[0].followHisCount);
                this.followHisCount=res[0].followHisCount
                console.log("跟进计划数量",res[0].followPlanCount);
                this.followPlanCount=res[0].followPlanCount
            },
            conJump(customerId,contactId){
                let routeData = this.$router.push({
                // path: '/crm/customer/details/'+sid,
                path: '/crm/contacts/details',
                query:{
                    customerId:customerId,
                    contactId:contactId,
                    }
                });
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
                if(tab.name=="participants"){
                    // this.$router.push({
                    //     path: '/crm/contacts/details',
                    //     query: {customerId:this.$route.query.customerId,'contactId':this.$route.query.contactId,activeName:'participants'}
                    // })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&contactId=" + this.$route.query.contactId+"&activeName=" +"participants";
                    location.replace(newUrl);
                    
                    this.participantsShow=false;
                    this.$nextTick(function(){
                        this.participantsShow=true;
                    })
                    this.approvalShow=false;
                    this.conPageNumData({'customerId':this.customerId,'contactId':this.contcatId});
                }else if(tab.name=="approval"){
                    // this.$router.push({
                    //     path: '/crm/contacts/details',
                    //      query: {customerId:this.$route.query.customerId,'contactId':this.$route.query.contactId,activeName:'approval'}
                    // })

                    let newUrl="/#" + this.$route.path+"?customerId=" + this.$route.query.customerId+"&contactId=" + this.$route.query.contactId+"&activeName=" +"approval";
                    location.replace(newUrl);
                    
                    this.participantsShow=false;
                    this.approvalShow=false;
                    this.$nextTick(function(){
                        this.approvalShow=true;
                    })
                    this.conPageNumData({'customerId':this.customerId,'contactId':this.contcatId});
                }
            },
            // 修改初始化
             async modifyData(sid){
                let res = await modify(sid)
                console.info('lianxiren',res[0])
                this.editData=res[0];
                console.log('客户名称',res[0].customerName);
                console.log('手机号码',res[0].phoneNumber);
                console.log('决策关系',res[0].decisionRole);
                console.log('职务',res[0].title);
                console.log('性别',res[0].gendar);
                console.log('电子邮件',res[0].email);
                console.log('创建人',res[0].createPersonName);
                console.log('创建时间',res[0].createDate);
                console.log('备注',res[0].comment);
                this.details.name=res[0].name;
                this.details.customerName=res[0].customerName;
                this.details.phoneNumber=res[0].phoneNumber;
                this.details.title=res[0].title;
                this.details.email=res[0].email;
                this.customer = {
                    name: res[0].customerName,
                    sid : res[0].customerId
                };
                if(res[0].decisionRole=="0"){
                    this.details.decisionRole="普通员工";
                }else if(res[0].decisionRole=="1"){
                    this.details.decisionRole="采购决策人";
                }else if(res[0].decisionRole=="2"){
                    this.details.decisionRole="项目决策人";
                }else if(res[0].decisionRole=="3"){
                    this.details.decisionRole="人事决策人";
                }
                if(res[0].gendar=="1"){
                    this.details.gendar="女";
                }else if(res[0].gendar=="0"){
                    this.details.gendar="男";
                }else if(res[0].gendar=="-1"){
                    this.details.gendar="";
                }
                this.details.createPersonName=res[0].createPersonName;
                this.details.createDate=res[0].createDate;
                // this.details.comment=res[0].comment;
                // this.details.comment=res[0].comment.replace(/\n/g, "<br/>")
                if(res[0].comment==null || res[0].comment==''){
                    this.details.comment="";
                }else{
                    this.details.comment=res[0].comment.replace(/\n/g, "<br/>");
                }
            },
           isShow (){
               if($(".o-bt").children().attr("class")=="el-icon-arrow-down"){
                   $(".o-bt").children().attr("class","el-icon-arrow-up")
               }else{
                   $(".o-bt").children().attr("class","el-icon-arrow-down")
               }
               this.showList = !this.showList;
           },
           showEdit(){

           },
           del(){

           },
           back(){
            //    this.$router.push({
            //         path: '/crm/contacts',
            //     })
                this.$router.go(-1);
           }
        },
       
        data(){
            
            return {
                contactsDialogVisibleDelete:false,
                editData:[],
                followHisCount:'',
                followPlanCount:'',
                participantsShow:true,
                approvalShow:false,
                contcatId:'',
                customer:{},

                customerId:"",
                orderTabTitle:true,
                orderCustomerName:{},   //客户名称传递给订单tab
                recordformDialogVisible:false,
                activeName: this.$route.query.activeName || 'participants',
                showList:false,
                details:{
                    customerName:'',
                    phoneNumber:'',
                    decisionRole:'',
                    title:'',
                    gendar:'',
                    email:'',
                    createPersonName:'',
                    comment:'',
                    ownerPersonName:'',
                    createDate:'',
                    attachmentParam:{},
                    source:'',
                    createDate:'',
                    type:'',
                    contacts:[],
                    address:'',
                    webSite:"",
                    salesmans:[],
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
        mounted(){
            // let sid=this.$route.params.id;
            let sid=this.$route.query.contactId;
            this.contcatId = sid;
            this.modifyData(sid); 

            let customerId=this.$route.query.customerId;
            this.customerId = customerId;

            this.modifyCustomerData(this.customerId)
            
            this.conPageNumData({'customerId':this.customerId,'contactId':this.contcatId});
            
            let activeName=this.$route.query.activeName;
            if(activeName=="participants"){
                this.participantsShow=true;
                this.approvalShow=false;
            }else if(activeName=="approval"){
                this.participantsShow=false;
                this.approvalShow=true;
            }
        },
        created(){
          
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .top-wrap{
            margin-bottom: 10px;
            position: relative;
            .title-wrap{
                margin-bottom:16px;
                position: relative;
                border-bottom:1px solid #ebeef5;
                padding:10px;
                .title-name{font-size:20px;font-weight: bold; color:#333;}
                .operate-box{position: absolute; right:10px;bottom:16px;}
                .statusStyle p{
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

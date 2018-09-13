<template>
<div>

    <right-slide-modal
            :title="'编辑跟进计划'"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <!-- <el-dropdown> -->
                        <!-- <el-button type="primary">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>创建商机</el-dropdown-item>
                            <el-dropdown-item>创建订单</el-dropdown-item>
                            <el-dropdown-item>标记重点</el-dropdown-item>
                            <el-dropdown-item>标记失败</el-dropdown-item>
                        </el-dropdown-menu> -->
                        <el-button @click="operateSave('form')" size="medium">提交</el-button>
                </li>
                <li>
                    <el-button @click="operateClose()" size="medium">关闭</el-button>
                </li>
            </ul>
        </div>
        <div class="record">
            <div class="record-left">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <span class="grid-content">客户名称:</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="grid-content">{{this.details.name || '&nbsp;'}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span class="grid-content">客户状态:</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="grid-content">{{this.details.statusName || '&nbsp;'}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="4">
                        <span class="grid-content">客户类型:</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="grid-content">{{this.details.type || '&nbsp;'}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span class="grid-content">客户来源:</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="grid-content">{{this.details.source || '&nbsp;'}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span class="grid-content">联系地址:</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="grid-content">{{this.details.address || '&nbsp;'}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span class="grid-content">企业网站：</span>
                    </el-col>
                    <el-col :span="8">
                        <span class="grid-content">{{this.details.webSite || '&nbsp;'}}</span>
                    </el-col>
                </el-row>
                <hr>
                <div class="tableCo">
                <h2 style="font-size:14px; padding-left:20px; line-height:40px; background:#dedede; font-weight:normal">跟进计划</h2>

                <el-form :inline="true" :sid="form.sid" :customerId="form.customerId" ref="form" :model="form" :rules="rules" class="demo-form-inline">
                    <el-form-item label="联系人:" prop="contactId">
                        <el-select :disabled="conDisable" v-model="form.contactId" placeholder="联系人">
                            <el-option v-for="(item,index) in this.tableData5" :key="index"  :label="item.name" :value="item.sid"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="联系方式:" prop="information">
                        <el-select v-model="form.information" placeholder="联系方式">
                            <el-option label="电话" value="0"></el-option>
                            <el-option label="邮件" value="1"></el-option>
                            <el-option label="短信" value="2"></el-option>
                            <el-option label="上门拜访" value="3"></el-option>
                            <el-option label="会务" value="4"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="opp" label="商机:" prop="opportunityName">
                        <el-select :disabled="oppDisable" v-model="form.opportunityId" placeholder="商机">
                            <el-option v-for="(item,index) in this.opportunityList" :key="index" :label="item.name" :value="item.sid"></el-option>
                            <!-- <el-option label="区域二" value="beijing"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="跟进目标:" class="followTarget" prop="followTarget">
                        <el-input type="textarea" :maxlength="200" v-model="form.followTarget" placeholder="下次跟进目标"></el-input>
                    </el-form-item>
                    <el-form-item class="followTime" label="跟进时间:" prop="followTime">
                        <el-date-picker 
                                v-if="followTimeShow"
                                change
                                v-model="form.followTime"
                                type="datetime"
                                format = "yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="下次跟进时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                </div>
            </div>
             <div class="record-right" >
                <!-- <div v-if="recordList.length==0?true:false" style="height:500px; text-align:center; line-height:500px;">暂无数据</div> -->
                <timeline class="scrollContentUpd" style="height:500px; overflow-y:scroll; overflow-x:hidden;">
                    <timeline-title color="#9dd8e0" :key="index" v-for="(item,index) in this.recordList">
                        <!-- <div class="detail">
                            
                            {{item.createTime}}<br/>


                            {{item.contactWay}}联系      操作人：{{item.contactName}}  <br/> -->

                            <!-- 预约2015年4月30日       15：00：00

                            到访参观。预约2015年4月30日       15：00：00

                            到访参观。预约2015年4月30日       15：00：00

                            到访参观。预约2015年4月30日       15：00：00

                            到访参观。 -->
                            <!-- {{item.contactContent}}
                        </div> -->
                        <!-- <el-row :gutter="20" class="row" style="width:100%;" v-for="item in this.recordList"> -->
                <div class="">
                    <i class="icon circle" style="margin-right: 0px;margin-left: 0px;color: red"></i>
                    <span>{{item.createPersonName}}</span>
                    <span style="margin-left:5px;">跟进于:</span><span>{{item.createTime}}</span>
                    <el-tooltip class="item" content="计划跟进" placement="bottom">
                         <span style="margin-left:5px;" class="el-icon-tickets" v-if="item.planId ? true : false"> </span>
                    </el-tooltip>
                </div>
                <div class="" style="margin-right: 20px;margin-left: 0px;">
                    <span class="line"></span>
                    <span>{{item.contactWay}}</span><span style="margin-left:10px; margin-right:10px;">联系</span><span>{{item.contactName}}</span><span  v-if="item.decisionRole ? true : false">-{{item.decisionRole}}</span>
                    <!-- <span style="margin-left:5px;">联系人:</span><span>{{item.contactName}}</span> -->
                    <!-- <span style="margin-left:5px;">决策关系:</span><span>{{item.decisionRole}}</span> -->
                    <span v-if="item.opportunityName ? true : false" style="margin-left:20px;">商机:</span><span>{{item.opportunityName}}</span>
                </div>
                <div style="width:15px; height:2px; background:rgba(70, 167, 255, 1); margin-left: 0px;"></div>
                <div class="" style="margin-right: 20px;margin-left: 0px;">
                    {{item.contactContent}}
                </div>
                    </timeline-title>
                    <!-- <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title> -->
                    <!--<timeline-item color="#9dd8e0">继续设计</timeline-item>-->
                </timeline>
            </div>
        </div>
    </right-slide-modal>
</div>
</template>

<script>
    import timeline from '@Main/plan/components/timeline'
    import timelineItem from '@Main/plan/components/timelineItem'
    import timelineTitle from '@Main/plan/components/timelineTitle'
    import {modifyCustomer,contactsAll,opportunity,customerFollowRecord,initRecordSid,followPlanAdd} from '@Main/crm/getData'
    export default{
        components:{
            timeline,
            timelineItem,
            timelineTitle
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            // recordId:{
            //     required:true
            // },
            // editData:{
            //     type:Object,
            //     default:function(){
            //         return {}
            //     }
            // },
            editData:{},
            title:{
                type:String,
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        methods:{
            setScroll(){
                // $(".scrollContentUpd").height(document.documentElement.clientHeight-70);
                $(".el-dialog__body").css("padding-right","0px");
                let scrollBd = $(".scrollContentUpd");
                let my = this;
                scrollBd.scroll( function(e) {
                    //向下滚动到底
                    let scrollTop = $(this)[0].scrollTop;
                    let scrollHeight = $(this)[0].scrollHeight;
                    let clientHeight = $(this)[0].clientHeight;
                　　if(scrollHeight - scrollTop  == clientHeight){
                // 　　    my.pageNum ++;
                       if(my.pageCount>my.dataTotal){
                            return false;
                        }else{
                        my.pageCount=my.pageCount+10;
                        let pageNum=my.pageNum;
                        let pageCount=my.pageCount;
                        let customerId=my.$route.query.customerId || my.$route.query.customer;
                        let opportunityId=my.opportunityId || my.$route.params.id;
                        let contactId=my.contactId;
                        let planId=my.planId;
                        my.customerFollowRecordData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerId':customerId,
                            'planId':planId,
                            'contactId':contactId,
                            'opportunityId':opportunityId
                        });
                        } 
                　　}
                });
            },
            test(data){
                console.log('修改跟进计划数据',data);
                this.modifyData=data;
                console.log('数组',this.details.arrList);
                console.log('个人',this.form.contactId);
                this.form.contactId=this.modifyData.contactId;
                if(this.details.arrList.includes(this.modifyData.contactId)){
                    this.form.contactId=this.modifyData.contactId;
                }else{
                    this.form.contactId="";
                }
                this.form.information=this.modifyData.contactWay.toString();
                this.form.opportunityId=this.modifyData.opportunityId;
                this.form.followTarget=this.modifyData.target;
                let followTime=this.modifyData.contactTime;
                this.$nextTick(function(){
                    this.followTimeShow=true;
                    if(followTime !==undefined){
                        this.form.followTime=followTime.substring(0,followTime.length-3);
                    }else{
                        this.form.followTime='';
                    }
                })
                
                console.log('跟进时间',this.form.followTime);
                this.form.sid=this.modifyData.sid;
            },
            //保存
            operateSave (formName){
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        console.log(this.$refs[formName])
                        console.log("modelmodel",this.$refs[formName].$options.propsData.model);
                       
                        // let customerId=this.$route.params.id;
                        let target=this.$refs[formName].$options.propsData.model.followTarget;
                        console.log('完成',target);
                        let contactTime=this.$refs[formName].$options.propsData.model.followTime;
                        if(contactTime.length<19){
                            contactTime=contactTime+":00";
                        }
                        console.log('时间',contactTime);
                        let customerId=this.$refs[formName].$options.propsData.model.customerId;
                        console.log('用户id',customerId);
                        let contactId=this.$refs[formName].$options.propsData.model.contactId;
                        if(contactId==this.form.oldName){
                            contactId=this.form.copyContactId;
                        }

                        let opportunityId=this.$refs[formName].$options.propsData.model.opportunityId;
                        if(opportunityId==this.form.oldOpportunityName){
                            opportunityId=this.form.copyOpportunityId;
                        }
                        
                        let contactWay=this.$refs[formName].$options.propsData.model.information;
                        if(contactWay=="电话"){
                            contactWay="0";
                        }else if(contactWay=="邮件"){
                            contactWay="1";
                        }else if(contactWay=="短信"){
                            contactWay="2";
                        }else if(contactWay=="上门拜访"){
                            contactWay="3";
                        }else if(contactWay=="会务"){
                            contactWay="4";
                        }

                      let sid=this.$refs[formName].$options.propsData.model.sid;
                       var obj1={};
                       var obj2={
                            'sid':sid, 
                            'contactId':contactId, 
                            'customerId':customerId, 
                            'opportunityId':opportunityId, 
                            'contactWay':contactWay,
                            'target':target, 
                            'contactTime':contactTime
                            }
                       this.followPlanAddData(obj1,obj2);
                            
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            async contactsAllData( {
                customerId = '' ,
             } = {} ){
                let res = await contactsAll(
                    customerId,
                    )
                this.tableData5=res[0];
                console.log('联系人数据',this.tableData5);
                console.log('跟进计划修改数据',this.modifyData);
                console.log("打印数据",this.editDataCopy);

                console.log('联系人id',this.modifyData.contactId);
                this.form.copyContactId=this.modifyData.contactId;
                console.log('联系方式id',this.modifyData.contactWay);
                console.log('商机id',this.modifyData.opportunityId);
                this.form.copyOpportunityId=this.modifyData.opportunityId;
                console.log('跟进目标',this.modifyData.target);
                console.log('跟进时间',this.modifyData.contactTime);
                this.form.followTarget=this.modifyData.target;
                let followTime=this.modifyData.contactTime;
                this.$nextTick(function(){
                    this.followTimeShow=true;
                    if(followTime !==undefined){
                        this.form.followTime=followTime.substring(0,followTime.length-3);
                    }else{
                        this.form.followTime="";
                    }
                })
                console.log('跟进时间',this.form.followTime);
                // this.form.followTime=this.modifyData.contactTime;

                this.form.sid=this.modifyData.sid;
                console.log('sidsiididdi',this.form.sid);

                if(this.modifyData.contactWay !==undefined){
                    this.form.information=this.modifyData.contactWay.toString();
                }
                // if(this.modifyData.contactWay=="0"){
                //     this.form.information="电话";
                // }else if(this.modifyData.contactWay=="1"){
                //     this.form.information="邮件";
                // }else if(this.modifyData.contactWay=="2"){
                //     this.form.information="短信";
                // }else if(this.modifyData.contactWay=="3"){
                //     this.form.information="上门拜访";
                // }else if(this.modifyData.contactWay=="4"){
                //     this.form.information="会务";
                // }

                this.tableData5.forEach((item)=>{
                    if(item.sid==this.modifyData.contactId){
                        console.log("修改联系人名称",item.name);
                        this.form.contactId=item.name;
                        this.form.oldName=item.name;
                    }
                })

                
            },
            async followPlanAddData(obj1,obj2){
                let res = await followPlanAdd(obj1,obj2)
                console.log('新增',res[0]);
                this.$emit("closeCreateModal");
            },
            async initRecordSidData( {
             } = {} ){
                let res = await initRecordSid(
                    )
                    console.log('获取sid',res[0]);
                
            },
            
            //商机名称
            async opportunityData( {
                customerId = '' ,
             } = {} ){
                let res = await opportunity(
                    customerId,
                    )
                this.opportunityList=res[0];
                this.opportunityList.unshift({name:"请选择商机",sid:""})
                console.log('商机数据',res[0]);

                console.log('商机数据',this.opportunityList);
                console.log('商机id',this.modifyData.opportunityId);
                // 商机对比
                this.opportunityList.forEach((item)=>{
                    if(item.sid==this.modifyData.opportunityId){
                        console.log("修改商机名称",item.name);
                        this.form.opportunityId=item.name;
                        this.form.oldOpportunityName=item.name;
                    }
                })
                // this.form.sid=res[0].businessId;
            },
            // 获取列表数据
            async customerFollowRecordData( {
                customerId = '' ,
                contactId = '' ,
                opportunityId = '' ,
                planId='',
                pageNum='',
                pageCount=''
             } = {} ){
                let res = await customerFollowRecord(
                    customerId,
                    contactId,
                    opportunityId,
                    planId,
                    pageNum,
                    pageCount
                    )
                console.log('跟进记录数据',res[0]);
                console.log('跟进记录列表',res[0].list);
                this.recordList=res[0].list;
                
                //决策关系
                res[0].list.forEach((item)=>{
                    if(item.contactWay=="0"){
                        item.contactWay="电话";
                    }else if(item.contactWay=="1"){
                        item.contactWay="邮件";
                    }else if(item.contactWay=="2"){
                        item.contactWay="短信";
                    }else if(item.contactWay=="3"){
                        item.contactWay="上门拜访";
                    }else if(item.contactWay=="4"){
                        item.contactWay="会务";
                    }
                })
                //联系方式
                res[0].list.forEach((item)=>{
                    if(item.decisionRole=="0"){
                        item.decisionRole="普通员工";
                    }else if(item.decisionRole=="1"){
                        item.decisionRole="采购决策人";
                    }else if(item.decisionRole=="2"){
                        item.decisionRole="项目决策人";
                    }else if(item.decisionRole=="3"){
                        item.decisionRole="人事决策人";
                    }
                })
                // this.tableData5=res[0].list;
                // console.log("跟进数据",this.tableData5);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total
               
            },
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
            // 修改初始化
             async modifyCustomerData(sid){
                let res = await modifyCustomer(sid)
                console.info('数据--------',res[0])
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
                this.details.phoneNumber=res[0].phoneNumber;
                this.details.email=res[0].email;
                this.details.address=res[0].address;
                this.details.status=res[0].status;
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
                // this.details.contacts=res[0].contacts;
                res[0].contacts.forEach((item)=>{
                    this.details.contacts.push(
                        // salesmanName:item.salesmanName
                        item.name
                    )
                })
                console.log(this.details.contacts);

                res[0].contacts.forEach((item)=>{
                    this.details.arrList.push(
                        // salesmanName:item.salesmanName
                        item.sid
                    )
                })
                console.log(this.details.arrList);

                this.details.comment=res[0].comment;
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

                    console.log("状态",res[0].status);
                 //状态
                 if(res[0].status='null'){
                     this.details.status="暂无状态";
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
            },
        },
        data(){
            return {
                followTimeShow:false,
                conDisable:false,
                oppDisable:false,
                modifyData:{},
                recordList:[],
                opportunityList:[],
                tableData5:[],
                pageNum:1,
                pageCount:10,
                dataTotal:1,
                pageTotal:1,
                list:[],
                form:{
                    sid:'',
                    contactId:'',
                    customerId:'',
                    opportunityId:'',
                    contactsName:'',
                    information:'',
                    opportunityName:'',
                    followTarget:'',
                    followTime:'',
                    copyContactId:'',
                    oldName:'',
                    oldOpportunityName:'',
                    copyOpportunityId:''
                },
                rules:{
                    contactId: [
                        { required: true, message: '请输入联系人', trigger: 'change' },
                        // { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' },
                    ],
                    information: [
                        { required: true, message: '请输入联系方式', trigger: 'change' },
                        // { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                    ],
                    opportunityId: [
                        { required: true, message: '请输入商机', trigger: 'change' },
                        // { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'change' },
                    ],
                    followTarget: [
                        { required: true, message: '请输入跟进目标', trigger: 'blur' },
                        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'change' },
                    ],
                    followTime: [
                        { required: true, message: '请输入跟进时间', trigger: ['blur','change'] },
                        // { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' },
                    ],
                },
                 details:{
                    arrList:[],
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
                    statusName:''
                },
                editDataCopy:{},
            }
        },
        watch : {
            'editData':{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    this.editDataCopy = newVal
                },
                deep:true
            },
        },
        mounted (){
            let sid=this.$route.query.customerId || this.$route.query.customer;
            this.modifyCustomerData(sid); 
            
            let customerId=this.$route.query.customerId || this.$route.query.customer;
            this.form.customerId=customerId;
            this.contactsAllData({
                'customerId':customerId,
            });
            console.log("this.tableData5数据",this.tableData5);
        
            this.opportunityData({
                'customerId':customerId,
            });

            // let customerId=this.$route.params.id;
            let contactId=this.$route.query.contactId;
            if(contactId !==undefined){
                this.conDisable=true;
            }

            let opportunityId=this.$route.query.opportunityId || this.$route.params.id;
            if(opportunityId !==undefined){
                this.oppDisable=true;
            }
            let planId='';
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            this.customerFollowRecordData({
                'customerId':customerId,
                'planId':planId,
                'contactId':contactId,
                'opportunityId':opportunityId,
                'pageNum':pageNum,
                'pageCount':pageCount
            });

            this.$nextTick(function(){
                this.setScroll();
            });
            // this.initRecordSidData();
        },
        created(){
            
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
        li{
            float: left;
            margin-right: 12px;
        }
    }
    .record{
        line-height: 48px;
        color: #666666;
        position: relative;
        span.label{
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #333333;
        }
        .record-left{
            float: left;
            width: 490px;
        }
        .record-right{
            float: right;
            width: 250px;
        }
    }
    .timeline-title{
        .detail{
            line-height: 24px;
        }
    }
    .el-input--suffix .el-input__inner{
        width:60px;
    }
    .el-textarea__inner{ width:400px}
    .el-popper .el-select-dropdown__list .el-select-dropdown__item {
        width: 100px;
    }
    
</style>
<style rel="stylesheet/scss" lang="scss">
   .tableCo{
        .el-form-item .is-required{width:185px; margin-bottom:10px; margin-right:5px;}
        .el-form-item{width:149px; margin-bottom:10px;}
        .opp{margin-left: 15px;margin-right: 0px;}

        .el-form-item__label{padding-right:6px;}
       
        .el-input--suffix{
            width:100px;
        }
        // .el-select .el-input--suffix{
        //     margin-left:12px;
        // }
        .el-form-item__content{
            margin-top:4px;
            width:81px;
            height: 40px;
        }
        .followTarget{width:100% !important; height:74px !important; margin-bottom:2px !important; margin-top:2px;}
        .followTarget .el-form-item__content{width:400px !important; height:58px !important; margin-bottom:0px;}
        .followTarget .el-textarea__inner{width:100%;}
        .followTarget .el-form-item__error{padding-top:0px !important;}

        .followTime{width:auto; margin-top: 2px;}
        .followTime .el-form-item__content{width:180px;}
        .followTime .el-form-item__content .el-date-editor--datetime{width:180px;}
    }
</style>


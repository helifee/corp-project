<template>
<div class="recordCu">
    <right-slide-modal
            :title="'创建跟进记录'"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-dropdown @command="opeSel">
                        <el-button type="primary">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='0'>创建商机</el-dropdown-item>
                            <el-dropdown-item command='1'>创建订单</el-dropdown-item>
                            <el-dropdown-item command='2'>{{this.keyName}}</el-dropdown-item>
                            <el-dropdown-item command='3'>{{this.failName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </li>
                <li>
                    <el-button @click="operateClose()" size="medium ">关闭</el-button>
                </li>
            </ul>
        </div>
        <div class="record">
            <div class="record-left">
                <el-row :gutter="24">
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
                <el-row :gutter="24">
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
                </el-row>
                <el-row :gutter="24">
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
                <div class="tableCu">
                <h2 style="font-size:14px; padding-left:20px; line-height:40px; background:#dedede; font-weight:normal">跟进记录</h2>
                <el-form :inline="true" :sid="form0.sid" :customerId="form0.customerId" ref="form0" :model="form0" :rules="rules" class="demo-form-inline">
                    <el-form-item label="联系人:" prop="recoId">
                        <el-select :disabled="this.disa ?true:false" v-model="form0.recoId" placeholder="联系人">
                            <el-option :key="index" v-for="(item,index) in this.tableData5"  :label="item.name" :value="item.sid"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="联系方式:" prop="recoIn">
                        <el-select v-model="form0.recoIn" placeholder="联系方式">
                            <el-option label="电话" value="0"></el-option>
                            <el-option label="邮件" value="1"></el-option>
                            <el-option label="短信" value="2"></el-option>
                            <el-option label="上门拜访" value="3"></el-option>
                            <el-option label="会务" value="4"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="opp" label="商机:">
                        <el-select v-model="form0.recoOp" placeholder="商机">
                            <el-option :key="index" v-for="(item,index) in this.opportunityList" :label="item.name" :value="item.sid"></el-option>
                            <!-- <el-option label="区域二" value="beijing"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <br>
                     <el-form-item  class="folCon" label="跟进内容"  prop="recoCon">
                        <el-input type="textarea" v-textarea-limiter :maxlength="2500" class="" v-model="form0.recoCon" placeholder="跟进内容" style="width:auto;"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item v-if="false" class="upload" label="附件">
                        <attach-upload
                        v-if="this.form0.businessId"

                                :multiple="false"
                                :readonly="false"
                                @fileQueued="handleAttachQueued"
                                @uploadError="handleAttachError"
                                @uploadFinished="handleAttachUploadSuccess"
                                :required="false"
                                ref="attachUpload"
                                :appId="this.form0.appId"
                                :businessId="this.form0.businessId"
                                :categoryId="this.form0.categoryId">
                        </attach-upload>
                    </el-form-item>
                    
                </el-form>
                </div>

                <div class="tableCo" v-show="this.showList">
                <h2 style="font-size:14px; margin-top:20px; padding-left:20px; line-height:40px; background:#dedede; font-weight:normal">跟进计划</h2>
                <el-form :inline="true" :customerId="form.customerId" ref="form" :model="form" :rules="rules" class="demo-form-inline">
                    <el-form-item label="联系人:" prop="contactId">
                        <el-select class="contact" :disabled="this.disa ?true:false"  v-model="form.contactId" placeholder="联系人">
                            <el-option :key="index" v-for="(item,index) in this.tableData5"  :label="item.name" :value="item.sid"></el-option>
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

                    <el-form-item class="opp" label="商机:" prop="opportunityId">
                        <el-select v-model="form.opportunityId" placeholder="商机">
                            <el-option :key="index" v-for="(item,index) in this.opportunityList" :label="item.name" :value="item.sid"></el-option>
                            <!-- <el-option label="区域二" value="beijing"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item class="followTarget" label="跟进目标:" prop="followTarget">
                        <el-input type="textarea" v-textarea-limiter :maxlength="200" v-model="form.followTarget" placeholder="下次跟进目标"></el-input>
                    </el-form-item>
                    <el-form-item label="跟进时间:" class="followTime" prop="followTime">
                        <el-date-picker 
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
                
                <div class="o-bt" style="text-align:center;" @click="isShow()">
                    <span>{{this.iconTitle}}</span>
                    <span v-bind:class="{ 'el-icon-arrow-up' : isA, 'el-icon-arrow-down': !isA}"></span>
                </div>
                <div style="text-align:right;">
                <el-button @click="operateSave('form0','form')" style="color: #fff;background-color: #409EFF;border-color: #409EFF;" size="medium">提交</el-button>
                </div>
            </div>

            <div class="record-right">
                <!-- <div v-if="recordList.length==0?true:false" style="height:500px; text-align:center; line-height:500px;">暂无数据</div> -->
                <timeline class="scrollContent4" style="max-height:700px;overflow-y:auto;">
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
                <div class="" style="margin-right: 0px;margin-left: 0px;">
                    <span class="line"></span>
                    <span>{{item.contactWay}}</span><span style="margin-left:10px; margin-right:10px;">联系</span><span>{{item.contactName}}</span><span  v-if="item.decisionRole ? true : false">-{{item.decisionRole}}</span>
                    <!-- <span style="margin-left:5px;">联系人:</span><span>{{item.contactName}}</span> -->
                    <!-- <span style="margin-left:5px;">决策关系:</span><span>{{item.decisionRole}}</span> -->
                    <span v-if="item.opportunityName ? true : false" style="margin-left:0px;">商机:</span><span>{{item.opportunityName}}</span>
                </div>
                <div style="width:15px; height:2px; background:rgba(70, 167, 255, 1); margin-left: 0px;"></div>
                <div class="" style="margin-right: 20px;margin-left: 0px;" v-html="item.contactContent">
                    <!-- {{item.contactContent}} -->
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
        <!-- 创建订单 -->
        <order-right-modal :dialogVisible = "orderDialogVisible" 
        @closeCreateModal="changeDialogVisible"
        @showGoodsModal="showGoodsDialog"
        :showGoodsDialogVisible="goodsDialogVisible"
        @reloadOrder='reloadTableEdit'
        :orderDetail="orderDetail"
         v-if="orderDialogVisible"
        ></order-right-modal>

        <!-- 选择产品 -->
           <dialog-choose-goods  class="goods"
           v-if="goodsDialogVisible"
         :dialogVisible="goodsDialogVisible" 
         @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
         
        
</div>
</template>

<script>
    import timeline from '@Main/plan/components/timeline'
    import timelineItem from '@Main/plan/components/timelineItem'
    import timelineTitle from '@Main/plan/components/timelineTitle'
    import dialogCreateBusiness from '@Main/crm/components/dialog.create.business.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'
    import orderRightModal from '@Main/crm/components/order.rightModal.vue'
    import {modifyCustomer,contactsAll,opportunity,customerFollowRecord,initRecordSid,followPlanAdd,keyCustomer,failCustomer} from '@Main/crm/getData'
    export default{
        components:{
            timeline,
            timelineItem,
            timelineTitle,
            dialogCreateBusiness,
            dialogChooseGoods,
            orderRightModal
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            customer:{
                type:Object
            },
            // recordId:{
            //     required:true
            // },
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
            closeGoodsDialog(){
                this.goodsDialogVisible = !this.goodsDialogVisible;
            },
            //创建订单成功后的回调
            reloadTableEdit(){

            },
            changeDialogVisible(){
                this.orderDetail = {
                    customerName: {
                            name:this.details.name,
                            sid:this.$route.query.customerId
                        }
                };
                this.orderDialogVisible = !this.orderDialogVisible;
            },
            //创建商机成功后的回调
            reloadBusinessFn(){

            },
            //商机参数
            showBusinessDialog(){
                this.businessDetail = {
                        customer:{
                            name:this.details.name,
                            sid:this.$route.query.customerId
                        }
                    };
                this.businessDialogVisible  = !this.businessDialogVisible;
            },
            showGoodsDialog(){
                this.goodsDialogVisible = !this.goodsDialogVisible;
            },
            setScroll(){
                let scrollBd = $(".scrollContent4");
                $(".el-dialog__body").css("padding-right","0px");
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
                        let customerId=my.$route.query.customerId;
                        let opportunityId=my.opportunityId;
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
            test(data,conId,opportunityId){
                this.recordformId=data;
                this.conId=conId;
                this.opportunityId=opportunityId;

                this.form0.recoOp=this.opportunityId
                this.form.opportunityId=this.opportunityId

                let customerId=this.recordformId;
                let contactId=this.conId;
                // let opportunityId=this.opportunityId;
                this.modifyCustomerData(customerId); 

                this.form.customerId=customerId;
                this.form0.customerId=customerId;
                this.contactsAllData({
                    'customerId':customerId,
                });
            
                this.opportunityData({
                    'customerId':customerId,
                });

                // let customerId=this.$route.params.id;
                // let contactId=contactId;
                // let opportunityId=this.opportunityId;
                let planId='';
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.customerFollowRecordData({
                        'customerId':customerId,
                        'planId':planId,
                        'contactId':contactId,
                        'opportunityId':this.opportunityId,
                        'pageNum':pageNum,
                        'pageCount':pageCount
                    });
                this.initRecordSidData();

                this.$nextTick(function(){
                    this.setScroll();
                })
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
            //展开/隐藏
            isShow (){
                if(this.showList){
                    this.showList=false;
                    this.iconTitle="更多"
                    this.isA=true;
                }else{
                    this.showList=true;
                    this.iconTitle="收起"
                    this.isA=false;
                }
           },
            //保存
            operateSave (form0,form){
               
                if(this.showList==false){
                   this.$refs[form0].validate((valid) => {
                       if (valid) {
                        console.log('model',this.$refs[form0].$options.propsData.model);
                        let sid=this.$refs[form0].$options.propsData.model.sid;
                        let customerId=this.$refs[form0].$options.propsData.model.customerId;
                        let recoCon=this.$refs[form0].$options.propsData.model.recoCon;
                        let recoId=this.$refs[form0].$options.propsData.model.recoId;
                        let recoIn=this.$refs[form0].$options.propsData.model.recoIn;
                        let recoOp=this.$refs[form0].$options.propsData.model.recoOp;

                        let recoName;
                        let decisionRole;
                        this.tableData5.forEach((item)=>{
                            if(recoId==item.sid){
                                console.log('item',item);
                                recoName=item.name;
                                decisionRole=item.decisionRole;
                            }; 
                        })
                        console.log('商机',this.opportunityList);

                        let recoOpName;
                        this.opportunityList.forEach((item)=>{
                            if(recoOp==item.sid){
                                recoOpName=item.name=="请选择商机"?"":item.name;
                            }; 
                        })
                        const obj1= {
                             'sid':sid, 

                             'customerId':customerId, 
                             'opportunityId':recoOp, 
                             'contactId':recoId, 

                             'planId':'',

                             'contactName':recoName,
                             'opportunityName':recoOpName,

                             'contactWay':recoIn,
                             'contactContent':recoCon,
                             'decisionRole':decisionRole,
                       }
                       
                       const obj2 = {
                            // 'sid':'', 
                            // 'contactId':contactId, 
                            // 'customerId':customerId, 
                            // 'opportunityId':opportunityId, 
                            // 'contactWay':contactWay,
                            // 'target':target, 
                            // 'contactTime':contactTime
                            }  
                       this.followPlanAddData(obj1);
                       }
                   })
                }else if(this.showList==true){
                    let form0Bo;
                    let formBo;
                    let obj1;
                    let obj2;
                    this.$refs[form0].validate((valid) => {
                       if (valid) {
                        console.log(this.$refs[form0].$options.propsData.model);
                        let sid=this.$refs[form0].$options.propsData.model.sid;
                        let customerId=this.$refs[form0].$options.propsData.model.customerId;
                        let recoCon=this.$refs[form0].$options.propsData.model.recoCon;
                        let recoId=this.$refs[form0].$options.propsData.model.recoId;
                        let recoIn=this.$refs[form0].$options.propsData.model.recoIn;
                        let recoOp=this.$refs[form0].$options.propsData.model.recoOp;

                        let recoName;
                        let decisionRole;
                        this.tableData5.forEach((item)=>{
                            if(recoId==item.sid){
                                recoName=item.name;
                                decisionRole=item.decisionRole;
                            }; 
                        })
                        console.log('商机',this.opportunityList);

                        let recoOpName;
                        this.opportunityList.forEach((item)=>{
                            if(recoOp==item.sid){
                                recoOpName=item.name=="请选择商机"?"":item.name;
                            }; 
                        })
                        obj1= {
                             'sid':sid, 

                             'customerId':customerId, 
                             'opportunityId':recoOp, 
                             'contactId':recoId, 

                             'planId':'',

                             'contactName':recoName,
                             'opportunityName':recoOpName,

                             'contactWay':recoIn,
                             'contactContent':recoCon,
                             'decisionRole':decisionRole,
                       }
                       
                    //    const obj2 = {
                            // 'sid':'', 
                            // 'contactId':contactId, 
                            // 'customerId':customerId, 
                            // 'opportunityId':opportunityId, 
                            // 'contactWay':contactWay,
                            // 'target':target, 
                            // 'contactTime':contactTime
                            // }  
                    //    this.followPlanAddData(obj1,obj2);
                           form0Bo=true
                       }else{
                        form0Bo=false
                        console.log('error submit!!');
                        return false;
                    }
                   })
                  
                    this.$refs[form].validate((valid) => {

                    if (valid) {
                        console.log();
                        console.log(this.form.sid);
                        console.log(this.$refs[form])
                        console.log(this.$refs[form0,form].$options.propsData.model);
                       

                        // let customerId=this.$route.params.id;
                        let target=this.$refs[form].$options.propsData.model.followTarget;
                        console.log('完成',target);
                        let contactTime=this.$refs[form].$options.propsData.model.followTime;
                        contactTime=contactTime+":00";
                        console.log('时间',contactTime);
                        let customerId=this.$refs[form].$options.propsData.model.customerId;
                        console.log('用户id',customerId);
                        let contactId=this.$refs[form].$options.propsData.model.contactId;
                        let opportunityId=this.$refs[form].$options.propsData.model.opportunityId;
                        let contactWay=this.$refs[form].$options.propsData.model.information;
                        // let obj1={};
                        obj2= {
                            'sid':'', 
                            'contactId':contactId, 
                            'customerId':customerId, 
                            'opportunityId':opportunityId, 
                            'contactWay':contactWay,
                            'target':target, 
                            'contactTime':contactTime
                            };
                    //    this.followPlanAddData(obj1,obj2);
                       formBo=true;      
                    } else {
                        formBo=false;   
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(obj1);
                console.log(obj2);
                console.log(form0Bo);
                console.log(formBo);
                if(form0Bo & formBo){
                    this.followPlanAddData(obj1,obj2);
                }
                }  
            },
            async contactsAllData( {
                customerId = '' ,
             } = {} ){
                let res = await contactsAll(
                    customerId,
                    )
                res[0].forEach((item)=>{
                    if(item.sid==this.conId){
                        this.tableData5.push(item);
                        this.form0.recoId=this.conId;
                        this.form.contactId=this.conId;
                    }
                })

                if(this.tableData5.length==0){
                    this.tableData5=res[0];
                }
                console.log('联系人',this.tableData5);
            },
            async followPlanAddData( obj1, obj2 ){
                let res = await followPlanAdd( obj1, obj2)
                console.log('新增',res[0]);
                JZY.u.successMsg("数据提交成功");
                this.form0.recoCon="";
                this.form.followTarget="";
                this.form.followTime="";
                // 保存数据
                let customerId=this.$route.query.customerId || this.recordformId;
                let contactId=this.$route.query.contactId || this.conId;
                let opportunityId=this.$route.query.opportunityId;
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

                this.initRecordSidData();
                // this.$emit("closeCreateModal");
            },
            //标记重点
            async keyCustomerData({customerId = ''}= {}){
                let res = await keyCustomer(customerId)
                console.log('重点',res[0]);
                JZY.u.successMsg('设置成功');
                this.modifyCustomerData(customerId);
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
            keycusCli(customerId){
                this.keyCustomerData({'customerId':customerId})  
            },
            //标记失败
            async failCustomerData({customerId = ''}= {}){
                let res = await failCustomer(customerId)
                console.log('重点',res[0]);
                JZY.u.successMsg('设置成功');
                this.modifyCustomerData(customerId);
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
            failcusCli(customerId){
                this.failCustomerData({'customerId':customerId})  
            },
            opeSel(num){
                if(num==0){
                    // alert('创建商机');
                    // console.log("要传递的变量客户名称",this.details.name);
                    this.showBusinessDialog();
                }else if(num==1){
                    this.changeDialogVisible();

                }else if(num==2){
                    this.keycusCli(this.form.customerId)
                }else if(num==3){
                    this.failcusCli(this.form.customerId)
                }
            },
            async initRecordSidData( {
             } = {} ){
                let res = await initRecordSid(
                    )
                    console.log('获取sid',res[0]);
                    this.form.sid=res[0].businessId;
                    this.form0.sid=res[0].businessId;

                    this.form0.appId=res[0].app;
                    this.form0.businessId=res[0].businessId;
                    this.form0.categoryId=res[0].category;
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
                this.form.sid=res[0].businessId;
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

                //换行
                res[0].list.forEach((item)=>{
                    item.contactContent=item.contactContent.replace(/\n/g, "<br/>")
                })
                
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
                this.recordList=res[0].list;
                
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
                disa:false,
                keyName:"",
                failName:"",
                orderDialogVisible:false,
                businessDetail:{},
                orderDetail:{},
                goodsDialogVisible:false,
                businessDialogVisible:false,
                recordformId:'',
                conId:'',
                opportunityId:'',
                isA: false,
                iconTitle:'更多',
                showList:false,
                recordList:[],
                opportunityList:[],
                tableData5:[],
                pageNum:1,
                pageCount:10,
                dataTotal:1,
                pageTotal:1,
                list:[],
                form0:{
                    sid:'',
                    customerId:'',
                    recoId:'',
                    recoIn:'0',
                    recoOp:'',
                    recoCon:'',
                    appId:'',
                    businessId:'',
                    categoryId:''
                },
                form:{
                    sid:'',
                    contactId:'',
                    customerId:'',
                    opportunityId:'',
                    contactsName:'',
                    information:'0',
                    opportunityName:'',
                    followTarget:'',
                    followTime:'',
                },
                rules:{
                    recoCon: [
                         { required: true, message: '请输入跟进内容', trigger: 'blur' },
                         { min: 1, max: 2500, message: '长度在 1 到 2500 个字符', trigger: 'change' },
                    ],
                    recoId: [
                        { required: true, message: '请输入联系人', trigger: 'change' },
                        // { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' },
                    ],
                    recoIn: [
                        { required: true, message: '请输入联系方式', trigger: 'change' },
                        // { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                    ],
                    contactId: [
                        { required: true, message: '请输入联系人', trigger: 'change' },
                        // { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' },
                    ],
                    information: [
                        { required: true, message: '请输入联系方式', trigger: 'change' },
                        // { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                    ],
                    opportunityName: [
                        { required: true, message: '请输入商机', trigger: 'change' },
                        // { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
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
            }
        },
        watch : {
        },
        mounted (){
            
            let customerId=this.$route.query.customerId || this.$route.query.customer;
            console.log(customerId);
            if(customerId==undefined){
                return false;
            }else{
                this.modifyCustomerData(customerId); 

                this.form.customerId=customerId;
                this.form0.customerId=customerId;
                this.contactsAllData({
                    'customerId':customerId,
                });
            
                this.opportunityData({
                    'customerId':customerId,
                });

                // let customerId=this.$route.params.id;
                let contactId=this.$route.query.contactId;
                if(contactId !==undefined){
                    this.disa=true;
                    this.form0.recoId=contactId;
                    this.form.contactId=contactId;
                }else{
                    this.disa=false;
                    this.form0.recoId='';
                    this.form.contactId='';
                }
                

                let opportunityId=this.$route.query.opportunityId || this.$route.params.id;
                this.form0.recoOp=opportunityId
                this.form.opportunityId=opportunityId  
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
                this.initRecordSidData();

                this.$nextTick(function(){
                    this.setScroll();
                })
            }
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
        display: inline-block;
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
            // width: 63%;
            width: 490px;
        }
        .record-right{
            float: right;
            // width:37%;
            // width: 300px;
            width: calc(100% - 490px);
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
    .tableCu{
        .el-form-item .is-required{width:185px; margin-bottom:10px; margin-right:5px;}
        .el-form-item{width:149px; margin-bottom:10px;}
        .opp{margin-left: 15px;margin-right: 0px;}

        .el-select .el-input--suffix{
            // margin-left:12px;
        }

        .el-form-item__label{padding-right:6px;}
       
        .el-input--suffix{
            width:100px;
        }
        .el-form-item__content{
            margin-top:4px;
            width:81px;
            height: 40px;
        }

        .folCon{width:400px;}
        .upload{width:100%;}
        .upload .el-form-item__content{width:90%;}
        .el-textarea__inner{width:400px; height:74px;}
        .folCon{width:auto; height:74px; margin-bottom:5px; margin-top:2px;}
        .folCon .el-form-item__content{width:auto; height:74px; margin-bottom:2px;}
    }

    .tableCo{
        .el-form-item .is-required{width:185px; margin-bottom:10px; margin-right:5px;}
        .el-form-item{width:149px; margin-bottom:10px;}
        .opp{margin-left: 15px;margin-right: 0px;}

        .el-form-item__label{padding-right:6px;}
       
        .el-input--suffix{
            width:100px;
        }
        .el-select .el-input--suffix{
            // margin-left:12px;
        }
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


<template>
    <div class="dynamic-content">
        <!-- <span style="width:80px; height:30px; line-height:30px; margin-left:10px;"> -->
            <div class="content_right">
            <el-button type="primary" class="add-part" @click="recordCli">创建跟进记录</el-button>
            </div>
        <!-- </span> -->
        <div class="content_left scrollContent" style="">
        <el-row :gutter="20" class="row" style="width:100%;" :key="index" v-for="(item,index) in this.recordList">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: red"></i>
                    <span>{{item.createPersonName}}</span>
                    <span style="margin-left:5px;">跟进于:</span><span>{{item.createTime}}</span>
                    <el-tooltip class="item" content="计划跟进" placement="bottom">
                         <span style="margin-left:5px;" @click="showAssignDialog(item.planId)" class="el-icon-tickets" v-if="item.planId ? true : false"> </span>
                    </el-tooltip>
                </div>
                <div class="" style="margin-right: 20px;margin-left: 55px;">
                    <span class="line"></span>
                    <span>{{item.contactWay}}</span><span style="margin-left:10px; margin-right:10px;">联系</span><span>{{item.contactName}}</span><span  v-if="item.decisionRole ? true : false">-{{item.decisionRole}}</span>
                    <!-- <span style="margin-left:5px;">联系人:</span><span>{{item.contactName}}</span> -->
                    <!-- <span style="margin-left:5px;">决策关系:</span><span>{{item.decisionRole}}</span> -->
                    <span v-if="item.opportunityName ? true : false" style="margin-left:20px;">商机:</span><span>{{item.opportunityName}}</span>
                </div>
                <div style="width:15px; height:2px; background:rgba(70, 167, 255, 1); margin-left: 55px;"></div>
                <div class="" style="margin-right: 20px;margin-left: 55px;" v-html="item.contactContent">
                    <!-- {{item.contactContent}} -->
                </div>
        </el-row>
        </div>
        
        <!-- <el-row :gutter="20" class="row" style="width:100%;"> -->
            <!-- <el-col :span="8" style="width:100%;"> -->
                <!-- <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: red"></i>
                    <span>杨帆</span>
                    <span>跟进于</span>
                    <span> 2018-05-12 15:20:58</span>
                    <span>计划跟进</span>
                </div>
                <div class="" style="margin-right: 20px;margin-left: 55px;">
                    <span>电话:</span><span>13567834567</span>
                    <span>联系人:</span><span>王伟</span>
                    <span>决策关系:</span><span>采购决策人</span>
                    <span>商机:</span><span>智能设备采购</span>
                </div>
                <div style="width:15px; height:2px; background:rgba(70, 167, 255, 1); margin-left: 55px;"></div>
                <div class="" style="margin-right: 20px;margin-left: 55px;">
                    客户预计在本月30号进行采购工作，下次预计在30号之前进行回访，询问购买情况客户预计在本月30号进行采购工作，下次预计在30号之前进行回访，询问购买情况客户预计在本月30号进行采购工作，下次预计在30号之前进行回访，询问购买情况
                </div>
        </el-row> -->
        <!-- <el-row :gutter="20" class="row"> -->
            <!-- <el-col :span="8">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: lightgreen"></i>aaaa
                </div>
            </el-col> -->
            <!-- <el-col :span="8">
                <span class="line"></span>
                <div class="">
                    <span>修改任务(项目启动会)状态为完成 1111111   </span>
                </div>
            </el-col> -->
            <!-- <el-col :span="8">
                <div class="">
                    <span>2018-01-21 13：23：12</span>
                </div>
            </el-col>-->
        <!-- </el-row> 
        <el-row :gutter="20" class="row"> -->
            <!-- <el-col :span="8">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px"></i>aaaa
                </div>
            </el-col>
            <el-col :span="8">
                <span class="line"></span>
                <div class="">
                    <span>修改任务(项目启动会)状态为完成  111111111  </span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="">
                    <span>2018-01-21 13：23：12</span>
                </div>
            </el-col> -->
        <!-- </el-row> -->
        <dialog-follow-plan-up v-if="assignDialogVisible" ref="refdest"  :dialogVisible="assignDialogVisible"  @closeCreateModal="closeAssignDialog"></dialog-follow-plan-up>
        <dialog-follow-recordform-cu :dialogVisible="recordformDialogVisible" :customer='customer'  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialog"></dialog-follow-recordform-cu>
    </div>
</template>
        
<script>
import dialogFollowPlanUp from '@Main/crm/components/dialog.follow.plan.up.vue'
import dialogFollowRecordformCu from '@Main/crm/components/dialog.follow.recordform_cu.vue'
import {customerFollowRecord,folUpdate,modifyCustomer} from '@Main/crm/getData'

    export default {
        components: {
            dialogFollowRecordformCu,
            dialogFollowPlanUp

        },
        data() {
            return {
                assignDialogVisible:false,
                recordformDialogVisible : false,
                customerId:this.$route.query.customer || this.$route.query.customerId,
                contactId:'',
                opportunityId:"",
                planId:"",
                recordList:[],
                pageNum:1,
                pageCount:10,
                dataTotal:1,
                pageTotal:1,
                list:[],
            }
        },
        props: {
            customer : {
                type: Object
            },
            // followHis:{
            //     type:Object
            // }
        },
        computed: {

        },
        filters:{
        },
        methods: {
            async recordCli(){
                let res = modifyCustomer(this.customerId).then(()=>{
                     this.recordformDialogVisible=true;
                }).catch((e)=>{
                    this.$router.go(-1);
                });
            },
            // 跟进计划修改
             async folUpdateData(planId){
                let res = await folUpdate(planId);
                console.info('跟进计划数据--------',res[0]);
                this.assignDialogVisible=true;
                 this.$nextTick(function(){
                    this.$refs.refdest.dest(res[0])
                })
            },
            closeAssignDialog(){
                this.assignDialogVisible  = false;
            },
            showAssignDialog(planId){
                console.log(planId);
                this.folUpdateData(planId);
            },
            showRecordformDialog (){
                this.$emit("cli")
                this.recordformDialogVisible = !this.recordformDialogVisible;
                let customerId=this.$route.query.customerId;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId;
                let planId='';
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                // let pageNum=this.pageNum;
                // let pageCount=this.pageCount;
                // let contactName=this.contactName;
                // let startTime=this.startTime;
                // let endTime=this.endTime;
                this.customerFollowRecordData({
                        // 'pageNum':pageNum,
                        // 'pageCount':pageCount,
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'planId':planId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        // 'contactName':contactName,
                        // 'startTime':startTime, 
                        // 'endTime':endTime, 
                    });
            },
             // 获取列表数据
            async customerFollowRecordData( {
                customerId = '' ,
                contactId = '' ,
                opportunityId = '' ,
                planId='',
                pageNum = '',
                pageCount = ''
                // contactName='',
                // startTime = '',
                // endTime = '',
                // pageNum="",
                // pageCount = ''
             } = {} ){
                let res = await customerFollowRecord(
                    customerId,
                    contactId,
                    opportunityId,
                    planId,
                    pageNum,
                    pageCount
                    // contactName,
                    // startTime,
                    // endTime,
                    // pageNum,
                    // pageCount
                    )
                console.log('跟进记录数据',res[0]);
                // alert(111111111);
                console.log('跟进记录列表',res[0].list);
                //换行
                res[0].list.forEach((item)=>{
                    item.contactContent=item.contactContent.replace(/\n/g, "<br/>")
                })
                
                //联系方式
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
                //决策关系
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

                //判断是否出现了滚动条
                this.$nextTick(function(){
                    let my = this;
                    let divHeight;
                    if($(".router-wrapper").children("div").length==1){
                        divHeight=$(".router-wrapper").children("div").height();
                    }else{
                        let oneDiv=$(".router-wrapper").children('.top-wrap').height();
                        let twoDiv=$(".router-wrapper").children('.customer-detail-tab').height()+20;
                        divHeight=oneDiv+twoDiv;
                    }
                    if(divHeight<$(".router-wrapper").height()){
                        if(this.pageCount>this.dataTotal){
                            return false;
                        }else{
                            my.pageCount=my.pageCount+10;
                            let pageNum=my.pageNum;
                            let pageCount=my.pageCount;
                            let customerId=my.$route.query.customerId;
                            let opportunityId=my.opportunityId;
                            let contactId=my.$route.query.contactId;
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
                })
            },
            setScroll(){
                // let scrollBd = $(".scrollContent");
                let scrollBd = $(".router-wrapper");
                let my = this;

                scrollBd.scroll( function(e) {
                    if($('#pane-participants').css("display")=="block"){
                    //向下滚动到底
                    let scrollTop = this.scrollTop;
                    console.log(scrollTop);
                    let scrollHeight = this.scrollHeight;
                    console.log(scrollHeight);
                    let clientHeight = this.clientHeight;
                    console.log(clientHeight);
                    console.log('是否加载',scrollHeight - scrollTop  == clientHeight);
                　　if(scrollHeight - scrollTop  == clientHeight){
                // 　　    my.pageNum ++;
                       if(my.pageCount>my.dataTotal){
                            return false;
                        }else{
                        console.log('跟进记录');
                        my.pageCount=my.pageCount+10;
                        let pageNum=my.pageNum;
                        let pageCount=my.pageCount;
                        let customerId=my.$route.query.customerId;
                        let opportunityId=my.opportunityId;
                        let contactId=my.$route.query.contactId;
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
                }
                });
            }
        },
        watch: {
        },
        mounted(){
            let customerId=this.customerId;
            let contactId=this.$route.query.contactId;
            let opportunityId=this.$route.query.opportunityId;
            let planId='';
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            // let pageNum=this.pageNum;
            // let pageCount=this.pageCount;
            // let contactName=this.contactName;
            // let startTime=this.startTime;
            // let endTime=this.endTime;
            this.customerFollowRecordData({
                    // 'pageNum':pageNum,
                    // 'pageCount':pageCount,
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'planId':planId,
                    'contactId':contactId,
                    'opportunityId':opportunityId,
                    // 'contactName':contactName,
                    // 'startTime':startTime, 
                    // 'endTime':endTime, 
                });
            this.setScroll();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dynamic-content{
        .content_left{float: left; width: 85%}
        .content_right{float: right;  width: 15%; text-align: center;}
        
        .row{
            line-height: 32px;
            color: #888888;
            font-size: 14px;
            padding: 6px 0px;
            border-left:1px solid #888888 ;
            position: relative;

        }
        .row:last-child{
            span.line{
                width: 0px;

            }
        }
        i{
            border-radius: 50%;
            border: 2px solid;
            border-color: inherit;
            background: #ffffff;
            width: 10px;
            height: 10px;
            display: inline-flex;
            box-sizing: border-box;
            vertical-align: middle;
            position: relative;
            z-index: 3;
        }
        span.line{
            position: absolute;
            left: 25px;
            top: 18px;
            content: '';
            width: 1px;
            background: #888888;
            height: 100%;

        }
        /*i::after{*/
        /*position: absolute;*/
        /*content: '';*/
        /*width: 1px;*/
        /*background: #888888;*/
        /*height: 30px;*/
        /*}*/
    }
</style>

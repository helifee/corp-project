<template>

<div class="participants-wrap">
       <div class="project-wrap planSearch">
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label="联系人：" class="btnItem" prop="name">
                        <el-input v-model="searchForm.name" placeholder="请输入联系人" style="width: 200px"></el-input>
                    </el-form-item>
                <el-form-item label="计划跟进时间:" prop="date">
                    <el-date-picker style="width:240px;"
                        v-model="searchForm.date"
                        type="datetimerange"
                        format = "yyyy-MM-dd"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    <!-- <el-input v-model="searchForm.date" placeholder="时间" style="width: 240px"></el-input> -->
                </el-form-item>
                <el-form-item class="btnItem">
                        <el-button type="primary" size="small" @click="search">查询</el-button>
                        <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
            </el-form>

        </div>
       
        <!--新建任务-->
        <!--<el-button type="primary" class="add-part" @click=""><i class="el-icon-plus"></i> 创建跟进</el-button>-->
        <div class="btn-positon-box">
            <el-button type="primary" size="small" class="add-part" @click="planCli"><i class="el-icon-plus"></i> 创建计划</el-button>
            <!-- <el-button type="primary" class="add-part2" @click="showRecordformDialog"><i class="el-icon-plus"></i> 创建计划(无)</el-button> -->
        </div>
        </div>
        <!-- <tableCrm ref='reflist' :isSelection="isSelection"></tableCrm> -->
        <dialog-follow-recordform-opp :contactId="contactId" :title1="recordformTitle" :dialogVisible="recordformDialogVisible" :recordId="recordId" v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialog"></dialog-follow-recordform-opp>
        <dialog-follow-recordform-update ref="reftest" :editData="editData" :title1="recordformTitle" :dialogVisible="recordformDialogVisibleUpdate1" :recordId="recordId" v-if="recordformDialogVisibleUpdate1" @closeCreateModal="showRecordformDialogUp"></dialog-follow-recordform-update>

<!--表格-->
  <!-- 仅作展示用 -->
  <div class="scrollContent2" style="">
        <el-table ref="myTable"
                :data="tableData5"
                :default-sort = "{prop: 'date'}"
                :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}"
                @row-click='show' 
                @selection-change='handleSelectionChange'
                style="width: 100%; text-align:center;">

                <el-table-column
                    label="联系人"
                    width="120"
                    prop="contactName"
                    >
                </el-table-column>
                <el-table-column
                    label="联系方式"
                    width="100"
                    prop="contactWay"
                    >
                </el-table-column>
                <el-table-column
                    label="决策关系"
                    width="100"
                    prop="decisionRole"
                    >
                </el-table-column>
                <el-table-column
                    label="商机"
                    width="100"
                    prop="opportunityName"
                    >
                </el-table-column>
                <el-table-column
                    label="跟进目标"
                    width="120"
                    prop="target"
                    >
                </el-table-column>
                <el-table-column
                    label="计划跟进时间"
                    width="140"
                    prop="contactTime"
                    >
                </el-table-column>
                <el-table-column
                    label="跟进人"
                    width="100"
                    prop="createPersonName"
                    >
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    width="145"
                    prop="updateDate"
                    >
                </el-table-column>
                <el-table-column
                    label="操作" width="">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <i style="margin-right:4px; color:#46A7FF; font-size:14px;" class="el-icon-tickets" @click="showRecord(scope.row.customerId,scope.row.contactId,scope.row.opportunityId,scope.row.sid,scope.row.target)"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <i style="margin-right:4px; color:#46A7FF; font-size:14px;" class="el-icon-edit" @click="showRecordformDialogUpdate(scope.row.sid)"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <i style="color:#46A7FF; font-size:14px;" class="el-icon-delete" @click="delMethod(scope.row.sid)"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>

            <!-- <el-table-column v-if="isSelection"
                type="selection"
                width="100%">
                </el-table-column>  -->
                 
            <!-- <el-table-column
                v-for='(item, key) in tableTitle'
                :key='key'
                :prop='item.type'
                :label='item.name'
                :width='item.width'
                :formatter='item.formatter'
                :sortable='item.sortable'
                
            >
            </el-table-column> -->
            <!-- <slot name="otherscolumn"></slot> -->
        </el-table>
  </div>
        <!--分页-->
        <!-- <el-pagination v-if="dataTotal==0?false:true" style="float: right; margin-top:20px; margin-bottom:0px; margin-left:12px; margin-right:12px;"
            :current-page="pageNum"
            :page-size="pageCount"
            :page-sizes="[10,20,30,40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination> -->
        <dialog-follow-recordform-cu-plan :dialogVisible="recordVisible" ref="recordformId"  v-if="recordVisible" @closeCreateModal="showRecordClo"></dialog-follow-recordform-cu-plan>
    </div>

</template>

<script>
    import dialogFollowRecordformCuPlan from '@Main/crm/components/dialog.follow.recordform_cu_plan.vue'
    // import tableCrm from '@Main/crm/components/customer.table.vue'
    import dialogFollowRecordformOpp from '@Main/crm/components/dialog.follow.recordform.opp.vue'
    import dialogFollowRecordformUpdate from '@Main/crm/components/dialog.follow.recordform_update.vue'
    import {customerFollowPlan,planDel,folUpdate,modifyCustomer} from '@Main/crm/getData'
    export default{
        components:{
            // tableCrm,
            dialogFollowRecordformOpp,
            dialogFollowRecordformUpdate,
            dialogFollowRecordformCuPlan
        },
        props:{
            followPlan:{
                type:Object
            },
            contactId:{
                type:String
            }
        },
        computed:{
            
        },
        methods:{
            showRecordClo(){
                this.recordVisible = false;
                let customerId=this.$route.query.customerId || this.$route.query.customer || this.followPlan.customerId;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.$route.params.id || this.followPlan.opportunityId;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            showRecord (customerId,contactId,opportunityId,planId,target){
                this.recordVisible =true;
                this.$nextTick(function(){
                    this.$refs.recordformId.test(customerId,contactId,opportunityId,planId,target)
                }) 
            },
            // 跟进计划修改
             async folUpdateData(sid){
                let res = await folUpdate(sid)
                console.info('跟进计划数据--------',res[0])
                this.editData=res[0];
                this.$refs.reftest.test(this.editData)
            },

            //删除计划
             async planDelData(sid){
                let res = await planDel(sid)
                console.info(res[0])
                console.log("删除返回信息",res[0]);

                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId ||  this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            delMethod(sid){
                this.$confirm('您确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.planDelData(sid)
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消'
                        }); 
                });
            },
            // 获取列表数据
            async customerFollowPlanData( {
                customerId = '' ,
                contactId = '' ,
                opportunityId = '' ,
                contactName='',
                startTime = '',
                endTime = '',
                pageNum="",
                pageCount = ''
             } = {} ){
                let res = await customerFollowPlan(
                    customerId,
                    contactId,
                    opportunityId,
                    contactName,
                    startTime,
                    endTime,
                    pageNum,
                    pageCount
                    )
                console.log(res[0].list);
                this.$emit("cli")
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
                res[0].list.forEach((item)=>{
                    item.contactTime=item.contactTime.substring(0,item.contactTime.length-3);
                })
                this.tableData5=res[0].list;
                console.log("跟进数据1111",this.tableData5);
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
                    let my=this;
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
                            let customerId=my.$route.query.customerId;
                            let contactId=my.$route.query.contactId;
                            let opportunityId=my.opportunityId;
                            let pageNum=my.pageNum;
                            let pageCount=my.pageCount;
                            let contactName=my.contactName;
                            let startTime=my.startTime;
                            let endTime=my.endTime;
                            my.customerFollowPlanData({
                                    'pageNum':pageNum,
                                    'pageCount':pageCount,
                                    'customerId':customerId,
                                    'contactId':contactId,
                                    'opportunityId':opportunityId,
                                    'contactName':contactName,
                                    'startTime':startTime, 
                                    'endTime':endTime, 
                                });
                        } 
                    }
                })
               
            },
            show(item){
                this.$emit("row-click",item)
            },
            handleSelectionChange(item){
                this.$emit("selection-change",item)
            },
            //后端排序
            sortTableList(obj){
                // console.info(obj.prop)
                if (obj.prop) {//排序规则非空
                    let orderProp = obj.prop.replace(/([A-Z])/g,"_$1").toLowerCase();//驼峰命名和下划线转换
                    let orderby = orderProp + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                    this.$emit('sortTaskList',orderby)
                }
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.info(typeof val)
                this.pageCount = val;
                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId ||  this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.info(typeof val)
                this.pageNum = val
                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId ||  this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },

            async planCli(){
                let res = modifyCustomer(this.customerId).then(()=>{
                     this.recordformDialogVisible = true;
                }).catch((e)=>{
                    this.$router.go(-1);
                });
            },
            showRecordformDialog (id){
                this.recordformDialogVisible = false;
                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId || this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            showRecordformDialogUp (id){
                this.recordformDialogVisibleUpdate1 = !this.recordformDialogVisibleUpdate1;
                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId || this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            showRecordformDialogUpdate (sid){
                this.recordformDialogVisibleUpdate1 = !this.recordformDialogVisibleUpdate1;
                this.folUpdateData(sid);
            },
            // showRecordformDialogUpdate1 (sid){
            //     this.recordformDialogVisibleUpdate1 = !this.recordformDialogVisibleUpdate1;
            //     let customerId=this.$route.params.id;
            //     let contactId='';
            //     let opportunityId='';
            //     let pageNum=this.pageNum;
            //     let pageCount=this.pageCount;
            //     let contactName=this.contactName;
            //     let startTime=this.startTime;
            //     let endTime=this.endTime;
            //     this.customerFollowPlanData({
            //             'pageNum':pageNum,
            //             'pageCount':pageCount,
            //             'customerId':customerId,
            //             'contactId':contactId,
            //             'opportunityId':opportunityId,
            //             'contactName':contactName,
            //             'startTime':startTime, 
            //             'endTime':endTime, 
            //         });
            // },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();

                this.contactName=this.searchForm.name;
                this.startTime=this.searchForm.date[0];
                this.endTime=this.searchForm.date[1];
                console.log(this.endTime);

                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId || this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.name)
                console.log(this.searchForm.date)
                console.log(this.searchForm.date[0]);
                console.log(this.searchForm.date[1]);
                // let obj={
                //     contactName:this.searchForm.name,
                //     startTime:this.searchForm.date[0],
                //     endTime:this.searchForm.date[1],
                // };
                // this.$refs.reflist.test(obj)
                this.contactName=this.searchForm.name;
                this.startTime=this.searchForm.date[0];
                this.endTime=this.searchForm.date[1];
                console.log(this.endTime);


                console.log('customerID----客户id',this.followPlan.customerId);
                console.log('oppID----商机id',this.followPlan.opportunityId);
                let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId || this.$route.params.id;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            setScroll(){
                // let scrollBd = $(".scrollContent2");
                let scrollBd = $(".router-wrapper");
                let my = this;
                scrollBd.scroll( function(e) {
                    if($('#pane-approval').css("display")=="block"){
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
                        let customerId=my.$route.query.customerId || my.$route.query.customer;
                        let contactId=my.contactId;
                        let opportunityId=my.opportunityId || my.$route.params.id;
                        let pageNum=my.pageNum;
                        let pageCount=my.pageCount;
                        let contactName=my.contactName;
                        let startTime=my.startTime;
                        let endTime=my.endTime;
                        my.customerFollowPlanData({
                                'pageNum':pageNum,
                                'pageCount':pageCount,
                                'customerId':customerId,
                                'contactId':contactId,
                                'opportunityId':opportunityId,
                                'contactName':contactName,
                                'startTime':startTime, 
                                'endTime':endTime, 
                            });
                        } 
                　　}
                    }
                });
            }
        },
        data(){
            return {
                recordVisible:false,
                editData:[],
                tableData5:[],
                pageNum:1,
                pageCount:10,
                dataTotal:0,
                pageTotal:1,
                list:[],  
                contactName:'',
                customerId:'',
                startTime:'',
                endTime:'',
                recordformTitle:'XXXXX客户',
                recordId:'',
                recordformDialogVisible : false,
                recordformDialogVisibleUpdate : false,
                recordformDialogVisibleUpdate1 : false,
                isSelection:true,
                searchForm:{
                    name:'',
                    date:''
                },
                searchRules:{
                    key: [
                        
                    ]
                }
                
            }
        },
        watch : {
        },
        mounted (){
            console.log('customerID----客户id',this.followPlan.customerId);
            console.log('oppID----商机id',this.followPlan.opportunityId);
            let customerId=this.$route.query.customerId || this.followPlan.customerId || this.$route.query.customer;
            this.customerId=customerId;
            let contactId=this.$route.query.contactId;
            let opportunityId=this.$route.query.opportunityId || this.followPlan.opportunityId || this.$route.params.id;
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            let contactName=this.contactName;
            let startTime=this.startTime;
            let endTime=this.endTime;
            this.customerFollowPlanData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'contactId':contactId,
                    'opportunityId':opportunityId,
                    'contactName':contactName,
                    'startTime':startTime, 
                    'endTime':endTime, 
                });
            this.setScroll();
           
        },
        created (){
            
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.planSearch{
    .el-form-item .el-form-item__label{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #505050;
            letter-spacing: 0;
        }
    .el-input__inner{height: 32px; line-height: 32px; background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 3px; font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
   .participants-wrap{
        position: relative;
        .btnItem{margin-top:-3px;}
        .el-table::before{height:auto;}
        .btn-positon-box{
            position: absolute;
            right: 3px;
            top:0px;
        }
    }
</style>

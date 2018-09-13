<template>
    <div class="wrap">
        <div class="content-title">
            <h3>本日全部跟进计划</h3>
            <el-button type="primary" size="small" class="goback" @click="goback">返回</el-button>
        </div>
        <div class="content">
            <!--搜索-->
            <div class="search planSearch">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm"  ref="searchForm">
                    <el-form-item label="客户名称：" prop="name">
                        <el-input size="small" v-model="searchForm.name" placeholder="输入客户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contacts">
                        <el-input size="small" v-model="searchForm.contacts" placeholder="输入联系人姓名"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="计划跟进时间：" prop="daterange">
                        <el-date-picker
                                v-model="searchForm.daterange"
                                type="datetimerange"
                                format = "yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" size="small" @click="search">查询</el-button>
                        <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

            </div>
            <!--结果-->
            <div>
                <el-table
                        :data="tableData"
                        @sort-change="orderList"
                        style="width: 100%;text-align: center;"
                        :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                        :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
                    <el-table-column
                            label="客户名称">
                            <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/customer/details?customerId=' + scope.row.customerId">{{ scope.row.customerName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="联系人"
                            width="100">
                            <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/contacts/details?customerId=' + scope.row.customerId+'&contactId='+ scope.row.contactId">{{ scope.row.contactName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="contactWay"
                            label="联系方式"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="decisionRole"
                            label="决策关系"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            label="商机"
                            width="100">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/business/details/' + scope.row.opportunityId + '?customer=' + scope.row.customerId ">{{ scope.row.opportunityName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="target"
                            label="跟进目标"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="createPersonName"
                            label="跟进人"
                            width="80">
                    </el-table-column>
                    <!-- <el-table-column
                            prop="telephone"
                            label="联系电话"
                            width="120">
                    </el-table-column> -->
                    <el-table-column
                            prop="contactTime"
                            sortable
                            label="计划跟进时间"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="updateDate"
                            sortable
                            label="更新时间"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                                <a style="cursor: pointer; color:#46A7FF; font-size:14px;" class="el-icon-tickets" @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.opportunityId,scope.row.sid,scope.row.target)"></a>
                            </el-tooltip>
                            <!-- <span @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.opportunityId,scope.row.sid,scope.row.target)" style="color: #409EFF; cursor: pointer;">查看记录</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <el-pagination v-if="dataTotal==0?false:true" style="float:right;"
                :current-page="pageNum"
                :page-size="pageCount"
                :page-sizes="[10,20,50,100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <dialog-follow-recordform-cu-plan :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-plan>
    </div>

</template>

<script>
    import dialogFollowRecordformCuPlan from '@Main/crm/components/dialog.follow.recordform_cu_plan.vue'
    import crmRank from '@Main/crm/components/crm.rank.vue'
    import historyFollow from '@Main/crm/components/history.follow.vue'
    import todayPlan from '@Main/crm/components/today.plan.vue'
    import {allPlans} from '@Main/crm/getData'
    export default{
        components:{
            dialogFollowRecordformCuPlan
        },
        methods:{
            planCall(){
                let customerName=this.customerName;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'customerName':customerName,
                    'contactName':contactName,
                    'startTime':startTime,
                    'endTime':endTime,
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'contactTimeSort':this.contactTimeSort,
                    'updateDateSort':this.updateDateSort,
                };
                this.allPlansData(obj);
            },
            //后端排序
            orderList(obj){
                console.log(obj);
                if(obj.prop=="contactTime"){
                    if(obj.order=="ascending"){
                        this.contactTimeSort='asc';
                        this.updateDateSort='';
                        this.planCall();
                    }else if(obj.order=="descending"){
                        this.contactTimeSort='desc';
                        this.updateDateSort='';
                        this.planCall();
                    }
                }else if(obj.prop=="updateDate"){
                    if(obj.order=="ascending"){
                        this.contactTimeSort='';
                        this.updateDateSort='asc';
                        this.planCall();
                    }else if(obj.order=="descending"){
                        this.contactTimeSort='';
                        this.updateDateSort='desc';
                        this.planCall();
                    }
                }else if(obj.prop==null){
                        this.contactTimeSort='';
                        this.updateDateSort='';
                        this.planCall();
                }
            },
            showRecordformDialogClo(){
                this.recordformDialogVisible = false;
                let customerName=this.customerName;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;

                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'contactName':contactName,
                    'startTime':startTime,
                    'endTime':endTime,

                };
                this.allPlansData(obj);
            },
            showRecordformDialog (customerId,contactId,opportunityId,planId,target){
                this.recordformDialogVisible = !this.recordformDialogVisible;
                this.$nextTick(function(){
                    this.$refs.recordformId.test(customerId,contactId,opportunityId,planId,target)
                })
            },
            jump(){
                alert("跳转");
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.customerName="";
                this.contactName="";

                let customerName=this.customerName;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;

                this.pageNum=1;
                this.$router.push({
                    path: '/crm/allplan',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'contactName':contactName,
                    'startTime':startTime,
                    'endTime':endTime,

                };
                this.allPlansData(obj); 
            },
            goback(){
                this.$router.back(-1);
            },
            search(){
                this.customerName=this.searchForm.name;
                this.contactName=this.searchForm.contacts;
                this.startTime=this.searchForm.daterange[0];
                this.endTime=this.searchForm.daterange[1];

                let customerName=this.customerName;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;

                this.pageNum=1;
                this.$router.push({
                    path: '/crm/allplan',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'contactName':contactName,
                    'startTime':startTime,
                    'endTime':endTime,

                };
                this.allPlansData(obj);  
            },
            async allPlansData(obj){
                let res = await allPlans(obj)
                console.log(res[0]);
                
                res[0].list.forEach((item)=>{
                    if(item.decisionRole=="0"){
                        item.decisionRole="普通员工";
                    }else if(item.decisionRole=="1"){
                        item.decisionRole="采购决策人";
                    }else if(item.decisionRole=="2"){
                        item.decisionRole="项目决策人";
                    }else if(item.decisionRole=="3"){
                        item.decisionRole="人事决策人";
                    };

                    if(item.contactWay==0){
                        item.contactWay="电话"
                    }else if(item.contactWay==1){
                        item.contactWay="邮件"
                    }else if(item.contactWay==2){
                        item.contactWay="短信"
                    }else if(item.contactWay==3){
                        item.contactWay="上门拜访"
                    }else if(item.contactWay==4){
                        item.contactWay="会务"
                    }
                })
                res[0].list.forEach((item)=>{
                    item.contactTime=item.contactTime.substring(0,item.contactTime.length-3);
                })
                this.tableData=res[0].list;
                console.log(this.tableData);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total
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
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.info(typeof val)
                this.pageCount = val;
                console.log(this.$router);
                this.$router.push({
                    path: '/crm/allplan',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let customerName=this.customerName;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;

                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'contactName':contactName,
                    'startTime':startTime,
                    'endTime':endTime,

                };
                this.allPlansData(obj);
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.info(typeof val)
                this.pageNum = val;
                console.log(this.$router);
                this.$router.push({
                    path: '/crm/allplan',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let customerName=this.customerName;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;

                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'contactName':contactName,
                    'startTime':startTime,
                    'endTime':endTime,

                };
                this.allPlansData(obj);
            },
        },
        created (){
            let pageNum=this.pageNum;
            if(this.$route.query.pageNum !==undefined){
                pageNum=this.$route.query.pageNum;
            }
            let pageCount=this.pageCount;
            if(this.$route.query.pageCount !==undefined){
                pageCount=this.$route.query.pageCount;
            }
            let customerName=this.customerName;
            let contactName=this.contactName;
            let startTime=this.startTime;
            let endTime=this.endTime;

            var obj={
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerName':customerName,
                'contactName':contactName,
                'startTime':startTime,
                'endTime':endTime,
            };
            this.allPlansData(obj);  
        },
        data(){
            return {
                contactTimeSort:'',
                updateDateSort:'',
                recordformDialogVisible : false,
                searchForm:{
                    name:'',
                    contacts:'',
                    daterange:''
                },
                tableData: [],
                pageNum:1,
                pageCount:10,
                dataTotal:0,
                pageTotal:1,
                list:[]
            }
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
    .el-input__inner{width: 200px; height: 32px; line-height: 32px; background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 3px; font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .content-title{
            position: relative;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eeeeee;
            h3{
                padding-left: 24px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #191919;
                margin-top:0px;
                margin-bottom:0px;
            }
            .goback{
                position: absolute;
                right: 24px;
                top:15px;
            }
        }
        .content{
            padding: 16px 24px 16px 24px;
        }
    }

</style>
